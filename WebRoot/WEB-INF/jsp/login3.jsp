<%@page import="org.springframework.context.ApplicationContext"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!doctype html>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>GD Administration</title>
<link type="text/css" rel="stylesheet" href="assets/login/css/bottstrap.css" />
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/prng4.js"></script>
<script type="text/javascript" src="js/jsbn.js"></script>
<script type="text/javascript" src="js/rsa.js"></script>
<script type="text/javascript" src="js/base64.js"></script>
<script type="text/javascript" src="js/user_login.js?v=<%=Math.random() %>"></script>
<style>
.enter-con{ text-align:right;width:1200px; margin:0 auto; font-size:14px; padding-top:20px}
.enter-con a{ color:#fff; display:inline-block;margin-left:20px; background: #41cac0; border:none; border-radius:3px; padding:3px 10px;}
</style>
<body class="login-body">
<div class="enter-con">
<a href="d/login.html" >Doctor entrance</a>
<a href="h/login.html" >Hospital entrance</a>
<a href="login.html" >Administrator access</a>
</div>
<div>
	<div class="container" id="loginWindow">
      <form class="form-signin" action="login.html" method="post">
        <h2 class="form-signin-heading">
        	GD<span style="color:red"><c:choose><c:when test="${type eq 'doctor'}">Doctor</c:when><c:when test="${type eq 'hospital'}">Hospital</c:when><c:when test="${type eq 'sys'}">Admin</c:when></c:choose></span>System
        </h2>
        <div class="login-wrap">
			<%-- <p class="l_ts">${logfail}</p>
			<div class="info">
				<input class="login-input username" id="userMail" name="username" placeholder="Please enter user name"  />
				<input class="login-input password" type="password" id="userPwd" name="password" placeholder="Please input a password"  />
			</div> --%>
			<input type="hidden" id="exponent" value="${exponent}"/>
			<input type="hidden" id="modulus" value="${modulus}"/>
			<input type="hidden" name="type" value="${type}"/>
			<p class="l_ts" style="color: red">${logfail}</p>
            <input type="text" class="form-control" id="userMail" name="username" 	required="true" 	onvalidation="onUserNameValidation" placeholder="Please enter user name" autofocus>
            <input type="password" class="form-control" id="userPwd" name="password" 
							onvalidation="onPwdValidation" 	requiredErrorText="" required="true"  placeholder="Please input a password">
          <!--  <label class="checkbox">
                <input type="checkbox" value="remember-me">Remember password
                <span class="pull-right"> <a href="#"> Forget password?</a></span>
            </label> -->
            <button class="btn btn-lg btn-login btn-block" id="submit_login" type="submit" >Sign in</button>
       		<c:if test="${type eq 'doctor'}">
        		 <button class="btn btn-lg btn-login btn-block" id="submit_region" onclick="region('3')">register</button>
            </c:if>	
        </div>
      </form>
    </div>
    
<script type="text/javascript">
function region(type){
	if(type == '3'){
		window.open('doctor/add.html?region=true','','');
	}
}
</script>
</body>
</html>