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
<title>宁康园管理平台</title>
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<link rel="stylesheet" href="css/jquery/easyui-icon/icon.css"/>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/question/question_list.js"></script>

<style type="text/css">

	#question_name,#question_linkman,#question_linkphone {
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
			&nbsp;&nbsp;&nbsp;&nbsp;标题：<input type="text"
				id="title1" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<button type="button" id="question_add" class="btn btn-success"
         style="margin-left:20px;"><i class="icon-plus"></i>&nbsp;添加</button> 
        <button type="button" id="question_search" class="btn btn-success" ><i class="icon-search"></i>&nbsp;查询</button>
        <button type="button" id="question_reset"
				class="btn btn-success"><i class="icon-refresh"></i>&nbsp;重置</button>
		</div>
		<table id="question_table"></table>
		
		<div id="question_add_dialog">
			<form action="" id="question_form">
				<input type="hidden" id="id">
				<table style="border-collapse: separate;border-spacing: 10px;">
					<tr>
						<td>问题分组：</td>
						<td><input class="easyui-combobox" id="quest_group">
						</td>
					</tr>
					<tr>
						<td>标题：</td>
						<td><input type="text" id="title">
						</td>
					</tr>
					<tr>
						<td>排序：</td>
						<td><input type="text" id="orders">
						</td>
					</tr>
					<tr>
						<td>是否热门：</td>
						<td><input class="easyui-combobox" id="quest_type">
						</td>
					</tr>
					<tr>
						<td>内容：</td>
						<td><textarea id="content" style="height:80px;"></textarea>
						</td>
					</tr>
				</table>
			</form>
		</div>
</body>
</html>