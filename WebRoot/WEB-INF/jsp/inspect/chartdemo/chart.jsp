<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<%@ include file="/WEB-INF/taglib.jsp"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() 	+ path + "/";
%>
<!DOCTYPE html>
<html>
<header>
	<base href="<%=basePath%>"> 
    <meta charset="utf-8"> 
		<script type="text/javascript" src="http://cdn.hcharts.cn/jquery/jquery-1.8.3.min.js"></script>
		<script src="http://cdn.hcharts.cn/highcharts/highcharts.js"></script> 
</header>
<body>
<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
<script type="text/javascript">
//date2str(new Date('Sun May 11,2014'), 'yyyy-MM-dd')
function date2str(x, y) {
    var z = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
    });

    return y.replace(/(y+)/g, function(v) {
        return x.getFullYear().toString().slice(-v.length)
    });
}

$(function () {
Highcharts.setOptions({
	lang: {
		months: ['一月', '二月', '三月', '四月', '五月', '六月',  '七月', '八月', '九月', '十月', '十一月', '十二月'],
		shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月',  '七月', '八月', '九月', '十月', '十一月', '十二月'],
		weekdays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] 
	}
});
	/**A7FFFF 搏/分 xAxis: {
            minPadding: 0.05,
            maxPadding: 0.05
        },
*/
    $('#container').highcharts({
        chart: {
            type: 'line',
			 backgroundColor: '#0A93F1',
			showAxes: true,
			colors: ['#51E0F1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a']
        }, 
		exporting:{
			enabled:false
		}, 
		legend:{
			enabled:false
		},loading: {
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
        lang: {
            noData: "暂时没有数据"
        },
        noData: {
            style: {
                fontWeight: 'bold',
                fontSize: '15px',
                color: '#303030'
            }
        },title: {
            text: '',
			style: {
                color: '#FFF',
                fontWeight: 'bold',
				fontSize: '12px'
			}
        }, 
        xAxis: {
			type: 'datetime',
            categories: ['2016-08-16 10:00:00', '2016-08-16 12:00:00', '2016-08-16 14:00:00', '2016-08-16 16:00:00', '2016-08-17 10:00:00', '2016-08-17 12:00:00',
			'2016-08-17 17:00:00', '2016-08-17 19:00:00', '2016-08-18 10:00:00', '2016-08-18 12:00:00', '2016-08-18 14:00:00', '2016-08-18 15:00:00'],
			dateTimeLabelFormats:{
				millisecond: '%H:%M:%S.%L',
				second: '%H:%M:%S',
				minute: '%H:%M',
				hour: '%H:%M',
				day: '%e. %b',
				week: '%e. %b',
				month: '%b \'%y',
				year: '%Y'
			},
			gridLineColor:'#BBB',
			gridLineDashStyle:'Dash',
			gridLineWidth:'1',
			lineColor:'#86c6FB',
			tickWidth:0,
			lineWidth:'3',
			labels:{
				style: {
					color: '#FFF',
					fontSize: '12px'
				},
				formatter:function() { 
						return date2str(new Date(this.value.split(' ').join('T')), 'MM-dd hh:mm');
				}
			}
        },
        yAxis: {
            title: {
                text: '搏/分', 
				style: {
					color: '#FFF',
					fontSize: '15px',
					fontWeight: 'bold'
				}
            },
			gridLineColor:'#EEE',
			gridLineDashStyle:'Dash',
			gridLineWidth:'0',
			lineColor:'#86c6FB',
			lineWidth:'3',
			labels:{
				style: {
					color: '#FFF',
					fontSize: '12px'
				}
			}
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
				cropThreshold:500,
				turboThreshold:10000,
                enableMouseTracking: false,
				dataLabels:{
						borderColor: 'red',
						borderWidth: 0,
						padding: 1,
						shadow: false,
						style: {
							color: '#FFF',
							fontSize: '14px'
						}
				},
				 style:{"color": "contrast", "fontSize": "11px", "fontWeight": "bold", "textShadow": "0 0 6px contrast, 0 0 3px contrast" }
            }, series: {
                color: '#86F1FD',
				marker: {
					enabled: true,
                    fillColor: '#FFFFFF',
                    lineWidth: 2,
					radius:8,
                    lineColor: '#86F1FD' // inherit from series
                },
				dataLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold'
                    },formatter:function() {
							return this.y+" 搏/分";
					}
                },
				labels:{
					formatter:function() {
							return this.y+" 搏/分";
					}
				}
				
            }
        },
        series: [{
            name: '脉搏',
            data: [{
					name: '数字',
					color: '#86F1FD',
					y: 70
				}, 69, 95, 15, 18, 21, 25, 26, 23, 18, 13, 96]
        }]
    });
});
</script>
</body>
</html>