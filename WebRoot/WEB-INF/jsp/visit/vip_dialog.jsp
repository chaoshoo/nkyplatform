<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery-1.9.1.js"></script>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>会员选择</title>
<body class="easyui-layout">
    <div id="dg_vip_tb" style="padding:2px 5px;">
     <form action="" id="query_form">		
      会员名称: <input type="text" id="FIT-username" style="width: 120px;"/>
     会员卡号: <input type="text" id="FIT-cardcode" style="width: 120px;"/> <br>
      移动电话: <input type="text" id="FIT-mobile" style="width: 120px;"/>
          <a href="javascript:void(0);" onclick="dialogSearch();" class="easyui-linkbutton" iconCls="icon-search">查找</a>
         <!--  <input type="button" id="select_reset" class="btn btn-success btn-success-small" value="重置" />  -->
           </form>
      </div>
	<table id="dg_vip" class="easyui-datagrid" style="height:400px;width:560px;"
		data-options="url:'visit/listVip.json',queryParams: {},fitColumns:true,singleSelect:true,checkbox:true,pagination:true,rownumbers:true,idField:'id',toolbar:'dg_vip_tb'">
		<thead>
			<tr>
				<th data-options="field:'CK',checkbox:true"></th>
				<th data-options="field:'id',hidden:true"></th>
				<th data-options="field:'vip_code',width:100">会员编码</th>
				<th data-options="field:'real_name',width:100">会员名称</th>
				<th data-options="field:'card_code',width:100">会员卡号</th>
				<th data-options="field:'mobile',width:100">移动电话</th>
			</tr>
		</thead>
	</table>

    <script>
    function dialogSearch(){
      //var param =$("#query_form").serializeObject();
      var param = {};
      param['FIT-cardcode'] =$("#FIT-cardcode").val();
      param['FIT-username'] =$("#FIT-username").val();
      param['FIT-mobile'] =$("#FIT-mobile").val();
      //根据查询条件,刷新grid
      $('#dg_vip').datagrid('load',param).datagrid('clearChecked');
    }
    $(function() {
    	$("#select_reset").click(function() {
        	$("#FIT-username").val("");
        	$("#FIT-cardcode").val("");
        	$("#FIT-mobile").val("");
        });
    	/* $("#select_reset").click(function() {
			$("#FIT-LIKE-d-name").val("");
		}); */
    });
    
    </script>
</body>
</html>