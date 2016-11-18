<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib uri="/WEB-INF/tld/ttutil.tld" prefix="util"%>

<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!-- <link rel="stylesheet" href="<%=basePath%>css/all.css" /> -->
<!-- <link rel="stylesheet" href="<%=basePath%>css/jquery/easyui.css" /> -->

<!-- <script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery-1.9.1.js"></script> -->
<!-- <script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery.easyui.min.js"></script> -->
<base href="<%=basePath%>">


	
<script type="text/javascript">

var util = {
		getValueBykeyDic:function(type,value) {
			var url = "helpdoc/getValueBykeyDic.json?type="+type+"&value="+value;
			var flag = false;
			var rst = "";
			$.ajax({
				type : "get",
				url : url,
				async : false,//取消异步
				 cache:false, 
				 dataType:"text",
				 success : function(data){
					rst = data;
				}
			});
			return rst;
		}
}

</script></element>