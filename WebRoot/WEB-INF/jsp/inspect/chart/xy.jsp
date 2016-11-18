<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script type="text/javascript" src="http://cdn.hcharts.cn/jquery/jquery-1.8.3.min.js"></script>
	<script src="http://cdn.hcharts.cn/highcharts/highcharts.js"></script> 
	<link rel="stylesheet" href="<%=basePath%>/css/w3.css"> 
	<style>
		.w3-container{text-align: center;}
		.w3-btn{width:168px;background-color: #FFF;color:#5562dc;font-size: 36px;line-height: 50px;padding-right: 15px;margin-right:15px}
	</style>
</header>
<body  style="background-image:url(<%=basePath%>/img/chart/chartbg.png)">
<div id="container" style="min-width: 310px; height: 478px; margin: 0 auto"></div>
<div  class="w3-container"> 
<table style="width: 100%">
	<tr style="width: 100%;height: 50px">
		<td colspan="4" style="color:#FFF;font-size: 36px;line-height: 50px;text-align: left;">这一行是显示提示信息的</td>
	</tr>
	<tr style="width: 100%;height: 50px">
		<td width="25%" style="color:#FFF;font-size: 36px;line-height: 50px;">血压计历史记录</td>
		<td width="50%"><button class="w3-btn w3-round-xxlarge">上一页</button> <button class="w3-btn w3-round-xxlarge">下一页</button></td>
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
        lang: {  noData: "暂时没有数据" },
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
			categories: [],
			/* categories: ['08/16 10:00', '08/16 12:00', '08/16 14:00', '08/16 16:00', '08/17 10:00', '08/17 12:00','08/17 17:00' ], */
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
					fontSize: '36px'
				},
				formatter:function() { 
						return this.value;//date2str(new Date(this.value.split(' ').join('T')), 'MM-dd \n hh:mm');
				}
			}
        },
        yAxis: {
            title: {
                text: '毫米汞柱',
				style: {
					color: '#FFF',
					fontSize: '30px',
					fontWeight: 'bold'
				}
            }, plotLines: [{
                color: 'yellow', // Color value
                dashStyle: 'dash', // Style of the plot line. Default to solid
                value: 60, // Value of where the line will appear
                width: 1 // Width of the line    
              }]
            ,/**plotBands: [{
            color: 'orange', // Color value
            from: 80, // Start of the plot band
            to: 120 // End of the plot band
          }], 
          plotLines: [{
            color: 'red', // Color value
            dashStyle: 'longdashdot', // Style of the plot line. Default to solid
            value: 3, // Value of where the line will appear
            width: 2 // Width of the line    
          }],*/
            labels: {
                formatter: function () {
                    return this.value ;//+ '°'
                }
            },
			gridLineColor:'#FFF',
			gridLineDashStyle:'Solid',
			gridLineWidth:'0',
			lineColor:'#FFF',
			lineWidth:'3',
			floor:60, 
			min:60,
			tickInterval:20,
			minPadding:10,
			maxPadding:20,
			max:200,
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
            } ,
           series: {
	            color: '#FFF',
				marker: {
		            symbol: 'url(<%=basePath%>/img/chart/point.png)'  
	            },
				dataLabels: {
					align:'left',
	                enabled: true,
	                allowOverlap:true,
	                crop:false,
	                style: { 
	                },formatter:function() {
							return this.y;//+" 毫米汞柱";
					}
	            },
				labels:{
					formatter:function() {
							return this.y+" 毫米汞柱";
					}
				}
        } 
        },
        series: [{ 
            name: '高压',
            data: []
            /* data: [97.0, 96.9, 99.5, 149.5, 159.4, 111.5, 122.2] */
        }, { 
            name: '低压',
            data: []
        	/* data: [73.9, 74.2, 75.7, 78.5, 71.9, 75.2, 77.0] */
        }]
    });
});
		</script>
    
</body>

</html>