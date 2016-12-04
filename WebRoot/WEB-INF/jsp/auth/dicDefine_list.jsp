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
<title>GD Administration</title>
<link rel="stylesheet" type="text/css" href="css/jquery/tree/zTreeStyle.css" />
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/auth/dicDefine_list.js"></script>
</head>
<body class="easyui-layout">
  <div data-options="region:'center',title:'Dictionary maintenance'" class="regionCenter">
    <div id="common_search" class="common_search">
      &nbsp;&nbsp;&nbsp;&nbsp; Dictionary definition code：
      <input type="text" id="dicType1" />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dictionary definition：
      <input type="text" id="dicName1" />
   
      <button type="button" id="auth_search" class="btn btn-success " style="margin-left: 20px;">
      <i class="icon-search"></i>&nbsp;search
      </button>
      <!-- <button type="button" id="auth_reset" class="btn btn-success " >
      <i class="icon-refresh"></i>&nbsp;Reset
      </button> -->
      
          <div class="tools-div">
      <button type="button" id="auth_add" class="btn btn-success " style="margin-left: 20px;">
        <i class="icon-plus"></i>&nbsp;Add
      </button>
    </div>
    </div>

    <table id="dicDefine_table"></table>
    <div id="dic_detail_dialog" data-options="closed:true,modal:true,title:'Add attribute',iconCls:'icon-save'" style="padding: 5px; width: 500px; height: 400px;">
      <form action="" id="dic_detail_form">
        <input type="hidden" id="id">
        <table>
          <tr>
            <td>Dictionary definition code</td>
            <td><input type="text" id="dicType" readonly></td>
          </tr>
          <tr>
            <td>System attribute code</td>
            <td><select id="sysFlag">
                <m:getItems name="sysFlag1" />
            </select></td>
          </tr>
          <tr>
            <td>Dictionary attribute code</td>
            <td><input type="text" id="dicName"></td>
          </tr>
          <tr>
            <td>Dictionary attribute value</td>
            <td><input type="text" id="dicValue"></td>
          </tr>
          <tr>
            <td>Dictionary description</td>
            <td><input type="text" id="dicRemark10"></td>
          </tr>
          <tr>
            <td>Dictionary description2</td>
            <td><input type="text" id="dicRemark11"></td>
          </tr>
          <tr>
            <td>Affiliated name</td>
            <td><input type="text" id="belongName"></td>
          </tr>
        </table>
      </form>
    </div>
    <div id="dic_detail_dialog2" data-options="closed:true,modal:true,title:'Add dictionary definition',iconCls:'icon-save'" style="padding: 5px; width: 500px; height: 300px;">
      <form action="" id="dic_detail_form2">
        <input type="hidden" id="id2">
        <table>
          <tr>
            <td>Dictionary definition code</td>
            <td><input type="text" id="dicType2"></td>
          </tr>
          <tr>
            <td>System attribute code</td>
            <td><select id="sysFlag2">
                <m:getItems name="sysFlag1" />
            </select></td>
          </tr>
          <tr>
            <td>Dictionary definition</td>
            <td><input type="text" id="dicName2"></td>
          </tr>
          <tr>
            <td>Dictionary definition description</td>
            <td><input type="text" id="dicRemark"></td>
          </tr>
        </table>
      </form>
    </div>
    <div id="dd">Dialog Content.</div>
  </div>
</body>
</html>