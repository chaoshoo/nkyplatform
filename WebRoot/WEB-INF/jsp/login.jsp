<%@page import="org.springframework.context.ApplicationContext"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>GD Administration</title>
<link rel="stylesheet" href="css/weui1.css">
<link rel="stylesheet" href="css/common1.css" />
<link rel="stylesheet" href="css/login1.css" />
<script type="text/javascript" src="js/zepto.min.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/prng4.js"></script>
<script type="text/javascript" src="js/jsbn.js"></script>
<script type="text/javascript" src="js/rsa.js"></script>
<script type="text/javascript" src="js/base64.js"></script>
<script type="text/javascript" src="js/user_login.js?v=<%=Math.random() %>"></script>

</head>
<body>
		<div class="logo">
		<c:if test="${type eq 'sys'}">
        		<!-- 
			<img src="img/logo1.png" alt="" title="" />  
			 -->
        </c:if>		
		</div>
		<div class="logo-bottom">
			<c:if test="${type eq 'sys'}">
	        		 <!-- 
			  <img src="img/logo-bottom1.png" alt="" title="" />	
			   -->	
	        </c:if>		 
		</div>
	<form id="loginForm" method="post" class="loginForm" action="login.html">
		<input type="hidden" id="exponent" value="${exponent}"/>
		<input type="hidden" id="modulus" value="${modulus}"/>
		<input type="hidden" name="type" value="${type}"/>
		<div class="content">
			<div class="title">
				<span class="login-title cur">Sign in</span>
			</div>
			<div class="item">
			<p class="l_ts">${logfail}</p>
			<div class="info">
				<input class="login-input username" id="userMail" name="username" placeholder="Please enter user name"  />
				<input class="login-input password" type="password" id="userPwd" name="password" placeholder="Please input a password"  />
			</div>
				<div class=" weui_cells_checkbox">
		            <label class="weui_cell weui_check_label" for="s11">
		            </label>           
		        </div>
        		<button class="submit-btn" id="submit_login">Sign in</button>
        		<c:if test="${type eq 'doctor'}">
	        		 <button class="submit-btn" id="submit_region" onclick="region('3')">register</button>
	            </c:if>	
       	 </div>
		</div>
	</form>


</body>
</html>

<script type="text/javascript">
function region(type){
	if(type == '3'){
		window.open('doctor/add.html?region=true','','');
	}
}
</script>