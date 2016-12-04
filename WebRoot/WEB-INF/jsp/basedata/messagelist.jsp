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
/**
 * Data table refresh
 * @param param
 */
function dataGridload(param){
	$('#base_table').datagrid('reload');
}

function del(code){  //Delete operation  
    $.messager.confirm('confirm','confirm deletion?',function(row){  
        if(row){  
        	$.post('message/del.json?code='+code,function(data){
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
	$("#auth_reset").click(function(){
		$("#FIT-LIKE-content").val("");
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
		url:'message/list.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'ID',
		columns:[[
		    {field:'MSG_TYPE',title:'type',width:100,
				formatter : function(value) {
					if(value == 1 ){
						return "1";
					}else if(value == 2){
						return "2";
					}else{
						return "Other";
					}
				}
			},
		    {field:'TITLE',title:'Title',width:100},
		    {field:'CONTENT',title:'content',width:100}, 
		    {field:'ISVALID',title:'Whether effective',width:100,
				formatter : function(value) {
					if(value == 1 ){
						return "effective";
					}else if(value == 0){
						return "invalid";
					}else{
						return "Unknown state";
					}
				}
			},
			{field : 'CREATE_TIME',title : 'Created time',width : 100,
				formatter : function(value) {
					var date = new Date(value);
					return formatterDateTime(date);
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
	<div data-options="region:'center',title:'Message management'" class="regionCenter">
	  
		<div id="common_search" class="common_search common_search_nopadding">	
		 <form action="" id="query_form">		
			&nbsp;&nbsp;&nbsp;&nbsp; Title&nbsp;&nbsp;<input type="text" id="FIT-LIKE-title" name="FIT-LIKE-title"/>
			 &nbsp;&nbsp;content&nbsp;&nbsp;<input type="text" id="FIT-LIKE-content" name="FIT-LIKE-content"/>
        <button type="button" id="auth_search" 
				class="btn btn-success"><i class="icon-search"></i>&nbsp;search</button>
		<!-- <button type="button"
				id="auth_reset" class="btn btn-success"><i class="icon-refresh"></i>&nbsp;Reset</button> -->
		<!-- <button type="button" id="data_add" class="btn btn-success"><i class="icon-plus"></i>&nbsp;Add</button> -->
		 </form>
		</div>
		<table id="base_table"></table>
        <div id="editfrom_dialog"></div>
	</div>
</body>
</html>