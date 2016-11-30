<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
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
		<script type="text/javascript" src="http://cdn.hcharts.cn/jquery/jquery-1.8.3.min.js"></script>
		<script src="http://cdn.hcharts.cn/highcharts/highcharts.js"></script> 
		<link rel="stylesheet" href="<%=basePath%>/css/w3.css"> 
	<style>
		.w3-container{text-align: center;}
		.w3-container>p>span{width:30%}
		.w3-btn{width:168px;background-color: #FFF;color:#5562dc;font-size: 36px;line-height: 50px;padding-right: 15px;margin-right:15px;}
	</style>
</header>
<body  style="background-image:url(<%=basePath%>/img/chart/chartbg.png)">
${data }
<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
<div  class="w3-container"> 
<table style="width: 100%">
	<tr style="width: 100%;height: 50px">
		<td colspan="4" style="color:#FFF;font-size: 36px;line-height: 50px;text-align: left;">${data.info }</td>
	</tr>
	<tr style="width: 100%;height: 50px">
		<td width="25%" style="color:#FFF;font-size: 36px;line-height: 50px;">${data.inspectName }</td>
		<td width="50%"><button class="w3-btn w3-round-xxlarge">Previous page</button> <button class="w3-btn w3-round-xxlarge">next page</button></td>
		<td width="25%"></td>
	</tr>
</table>
</div>
   	<script type="text/javascript"> 
$(function () { 
    $('#container').highcharts({
    	chart: {
            type: 'line',
            backgroundColor: 'rgba(0,0,0,0)', 
			showAxes: true,
			marginTop:36,
			spacingRight:50,
			colors: ['#FFF', '#FFF']
        },
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
			categories: ['08/16 10:00', '08/16 12:00', '08/16 14:00', '08/16 16:00', '08/17 10:00', '08/17 12:00','08/17 17:00' ], 
	        plotLines: [
	             {color: '#FFF',dashStyle: 'solid',value: 0,width: 1 },
	             {color: '#FFF',dashStyle: 'solid',value: 1,width: 1 },
	             {color: '#FFF',dashStyle: 'solid',value: 2,width: 1 },
	             {color: '#FFF',dashStyle: 'solid',value: 3,width: 1 },
	             {color: '#FFF',dashStyle: 'solid',value: 4,width: 1 },
	             {color: '#FFF',dashStyle: 'solid',value: 5,width: 1 },
	             {color: '#FFF',dashStyle: 'solid',value: 6,width: 1 }
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
                text: 'Stroke/branch', 
				style: {
					color: '#FFF',
					fontSize: '30px',
					fontWeight: 'bold'
				}
            },
			gridLineColor:'#FFF',
			gridLineDashStyle:'Solid',
			gridLineWidth:'0',
			lineColor:'#FFF',
			lineWidth:'3',
			labels:{
				style: {
					color: '#FFF',
					fontSize: '30px'
				}
			}
        },
        plotOptions: {
            line: {
				cropThreshold:500,
				turboThreshold:10000,
                enableMouseTracking: false,
				dataLabels:{
                    	enabled: true,
						borderColor: 'red',
						borderWidth: 0,
						padding: 1,
						shadow: false,
						style: {
							color: '#FFF',
							fontSize: '36px'
						}
				},
				 style:{"fontSize": "36px", "fontWeight": "bold"  }
            }
        	, series: {
                color: '#86F1FD',
				marker: {
		            symbol: 'url(<%=basePath%>/img/chart/point.png)'  
	            },
				dataLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold'
                    },formatter:function() {
							return this.y+" Stroke/branch";
					}
                },
				labels:{
					formatter:function() {
							return this.y+" Stroke/branch";
					}
				}
				
            }
        },
        series: [{
            name: 'pulse',
            data: [ 69, 95, 15, 18, 21, 25, 26]
        }]
    });
});
		</script>
</body>
</html>