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
			text:'确 定',
			handler:function(){
				submit_model_window();
			}
		},{
			text:'取消',
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
			{field:'authName',title:'权限名称',width:100},
			{field:'authAction',title:'访问路径',hidden:true,width:100},
			{field:'pid',title:'父级编号',hidden:true,width:100},
			{field:'authority',title:'权限编码',hidden:true,width:100},
			{field:'authType',title:'权限类型',width:100,
				formatter:function(value){
					if('menu'==value){
						return '菜单';
					}else{
						return '按钮';
					}
				}
			},
			{field:'isEffective',title:'状态',width:70,
					formatter:function(value){
						if(1==value){
							return '有效';
						}else{
							return '<span style="color:red;">无效</span>';
						}
					}
			},
			{field:'authId',title:'操作',width:70,
					formatter:function(value){
						return '<a href="javascript:authEdit('+value+')">修改</a>&nbsp;'+
						'<a   onclick="delTrea('+value+')" ><font color="red" style="cursor:pointer">删除</font></a>';
					}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}	
 
function delTrea(id){	//删除操作  
    $.messager.confirm('确认','确认删除?',function(row){
        if(row){
            $.ajax({
                url:'sysAuth/delSysAuth.html?id='+id,
                success:function(msg){
                	if(msg=='success') 
                		alert("删除成功");
                	else 
                		alert("删除失败");
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
		"table_head":{"编号":"","权限名称":"","状态":"","操作":""},
		"parameter":parameter,
		"operate":{"updateOperate":["修改",btnUpdateClassName],"deleteOperate":["删除",btnDeleteClassName]},
		//"operateTdCss":[{"authId":{"width":"50px"}},{"authName":{"width":"100px"}}],
		"operateText":[{"isEffective":{"0":"无效","1":"有效"}}],
		"ID":{"listID":"auth_list","pageID":"auth_page"}
	});
	
	/** bind add role event **/
	$("#add_auth").click(function(){
		showModel();
	});
}

function initParentAuth(){
	$.post("sysAuth/getParentAuth.json",{"rows":50},function(data){
		$("#pid").html('<option value="0">父级菜单</option>');
		$.each(data.rows,function(dataIndex,auth){
			$("#pid").append('<option value='+auth.authId+'>'+auth.authName+'</option>');
		});
	},"json");
}

/**
 * show model window
 */
function showModel(){
	var content = '我是动态加入的数据';
	var divEntity = {"targetID":"modelDiv","width":650,"height":176,"content":content,"title":"添加系统权限"};
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
		$.messager.alert(titleInfo,'请输入权限名称!');
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
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,'修改失败!!!');
			}
			closeModelDiv();
		},"json");
	}else{
		$.post("sysAuth/addSysAuth.json",arr_add,function(data){
			if(data.code==1){
				dialogClose();
				$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,'添加失败!');
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
	var content = '我是动态加入的数据';
	var divEntity = {"targetID":"modelDiv","width":650,"height":176,"content":content,"title":"修改系统权限"};
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
	var dialog = new DialogDiv({"content":"您确定删除这个权限吗？","isHavaCancel":true});
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