<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Payment background</title>
<%@include file="/head.jsp"%>

<script type="text/javascript" src="<%=basePath%>js/company/department_info.js"></script>
</head>
<body class="easyui-layout">
	<div data-options="region:'center',title:'Department information'" class="regionCenter">
		<div id="common_search" class="common_search">
			<button type="button" id="departmentInfo_add" class="btn btn-success  icon-plus"
				 >&nbsp;Add Department</button>
		</div>
		<table id="departmentInfo_table"></table>
		<div id="saveUpdateDepartment_detail_dialog"
			data-options="closed:true,modal:true,title:'Department information',iconCls:'icon-save'"
			style="padding:5px;width:500px;height:300px;">
			<form action="departmentInfo/getList.json" id="saveUpdateDepartment_detail_form">
				<input type="hidden" id="id">
				<table>
					<tr>
						<td>Company name：</td>
						<td width="150px;">Le rent
<!--							<select id="hospitalId">-->
<!--								<c:forEach items="${list}" var="list">-->
<!--									<option value="${list.hospitalId}">${list.hospitalName}</option>-->
<!--								</c:forEach>-->
<!--							</select>-->
						</td>
						<td>Department name：</td>
						<td width="150px;">
<!--							<select id="departmentName">-->
<!--								<m:getItems name="ksmc"></m:getItems>-->
<!--							</select>-->
							<input type="text" id="name">
						</td>
					</tr>
					
					<tr>
						<td>Department description：</td>
						<td width="150px;">
							<input type="text" id="description"/>
						</td>
						<td>Remarks：</td>
						<td width="150px;">
							<input type="text" id="remark"/>
						</td>
					</tr>
					<tr>
						<td>state：</td>
						<td width="150px;">
							<select id="status">
								<m:getItems name="status"></m:getItems>
							</select>
						</td>
					</tr>
					
				</table>
			</form>
		</div>
		<!-- View details -->
		<div id="departmentInfo_detail_dialog"
			>
		</div>
</body>
</html>