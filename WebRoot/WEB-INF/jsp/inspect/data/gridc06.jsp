<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

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
<meta name="meituan_check">
<meta name="description" content="">
<meta name="keywords" content="">
<meta name="applicable-device" content="mobile">
<meta name="viewport" content="initial-scale=1, width=device-width, maximum-scale=1, user-scalable=no">
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="address=no">
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/jquery/tree/zTreeStyle.css" />
<link rel="stylesheet" href="<%=basePath%>css/all.css" />
<link rel="stylesheet" href="<%=basePath%>css/jquery/easyui.css" />
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/common.js"></script>
<script type="text/javascript" src="<%=basePath%>js/form.js"></script>
<style>
			body {
				background: #3b9890;
			}
			
			.mui-content-padded {
				text-align: center;
			}
			
			.mui-content-padded a {
				display: inline-block;
				line-height: 40px;
				width: 20%;
				height: 40px;
				margin-bottom: 10px;
				-webkit-user-select: text;
				border: 1px solid rgba(0, 0, 0, .2);
				border-radius: 3px;
				outline: 0;
				-webkit-appearance: none;
				padding: 0 !important;
				color: #fff;
				border: 0px !important;
				background-color: #38f !important;
				border-radius: 18px !important;
				text-align: center;
				text-decoration: none;
				font-size: 20px;
				transition: all .5 ease;
			}
			
			.mui-content-padded a:hover {
				background: #4091fc !important;
				transition: all .5 ease;
				border: 5px solid #feac1c !important
			}
			
			.mui-content-padded a:active {
				background: #2ebcb3 !important;
				border: 5px solid #feac1c !important
			}
			
			.table-striped {
				background: rgba(255, 255, 255, .1);
				width: 80%;
				margin: 0 auto;
				border-top: 1px solid #3b9890;
				border-left: 1px solid #3b9890;
			}
			
			.table-striped td,
			.table-striped th {
				color: #fff;
				padding: 6px;
				border-right: 1px solid #3b9890;
				border-bottom: 1px solid #3b9890;
				font-size: 20px;
			}
			
			.table-striped th {
				color: #f4c600;
				padding: 10px;
				border-right: 1px solid #3b9890;
				border-bottom: 1px solid #3b9890;
				font-size: 20px;
			}
			
			.title {
				color: #fff;
				padding: 6px;
				border-right: 1px solid #3b9890;
				border-bottom: 1px solid #3b9890;
				font-size: 20px;
			}
			.subtitle {
				display: inline-block !important;
				width: 120px !important;
				height: 40px !important;
				background: #50cda5;
				border-radius: 5px;
				text-align: center;
				vertical-align: middle;
				margin-right: 30px;
				line-height: 40px;
				font-size: 20px;
				color: #fff;
			}
			
			.mui-content-padded .checked {
				border: 5px solid #feac1c !important
			}
			
		</style>

</head>
<body>
         <div class="mui-content-padded">
				<input type="button" id="nextup" class=" subtitle"  onfocus="addclass('nextup')" onblur="removeclass('nextup')" onClick="next(-1)" value="上一页"></input>
				<input type="button" id="nextdown" class=" subtitle"  onfocus="addclass('nextdown')" onblur="removeclass('nextdown')" onClick="next(1)" value="下一页"></input>
		 </div>	  
		<input type="hidden" name="cardCode" id="cardCode" value="${cardCode}">
		<input type="hidden" name="inspectCode" id="inspectCode" value="${inspectCode}">
		<input type="hidden" name="code" id="code" value="${code}">
		<p class="title"><span id="spetime_time"></span></p>
		<table id="base_table"  class="table table-striped table-bordered" >
		<!--  <tr><th>名称</th><th>检测值</th><th>参考值</th></tr>-->
		</table>
		<p class="title">&nbsp;第<span id="pagenum">0</span>条,共${total}条检测数据</p>

	
</body>
<script type="text/javascript">
var page = 1;
var total = ${total};
$(function() {
	//初始化表格
	if(total<=page){
		$("#nextdown").hide();
	}
	if(page==1){
		$("#nextup").hide();
	}
	list();
});

function addclass(obj){
	 $("#"+obj).addClass("checked");
}
function removeclass(obj){
	 $("#"+obj).removeClass("checked");
}
function list(){
	var cardCode = $("#cardCode").val();
	var html = "<thead><tr><th>检查项</th><th>检测值</th><th>参考值</th> </tr></thead>";
	$.ajax({
		url:"vipInspectData/getDatac06.json?v="+new Date().getTime(),
		type:"get",
		dataType:"json",
		data:"cardCode="+cardCode+"&page="+page,
		success:function(data){
			if(data.flag=='true'){
				$("#spetime_time").html("&nbsp;检测时间:"+data.inspect_time);
				$("#pagenum").html(page);
				html+="<tbody>";
				$.each(data.list, function(i, item){   
					var style = '';
					if(item.status==-1){
						style = 'style="color:#F00;"';
					}else if(item.status==1){
						style = 'style="color:#F00;"';
					}
					html += "<tr "+style+"><td>"+item.name+"</td><td>";
					if(item.status==-1){
						html += "<font color=\"red\">"+item.value+"</font>";
					}else if(item.status==1){
						html += "<font color=\"red\">"+item.value+"</font>";
					}else{
						html += item.value;
					}
					html += "</td><td>"+item.kpi+"</td></tr>"	
				 });
				html+="</tbody>";
				$("#base_table").html(html);
			}
		}
	});
}

function next(v){
	page = page+v;
	if(page <= 1){
		page = 1;
		$("#nextup").hide();
	}else{
		$("#nextup").show();
	}
	if(page>=total){
		page = total;
		$("#nextdown").hide();
	}else{
		$("#nextdown").show();
	}
	 list();
}

</script>
</html>