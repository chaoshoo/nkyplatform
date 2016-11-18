<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="Mosaddek">
<meta name="keyword" content="">
<title>欢迎页</title>


<style type="text/css">
html{
    width:100%;
	height:100%;
}
body {
	font-family: 'Open Sans', sans-serif;
	padding: 0px !important;
	margin: 0px !important;
	font-size: 13px;
	width:100%;
	height:100%;
	background: url("img/welcome.jpg") no-repeat;
	background-size: cover;
}
</style>
</head>

<body class="body-500">
</body>
</html>
