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
<title>GD Administration</title>
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
 	Name：${real_name} &nbsp;&nbsp;&nbsp;&nbsp;  Credit Card Number：${card_code} &nbsp;&nbsp;&nbsp;&nbsp;  Telephone：${mobile} &nbsp;&nbsp;&nbsp;&nbsp; Detection time：${inspect_time }<br/><br/>
 	Inspection result:${analyzeResultStr }<br/><br/>
 		<c:forEach var="item" items="${d.categories}">
 			<img alt="" src="<%=basePath%>${item }"></br>
 		 </c:forEach>
 	</c:when>
 	<c:otherwise>
 		  Incomplete data，Or generating ECG data error!
 	</c:otherwise>
 </c:choose>						 
</body>
</html>