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
<script type="text/javascript" src="js/sys/auth_list.js"></script>
</head>
<body class="easyui-layout">
	<div data-options="region:'center',title:'Authority management'" class="regionCenter">
		<div id="common_search" class="common_search">
			<button type="button" id="auth_add" class="btn btn-success btn-nomargin"><i class="icon-plus"></i>&nbsp;add permission</button>
		</div>
		<table id="auth_table"></table>
		<div id="auth_detail_dialog"
			data-options="closed:true,modal:true,title:'Permission settings',iconCls:'icon-save'"
			style="padding:5px;width:500px;height:360px;">
			<form action="" id="auth_detail_form">
				<input type="hidden" id="authId">
				<table>
					<tr>
						<td>Permission name</td>
						<td><input type="text" id="authName">
						</td>
					</tr>
					<tr>
						<td>Parent number</td>
						<td><select id="pid"></select>
						</td>
					</tr>
					<tr>
						<td>Display order</td>
						<td><input type="text" value="1" id="authSeq">
						</td>
					</tr>
					<tr>
						<td>Permission type</td>
						<td><select id="authType">
								<m:getItems name="authType" />
						</select>
						</td>
					</tr>
					<tr>
						<td>Authority code</td>
						<td><input type="text" id="authority">
						</td>
					</tr>
					<tr>
						<td>Connection path</td>
						<td><input type="text" id="authAction">
						</td>
					</tr>
					<tr>
						<td>Whether release</td>
						<td><select id="isEffective">
								<m:getItems name="isEffective" />
						</select>
						</td>
					</tr>
					<tr>
						<td>
							<div id="auth_tree">
								<ul id="treeDemo" class="ztree"></ul>
							</div></td>
					</tr>
				</table>
			</form>
		</div>
	</div>
</body>
</html>