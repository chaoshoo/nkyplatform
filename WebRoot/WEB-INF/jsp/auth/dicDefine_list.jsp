<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
<link rel="stylesheet" type="text/css" href="css/jquery/tree/zTreeStyle.css" />
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/auth/dicDefine_list.js"></script>
</head>
<body class="easyui-layout">
  <div data-options="region:'center',title:'字典维护'" class="regionCenter">
    <div id="common_search" class="common_search">
      &nbsp;&nbsp;&nbsp;&nbsp; 字典定义码：
      <input type="text" id="dicType1" />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 字典定义值：
      <input type="text" id="dicName1" />
   
      <button type="button" id="auth_search" class="btn btn-success " style="margin-left: 20px;">
      <i class="icon-search"></i>&nbsp;查询
      </button>
      <!-- <button type="button" id="auth_reset" class="btn btn-success " >
      <i class="icon-refresh"></i>&nbsp;重置
      </button> -->
      
          <div class="tools-div">
      <button type="button" id="auth_add" class="btn btn-success " style="margin-left: 20px;">
        <i class="icon-plus"></i>&nbsp;添加
      </button>
    </div>
    </div>

    <table id="dicDefine_table"></table>
    <div id="dic_detail_dialog" data-options="closed:true,modal:true,title:'添加属性',iconCls:'icon-save'" style="padding: 5px; width: 500px; height: 400px;">
      <form action="" id="dic_detail_form">
        <input type="hidden" id="id">
        <table>
          <tr>
            <td>字典定义码</td>
            <td><input type="text" id="dicType" readonly></td>
          </tr>
          <tr>
            <td>系统属性码</td>
            <td><select id="sysFlag">
                <m:getItems name="sysFlag1" />
            </select></td>
          </tr>
          <tr>
            <td>字典属性码</td>
            <td><input type="text" id="dicName"></td>
          </tr>
          <tr>
            <td>字典属性值</td>
            <td><input type="text" id="dicValue"></td>
          </tr>
          <tr>
            <td>字典描述</td>
            <td><input type="text" id="dicRemark10"></td>
          </tr>
          <tr>
            <td>字典描述2</td>
            <td><input type="text" id="dicRemark11"></td>
          </tr>
          <tr>
            <td>所属名称</td>
            <td><input type="text" id="belongName"></td>
          </tr>
        </table>
      </form>
    </div>
    <div id="dic_detail_dialog2" data-options="closed:true,modal:true,title:'添加字典定义',iconCls:'icon-save'" style="padding: 5px; width: 500px; height: 300px;">
      <form action="" id="dic_detail_form2">
        <input type="hidden" id="id2">
        <table>
          <tr>
            <td>字典定义码</td>
            <td><input type="text" id="dicType2"></td>
          </tr>
          <tr>
            <td>系统属性码</td>
            <td><select id="sysFlag2">
                <m:getItems name="sysFlag1" />
            </select></td>
          </tr>
          <tr>
            <td>字典定义值</td>
            <td><input type="text" id="dicName2"></td>
          </tr>
          <tr>
            <td>字典定义描述</td>
            <td><input type="text" id="dicRemark"></td>
          </tr>
        </table>
      </form>
    </div>
    <div id="dd">Dialog Content.</div>
  </div>
</body>
</html>