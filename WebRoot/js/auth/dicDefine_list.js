var parameter = {};
var dataList={};

$(function() {
	//初始化表格
	initDataGrid();
	
	$("#auth_add").click(function(){
		$('#id2').val('');
		$('#dicType2').val('');
		$('#sysFlag2').val('');
		$('#dicName2').val('');
		$('#dicRemark').val('');
		$('#dic_detail_dialog2').dialog('open');
	});
	$("#auth_search").click(function(){
		if($("#dicType1").val()!=''){
			parameter['dicType'] =$("#dicType1").val();
		}
		if($("#dicName1").val()!=''){
			parameter['dicTypeName'] =$("#dicName1").val();
		}
		initDataGrid();
		parameter = {};
		
	});
	$("#auth_reset").click(function(){
		$("#dicType1").val("");
		$("#dicName1").val("");
	});
	//初始化弹出框
	$('#dic_detail_dialog').dialog({
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
	
	$('#dic_detail_dialog2').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				submit_model_window2();
			}
		},{
			text:'取消',
			handler:function(){
				$('#dic_detail_dialog2').dialog('close');
			}
		}]
	});
	//
	$('#dic_detail_dialog3').dialog({
		buttons:[{
			text:'关闭',
			handler:function(){
				$('#dic_detail_dialog3').dialog('close');
			}
		}]
	});
});

/**
 * datagrid load
 * @param param
 */
function dataGridload(param){
	$('#dicDefine_table').datagrid('load',param);
}

function dialogClose(){
	$('#dic_detail_dialog').dialog('close');
}

function dialogOpen(){
	$('#dic_detail_dialog').dialog('open');
}
function dialogOpen1(){
	$('#dic_detail_dialog2').dialog('open');
}

/**
 * edit sys auth
 * @param authId
 */
function authEdit(id){
	$('#dicDefine_table').datagrid('selectRecord',id);
	var rowInfo =  $('#dicDefine_table').datagrid('getSelected');
		$('#dicType').val(rowInfo.dicType);
		$('#sysFlag').val(rowInfo.sysFlag);
		$('#dicName').val('');
		$('#dicValue').val('');
		dialogOpen();
}
function authEdit2(id){
	$('#dicDefine_table').datagrid('selectRecord',id);
	var rowInfo =  $('#dicDefine_table').datagrid('getSelected');
		$('#id2').val(rowInfo.id);
		$('#dicType2').val(rowInfo.dicType);
		$('#sysFlag').val(rowInfo.sysFlag);
		$('#dicName2').val(rowInfo.dicTypeName);
		$('#dicRemark').val(rowInfo.dicRemark);
		dialogOpen1();
}

function authEdit1(id){
	$('#dd').dialog({    
	    title: '字典属性表',    
	    width: 600,    
	    height: 300,    
	    closed: false,    
	    cache: false,    
	    href: 'dicDefine/dicList.html?id='+id,    
	    modal: true   
	}); 
}

/**
 * init table
 */
function initDataGrid(){
	$('#dicDefine_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'dicDefine/getDicDefineList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
			{field:'dicType',title:'字典定义码 ',width:70},
			{field:'dicTypeName',title:'字典定义值 ',width:70},
			{field:'dicRemark',title:'字典定义描述 ',width:70},
			{field:'dateTime',title:'创建时间 ',hidden:true,width:70},
			{field:'sysFlag',title:'系统属性标识 ',width:70,
				formatter:function(value){
					if(1==value){
						return '系统属性';
					}else{
						return '用户属性';
					}
				}
			},
			{field:'id',title:'操作',width:70,
				formatter:function(value){
					return '<a href="javascript:authEdit('+value+')">添加属性</a>&nbsp;<a href="javascript:authEdit1('+value+')">查看属性</a>&nbsp;<a href="javascript:authEdit2('+value+')">修改定义</a>&nbsp;<a   onclick="delDicDefine('+value+')" ><font color="red">删除</font></a>';
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
    $.messager.confirm('确认','确认删除?',function(row){  
        if(row){  
            $.ajax({  
                url:'dicDefine/delDic.html?id='+id,    
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
                	$.messager.alert(1);
                }
            });  
        }  
    });
  }  
function delDicDefine(id){  //删除操作  
    $.messager.confirm('确认','确认删除?',function(row){  
        if(row){  
            $.ajax({  
                url:'dicDefine/delDicDefine.html?id='+id,    
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
                	$.messager.alert(1);
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
	if($("#dicName").val()==null||$("#dicName").val()==""){
		$.messager.alert(titleInfo,'请输入字典属性码 !');
		return;
	}
	if($("#dicValue").val()==null||$("#dicValue").val()==""){
		$.messager.alert(titleInfo,'请输入字典属性值 !');
		return;
	}
	var arr_add = {
			"dicType":$("#dicType").val(),
			"sysFlag":$("#sysFlag").val(),
			"dicName":$("#dicName").val(),
			"dicValue":$("#dicValue").val(),
			"belongName":$("#belongName").val(),
			"dicRemark":$("#dicRemark10").val(),
			"dicRemark1":$("#dicRemark11").val()
	};
		$.post("dic/addDic.json",arr_add,function(data){
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

function submit_model_window2(){
	if($("#dicName2").val()==null||$("#dicName2").val()==""){
		$.messager.alert(titleInfo,'请输入字典定义值 	!');
		return;
	}
	if($("#dicType2").val()==null||$("#dicType2").val()==""){
		$.messager.alert(titleInfo,'请输入字典定义码 	!');
		return;
	}
	var id2 = $("#id2").val();
	
	var arr_add = {
			"dicType":$("#dicType2").val(),
			"sysFlag":$("#sysFlag2").val(),
			"dicTypeName":$("#dicName2").val(),
			"dicRemark":$("#dicRemark").val()
	};
	
		if(id2!=null&&id2!=""){
			arr_add['id']=id2;
			$.post("dicDefine/updateDicDefine.json",arr_add,function(data){
				
				if(data=="1"){
					$('#dic_detail_dialog2').dialog('close');
					$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
					dataGridload(parameter);
				}else{
					$.messager.alert(titleInfo,'修改失败!!!');
				}
				closeModelDiv();
			},"json");
		}else{
			$.post("dicDefine/addDicDefine.json",arr_add,function(data){
				if(data.code==1){
					$('#dic_detail_dialog2').dialog('close');
					$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
					dataGridload(parameter);
				}else{
					$.messager.alert(titleInfo,'添加失败!');
				}
				closeModelDiv();
			},"json");
		}
}
function submit_model_window3(){
		$.post("dicDefine/showAllDic.json",{"id":id},function(data){
			if(data.code=="success"){
				$('#dic_detail_dialog3').dialog('close');
				$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,'添加失败!');
			}
			closeModelDiv();
		},"json");
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
function deleteOperate(id){
	var dialog = new DialogDiv({"content":"您确定删除这个权限吗？","isHavaCancel":true});
	dialog.showDialog();
	d_dataId = id;
	if(isCancel){
		_deleteOperate(d_dataId);
	}
}

function _deleteOperate(id){
	$.post("dicDefine/delDicDefine.do",{"id":id},function(data){
		if(data.msg=="success"){
			getList(parameter);
		}else{
			$.messager.alert(titleInfo,"add failure!!!");
		}
	},"json");
}