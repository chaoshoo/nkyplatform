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
<title>宁康园管理平台</title>
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
<a href="d/login.html" >医生入口</a>
<a href="h/login.html" >医院入口</a>
<a href="login.html" >管理员入口</a>
</div>
<div>
	<div class="container" id="loginWindow">
      <form class="form-signin" action="login.html" method="post">
        <h2 class="form-signin-heading">
        	宁康园<span style="color:red"><c:choose><c:when test="${type eq 'doctor'}">医生</c:when><c:when test="${type eq 'hospital'}">医院</c:when><c:when test="${type eq 'sys'}">管理员</c:when></c:choose></span>后台登录系统
        </h2>
        <div class="login-wrap">
			<%-- <p class="l_ts">${logfail}</p>
			<div class="info">
				<input class="login-input username" id="userMail" name="username" placeholder="请输入用户名"  />
				<input class="login-input password" type="password" id="userPwd" name="password" placeholder="请输入密码"  />
			</div> --%>
			<input type="hidden" id="exponent" value="${exponent}"/>
			<input type="hidden" id="modulus" value="${modulus}"/>
			<input type="hidden" name="type" value="${type}"/>
			<p class="l_ts" style="color: red">${logfail}</p>
            <input type="text" class="form-control" id="userMail" name="username" 	required="true" 	onvalidation="onUserNameValidation" placeholder="请输入用户名" autofocus>
            <input type="password" class="form-control" id="userPwd" name="password" 
							onvalidation="onPwdValidation" 	requiredErrorText="" required="true"  placeholder="请输入密码">
          <!--  <label class="checkbox">
                <input type="checkbox" value="remember-me">记住密码
                <span class="pull-right"> <a href="#"> 忘记密码?</a></span>
            </label> -->
            <button class="btn btn-lg btn-login btn-block" id="submit_login" type="submit" >登录</button>
       		<c:if test="${type eq 'doctor'}">
        		 <button class="btn btn-lg btn-login btn-block" id="submit_region" onclick="region('3')">注册</button>
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