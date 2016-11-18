<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<%@ include file="/WEB-INF/taglib.jsp"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<header>
	<base href="<%=basePath%>"> 
    <meta charset="utf-8"> 
	<script type="text/javascript" src="http://cdn.hcharts.cn/jquery/jquery-1.8.3.min.js"></script>
	<script type="text/javascript">
	$(document).ready(function(){
		$(window).resize(function(){
			var width = $(window).width();
			if(width > 550){
				$('.container').css({
					position:'absolute',
					left: ($(window).width() - 550)/2,
					top: ($(window).height() - 300)/2 
				});
			}else{
				$('.container').css({
					position:'absolute',
					left: 0,
					top: 10,
					width: "100%",
					height:"100%"
				});
			}
		});
		// 最初运行函数
		$(window).resize();
	});
	</script>
	<style>
		.container{
			text-align: center;
			color:red;
			font-size: 36px;
			width: 550px;
			height:300px;
			position: absolute;
		}
	</style>
</header>
<body  style="background-image:url(<%=basePath%>/img/chart/chartbg.png)">
<div class="container">
	出错了。${message }
</div>
</body>
</html>