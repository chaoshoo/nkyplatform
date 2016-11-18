<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>宁康园管理平台</title>
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>css/jquery/tree/zTreeStyle.css" />
<link rel="stylesheet" href="<%=basePath%>css/all.css" />
<link rel="stylesheet" href="<%=basePath%>css/jquery/easyui.css" />
<script type="text/javascript"
	src="<%=basePath%>js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript"
	src="<%=basePath%>js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/common.js"></script>
<script type="text/javascript" src="<%=basePath%>js/form.js"></script>
<script type="text/javascript" src="<%=basePath%>js/openDialog.js"></script>
<script type="text/javascript"
	src="<%=basePath%>js/doctor/device.js?v=20160824"></script>

</head>
<body class="easyui-layout">

	<form action="doctor/save.json" id="device_form">
		<input type="hidden" id="id" name="id" value="${device.id}" />
		<table id="dataTable">
			<tr id="code_tr" style="display: none">
				<td>设备ID</td>
				<td><input style="width: 200px;" type="text" id="device_id"
					name="device_id" value="${device.device_id}" readonly="readonly" /></td>
			</tr>
			<tr id="time_tr" style="display: none">
				<td>创建时间</td>
				<td><input style="width: 200px;" type="text" id="create_time"
					name="create_timestr" value="${create_timestr}" readonly="readonly" /></td>
			</tr>
			<tr>
				<td>设备类型<font color="red">*</font></td>
				<td><input style="width: 200px;" class="easyui-combobox"
					id="device_type" name="device_type" value="${device.device_type}" />
				</td>
			</tr>
			<tr>
				<td>设备SN<font color="red">*</font></td>
				<td><input style="width: 200px;" type="text" id="sn" name="sn"
					value="${device.sn}" /></td>
			</tr>
			<tr>
				<td>生产日期</td>
				<td><input style="height: 20px; width: 200px;"
					class="easyui-datebox" id="product_time" name="product_timestr"
					value="${device.product_time}"
					data-options="formatter:myformatter,parser:myparser" /></td>
			</tr>
			<tr>
				<td>发货日期</td>
				<td><input style="height: 20px; width: 200px;"
					class="easyui-datetimebox" id="deliver_time" name="deliver_timestr"
					value="${device.deliver_time}"
					data-options="formatter:formattime,parser:timeparser" /></td>
			</tr>
			<tr>
				<td style="width: 70px;">备注</td>
				<td><textarea style="width: 200px;" rows="3" cols="20"
						id="remark" name="remark">${device.remark}</textarea></td>
			</tr>
		</table>
		<table>
			<tr>
				<td>
					<div id="savediv">
						<button type="button" id="d_save_button" onclick="dcommit()"
							class="btn btn-success btn-success-small"
							style="margin-left: 20px;">保存</button>
						<button type="button" id="d_cancle_button"
							onclick="dialogClose2()"
							class="btn btn-success btn-success-small"
							style="margin-left: 20px;">取消</button>
					</div>
				</td>
			</tr>
		</table>
		<div id="lookpicdiv"></div>
	</form>
	<script type="text/javascript">
		var vparameter = {};
		$(function() {
			if ('${add}' == 1) {
				$("#code_tr").show();
				$("#time_tr").show();
			}
			$('#device_type').combobox({
				valueField : 'dic_name',
				textField : 'dic_value',
				height : 26,
				editable : false,
				url : 'dic/getDic.json?dicType=device_type&v=' + Math.random(),
			/*		onLoadSuccess : function() {
			 $('#edu').combobox('setValue','${doctor.edu}');
			 },*/
			});
		});
	</script>
</body>

</html>