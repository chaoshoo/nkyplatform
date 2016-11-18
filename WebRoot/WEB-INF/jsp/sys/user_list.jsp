<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
<title>宁康园管理平台</title>
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<link rel="stylesheet" type="text/css" href="css/jquery/tree/zTreeStyle.css" />
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/sys/user_list.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.ztree.excheck-3.5.min.js"></script>
</head>
<body class="easyui-layout">
  <div data-options="region:'center',title:'用户管理'" class="regionCenter">
    <div id="common_search" class="common_search common_search_nopadding">
      &nbsp;&nbsp;&nbsp;&nbsp;姓名：
      <input type="text" id="userName1" />
      &nbsp;&nbsp;&nbsp;&nbsp; 所属部门：
      <input type="text" id="group_name1" />
      <button type="button" id="user_search" class="btn btn-success" style="margin-left: 15px;">
        <i class="icon-search"></i>&nbsp;查询
      </button>
     <!--  <button type="button" id="user_reset" class="btn btn-success btn-refresh" style="margin-left: 15px;">
        <i class="icon-plus"></i>&nbsp;重置
      </button> -->
         <div class="second-btn-con">
      <button id="user_add" class="btn btn-success" iconcls="icon-add">
        <i class="icon-plus"></i>&nbsp;增加
      </button>
    </div>
    </div>
 
    <table id="user_table"></table>
    
    <div id="user_detail_dialog" data-options="closed:true,modal:true,title:'用户信息',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 400px;">
      <form action="sysUser/getList.json" id="user_detail_form">
        <input type="hidden" id="userId">
        <table style="margin-left: 10px">
          <tr>
            <td style="width:15%"><font color="red">*</font>姓名</td>
            <td><input type="text" id="userName"></td>
          </tr>
          <tr>
            <td>职务</td>
            <td><input type="text" id="sys_job"></td>
          </tr>
          <tr>
            <td>员工状态</td>
            <td><select id="sys_state">
                <m:getItems name="sys_state" />
            </select></td>
          </tr>
          <tr>
            <td><font color="red">*</font>账户名</td>
            <td><input type="text" id="userMail"> <input type="hidden" id="oldUserMail"><br>
            	初始密码为123456，忘记密码请点击初始化按钮
            </td>
          </tr>
          <tr>
            <td>账户状态</td>
            <td><select id="isEffective">
                <m:getItems name="isEffective" />
            </select></td>
          </tr>
          <tr>
            <td><font color="red">*</font>角色</td>
            <td><c:forEach items="${roles }" var="list">
                <span><input type="checkbox" value="${list.roleId }" name="roles" />&nbsp;${list.roleName }&nbsp;&nbsp;</span>
              </c:forEach></td>
          </tr>
          <tr>
            <td>备注</td>
            <td><textarea rows="8" cols="20" id="remark"></textarea></td>
          </tr>
          <tr>
            <td>部门</td>
            <td>
              <div id="auth_tree">
                <ul id="treeDemo" class="ztree"></ul>
              </div>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</body>
</html>