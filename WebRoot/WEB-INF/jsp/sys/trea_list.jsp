<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
<link rel="stylesheet" type="text/css" href="css/jquery/tree/zTreeStyle.css" />
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<script type="text/javascript" src="ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/sys/trea_list.js"></script>
</head>
<body class="easyui-layout">
  <div data-options="region:'center',title:'会计管理'" class="regionCenter">
    <div id="common_search" class="common_search">
      <input type="button" id="trea_add" class="btn btn-success" value="添加">
      &nbsp;&nbsp;&nbsp;&nbsp; 会计名字：
      <input type="text" id="treasurerName1" />
      <input type="button" id="auth_search" class="btn btn-success" value="查询" />
      <input type="button" id="auth_reset" class="btn btn-success" value="重置" />
    </div>
    <table id="trea_table"></table>
  </div>
  <div id="trea_detail_dialog" data-options="closed:true,modal:true,title:'添加',iconCls:'icon-save'" style="padding: 5px; width: 500px; height: 400px;">
    <form action="" id="trea_detail_form">
      <input type="hidden" id="treasurerId">
      <table>
        <tr>
          <td>会计名字：</td>
          <td><input type="text" id="treasurerName"></td>
        </tr>
        <tr>
          <td>会计头像：</td>
          <td><input type="text" id="treasurerPhoto"></td>
        </tr>
        <tr>
          <td>会计类型：</td>
          <td><select id="treasurerType">
              <m:getItems name="treasurerType" />
          </select></td>
        </tr>
        <tr>
          <td>会计描述：</td>
          <td><textarea name="treasurerDesc" class="ckeditor" id="treasurerDesc"></textarea> <script type="text/javascript">
                      CKEDITOR.replace('treasurerDesc');
                    </script></td>
        </tr>
      </table>
    </form>
  </div>
</body>
</html>