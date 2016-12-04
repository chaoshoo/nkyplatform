<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>GD Administration</title>
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/jquery/tree/zTreeStyle.css" />
<link rel="stylesheet" href="<%=basePath%>css/all.css" />
<link rel="stylesheet" href="<%=basePath%>css/jquery/easyui.css" />
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/common.js"></script>
<script type="text/javascript" src="<%=basePath%>js/form.js"></script>
<script type="text/javascript" src="<%=basePath%>js/openDialog.js"></script>
<script type="text/javascript">
var parameter = {};
var dataForm={};
var add = true; 

//修改
function openedit(id){
	$('#base_table').datagrid('selectRecord',id);
	var rowInfo =  $('#base_table').datagrid('getSelected');
	if(rowInfo){
		//设置弹出框信息 
		$('#form-id').val(rowInfo.ID);
		$('#form-title').val(rowInfo.TITLE);
		$('#form-content').val(rowInfo.CONTENT);
		$('#form-msg_type').val(rowInfo.MSG_TYPE); 
		$('#user_detail_dialog').dialog('open');
	}
}

/**
 * Data table refresh
 * @param param
 */
function dataGridload(param){
	$('#base_table').datagrid('reload');
}

function del(id){  //Delete operation  
	$('#base_table').datagrid('selectRecord',id);
	var rowInfo =  $('#base_table').datagrid('getSelected');
	if(rowInfo){
		//设置弹出框信息 
	    $.messager.confirm('confirm','confirm deletion?',function(row){  
	        if(row){  
	        	$.post('messagetemplate/del.json?id='+rowInfo.ID,function(data){
	    			if(data.code==1){
	    				$.messager.show({title:titleInfo,msg:'Deleted！',timeout:timeoutValue,showType:'slide'});
	    			}else{
	            		//alert("删除失败");
	    				$.messager.alert(titleInfo,data.msg);
	    			}
					dataGridload(parameter);
	            	//window.location.href=window.location.href;
	    		},"json"); 
	        }  
	    });
	
	}
  }  

/**
 * Submit data tojson
 */
function submit_model_window(){
	if($("#form-title").val()==null || $("#form-title").val()==""){
		$.messager.alert(titleInfo,'Please enter a message header!');
		return;
	} 
	if($("#form-content").val()==null || $("#form-content").val()==""){
		$.messager.alert(titleInfo,'Please enter the message content!');
		return;
	} 
	var formdata = $.serializeObject($("#user_detail_form"));
	
	var ksid = $('#form-id').val();
	if(ksid != null && ksid != ""){
		$.post("messagetemplate/update.json",formdata,function(data){
			if(data.code==1){
				$('#detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'Updated！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,data.msg);
			}
			$('#user_detail_dialog').dialog('close')
		},"json");
	}else{
		$.post("messagetemplate/save.json",formdata,function(data){
			if(data.code==1){
				$('#detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'Added！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,data.msg);
			}
			$('#user_detail_dialog').dialog('close')
		},"json");
	}
}  

$(function() {
	//条件查询
	$("#auth_search").click(function(){
		parameter = $.serializeObject($("#query_form"));
		initDataGrid();
		parameter = {};
		
	});
	$("#auth_reset").click(function(){
		$("#FIT-LIKE-title").val("");
	});
	
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
	$('#data_add').click(function(){
		$('#user_detail_form')[0].reset();
		$('#id').val('');
		$('#form-id').val('');
		$('#user_detail_dialog').dialog('open');
	});
	
});

/** Initialize data form */
function initDataGrid(){
	$('#base_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'messagetemplate/list.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'ID',
		columns:[[
		    {field:'TITLE',title:'Template Name',width:100},
		    {field:'CONTENT',title:'Template Content',width:100},
			{field : 'MSG_TYPE',title : 'Template Type',width : 100,
				formatter : function(value) {
					if(value != null && value != ""){
						if(value == 1){
							return "text";
						}else if(value == 2){
							return "link";
						} 
					}
					return "";
				}
			}, {field : 'CREATE_TIME',title : 'Created time',width : 100,
				formatter : function(value) {
					var date = new Date(value);
					return formatterDateTime(date);
				}
			},
			{field:'ID',title:'Operation',width:120,
				formatter:function(value,row){ 
					return  '<a href="javascript:openedit('+value+')">modify</a> &nbsp;<a onclick="javascript:del(\''+row.value+'\')" ><font color="red">delete</font></a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	}); 
}
</script>
</head>
<body class="easyui-layout">
	<div data-options="region:'center',title:'Message template query'" class="regionCenter">
		<div id="common_search" class="common_search common_search_nopadding">	
		 <form action="#" id="query_form">		
			&nbsp;&nbsp;&nbsp;&nbsp; Template Name&nbsp;&nbsp;<input type="text" id="FIT-LIKE-title" name="FIT-LIKE-title"/>
			Message type:<select id="FIT-EQ-msg_type" name="FIT-EQ-msg_type">
			      	 <option value="">-Please select-</option> 
			     	 <option value="1">text</option>
			     	 <option value="2">link</option>
				</select> 
				
        <button type="button" id="auth_search" 
				class="btn btn-success"><i class="icon-search"></i>&nbsp;search</button>
		<!-- <button type="button"
				id="auth_reset" class="btn btn-success"><i class="icon-refresh"></i>&nbsp;Reset</button> -->
		<button type="button" id="data_add" class="btn btn-success"><i class="icon-plus"></i>&nbsp;Add</button>
		 </form>
		</div>
		<table id="base_table"></table>
        <div id="editfrom_dialog"></div>
 
 	<div id="user_detail_dialog" data-options="closed:true,modal:true,title:'Message template information',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 400px;">
      <form action="messagetemplate/list.json" id="user_detail_form">
        <input type="hidden" id="form-id" name="id" />
        <table style="margin-left: 10px"> 
			<tr id="code_tr" >
				<td>Message type</td>
				<td>
				<select id="form-msg_type" name="msg_type">
			     	 <option value="1">text</option>
			     	 <option value="2">link</option>
				</select> 
				</td>
			</tr>
			<tr>
				<td>Message title</td>
				<td>
				<input style="width: 200px;" type="text" id="form-title" name="title"  maxlength="50"/>
				</td>
			</tr>
			<tr>
				<td style="width: 70px;">Message content</td>
				<td>
				<textarea style="width: 200px;" rows="3" cols="20" id="form-content" name="content"></textarea>
				</td>
			</tr> 
		</table>
      </form>
    </div>
	</div>
	
</body>
</html>