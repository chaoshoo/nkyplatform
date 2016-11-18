<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>支付后台</title>
<%@include file="/head.jsp"%>

<script type="text/javascript" src="<%=basePath%>js/company/department_info.js"></script>
</head>
<body class="easyui-layout">
	<div data-options="region:'center',title:'部门信息'" class="regionCenter">
		<div id="common_search" class="common_search">
			<button type="button" id="departmentInfo_add" class="btn btn-success  icon-plus"
				 >&nbsp;添加部门</button>
		</div>
		<table id="departmentInfo_table"></table>
		<div id="saveUpdateDepartment_detail_dialog"
			data-options="closed:true,modal:true,title:'部门信息',iconCls:'icon-save'"
			style="padding:5px;width:500px;height:300px;">
			<form action="departmentInfo/getList.json" id="saveUpdateDepartment_detail_form">
				<input type="hidden" id="id">
				<table>
					<tr>
						<td>公司名称：</td>
						<td width="150px;">乐租
<!--							<select id="hospitalId">-->
<!--								<c:forEach items="${list}" var="list">-->
<!--									<option value="${list.hospitalId}">${list.hospitalName}</option>-->
<!--								</c:forEach>-->
<!--							</select>-->
						</td>
						<td>部门名称：</td>
						<td width="150px;">
<!--							<select id="departmentName">-->
<!--								<m:getItems name="ksmc"></m:getItems>-->
<!--							</select>-->
							<input type="text" id="name">
						</td>
					</tr>
					
					<tr>
						<td>部门描述：</td>
						<td width="150px;">
							<input type="text" id="description"/>
						</td>
						<td>备注：</td>
						<td width="150px;">
							<input type="text" id="remark"/>
						</td>
					</tr>
					<tr>
						<td>状态：</td>
						<td width="150px;">
							<select id="status">
								<m:getItems name="status"></m:getItems>
							</select>
						</td>
					</tr>
					
				</table>
			</form>
		</div>
		<!-- 查看详情 -->
		<div id="departmentInfo_detail_dialog"
			>
		</div>
</body>
</html>