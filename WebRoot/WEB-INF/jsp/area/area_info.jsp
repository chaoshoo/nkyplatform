<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<%@ include file="/WEB-INF/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>宁康园管理平台</title>
<link rel="stylesheet" type="text/css" href="css/jquery/tree/zTreeStyle.css" />
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<link rel="stylesheet" href="css/jquery/easyui-icon/icon.css"/>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.ztree.excheck-3.5.min.js"></script>
<script type="text/javascript" src="js/area/area_info.js"></script>
</head>
<body class="easyui-layout">
<div data-options="region:'center',title:'区域管理'" class="regionCenter">
	<div id="common_search">
		&nbsp;&nbsp;
		<button id="add"  class="btn btn-success" data-options="iconCls:'icon-add'" style="border:1px ;" onclick="privilege('add')"><i class="icon-plus"></i>&nbsp;添加</button>
		<button id="update" class="btn btn-success" data-options="iconCls:'icon-add'"  style="border:1px ;" onclick="privilege('edit')"><i class="icon-edit"></i>&nbsp;修改</button>
		<button id="del" class="btn btn-success" data-options="iconCls:'icon-add'"  style="border:1px ;" onclick="privilege('del')"><i class="icon-remove"></i>&nbsp;删除</button>
	</div>
	<!-- 分类树结构 -->
	<table id="area_tree">
		<tr>
			<td colspan="2">
				<div id="auth_tree">
					<ul id="treeDemo" class="ztree"></ul>
				</div>
			</td>
		</tr>
	</table>
	
	<div id="saveUpdateArea_detail_dialog"
		data-options="closed:true,modal:true,title:'区域信息',iconCls:'icon-save'"
	style="padding:5px;width:500px;height:350px;">
		<form action="area/findAreaById.json" id="saveUpdateArea_detail_form">
			<input type="hidden" id="id">
			<table>
				<tr>
					<td>父级区域：</td>
					<td>
						<input type="hidden" id="pid">
						<input type="text" id="pname" readonly/>
					</td>
				</tr>
				<tr>
					<td>区域名称：</td>
					<td>
						<input type="text" id="name">
					</td>
				</tr>
			</table>
		</form>
	</div>
</div>
</body>
</html>