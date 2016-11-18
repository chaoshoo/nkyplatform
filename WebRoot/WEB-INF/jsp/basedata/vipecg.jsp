<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
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
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/jquery/tree/zTreeStyle.css" />
<link rel="stylesheet" href="<%=basePath%>css/all.css" />
<link rel="stylesheet" href="<%=basePath%>css/jquery/easyui.css" />
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/jquery/datagrid-detailview.js"></script>
 </head>
 <body>
 <c:choose>
 	<c:when test="${not empty d and d.code == 1 and not empty d.categories}">
 	姓名：${real_name} &nbsp;&nbsp;&nbsp;&nbsp;  卡号：${card_code} &nbsp;&nbsp;&nbsp;&nbsp;  电话：${mobile} &nbsp;&nbsp;&nbsp;&nbsp; 检测时间：${inspect_time }<br/><br/>
 	检查结果:${analyzeResultStr }<br/><br/>
 		<c:forEach var="item" items="${d.categories}">
 			<img alt="" src="<%=basePath%>${item }"></br>
 		 </c:forEach>
 	</c:when>
 	<c:otherwise>
 		  数据不全，或生成心电图数据出错!
 	</c:otherwise>
 </c:choose>						 
</body>
</html>