<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>GD Administration</title>
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<link rel="stylesheet" href="css/jquery/easyui-icon/icon.css"/>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/url/url_pic.js"></script>

<style type="text/css">

	#urlPic_name,#urlPic_linkman,#urlPic_linkphone {
		width: 350px;
	}
	
	textarea {
		resize: none;
		width: 350px;
	}
</style>

</head>
<body class="easyui-layout">
       <div id="common_search" class="common_search common_search_nopadding">
			&nbsp;&nbsp;&nbsp;&nbsp;Title：<input type="text"
				id="title1" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<button type="button" id="urlPic_add" class="btn btn-success"
         style="margin-left:20px;"><i class="icon-plus"></i>&nbsp;Add</button> 
        <button type="button" id="urlPic_search" class="btn btn-success" ><i class="icon-search"></i>&nbsp;query</button>
        <button type="button" id="urlPic_reset"
				class="btn btn-success"><i class="icon-refresh"></i>&nbsp;Reset</button>
		</div>
		<table id="urlPic_table"></table>
		
		<div id="urlPic_add_dialog">
			<form action="" id="urlPic_form">
				<input type="hidden" id="id">
				<table style="border-collapse: separate;border-spacing: 10px;">
					<tr>
						<td>Title：</td>
						<td><input type="text" id="title">
						</td>
					</tr>
					<tr>
						<td>type：</td>
						<td><input class="easyui-combobox" style="width:205px" id="url_pic_type">
						</td>
					</tr>
					<tr>
						<td>Image path：</td>
						<td><input type="text" id="url">
						</td>
					</tr>
					<tr>
						<td>Project path：</td>
						<td><input type="text" id="url_link">
						</td>
					</tr>
					<tr>
						<td>sort：</td>
						<td><input type="text" id="sort">
						</td>
					</tr>
				</table>
			</form>
		</div>
</body>
</html>