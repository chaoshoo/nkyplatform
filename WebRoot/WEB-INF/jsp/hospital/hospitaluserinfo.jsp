
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>GD Administration</title>
<link rel="stylesheet" type="text/css" href="css/common.css">
<link rel="stylesheet" type="text/css" href="css/main.css">
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
</head>
<body>
	<div class="mbx">
		<div class="inn">
			<span class="fcB">Personal information</span>
		</div>
	</div>
	<div class="nrP">
		<div class="xgP" id="content">
			<ul class="xgC">
				<li><label class="label">Hospital code:</label>&nbsp; ${hospitaladmin.hospital_code}  </li>
				<li><label class="label">Hospital name:</label>&nbsp; ${hospital_name}</li>
				<li><label class="label">User phone number:</label>&nbsp; ${hospitaladmin.tel}</li>
				<li><label class="label">User name:</label>&nbsp; ${hospitaladmin.username} </li>
				<li><label class="label">Created time:</label>&nbsp; ${createtimestr}</li>
			</ul>
		</div>
	</div>
</body>
</html>