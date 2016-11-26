var parameter = {};
var dataList={};
var updateFormValid;
var validateResult;
$(function() {
	//初始化弹出框
	$('#saveUpdateDepartment_detail_dialog').dialog({
		buttons:[{
			text:'Indeed set',
			handler:function(){
				submit_model_window();
			}
		},{
			text:'cancel',
			handler:function(){
				$('#saveUpdateDepartment_detail_dialog').dialog('close');
			}
		}]
	});
	
	
	//初始化表格
	initDataGrid();
	//添加科室
	$('#departmentInfo_add').click(function(){
		$('#saveUpdateDepartment_detail_form')[0].reset();
		$('#id').val('');
		$('#saveUpdateDepartment_detail_dialog').dialog('open');
	});
});


//查看
function findDepartment(id){
	$('#departmentInfo_table').datagrid('selectRecord',id);
	var rowInfo =  $('#departmentInfo_table').datagrid('getSelected');
	var fid=rowInfo.id;
	$('#departmentInfo_detail_dialog').dialog({    
	    title: 'Hospital department information',    
	    width: 600,    
	    height: 400,    
	    closed: false,    
	    cache: false,    
	    href: 'departmentInfo/findById.html?id='+fid,    
	    modal: true   
	}); 
}

//修改
function departmentEdit(id){
	$('#departmentInfo_table').datagrid('selectRecord',id);
	var rowInfo =  $('#departmentInfo_table').datagrid('getSelected');
	if(rowInfo){
		//设置弹出框信息
		generateDialog(rowInfo);
		$('#saveUpdateDepartment_detail_dialog').dialog('open');
	}
}

//保存
function submit_model_window(){
	var id = $("#id").val();
	var department = {
			"name":$("#name").val(),
			"status":$("#status").val(),
			"description":$("#description").val(),
			"remark":$("#remark").val(),
			"isDelete":$("#isDelete").val(),
	};
	if(id!=null&&id!=""){
		department['id']=id;
		$.post("departmentInfo/updateDepartment.json",department,function(data){
			if(data.code==1){
				$('#saveUpdateDepartment_detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'Changed！',timeout:timeoutValue,showType:'slide'});
				$('#departmentInfo_table').datagrid('load',parameter);
			}else{
					$.messager.alert(titleInfo,'Change failed！');
				}
		},"json");
	}else{
		$.post("departmentInfo/addDepartment.json",department,function(data){
			if(data.code==1){
				$('#saveUpdateDepartment_detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'Added！',timeout:timeoutValue,showType:'slide'});
				$('#departmentInfo_table').datagrid('load',parameter);
			}else{
				$.messager.alert(titleInfo,'Add failed！');
			}
		},"json");
	}
}

//初始化table
function initDataGrid(){
	$('#departmentInfo_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'departmentInfo/getList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
			{field:'name',title:'Department name',width:100},
			{field:'description',title:'Department description',width:100},
			{field:'status',title:'state',width:100,
					formatter:function(value){
				return util.getValueBykeyDic('status',value);
			 }
			},
			{field:'id',title:'operation',width:70,
					formatter:function(value){
						return '<a href="javascript:departmentEdit(this)">modify</a>&nbsp;<a   onclick="del(this)" ><font color="red">delete</font></a>';
					}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}

function del(id){  //删除操作  
	$('#departmentInfo_table').datagrid('selectRecord',id);
	var rowInfo =  $('#departmentInfo_table').datagrid('getSelected');
	var fid=rowInfo.id;
    $.messager.confirm('confirm','confirmdelete?',function(row){  
        if(row){  
            $.ajax({  
                url:'departmentInfo/delDepartment.html?id='+fid,    
                success:function(msg){
                	alert(msg);
                	 window.location.href=window.location.href;
                } ,
                fail:function(){
                	alert(1);
                }
            });  
        }  
    })  
  }  

//设置弹出框信息 

function generateDialog(rowInfo){
	$('#id').val(rowInfo.id);
	$('#name').val(rowInfo.name);
	$('#description').val(rowInfo.description);
	$('#status').val(rowInfo.status);
	$('#remark').val(rowInfo.remark);
}