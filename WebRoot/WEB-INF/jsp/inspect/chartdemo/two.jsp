<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<%@ include file="/WEB-INF/taglib.jsp"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<header>
	<base href="<%=basePath%>"> 
    <meta charset="utf-8">
    <!-- Introduce ECharts file -->
    <script src="//cdn.bootcss.com/echarts/3.2.2/echarts.min.js"></script>
    <!-- <script src="echarts.min.js"></script> -->
</header>
<body>
    <!-- by ECharts Prepare a size（Width and height）The DOM -->
    <div id="main" style="width: 600px;height:400px;"></div>
    <script type="text/javascript">
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        option = {
		    title: {
		        text: 'Line chart stacking',
		        show:true
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['Email marketing','Alliance advertising','Video ads','Direct access','Search Engines']
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    toolbox: {
		        feature: {
		            saveAsImage: {}
		        }
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
		    },
		    yAxis: {
		        type: 'value'
		    },
		    series: [
		        {
		            name:'Email marketing',
		            type:'line',
		            stack: 'General',
		            data:[120, 132, 101, 134, 90, 230, 210]
		        },
		        {
		            name:'Alliance advertising',
		            type:'line',
		            stack: 'General',
		            data:[220, 182, 191, 234, 290, 330, 310]
		        },
		        {
		            name:'Video ads',
		            type:'line',
		            stack: 'General',
		            data:[150, 232, 201, 154, 190, 330, 410]
		        },
		        {
		            name:'Direct access',
		            type:'line',
		            stack: 'General',
		            data:[320, 332, 301, 334, 390, 330, 320]
		        },
		        {
		            name:'Search Engines',
		            type:'line',
		            stack: 'General',
		            data:[820, 932, 901, 934, 1290, 1330, 1320]
		        }
		    ]
		};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    </script>
    
</body>

</html>