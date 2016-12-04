var parameter = {};
var dataList={};

$(function() {
	//初始化表格
	initDataGrid();
	//初始化权限
	initParentAuth();
	
	//初始化弹出框
	$('#auth_detail_dialog').dialog({
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
	$('#auth_add').click(function(){
		var rowInfo =  $('#auth_table').datagrid('getSelected');
		$('#auth_detail_form')[0].reset();
		$('#authId').val('');
		dialogOpen();
		$("#isEffective").val("1");
		$("#pid").val(rowInfo.authId);
	});
});

/**
 * datagrid load
 * @param param
 */
function dataGridload(param){
	$('#auth_table').treegrid('load',param);
}

function dialogClose(){
	$('#auth_detail_dialog').dialog('close');
}

function dialogOpen(){
	$('#auth_detail_dialog').dialog('open');
}

/**
 * edit sys auth
 * @param authId
 */
function authEdit(authId){
	$('#auth_table').datagrid('selectRecord',authId);
	var rowInfo =  $('#auth_table').datagrid('getSelected');
	if(authId){
		$('#authId').val(authId);
		$('#authName').val(rowInfo.authName);
		$('#pid').val(rowInfo.pid);
		$('#authSeq').val(rowInfo.authSeq);
		$('#authAction').val(rowInfo.authAction);
		$('#isEffective').val(rowInfo.isEffective);
		$('#authority').val(rowInfo.authority);
		$("#authType").val(rowInfo.authType);
		
		dialogOpen();
	}
}

/**
 * init table
 */
function initDataGrid(){
	$('#auth_table').html("");
	$('#auth_table').treegrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'sysAuth/getSysAuthList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		treeField:'authName',
		onLoadSuccess: function () {
			$('#auth_table').treegrid('collapseAll');
		},
		idField:'authId',
		columns:[[
			{field:'authName',title:'Permission name',width:100},
			{field:'authAction',title:'Access path',hidden:true,width:100},
			{field:'pid',title:'Parent number',hidden:true,width:100},
			{field:'authority',title:'Authority code',hidden:true,width:100},
			{field:'authType',title:'Permission type',width:100,
				formatter:function(value){
					if('menu'==value){
						return 'menu';
					}else{
						return 'Button';
					}
				}
			},
			{field:'isEffective',title:'state',width:70,
					formatter:function(value){
						if(1==value){
							return 'effective';
						}else{
							return '<span style="color:red;">invalid</span>';
						}
					}
			},
			{field:'authId',title:'Operation',width:70,
					formatter:function(value){
						return '<a href="javascript:authEdit('+value+')">modify</a>&nbsp;'+
						'<a   onclick="delTrea('+value+')" ><font color="red" style="cursor:pointer">delete</font></a>';
					}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}	
 
function delTrea(id){	//Delete operation  
    $.messager.confirm('confirm','confirm deletion?',function(row){
        if(row){
            $.ajax({
                url:'sysAuth/delSysAuth.html?id='+id,
                success:function(msg){
                	if(msg=='success') 
                		alert("Deleted");
                	else 
                		alert("Delete failed");
                	dataGridload(parameter);
                },
                fail:function(){
                	alert(1);
                }
            });
        }  
    });
  }


/**
 * get auth list
 * @param parameter
 */
function getList(parameter){
	_G.createTable({
		"field":{"authId":{"operate":"span"},"authName":{},"isEffective":{"operate":"span"}},
		"url":"sysAuth/getSysAuthList.html",
		"table_head":{"number":"","Permission name":"","state":"","Operation":""},
		"parameter":parameter,
		"operate":{"updateOperate":["modify",btnUpdateClassName],"deleteOperate":["delete",btnDeleteClassName]},
		//"operateTdCss":[{"authId":{"width":"50px"}},{"authName":{"width":"100px"}}],
		"operateText":[{"isEffective":{"0":"invalid","1":"effective"}}],
		"ID":{"listID":"auth_list","pageID":"auth_page"}
	});
	
	/** bind add role event **/
	$("#add_auth").click(function(){
		showModel();
	});
}

function initParentAuth(){
	$.post("sysAuth/getParentAuth.json",{"rows":50},function(data){
		$("#pid").html('<option value="0">Parent menu</option>');
		$.each(data.rows,function(dataIndex,auth){
			$("#pid").append('<option value='+auth.authId+'>'+auth.authName+'</option>');
		});
	},"json");
}

/**
 * show model window
 */
function showModel(){
	var content = 'I`m a dynamic data entry.';
	var divEntity = {"targetID":"modelDiv","width":650,"height":176,"content":content,"title":"Add system permissions"};
	var modelDiv = new ModelDiv(divEntity);
	showModelDiv(modelDiv);
	$("#authId").val("");
	$("#authName").val("");
	$("#pid").val(0);
	$("#authAction").val("");
}

/**
 * add/update sys auth
 */
function submit_model_window(){
	if($("#authName").val()==null||$("#authName").val()==""){
		$.messager.alert(titleInfo,'Please enter the name of the authority!');
		return;
	}
	var authId = $("#authId").val();
	var arr_add = {
			"authName":$("#authName").val(),
			"pid":$("#pid").val(),
			"authAction":$("#authAction").val(),
			"authSeq":$("#authSeq").val(),
			"isEffective":$("#isEffective").val(),
			"authType":$("#authType").val(),
			"authority":$("#authority").val()
	};
	if(authId!=null&&authId!=""){
		arr_add['authId']=authId;
		$.post("sysAuth/updateSysAuth.json",arr_add,function(data){
			if(data.code==1){
				dialogClose();
				$.messager.show({title:titleInfo,msg:'Changed！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,'Change failed!!!');
			}
			closeModelDiv();
		},"json");
	}else{
		$.post("sysAuth/addSysAuth.json",arr_add,function(data){
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

/**
 * update sys auth
 * @param dataId
 * @param dataIndex
 */
function updateOperate(dataId,dataIndex){
	var content = 'I`m a dynamic data entry.';
	var divEntity = {"targetID":"modelDiv","width":650,"height":176,"content":content,"title":"Modify system permissions"};
	var modelDiv = new ModelDiv(divEntity);
	showModelDiv(modelDiv);//!!!
	$("#authId").val(dataId);
	$("#authName").val(back_data[dataIndex].authName);
	$("#pid").val(back_data[dataIndex].pid);
	$("#authAction").val(back_data[dataIndex].authAction);
	$("#isEffective").val(back_data[dataIndex].isEffective);
}

/**
 * delete sys auth
 * @param dataId
 * @param dataIndex
 */
function deleteOperate(dataId,dataIndex){
	var dialog = new DialogDiv({"content":"Are you sure you want to delete this permission？","isHavaCancel":true});
	dialog.showDialog();
	d_dataId = dataId;
	d_dataIndex = dataIndex;
	if(isCancel){
		_deleteOperate(d_dataId,d_dataIndex);
	}
}

function _deleteOperate(dataId,dataIndex){
	$.post("sysAuth/deleteSysAuth.html",{"authId":dataId},function(data){
		if(data.msg=="success"){
			getList(parameter);
		}else{
			alert("add failure!!!");
		}
	},"json");
}