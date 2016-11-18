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
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/parameter/sysParameter_list.js"></script>
</head>
<body class="easyui-layout">
  <div data-options="region:'center',title:'系统参数配置'" class="regionCenter">
    <div id="common_search" class="common_search common_search_nopadding">
      &nbsp;&nbsp;&nbsp;&nbsp;名称：
      <input type="text" id="name1" />
      <button type="button" id="sysParameter_add" class="btn btn-success" style="margin-left: 20px;">
        <i class="icon-plus"></i>&nbsp;添加
      </button>
      <button type="button" id="sysParameter_search" class="btn btn-success">
        <i class="icon-search"></i>&nbsp;查询
      </button>
      <!-- <button type="button" id="sysParameter_reset" class="btn btn-success">
        <i class="icon-refresh"></i>&nbsp;重置
      </button> -->
    </div>
    <table id="sysParameter_table"></table>
    <div id="sysParameter_detail_dialog" data-options="closed:true,modal:true,title:'参数配置',iconCls:'icon-save'" style="padding: 5px; width: 600px; height: 400px;">
      <form action="sysParameter/getList.json" id="sysParameter_detail_form">
        <input type="hidden" id="id">
        <table>
          <tr>
            <td>名称</td>
            <td><input type="text" id="name"></td>
          </tr>
          <tr>
            <td>编码</td>
            <td><input type="text" id="code"></td>
          </tr>
          <tr>
            <td>默认值</td>
            <td><input type="text" id="defaultValue"></td>
          </tr>
          <tr>
            <td>排序号</td>
            <td><input type="text" id="soft"></td>
          </tr>
          <tr>
            <td>是否开启</td>
            <td><select id="isEffective">
                <m:getItems name="isEffective" />
            </select></td>
          </tr>
          <tr>
            <td>说明</td>
            <td><textarea style="width: 85%" rows="5" cols="5" id="description"></textarea></td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</body>
</html>