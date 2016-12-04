<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ include file="/WEB-INF/taglib.jsp"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>
<header>
	<base href="<%=basePath%>"> 
    <meta charset="utf-8"> 
    <%-- <meta name="viewport" content="width=device-width, initial-scale=1" /> --%>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1, user-scalable=0" />
    <meta content="telephone=no,email=no" name="format-detection" />
		<!-- <script type="text/javascript" src="http://cdn.hcharts.cn/jquery/jquery-1.8.3.min.js"></script>
		<script src="http://cdn.hcharts.cn/highcharts/highcharts.js"></script>  -->
		<script src="<%=basePath%>/js/jquery-1.8.3.min.js"></script> 
		<script src="<%=basePath%>/js/charts/highcharts/highcharts.js"></script> 
		<link rel="stylesheet" href="<%=basePath%>/css/w3.css"> 
		<link rel="stylesheet" href="<%=basePath%>/css/chart/chart.css"> 
	<style>
	* { margin: 0; padding: 0; } 
		html { 
			background: url(img/chart/chartbg.png) no-repeat center center fixed; 
			-webkit-background-size: cover;
			-moz-background-size: cover;
			-o-background-size: cover;
			background-size: cover;
		}
		
		/**1920*1080 premise：ConfigbodyFont for100%。It has a simple calculation formula：100% = 16px = 1em = 14pt*/
		/**1920*946*/
		
	</style>
	<link rel="stylesheet" href="<%=basePath%>/css/chart/chart.css"> 
	<script type="text/javascript">
	var hi = $(window).height();
	var wi = $(window).width();
	</script>
</header>
<body >
<div id="mainpage">
	<%-- ${data }  style="background-image:url(<%=basePath%>/img/chart/chartbg.png);background-repeat: repeat-x; background-attachment: scroll;"  --%>
	<c:forEach var="item" items="${data.subTab}" varStatus="status">  
		<c:choose>
			<c:when test="${item.checked}">
				<a class="subtitle checked" href="<%=basePath%>vipInspectData/inspectchart/${data.cardCode }/${data.inspectCode }/${item.code }/0.html">${item.name }</a>
			</c:when>
			<c:otherwise>
				<a class="subtitle" href="<%=basePath%>vipInspectData/inspectchart/${data.cardCode }/${data.inspectCode }/${item.code }/0.html">${item.name }</a>
			</c:otherwise>
		</c:choose>  
	</c:forEach>
	<hr class="hrstyle"  width="100%" /> 
	<div  class="w3-container"> 
	<div id="container" style="min-width: 310px; height: 600px; margin: 0 auto;"></div>
	<table style="width: 100%">
		<tr style="width: 100%;" class="trheight">
			<td colspan="4" style="color:#FFF;text-align: left;" class="info">${data.info }</td>
		</tr>
		<tr style="width: 100%;" class="trheight">
			<td style="color:#FFF;" class="title"  align="left">${data.subTitle.title }</td>
			<td class="abtn"  align="center">
				<c:if test="${data.frontPage < data.currentPage }">
					<a class="w3-btn w3-round-xxlarge" href="<%=basePath%>vipInspectData/inspectchart/${data.cardCode }/${data.inspectCode }/${data.subTitle.code }/${data.frontPage }.html">Previous page</a> 
				</c:if>
				<c:if test="${data.nextPage > data.currentPage }">
					<a class="w3-btn w3-round-xxlarge" href="<%=basePath%>vipInspectData/inspectchart/${data.cardCode }/${data.inspectCode }/${data.subTitle.code }/${data.nextPage }.html">next page</a>
				</c:if>
			</td> 
			<td class="add">&nbsp;</td>
		</tr><%-- 
		<tr style="width: 100%;" class="trheight2">
			<td class="abtn2" align="center">
				<c:if test="${data.frontPage < data.currentPage }">
					<a class="w3-btn w3-round-xxlarge" href="<%=basePath%>vipInspectData/inspectchart/${data.cardCode }/${data.inspectCode }/${data.subTitle.code }/${data.frontPage }.html">Previous page</a> 
				</c:if>
				<c:if test="${data.nextPage > data.currentPage }">
					<a class="w3-btn w3-round-xxlarge" href="<%=basePath%>vipInspectData/inspectchart/${data.cardCode }/${data.inspectCode }/${data.subTitle.code }/${data.nextPage }.html">next page</a>
				</c:if>
			</td> 
		</tr> --%>
	</table>
	</div>
</div>
   	<script type="text/javascript"> 
$(function () { 
	var hicenter = hi - 250;
	$('#container').height(hicenter);
	var paright = 50;
	if(wi<1023){
		paright = 5;
	}
	
    $('#container').highcharts({
    	chart: {
            type: 'line',
            backgroundColor: 'rgba(0,0,0,0)', 
			showAxes: true,
			marginTop:36, 
			spacingRight:paright,
			colors: ['#FFF', '#FFF'],
			spacing:[10, 10, 15, 0],
			margin: [0, 10, 50, 90]
        },
        credits: {enabled: false },
		exporting:{ enabled:false }, 
		legend:{ enabled:false },
        lang: {  noData: "No data" },
        noData: {   style: { fontWeight: 'bold', fontSize: '15px',  color: '#FFF' } },
        title: {  text: '', style: {  color: '#FFF', fontWeight: 'bold', fontSize: '12px' } }, 
        loading: {
            hideDuration: 1000,
            showDuration: 1000,
			labelStyle:{ "fontWeight": "bold", "position": "relative", "top": "45%" },
			style: {
				position: 'absolute',
				backgroundColor: 'white',
				opacity: 0.5,
				textAlign: 'center'
			}
        },
        xAxis: {
        	type: 'category', 
			categories: ${data.categories}, 
	        plotLines: [
                 <c:if test="${fn:length(data.serie1Data) >=1}">{color: '#FFF',dashStyle: 'solid',value: 0,width: 1 }</c:if>
                 <c:if test="${fn:length(data.serie1Data) >=2}">,{color: '#FFF',dashStyle: 'solid',value: 1,width: 1 }</c:if>
                 <c:if test="${fn:length(data.serie1Data) >=3}">,{color: '#FFF',dashStyle: 'solid',value: 2,width: 1 }</c:if>
                 <c:if test="${fn:length(data.serie1Data) >=4}">,{color: '#FFF',dashStyle: 'solid',value: 3,width: 1 }</c:if>
                 <c:if test="${fn:length(data.serie1Data) >=5}">,{color: '#FFF',dashStyle: 'solid',value: 4,width: 1 }</c:if>
                 <c:if test="${fn:length(data.serie1Data) >=6}">,{color: '#FFF',dashStyle: 'solid',value: 5,width: 1 }</c:if>
                 <c:if test="${fn:length(data.serie1Data) >=7}">,{color: '#FFF',dashStyle: 'solid',value: 6,width: 1 }</c:if> 
	        ],
	        gridLineColor:'#FFF',
			gridLineDashStyle:'Solid',
			gridLineWidth:'0',
			lineColor:'#FFF',
			tickWidth:0,
			lineWidth:'3',
			labels:{
				style: {
					color: '#FFF',
					fontSize: '12px'
				},
				formatter:function() { 
						return this.value;//date2str(new Date(this.value.split(' ').join('T')), 'MM-dd hh:mm');
				}
			}
        },
        yAxis: {
            title: {
                text: '${data.subTitle.unit}', 
                margin: 5,
				style: {
					color: '#FFF',
					fontSize: '20px' 
				}
               /*  title: {
                    align: 'high',
                    offset: 0,
                    text: 'Rainfall (mm)',
                    rotation: 0,
                    y: -10
                } */
            },
			gridLineColor:'#FFF',
			gridLineDashStyle:'Solid',
			gridLineWidth:'0',
			lineColor:'#FFF',
			lineWidth:'3',
			labels:{ style: { color: '#FFF', fontSize: '30px' } }
        },
        plotOptions: { 
	        line: {enableMouseTracking: false },  
	        series: {
                color: '#FFF',
				marker: { symbol:getSymolUrl()  },
				dataLabels: {
                    enabled: true, 
					style: {"color": "#FFF", "fontSize": "30px", "fontWeight": "normal", "textShadow": "none"  },
                    formatter:function() { return this.y; }//+ '${data.subTitle.unit}'
                }
            }
        },
        series: [
		<c:if test="${!empty data.serie1Name }"> {name: '${data.serie1Name}',data:  ${data.serie1Data} }</c:if>
		<c:if test="${!empty data.serie2Name }">,{name: '${data.serie2Name}',data:  ${data.serie2Data} }</c:if>
		<c:if test="${!empty data.serie3Name }">,{name: '${data.serie3Name}',data:  ${data.serie3Data} }</c:if>
		]
    });
});

function getSymolUrl(){
	if(wi<1024){
		return 'url(<%=basePath%>/img/chart/point24.png)';
	}else{
		return 'url(<%=basePath%>/img/chart/point.png)';
	}
}

		</script>
</body>
</html>