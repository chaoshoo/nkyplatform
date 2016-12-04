<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="com.sys.entity.sys.SysAuth"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="Mosaddek">
<meta name="keyword" content="">
<title>GD Administration</title>
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">
<link href="css/font-awesome.css" rel="stylesheet" />
<link href="css/all.css" rel="stylesheet" />
<link href="css/jquery/easyui.css" rel="stylesheet" />
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
</head>
<body>
<div style="width:1000px; margin:0 auto;">
  <p style="color: #900b09; font-size: 20px; padding: 10px 15px 0px; line-height: 40px;">///////// divExamples of adaptive layout query columns //////////</p>
  <div id="common_search" class="common_search datagrid-toolbar common_search_nopadding">
    <span class="common_search_left_span"> Dictionary definition code：</span>
    <input type="text" id="dicType1">
    <span class="common_search_left_span"> Dictionary definition：</span>
    <input type="text" id="dicName1">
    <button type="button" id="auth_search" class="btn btn-success" style="margin-left: 20px;">
      <i class="icon-search"></i>&nbsp;query
    </button>
    <button type="button" id="auth_reset" class="btn btn-success">
      <i class="icon-refresh"></i>&nbsp;Reset
    </button>
  </div>
  <p style="color: #900b09; font-size: 20px; padding: 10px 15px 0px; line-height: 40px;">///////// tableForce alignment layout query bar sample //////////</p>
  <div id="common_search" class="common_search datagrid-toolbar">
    <table style="width: 100%">
      <tbody>
        <tr>
          <td>Order number：</td>
          <td><input type="text" id="order_id"></td>
          <td>Customer name：</td>
          <td><input type="text" id="order_customer_name"></td>
        </tr>
        <tr>
          <td>Order status：</td>
          <td><select id="order_state">
              <option value="">--Please select--</option>
              <option value="notstart">Not start</option>
          </select></td>
          <td>Order goods：</td>
          <td><input type="text" id="order_goods_name"></td>
         
        </tr>
         <tr>
         <td>&nbsp;</td>
         <td>&nbsp;</td>
          <td>
            <button type="button" id="order_search" class="btn btn-success">
              <i class="icon-search"></i>&nbsp;query
            </button>
          </td>
          <td>
            <button type="button" id="order_reset" class="btn btn-success">
              <i class="icon-refresh"></i>&nbsp;Reset
            </button>
          </td></tr>
      </tbody>
    </table>
  </div>
  <p style="color: #900b09; font-size: 20px; padding: 10px 15px 0px; line-height: 40px;">///////// This is an example of a toolbar //////////</p>
  <div class="second-btn-con">
    <button id="addPartner" class="btn btn-success btn-success-small" iconcls="icon-add">
      <i class="icon-plus"></i>&nbsp;increase
    </button>
    &nbsp;
    <button id="deletePartner" class="btn btn-success btn-success-small" iconcls="icon-remove">
      <i class="icon-remove"></i>&nbsp;remove
    </button>
    &nbsp;
    <button id="deletePartner" class="btn btn-success btn-success-small" iconcls="icon-remove">
      <i class="icon-edit"></i>&nbsp;modify
    </button>
  </div>
  <p style="color: #900b09; font-size: 20px; padding: 10px 15px 0px; line-height: 40px;">///////// This is an example of the operation bar //////////</p>
  <div class="operationAcon">
    <a class="operationA icon-edit" title="edit">&nbsp;edit</a>
    <a class="operationA icon-ok" title="confirm">&nbsp;confirm</a>
    <a class="operationA icon-refresh" title="Initialization code">&nbsp;Initialization code</a>
    <a class="operationA icon-add" title="Add attribute">&nbsp;Add attribute</a>
    <a class="operationA icon-eye-open" title="View properties">&nbsp;View properties</a>
    <a class="operationA icon-pencil" title="Change attribute">&nbsp;Change attribute</a>
    <a class="operationA icon-trash" title="delete" style="color: rgb(255, 0, 0);">&nbsp;delete</a>
  </div>

</div>
  <script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
  <script type="text/javascript"	src="js/jquery.nicescroll.min.js"></script>
  <script type="text/javascript" src="js/jquery.scrollTo.min.js"></script>
</body>
</html>