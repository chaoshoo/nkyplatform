<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
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
<link rel="stylesheet" type="text/css"
	href="css/jquery/tree/zTreeStyle.css" />
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<link rel="stylesheet" href="css/main1.css" />
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.ztree.excheck-3.5.min.js"></script>
<script type="text/javascript" src="js/sys/role_list.js"></script>
</head>
<body class="easyui-layout">
	<div data-options="region:'center',title:'Role management'" class="regionCenter">
		<div id="common_search" class="common_search">
			<button ype="button" id="role_add" class="btn btn-success btn-nomargin"><i class=" icon-plus"></i>&nbsp;Add role</button>
		</div>
		<table id="role_table"></table>
		<div id="role_detail_dialog"
			data-options="closed:true,modal:true,title:'Role information',iconCls:'icon-save'"
			style="padding:5px;width:500px;height:500px;">
			<form action="" id="role_detail_form">
				<input type="hidden" id="roleId">
				<table>
					<tr>
						<td>Role name</td>
						<td><input type="text" id="roleName"></td>
					</tr>
					<tr>
						<td>Whether release</td>
						<td><select id="isEffective">
								<m:getItems name="isEffective" />
						</select></td>
					</tr>
					<tr>
						<td>Permission assignment</td>
						<td>
							<div id="auth_tree">
								<ul id="treeDemo" class="ztree"></ul>
							</div>
						</td>
					</tr>
				</table>
				<!-- test start -->
				<div class="right" style="display:none;">
					<ul class="list">
						<li class="highlight_red"></li>
						<li><p>
								<br /> <input type="checkbox" id="py" class="checkbox first"
									checked /> <input type="checkbox" id="sy"
									class="checkbox first" checked /><input type="checkbox"
									id="pn" class="checkbox first" checked /><span>Associated parent</span> <input
									type="checkbox" id="sn" class="checkbox first" checked />
							</p>
						</li>
					</ul>

				</div>
				<!-- end -->
			</form>
		</div>
	</div>
</body>
</html>