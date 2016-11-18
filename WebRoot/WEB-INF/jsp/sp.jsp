<%@page import="org.springframework.context.ApplicationContext"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title></title>
		<style>
			a {
				display: block;
				line-height: 80px;
				width: 100%;
				height: 80px;
				margin-bottom: 15px;
				-webkit-user-select: text;
				border: 1px solid rgba(0, 0, 0, .2);
				border-radius: 3px;
				outline: 0;
				-webkit-appearance: none;
				padding: 0 !important;
				color: #fff;
				border: 0px !important;
				background-color: #38f !important;
				border-radius: 25px !important;
				text-align: center;
				text-decoration: none;
			}
		</style>
	</head>

	<body>
		<form id="login-form">
			<div class="mui-content-padded">
				<a id="account" class="mui-login-input" href="zhibo.html"    target="_blank">PC WEB 视频</a>
				<a id="password" class="mui-login-input" href="http://pullhls7a2ea1d5.live.126.net/live/a2ba8d0eb3374e7e90b4843d3f5f8616/playlist.m3u8"  target="_blank">手机 APP 视频</a>
			</div>
		</form>
	</body>

</html>