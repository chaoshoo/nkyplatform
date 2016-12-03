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
<title>宁康园管理平台</title>
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/jquery/tree/zTreeStyle.css" />
<link rel="stylesheet" href="<%=basePath%>css/all.css" />
<link rel="stylesheet" href="<%=basePath%>css/jquery/easyui.css" />
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/common.js"></script>
<script type="text/javascript" src="<%=basePath%>js/form.js"></script>
<script type="text/javascript" src="<%=basePath%>js/openDialog.js"></script>
<script type="text/javascript" src="<%=basePath%>js/doctor/doctor.js?v=20161128"></script>
<script type="text/javascript" src="<%=basePath%>js/area/jquery.lSelect.js"></script>
<script type="text/javascript" src="<%=basePath%>js/area/area.js"></script>
<script type="text/javascript" src="<%=basePath%>js/resizeimg/lrz.pc.min.js?v=20150714"></script>
<script type="text/javascript" src="<%=basePath%>js/resizeimg/localResizeIMG.js?v=20160714"></script>

</head>
<body class="easyui-layout">
	<div data-options="region:'center',title:'医生查询'" class="regionCenter">
	  
		<div id="common_search" class="common_search common_search_nopadding">	
		 <form action="goods/tail/detail.json" id="query_form" name="query_form">		
		  <c:if test="${role != '2'}">
			&nbsp;&nbsp;&nbsp;&nbsp; 医院名称&nbsp;&nbsp;<input type="text" id="FIT-LIKE-name" name="FIT-LIKE-h.name"/>
			</c:if>
			&nbsp;&nbsp;&nbsp;&nbsp; 医生名称&nbsp;&nbsp;<input
				type="text" id="FIT-LIKE-dname" name="FIT-LIKE-d.name"/> &nbsp;&nbsp;&nbsp;&nbsp;
				医生账号状态&nbsp;&nbsp;
				<select id="FIT-d.isvalid" name="FIT-d.isvalid">
			      <option value="">-请选择-</option>
				  <m:getItems name="doctor_status"></m:getItems>
				</select>
        <button type="button" id="auth_search" 
				class="btn btn-success"><i class="icon-search"></i>&nbsp;查询</button>
		<!-- <button type="button"
				id="auth_reset" class="btn btn-success"><i class="icon-refresh"></i>&nbsp;重置</button> -->
		<button type="button" id="data_add" class="btn btn-success"><i class="icon-plus"></i>&nbsp;添加</button>
		 </form>
		</div>
		<table id="base_table"></table>
        <div id="editfrom_dialog"></div>
	</div>
	
</body>
<script type="text/javascript">
$(function() {
	//初始化表格
	initDataGrid();
});
/**
 * 初始化数据表格
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
		url:'doctor/list.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'ID',
		columns:[[
		    {field:'CODE',title:'医生编码',width:100},
		    {field:'NAME',title:'医生名字',width:100},
		    {field:'SEXSTR',title:'性别',width:100},
		    {field:'OFFICENAME',title:'科室',width:100},
		    {field:'TITLESTR',title:'职称',width:100},
			{field:'HOSPITALNAME',title:'所属医院',width:150},
			{field:'ISVALIDSTR',title:'账号状态',width:100},
			{field:'ID',title:'操作',width:120,
				formatter:function(value,row){
					var str = '<a href="javascript:openedit(\'true\',\''+value+'\')">审核</a> &nbsp;'
					+'<a href="javascript:openedit(\'false\','+value+')">修改</a> &nbsp;';
					if(row.ISVALID == '-1'){
						str +='<a   onclick="opertor('+value+',1)" >启用</a>';
					}else{
						str +='<a   onclick="opertor('+value+',-1)" ><font color="red">禁用</font></a>';
					}
					return str;

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