<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>支付后台</title>
<%@include file="/head.jsp"%>

<script type="text/javascript" src="js/hospital_platform/department_info.js"></script>
</head>

<body class="easyui-layout">
	<div data-options="region:'center',title:'医院科室信息'" class="regionCenter">
		<!-- 查看详情 -->
		<div id="departmentInfo_detail_dialog"
			data-options="closed:true,modal:true,title:'科室信息详情',iconCls:'icon-save'"
			style="padding:5px;width:500px;height:300px;">
				<table >
					<tr>
						<td>公司名称：</td>
						<td width="150px;">乐租
						</td>
						<td>部门名称：</td>
						<td width="150px;">
							<input type="text" id="info.name">
						</td>
					</tr>
					
					<tr>
						<td>部门描述：</td>
						<td width="150px;">
							<input type="text" id="info.description"/>
						</td>
						<td>备注：</td>
						<td width="150px;">
							<input type="text" id="info.remark"/>
						</td>
					</tr>
					<tr>
						<td>状态：</td>
						<td width="150px;">
<!--							${util:getValueBykeyDic('status',info.status)}-->
						</td>
					</tr>
				</table>
		</div>
</body>
</html>