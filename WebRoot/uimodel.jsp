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
<title>宁康园管理平台</title>
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
  <p style="color: #900b09; font-size: 20px; padding: 10px 15px 0px; line-height: 40px;">///////// div自适应布局查询栏示例 //////////</p>
  <div id="common_search" class="common_search datagrid-toolbar common_search_nopadding">
    <span class="common_search_left_span"> 字典定义码：</span>
    <input type="text" id="dicType1">
    <span class="common_search_left_span"> 字典定义值：</span>
    <input type="text" id="dicName1">
    <button type="button" id="auth_search" class="btn btn-success" style="margin-left: 20px;">
      <i class="icon-search"></i>&nbsp;查询
    </button>
    <button type="button" id="auth_reset" class="btn btn-success">
      <i class="icon-refresh"></i>&nbsp;重置
    </button>
  </div>
  <p style="color: #900b09; font-size: 20px; padding: 10px 15px 0px; line-height: 40px;">///////// table强制对齐布局查询栏示例 //////////</p>
  <div id="common_search" class="common_search datagrid-toolbar">
    <table style="width: 100%">
      <tbody>
        <tr>
          <td>订单编号：</td>
          <td><input type="text" id="order_id"></td>
          <td>客户姓名：</td>
          <td><input type="text" id="order_customer_name"></td>
        </tr>
        <tr>
          <td>订单状态：</td>
          <td><select id="order_state">
              <option value="">--请选择--</option>
              <option value="notstart">未开始</option>
          </select></td>
          <td>订单商品：</td>
          <td><input type="text" id="order_goods_name"></td>
         
        </tr>
         <tr>
         <td>&nbsp;</td>
         <td>&nbsp;</td>
          <td>
            <button type="button" id="order_search" class="btn btn-success">
              <i class="icon-search"></i>&nbsp;查询
            </button>
          </td>
          <td>
            <button type="button" id="order_reset" class="btn btn-success">
              <i class="icon-refresh"></i>&nbsp;重置
            </button>
          </td></tr>
      </tbody>
    </table>
  </div>
  <p style="color: #900b09; font-size: 20px; padding: 10px 15px 0px; line-height: 40px;">///////// 这是工具栏示例 //////////</p>
  <div class="second-btn-con">
    <button id="addPartner" class="btn btn-success btn-success-small" iconcls="icon-add">
      <i class="icon-plus"></i>&nbsp;增加
    </button>
    &nbsp;
    <button id="deletePartner" class="btn btn-success btn-success-small" iconcls="icon-remove">
      <i class="icon-remove"></i>&nbsp;移除
    </button>
    &nbsp;
    <button id="deletePartner" class="btn btn-success btn-success-small" iconcls="icon-remove">
      <i class="icon-edit"></i>&nbsp;修改
    </button>
  </div>
  <p style="color: #900b09; font-size: 20px; padding: 10px 15px 0px; line-height: 40px;">///////// 这是操作栏示例 //////////</p>
  <div class="operationAcon">
    <a class="operationA icon-edit" title="编辑">&nbsp;编辑</a>
    <a class="operationA icon-ok" title="确认">&nbsp;确认</a>
    <a class="operationA icon-refresh" title="初始化密码">&nbsp;初始化密码</a>
    <a class="operationA icon-add" title="添加属性">&nbsp;添加属性</a>
    <a class="operationA icon-eye-open" title="查看属性">&nbsp;查看属性</a>
    <a class="operationA icon-pencil" title="修改属性">&nbsp;修改属性</a>
    <a class="operationA icon-trash" title="删除" style="color: rgb(255, 0, 0);">&nbsp;删除</a>
  </div>

</div>
  <script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
  <script type="text/javascript"	src="js/jquery.nicescroll.min.js"></script>
  <script type="text/javascript" src="js/jquery.scrollTo.min.js"></script>
</body>
</html>
