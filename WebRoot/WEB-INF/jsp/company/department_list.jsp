<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Payment background</title>
<%@include file="/head.jsp"%>

<script type="text/javascript" src="js/hospital_platform/department_info.js"></script>
</head>

<body class="easyui-layout">
	<div data-options="region:'center',title:'Hospital department information'" class="regionCenter">
		<!-- View details -->
		<div id="departmentInfo_detail_dialog"
			data-options="closed:true,modal:true,title:'Department information',iconCls:'icon-save'"
			style="padding:5px;width:500px;height:300px;">
				<table >
					<tr>
						<td>Company name：</td>
						<td width="150px;">Le rent
						</td>
						<td>Department name：</td>
						<td width="150px;">
							<input type="text" id="info.name">
						</td>
					</tr>
					
					<tr>
						<td>Department description：</td>
						<td width="150px;">
							<input type="text" id="info.description"/>
						</td>
						<td>Remarks：</td>
						<td width="150px;">
							<input type="text" id="info.remark"/>
						</td>
					</tr>
					<tr>
						<td>state：</td>
						<td width="150px;">
<!--							${util:getValueBykeyDic('status',info.status)}-->
						</td>
					</tr>
				</table>
		</div>
</body>
</html>