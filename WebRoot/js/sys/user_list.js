var parameter = {};
var dataList={};
var updateFormValid;
var validateResult;
$(function() {
	//初始化弹出框
	$('#user_detail_dialog').dialog({
		buttons:[{
			text:'Indeed set',
			handler:function(){
				submit_model_window();
			}
		},{
			text:'cancel',
			handler:function(){
				$('#user_detail_dialog').dialog('close');
			}
		}]
	});
	//初始化表格
	initDataGrid();
	//添加用户
	$('#user_add').click(function(){
		$('#user_detail_form')[0].reset();
		$('#userId').val('');
		$('#user_detail_dialog').dialog('open');
		getAuthTree();
	});
	//初始化部门树
	getAuthTreeData();
	
	//条件查询
	$("#user_search").click(function(){
		if($("#userName1").val()!=''){
			parameter['userName'] =$("#userName1").val();
		}
		if($("#group_name1").val()!=''){
			parameter['group_name'] =$("#group_name1").val();
		}
		initDataGrid();
		parameter = {};
		
	});
	//重置
	$("#user_reset").click(function(){
		$("#userName1").val("");
		$("#group_name1").val("");
	});
});

//修改
function userEdit(userId){
	$('#user_table').datagrid('selectRecord',userId);
	var rowInfo =  $('#user_table').datagrid('getSelected');
	if(rowInfo){
		//设置弹出框信息
		generateDialog(rowInfo);
		$('#user_detail_dialog').dialog('open');
	}
}

//保存
function submit_model_window(){
	var userId = $("#userId").val();
	var userName = $("#userName").val();
	if(userName==null||userName==''){
		$.messager.alert(titleInfo,'Please input user name!');
		return;
	}
	var userMail = $("#userMail").val();
	if(userMail==null||userMail==''){
		$.messager.alert(titleInfo,'Please input account name!');
		return;
	}
	if($("input[name=roles]:checked").length ==0){
		$.messager.alert(titleInfo,"Please select staff role！");
		return;
	}
	var roleId="";
	$("input[name=roles]:checked").each(function(){
		var role = $(this).val();
		roleId += role + ",";
	});
	roleId = roleId.substring(0, roleId.length-1);
	var zTree=$.fn.zTree.getZTreeObj("treeDemo");
	var tree_nodes=zTree.getCheckedNodes(true);
	if(tree_nodes.length !=1){
		$.messager.alert(titleInfo,'Choose one department!');
		return;
	}
	var dpid = tree_nodes[0].id;
	var dpName = tree_nodes[0].name;
	var user = {
			"userName":userName,
			"userMail":userMail,
			"roleId":roleId,
			"departmentId":dpid,
			"sys_job":$("#sys_job").val(),
			"remark":$("#remark").val(),
			"group_name":dpName,
			"sys_state":$("#sys_state").val(),
			"isEffective":jQuery("#isEffective").val()
	};
	if(userId!=null&&userId!=""){
		user['userId']=userId;
		if($("#userMail").val()==$("#oldUserMail").val()){
			delete user["userMail"];
		}
		$.post("sysUser/updateSysUserById.json",user,function(data){
			if(data.code==1){
				$('#user_detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'Changed！',timeout:timeoutValue,showType:'slide'});
				$('#user_table').datagrid('load',parameter);
			}else{
				if(data.msg=="mail_same"){
					$.messager.alert(titleInfo,'The account name you entered already exists！');
				}else{
					$.messager.alert(titleInfo,'Change failed！');
				}
			}
		},"json");
	}else{
		$.post("sysUser/addSysUser.json",user,function(data){
			if(data.code==1){
				$('#user_detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'Added！',timeout:timeoutValue,showType:'slide'});
				$('#user_table').datagrid('load',parameter);
			}else if(data.msg=="mail_same"){
				$.messager.alert(titleInfo,'The account name you entered already exists！');
			}else{
				$.messager.alert(titleInfo,'Add failed！');
			}
		},"json");
	}
}

//初始化table
function initDataGrid(){
	$('#user_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'sysUser/getList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'userId',
		columns:[[
				{field:'userName',title:'Name',width:100},
				{field:'group_name',title:'Affiliated department',width:100},
				{field:'sys_job',title:'post',width:100},
				{field:'userMail',title:'account',width:100},
				{field:'userPwd',title:'Password',hidden:true},
				{field:'departmentId',title:'departmentid',hidden:true},
				{field:'sys_state',title:'In service state',width:70,
					formatter:function(value){
						if(1==value){
							return 'Working';
						}else{
							return 'Quit';
						}
					}
				},
				{field:'isEffective',title:'Account status',width:70,
						formatter:function(value){
							if(1==value){
								return 'Enable';
							}else{
								return 'Disable';
							}
						}
				},
				{field:'userId',title:'Operation',width:85,
						formatter:function(value){
							return '<a href="javascript:initPassWord('+value+')">Initialization code</a> <a href="javascript:userEdit('+value+')">edit</a> <a   onclick="del('+value+')" ><font color="red">delete</font></a>';
						}
				}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}

//初始化密码
function initPassWord(id) {
	$.messager.confirm('confirm','Confirm initialization password?',function(row){  
        if(row){  
            $.ajax({  
                url:'sysUser/initPwd.html?id='+id,    
                success:function(msg){
                	if(msg=='success') 
//                		alert("密码初始化成功");
                		$.messager.alert(titleInfo,"Password initialization done！");
                	else 
//                		alert("密码初始化失败");
                		$.messager.alert(titleInfo,"Password initialization failed！");
                	window.location.href=window.location.href;
                } ,
                fail:function(){
                	alert(1);
                }
            });  
        }  
    });
}

function del(userId){  //Delete operation  
    $.messager.confirm('confirm','confirm deletion?',function(row){  
        if(row){  
            $.ajax({  
                url:'sysUser/delUser.html?id='+userId,    
                success:function(msg){
                	if(msg=='success') 
//                		alert("删除成功");
                		$.messager.alert(titleInfo,"Deleted！");
                	else 
//                		alert("删除失败");
                		$.messager.alert(titleInfo,"Delete failed！");
                	window.location.href=window.location.href;
                } ,
                fail:function(){
                	alert(1);
                }
            });  
        }  
    });
  }  

//设置弹出框信息 
function generateDialog(rowInfo){
	$('#userId').val(rowInfo.userId);
	$('#userName').val(rowInfo.userName);
	$('#userMail').val(rowInfo.userMail);
	$('#oldUserMail').val(rowInfo.userMail);
	var roleid = rowInfo.roleId;
	$("input[name=roles]").each(function(){
		$(this).prop("checked",false);
		var roleids = roleid.split(",");
		for ( var int = 0; int < roleids.length; int++) {
			if(roleids[int] == $(this).val()) {
				$(this).prop("checked",true);
				break;
			}
		}
	});
	$('#partnerId').val(rowInfo.partnerId);
	$('#isEffective').val(rowInfo.isEffective);
	$('#sys_state').val(rowInfo.sys_state);
	$('#sys_job').val(rowInfo.sys_job);
	$('#remark').val(rowInfo.remark);
	getAuthMyTreeData(rowInfo.departmentId);
}

var treeData;
var my_treeData;

/**
 * Get department tree
 */
function getAuthTreeData(){
	$.post('departmentInfo/getAllDepartmentToTree.json',function(data){
		treeData = data.rows;
	},"json");
}

/**
 * Get the current user's Department
 * @param roleId
 */
function getAuthMyTreeData(departmentId){
	my_treeData = departmentId;
	getAuthTree("update");
}

var zNodes =[];
var treeObject;

function getAuthTree(operate){
	var setting = {
			check: {
				enable: true,
				chkboxType: {"Y": "", "N": ""}
			},
			data: {
				simpleData: {
					enable: true
				}
			}
		};
	
	$.each(treeData,function(authIndex,auth){
		var flag = false;
		if(operate=="update"&&my_treeData==auth.tId){
			flag=true;
		}
		if(flag){
			zNodes[authIndex]={id:auth.tId,pId:auth.pId,name:auth.name,authority:auth.code,checked:true,open:true};
		}else{
			zNodes[authIndex]={id:auth.tId,pId:auth.pId,name:auth.name,authority:auth.code,open:true};
		}
	});
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
}