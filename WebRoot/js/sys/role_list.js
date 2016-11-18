var parameter = {};
var dataList={};

$(function() {
	//初始化表格
	initDataGrid();
	//初始化树
	getAuthTreeData();
	//初始化弹出框
	$('#role_detail_dialog').dialog({
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
	$('#role_add').click(function(){
		$('#role_detail_form')[0].reset();
		$('#roleId').val('');
		getAuthTree();
		dialogOpen();
	});
});

function gotoPage(page,pageSize){
	parameter['page'] = page;
	getList(parameter);
}

//修改
function roleEdit(roleId){
	$('#role_table').datagrid('selectRecord',roleId);
	var rowInfo =  $('#role_table').datagrid('getSelected');
	if(roleId){
		$('#roleId').val(roleId);
		$('#roleName').val(rowInfo.roleName);
		$('#isEffective').val(rowInfo.isEffective);
		getAuthMyTreeData(roleId);
		dialogOpen();
	}
}
//dataGrid加载数据
function dataGridload(param){
	$('#role_table').datagrid('load',param);
}
//关闭对话框
function dialogClose(){
	$('#role_detail_dialog').dialog('close');
}
//打开对话框
function dialogOpen(){
	$('#role_detail_dialog').dialog('open');
}

//初始化table
function initDataGrid(){
	$('#role_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'sysRole/getSysRoleList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'roleId',
		columns:[[
			{field:'roleName',title:'角色名称',width:100},
			{field:'isEffective',title:'状态',width:70,
					formatter:function(value){
						if(1==value){
							return '有效';
						}else{
							return '无效';
						}
					}
			},
			{field:'roleId',title:'操作',width:70,
					formatter:function(value){
//						if(value == 1 || value == 2 || value == 3 || value == 4){
//							return '';
//						}
						return '<a href="javascript:roleEdit('+value+')">修改</a> &nbsp;<a   onclick="del('+value+')" ><font color="red">删除</font></a>';
					}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}
function del(roleId){  //删除操作  
    $.messager.confirm('确认','确认删除?',function(row){  
        if(row){  
            $.ajax({  
                url:'sysRole/deleteRole.html?roleId='+roleId,    
                success:function(msg){
                	if(msg=='success') 
//                		alert("删除成功");
                		$.messager.alert(titleInfo,'删除成功!');
                	else 
//                		alert("删除失败");
                		$.messager.alert(titleInfo,'删除失败!');
                	window.location.href=window.location.href;
                } ,
                fail:function(){
                	alert(1);
                }
            });  
        }  
    })  
  }  
function showModel(){
	var content = '我是动态加入的数据';
	var divEntity = {"targetID":"modelDiv","width":650,"height":480,"content":content,"title":"添加系统角色"};
	var modelDiv = new ModelDiv(divEntity);
	showModelDiv(modelDiv);
	$("#roleId").val("");
	$("#roleName").val("");
}

function submit_model_window(){
	if($("#roleName").val()==null||$("#roleName").val()==""){
		$.messager.alert(titleInfo,'您还没有输入角色名称!');
		return;
	}
    var zTree=$.fn.zTree.getZTreeObj("treeDemo");
	var tree_nodes=zTree.getCheckedNodes(true);
	if(tree_nodes.length==0){
		$.messager.alert(titleInfo,'请为角色选择权限!');
		return;
	}
	var authority = "";
    for(var tree_nodes_index=0;tree_nodes_index<tree_nodes.length;tree_nodes_index++){
    	authority += tree_nodes[tree_nodes_index].authority+",";
	}
	var roleId = $("#roleId").val();
	var arr_add = {
			"roleName":$("#roleName").val(),
			"isEffective":$("#isEffective").val(),
			"sysRoleAuth":authority
	};
	if(roleId!=null&&roleId!=""){
		arr_add['roleId']=roleId;
		$.post("sysRole/updateSysRole.json",arr_add,function(data){
			if(data.code==1){
				dialogClose();
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,'修改失败!!!');
			}
		},"json");
	}else{
		$.post("sysRole/addSysRole.json",arr_add,function(data){
			if(data.code==1){
				dialogClose();
				$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,'添加失败!');
			}
		},"json");
	}
}

/**
 * 删除角色
 * @param dataId
 * @param dataIndex
 */
function deleteOperate(dataId,dataIndex){
	var dialog = new DialogDiv({"content":"您确定删除这个角色吗？","isHavaCancel":true});
	dialog.showDialog();
	d_dataId = dataId;
	d_dataIndex = dataIndex;
	if(isCancel){
		_deleteOperate(d_dataId,d_dataIndex);
	}
}
function _deleteOperate(dataId,dataIndex){
	$.post("sysRole/deleteRole.json",{"roleId":dataId},function(data){
		if(data.msg=="success"){
			getList(parameter);
		}else{
//			alert("delete failure!");
			$.messager.alert(titleInfo,'delete failure!');
		}
	},"json");
}

/**
 * 更新角色
 * @param dataId
 * @param dataIndex
 */
function updateOperate(dataId,dataIndex){
	var content = '我是动态加入的数据';
	var divEntity = {"targetID":"modelDiv","width":650,"height":480,"content":content,"title":"修改系统角色"};
	var modelDiv = new ModelDiv(divEntity);
	showModelDiv(modelDiv);
	getAuthMyTreeData(dataId);
	$("#roleId").val(dataId);
	$("#roleName").val(back_data[dataIndex].roleName);
	$("#isEffective").val(back_data[dataIndex].isEffective);
}

var treeData;
var my_treeData;

/**
 * 获取权限树
 */
function getAuthTreeData(){
	$.post('sysAuth/getAllAuthToTree.json',{"isEffective":1},function(data){
		treeData = data.rows;
	},"json");
}

/**
 * 获取当前角色的权限树
 * @param roleId
 */
function getAuthMyTreeData(roleId){
	$.post('sysAuth/getAuthByRoleId.json',{"roleId":roleId},function(data){
		my_treeData = data.rows;
		getAuthTree("update");
	},"json");
}

var zNodes =[];
var treeObject;

function getAuthTree(operate){
	var setting = {
			check: {
				enable: true
			},
			data: {
				simpleData: {
					enable: true
				}
			}
		};
	
	$.each(treeData,function(authIndex,auth){
		var flag = false;
		if(operate=="update"){
			for(var i=0;i<my_treeData.length;i++){
				if(my_treeData[i].authId==auth.authId){
					flag=true;
					break;
				}
			}
		}
		if(flag){
			zNodes[authIndex]={id:auth.authId,pId:auth.pid,name:auth.authName,authority:auth.authority,checked:true,open:true};
		}else{
			zNodes[authIndex]={id:auth.authId,pId:auth.pid,name:auth.authName,authority:auth.authority,open:true};
		}
	});
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
}
