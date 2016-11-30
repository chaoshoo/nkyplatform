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
<title>GD Administration</title>
<link rel="stylesheet" type="text/css" href="css/common.css">
<link rel="stylesheet" type="text/css" href="css/main.css">
<link rel="stylesheet" href="css/jquery/easyui.css" />
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>

</head>
<body>
	<div class="mbx">
		<div class="inn">
			<span class="fcB">Change password</span>
		</div>
	</div>
	<div class="nrP">
		<div class="xgP" id="content">
			<ul class="xgC">
				<li><label class="label"> Please enter the original password：</label> <input
					type="password" class="inputC" id="old"/></li>
				<li class="x02"><label class="label"> Please enter a new password：</label> <input
					type="password" class="inputC" id="new1"/>
					<p class="x_ts">Password by6-16Letter、number、Symbol composition，Case sensitive</p></li>
				<li><label class="label"> Please confirm new password：</label> <input
					type="password" class="inputC" id="new2"/>
					 <!-- <span class="i_cw">Please enter the correct password.</span> -->
				</li>
				<li><a href="javascript:void(0)" class="an_qd" onclick="doChange()">Confirmed</a></li>
			</ul>
		</div>
	</div>
</body>
</html>
<script>
function doChange(){
	var old = $("#old").val();
	var new1=$("#new1").val();
	var new2=$("#new2").val();
	if(new1!=new2){
//		alert("新密码前后不一致，请确认！");
		$.messager.alert(titleInfo,"Inconsistent before and after the new password，Please confirm！");
		return false;
	}
	if(old==new1){
//		alert("新旧密码不能相同，请确认！");
		$.messager.alert(titleInfo,"Old and new passwords can not be the same，Please confirm！");
		return false;
	}
	if(new1.length<6||new1.length>16){

		$.messager.alert(titleInfo,"New password number is not standardized，Please confirm！");
		return false;
	}
	var url = "changepwd/doChangePwd.json";
	var params = {};
	params.old = old;
	params.new1 = new1;
	$.get(url,params,function(data){
		if(data.code=='0'){
			$("#content").html("<font color='red'>"+data.msg+"</font>");
			return false;
		}else{
			$.messager.alert(titleInfo,data.msg);
			//alert(data.msg);
			return false;
		}
	}, "json");
}
</script>