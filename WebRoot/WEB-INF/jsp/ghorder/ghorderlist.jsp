<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@include file="/head.jsp"%>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>挂号管理</title>
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/common/common.js"></script>
<script type="text/javascript" src="js/openDialog.js"></script>
<script type="text/javascript" src="<%=path %>/js/ghorder/ghorderlist.js"></script>
<style type="text/css">
	/*.panel-body{padding:0px;}*/
	.btn{color:#428bca !important;text-decoration:none !important;}
	.btn:hover{color:#428bca !important;text-decoration:none !important;}
</style>
</head>
<body class="easyui-layout" onkeydown="IM.EV_keyCode(event)">
  <div data-options="region:'center',title:'挂号管理'" class="regionCenter">
    <div id="common_search" class="common_search common_search_nopadding">       
     <form action="" id="ques_qry_form">
		<table id="dataTable">
		    <tr>
	            <td>医&nbsp;&nbsp;院</td>
	            <td> <input style="width: 200px;"  type ="text" id="hospitalname" name="hospitalname"/>					    
	  			</td>
	            <td>科&nbsp;&nbsp;室</td>
	            <td><input style="width: 200px;"  id="office_code" name="departmentname"/> </td>
	            <td>医生名称</td>
	            <td> <input type="text" id="doctor_name"  style="width: 200px;" /></td>
			</tr>
			  <tr>
	            <td>会员名称</td>
	            <td><input type="text" id="vip_name"  style="width: 200px;"/></td>
	            <td>创建时间</td>
	            <td colspan='3'><input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="begin_time" />
                至 <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="end_time" /></td>
			</tr>
		</table> 
	 </form> 
      <button type="button" id="diagnose_search" class="btn btn-success btn-success-small">
        	查&nbsp;询
      </button>   
    </div>
    <table id="diagnose_table"></table>
  </div>
</body>
</html>