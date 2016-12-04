var parameter = {};
var dataList={};

$(function() {
	//初始化表格
	initDataGrid();
	//初始化弹出框
	$('#trea_detail_dialog').dialog({
		buttons:[{
			text:'Indeed set',
			handler:function(){
				submit_model_window();
			}
		},{
			text:'cancel',
			handler:function(){
				dialogClose();
			}
		}]
	});
	//添加角色
	$('#trea_add').click(function(){
		$('#trea_detail_form')[0].reset();
		$('#treasurerId').val('');
		$('#treasurerName').val('');
		$('#treasurerType').val('');
		$('#treasurerPhoto').val('');
		CKEDITOR.instances.treasurerDesc.setData('');
		dialogOpen();
	});
	//条件查询
	$("#auth_search").click(function(){
		if($("#treasurerName1").val()!=''){
			parameter['treasurerName'] =$("#treasurerName1").val();
		}
		initDataGrid();
		parameter = {};
		
	});
	$("#auth_reset").click(function(){
		$("#treasurerName").val("");
	});
});
/**
 * Data table refresh
 * @param param
 */
function dataGridload(param){
	$('#trea_table').datagrid('load',param);
}
//关闭dialog
function dialogClose(){
	$('#trea_detail_dialog').dialog('close');
}
//打开
function dialogOpen(){
	$('#trea_detail_dialog').dialog('open');
}
/**
 * Submit data to form
 * @param authId
 */
function authEdit(treaId){
	$('#trea_table').datagrid('selectRecord',treaId);
	var rowInfo =  $('#trea_table').datagrid('getSelected');
		$('#treasurerId').val(rowInfo.treasurerId);
		$('#treasurerName').val(rowInfo.treasurerName);
		$('#treasurerType').val(rowInfo.treasurerType);
		$('#treasurerPhoto').val(rowInfo.treasurerPhoto);
		CKEDITOR.instances.treasurerDesc.setData(rowInfo.treasurerDesc);
		dialogOpen();
}

/**
 * Initialize data form
 */
function initDataGrid(){
	$('#trea_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'trea/getTreaList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'treasurerId',
		columns:[[
		    {field:'treasurerName',title:'Accounting name',width:100},
			{field:'treasurerType',title:'Accounting type',width:100,
		    	formatter:function(value){
					if('0'==value){
						return 'Not defined1';
					}else{
						return 'Not defined2';
					}
				}
		    },
			{field:'treasurerPhoto',title:'Accounting icon',hidden:true,width:100},
			{field:'treasurerDesc',title:'Accounting description',hidden:true,width:100},
			{field:'createDate',title:'Created time',width:100,
				formatter:function(value){
					var date = new Date(value);
					return formatterDateTime(date);
				}
			},
			{field:'treasurerId',title:'Operation',width:70,
				formatter:function(value){
					return '<a href="javascript:authEdit('+value+')">modify</a> &nbsp;<a  onclick="del('+value+')" ><font color="red">delete</font></a>';
				}
		}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}	
function del(treaId){  //Delete operation  
    $.messager.confirm('confirm','confirm deletion?',function(row){  
        if(row){  
            $.ajax({  
                url:'trea/delTrea.html?id='+treaId,    
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
/**
 * Submit data tojson
 */
function submit_model_window(){
	if($("#treasurerName").val()==null||$("#treasurerName").val()==""){
		$.messager.alert(titleInfo,'Please enter a name for the accounting!');
		return;
	}
	if($("#treasurerPhoto").val()==null||$("#treasurerPhoto").val()==""){
		$.messager.alert(titleInfo,'Please upload the head of accounting!');
		return;
	}
	var treaId = $("#treasurerId").val();
	var arr_add = {
			"treasurerName":$("#treasurerName").val(),
			"treasurerPhoto":$("#treasurerPhoto").val(),
			"treasurerType":$("#treasurerType").val(),
			"treasurerDesc":CKEDITOR.instances.treasurerDesc.getData()	
	};
	if(treaId!=null&&treaId!=""){
		arr_add['treasurerId']=treaId;
		$.post("trea/updateTrea.json",arr_add,function(data){
			if(data=='1'){
				dialogClose();
				$.messager.show({title:titleInfo,msg:'Changed！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,'Change failed!!!');
			}
			closeModelDiv();
		},"json");
	}else{
		$.post("trea/addTrea.json",arr_add,function(data){
			if(data.code==1){
				dialogClose();
				$.messager.show({title:titleInfo,msg:'Added！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,'Add failed!');
			}
			closeModelDiv();
		},"json");
	}
}

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