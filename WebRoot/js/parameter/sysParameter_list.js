var parameter = {};
var dataList={};
var updateFormValid;
var validateResult;
$(function() {
	//初始化表格
	initDataGrid();
	
	//初始化弹出框
	$('#sysParameter_detail_dialog').dialog({
		buttons:[{
			text:'Indeed set',
			handler:function(){
				submit_model_window();
			}
		},{
			text:'cancel',
			handler:function(){
				$('#sysParameter_detail_dialog').dialog('close');
			}
		}]
	});
	
	$("#sysParameter_search").click(function(){
		if($("#name1").val()!=''){
			parameter['name'] =$("#name1").val();
		}
		initDataGrid();
		parameter = {};
		
	});
	$("#sysParameter_reset").click(function(){
		$("#name1").val("");
	});
	
	//添加等待时限
	$('#sysParameter_add').click(function(){
		$('#sysParameter_detail_form')[0].reset();
		$('#id').val('');
		$('#sysParameter_detail_dialog').dialog('open');
	});
	//初始化权限选择
//	initRoleList();
});

//修改
function Edit(id){
	$('#sysParameter_table').datagrid('selectRecord',id);
	var rowInfo =  $('#sysParameter_table').datagrid('getSelected');
	if(rowInfo){
		//设置弹出框信息
		generateDialog(rowInfo);
		$('#sysParameter_detail_dialog').dialog('open');
	}
}

//保存
function submit_model_window(){
	var name = $('#name').val();
	if (name == null || name == "") {
		$.messager.alert(titleInfo,'Please enter a name！');
		return;
	}
	var code = $('#code').val();
	if (code == null || code == "") {
		$.messager.alert(titleInfo,'Please enter the code！');
		return;
	}
	var defaultValue = $('#defaultValue').val();
	if (defaultValue == null || defaultValue == "") {
		$.messager.alert(titleInfo,'Please enter the default value！');
		return;
	}
	
	var soft = $('#soft').val();
	if (isNaN(soft)) {
		$.messager.alert(titleInfo,'Sort number can only be a number！');
		return;
	}
	var id = $("#id").val();
	var sysParameter = {
			"name":$("#name").val(),
			"code":$("#code").val(),
			"defaultValue":$("#defaultValue").val(),
			"description":$("#description").val(),
			"soft":$("#soft").val(),
			"isEffective":$("#isEffective").val()
	};
	if(id!=null&&id!=""){
		sysParameter['id']=id;
		$.post("sysParameter/updateSysParameter.json",sysParameter,function(data){
			if(data.code==1){
				$('#sysParameter_detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'Changed！',timeout:timeoutValue,showType:'slide'});
				$('#sysParameter_table').datagrid('load',parameter);
			}else{
				if(data.msg=="mail_same"){
					$.messager.alert(titleInfo,'The number you entered already exists！');
				}else{
					$.messager.alert(titleInfo,'Change failed！');
				}
			}
		},"json");
	}else{
		$.post("sysParameter/addSysParameter.json",sysParameter,function(data){
			if(data.code==1){
				$('#sysParameter_detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'Added！',timeout:timeoutValue,showType:'slide'});
				$('#sysParameter_table').datagrid('load',parameter);
			}else if(data.msg=="mail_same"){
				$.messager.alert(titleInfo,'The number you entered already exists！');
			}else{
				$.messager.alert(titleInfo,'Add failed！');
			}
		},"json");
	}
}

//初始化table
function initDataGrid(){
	$('#sysParameter_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'sysParameter/getList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
			{field:'name',title:'Name',width:100},
			{field:'code',title:'Code',width:100},
			{field:'defaultValue',title:'Default value',width:100},
			{field:'description',title:'Explain',width:100},
			{field:'isEffective',title:'Open',width:70,
				formatter:function(value){
					if(1==value){
						return 'yes';
					}else{
						return 'no';
					}
				}
		},
			{field:'id',title:'Operation',width:70,
					formatter:function(value){
						return '<a href="javascript:Edit('+value+')">modify</a>&nbsp;<a   onclick="del('+value+')" ><font color="red">delete</font></a>';
					}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}
function del(id){  //Delete operation  
	$.messager.confirm('confirm','confirm deletion?',function(row){
		if(row){
			$.post('sysParameter/delSysParameter.html?id='+id,function(msg){
				if(msg=='success'){
					$('#user_detail_dialog').dialog('close');
    				$.messager.show({title:titleInfo,msg:'Deleted！',timeout:timeoutValue,showType:'slide'});
				}else{
					$.messager.alert(titleInfo,data.msg);
				}
				$('#sysParameter_table').datagrid('load',parameter);
			});
		}
	});
    /*$.messager.confirm('confirm','confirm deletion?',function(row){  
        if(row){  
            $.ajax({  
                url:'sysParameter/delSysParameter.html?id='+id,    
                success:function(msg){
                	if(msg=='success') 
//                		alert("删除成功");
                		$.messager.show({title:titleInfo,msg:'Deleted！',timeout:timeoutValue,showType:'slide'});
                		//$.messager.alert(titleInfo,'删除成功!');
                	else 
//                		alert("删除失败");
                		$.messager.alert(titleInfo,'Delete failed!');
                	window.location.href=window.location.href;
                } ,
                fail:function(){
                	alert(1);
                }
            });  
        }  
    });*/
  }  
//设置弹出框信息 
function generateDialog(rowInfo){
	$('#id').val(rowInfo.id);
	$('#code').val(rowInfo.code);
	$('#name').val(rowInfo.name);
	$('#defaultValue').val(rowInfo.defaultValue);
	$('#soft').val(rowInfo.soft);
	$('#description').val(rowInfo.description);
	$('#isEffective').val(rowInfo.isEffective);
}

/**
 * dateType convert to string display
 */
function formatterDateTime(date) {
    var datetime = date.getFullYear()
            + "-"// "year"
            + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
                    + (date.getMonth() + 1))
            + "-"// "month"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                    .getDate())
            + " "
            + (date.getHours() < 10 ? "0" + date.getHours() : date
                    .getHours())
            + ":"
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                    .getMinutes())
            + ":"
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                    .getSeconds());
    return datetime;
}