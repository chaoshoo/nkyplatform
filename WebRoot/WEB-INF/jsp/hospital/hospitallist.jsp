<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
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
<script type="text/javascript" src="<%=basePath%>js/hospital/hospital.js?v=20160824"></script>
<script type="text/javascript" src="<%=basePath%>js/area/jquery.lSelect.js"></script>
<script type="text/javascript" src="<%=basePath%>js/area/area.js"></script>
<script type="text/javascript" src="<%=basePath%>js/openDialog.js"></script>
<script type="text/javascript" src="<%=basePath%>js/resizeimg/lrz.pc.min.js?v=20150714"></script>
<script type="text/javascript" src="<%=basePath%>js/resizeimg/localResizeIMG.js?v=20160714"></script>


</head>
<body class="easyui-layout">
	<div data-options="region:'center',title:'Hospital inquiry'" class="regionCenter">
	  
		<div id="common_search" class="common_search common_search_nopadding">	
		 <form action="goods/tail/detail.json" id="query_form">		
			&nbsp;&nbsp;&nbsp;&nbsp; Hospital name&nbsp;&nbsp;<input type="text" id="FIT-LIKE-name" name="FIT-LIKE-h.name"/>
			&nbsp;&nbsp;&nbsp;&nbsp; Hospital code&nbsp;&nbsp;<input
				type="text" id="FIT-h-code" name="FIT-code"/> &nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" id="auth_search" 
				class="btn btn-success"><i class="icon-search"></i>&nbsp;query</button>
		<!-- <button type="button"
				id="auth_reset" class="btn btn-success"><i class="icon-refresh"></i>&nbsp;Reset</button> -->
		<button type="button" id="hospital_add" class="btn btn-success"><i class="icon-plus"></i>&nbsp;Add</button>
		 </form>
		</div>
		<table id="base_table"></table>
      <div id="editfrom_dialog"></div>
	</div>
	
</body>
<script type="text/javascript">
var levermap = JSON.parse('${lever}');
$(function() {
	//初始化表格
	initDataGrid();
});


/**
 * Initialize data form
 */
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
		url:'hospital/list.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'ID',
		columns:[[
		    {field:'CODE',title:'Hospital code',width:100},
		    {field:'NAME',title:'Hospital name',width:200},
		    {field:'LEVER',title:'Hospital level',width:100,
		    	formatter:function(value){
		    		var LEVER = value;
		    		return levermap[LEVER];
				}
		    },
			{field:'AREANAME',title:'Hospital address',width:200},
			{field:'ID',title:'Operation',width:120,
				formatter:function(value,row){
					return '<a href="javascript:adduser(\''+row.CODE+'\')">Admin</a> &nbsp;'
					+'<a href="javascript:openedit('+value+')">modify</a> &nbsp;'
					+'<a   onclick="del(\''+row.CODE+'\')" ><font color="red">delete</font></a>';
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
</html>