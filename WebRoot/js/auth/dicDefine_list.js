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
	
	$('#dic_detail_dialog2').dialog({
		buttons:[{
			text:'Indeed set',
			handler:function(){
				submit_model_window2();
			}
		},{
			text:'cancel',
			handler:function(){
				$('#dic_detail_dialog2').dialog('close');
			}
		}]
	});
	//
	$('#dic_detail_dialog3').dialog({
		buttons:[{
			text:'Close',
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
	    title: 'Dictionary attribute table',    
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
			{field:'dicType',title:'Dictionary definition code ',width:70},
			{field:'dicTypeName',title:'Dictionary definition ',width:70},
			{field:'dicRemark',title:'Dictionary definition description ',width:70},
			{field:'dateTime',title:'Created time ',hidden:true,width:70},
			{field:'sysFlag',title:'System attribute identification ',width:70,
				formatter:function(value){
					if(1==value){
						return 'System properties';
					}else{
						return 'user attribute';
					}
				}
			},
			{field:'id',title:'Operation',width:70,
				formatter:function(value){
					return '<a href="javascript:authEdit('+value+')">Add attribute</a>&nbsp;<a href="javascript:authEdit1('+value+')">View properties</a>&nbsp;<a href="javascript:authEdit2('+value+')">Change definition</a>&nbsp;<a   onclick="delDicDefine('+value+')" ><font color="red">delete</font></a>';
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
            $.ajax({  
                url:'dicDefine/delDic.html?id='+id,    
                success:function(msg){
                	if(msg=='success') 
//                		alert("删除成功");
                		$.messager.alert(titleInfo,'Deleted!');
                	else 
//                		alert("删除失败");
                		$.messager.alert(titleInfo,'Delete failed!');
                	window.location.href=window.location.href;
                } ,
                fail:function(){
                	$.messager.alert(1);
                }
            });  
        }  
    });
  }  
function delDicDefine(id){  //Delete operation  
    $.messager.confirm('confirm','confirm deletion?',function(row){  
        if(row){  
            $.ajax({  
                url:'dicDefine/delDicDefine.html?id='+id,    
                success:function(msg){
                	if(msg=='success') 
//                		alert("删除成功");
                		$.messager.alert(titleInfo,'Deleted!');
                	else 
//                		alert("删除失败");
                		$.messager.alert(titleInfo,'Delete failed!');
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
	if($("#dicName").val()==null||$("#dicName").val()==""){
		$.messager.alert(titleInfo,'Please enter a dictionary property code !');
		return;
	}
	if($("#dicValue").val()==null||$("#dicValue").val()==""){
		$.messager.alert(titleInfo,'Please enter a dictionary attribute value !');
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
				$.messager.show({title:titleInfo,msg:'Added！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,'Add failed!');
			}
			closeModelDiv();
		},"json");
}

function submit_model_window2(){
	if($("#dicName2").val()==null||$("#dicName2").val()==""){
		$.messager.alert(titleInfo,'Enter a dictionary definition 	!');
		return;
	}
	if($("#dicType2").val()==null||$("#dicType2").val()==""){
		$.messager.alert(titleInfo,'Please enter a dictionary definition code 	!');
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
					$.messager.show({title:titleInfo,msg:'Changed！',timeout:timeoutValue,showType:'slide'});
					dataGridload(parameter);
				}else{
					$.messager.alert(titleInfo,'Change failed!!!');
				}
				closeModelDiv();
			},"json");
		}else{
			$.post("dicDefine/addDicDefine.json",arr_add,function(data){
				if(data.code==1){
					$('#dic_detail_dialog2').dialog('close');
					$.messager.show({title:titleInfo,msg:'Added！',timeout:timeoutValue,showType:'slide'});
					dataGridload(parameter);
				}else{
					$.messager.alert(titleInfo,'Add failed!');
				}
				closeModelDiv();
			},"json");
		}
}
function submit_model_window3(){
		$.post("dicDefine/showAllDic.json",{"id":id},function(data){
			if(data.code=="success"){
				$('#dic_detail_dialog3').dialog('close');
				$.messager.show({title:titleInfo,msg:'Added！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,'Add failed!');
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
function deleteOperate(id){
	var dialog = new DialogDiv({"content":"Are you sure you want to delete this permission？","isHavaCancel":true});
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