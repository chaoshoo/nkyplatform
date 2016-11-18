<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<HTML>
<HEAD>
<TITLE>图片查看</TITLE>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript"
	src="<%=basePath%>js/common/jquery/jquery.rotate.min.js"></script>
<script type='text/javascript'>
	var size = 0;
	var wid = window.screen.width;
	var num = 0;
	//	$("#imgdiv").css("margin-left",(wid-600)/2));
	//放大缩小图片
	function imgToSize(size) {
		var img = $("#Imgbox");
		var oWidth = img.width(); //取得图片的实际宽度
		var oHeight = img.height(); //取得图片的实际高度
		img.width(oWidth + size);
		img.height(oHeight + size / oWidth * oHeight);
	}

	// 翻转图片
	function imgReverse(arg) {
		if(arg == 0){
			num = 0;
		}else{
			num = num + arg;
		}
		$("#Imgbox").rotate({
			animateTo : num
		})
	}
	// 翻转图片
	function imgReverse2(arg) {
		var img = $("#Imgbox");
		if (arg == 'h') {
			img.css({
				'filter' : 'fliph',
				'-moz-transform' : 'matrix(-1, 0, 0, 1, 0, 0)',
				'-webkit-transform' : 'matrix(-1, 0, 0, 1, 0, 0)'
			});
		} else {
			img.css({
				'filter' : 'flipv',
				'-moz-transform' : 'matrix(1, 0, 0, -1, 0, 0)',
				'-webkit-transform' : 'matrix(1, 0, 0, -1, 0, 0)'
			});
		}
	}
</script>
</HEAD>
<BODY>
	<div id="imgdiv"
		style="width: 600px; height: 500px; text-align:center;vertical-align:middle;border-style:solid; border-width:1px; border-color:#000;  overflow: auto;margin:0 auto">
		<img id='Imgbox' src='${picpath}' style="vertical-align:middle;" />
	</div>
	<br/>
	<div
		style="width: 400px; height: 50px;  top: 520px; margin: 0 auto">
		<input type="button" value="放大" onclick="imgToSize(50)"> <input
			type="button" value="缩小" onclick="imgToSize(-50);"> <input
			type="button" value="向右旋转" onclick="imgReverse(90)"> <input
			type="button" value="向左旋转" onclick="imgReverse(-90)"> <input
			type="button" value="取消旋转" onclick="imgReverse(0)">
	</div>
</BODY>
</HTML>