
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
				<li><label class="label">userID:</label>&nbsp; ${user.userId}  </li>
				<li><label class="label">Login account:</label>&nbsp; ${user.userMail}</li>
				<li><label class="label">User name:</label>&nbsp; ${user.userName}</li>
				<li><label class="label">Department general information:</label>&nbsp; ${user.group_name} </li>
				<li><label class="label">Created time:</label>&nbsp; ${createtimestr}</li>
				<li><label class="label">Remark information:</label>&nbsp; ${user.remark}</li>
			</ul>
		</div>
	</div>
</body>
</html>