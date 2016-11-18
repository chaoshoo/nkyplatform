<%@ tag pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ include file="/WEB-INF/taglib.jsp"%>
<%@ attribute name="id" type="java.lang.String" required="true" rtexprvalue="true"%>
<%@ attribute name="value" type="java.lang.String" required="true" rtexprvalue="true"%>
<%@ attribute name="level" type="java.lang.String" required="true" rtexprvalue="true"%>
<%
	String path = request.getContextPath();
	
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";

%>
<base href="<%=basePath%>">

<script type="text/javascript" src="js/area/jquery.lSelect.js"></script>


<input type="hidden" id="${id }" name="${id }" />

<script type="text/javascript">
var v = "${value}";
loadArea(v);
function loadArea(v){
	if(v!=null && v!=""){
	
		//ajax get treepath
		$.ajax({
			url:'areatree/getTreepath.html?areaId='+v,
			success:function(msg){
				setArea($("#${id}"), v, msg);
			},
			fail:function(){
				alert("error");
			}
		});
	
	}else{
	
		setArea($("#${id}"), "", "");
	}
}
function setArea($areaId, area, treePath) {
	$areaId.attr("value",area);
	$areaId.attr("treePath", treePath);
	$areaId.lSelect({
		url: "areatree/area.json",
		level:"${level}"
	});
}

</script>