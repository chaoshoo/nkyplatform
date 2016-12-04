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
    <script src="//cdn.bootcss.com/echarts/3.2.2/echarts.simple.min.js"></script>
    <!-- <script src="//cdn.bootcss.com/echarts/3.2.2/echarts.common.min.js"></script> -->
    <!-- <script src="//cdn.bootcss.com/echarts/3.2.2/echarts.min.js"></script> -->
    <!-- <script src="echarts.min.js"></script> -->
</header>
<body>
    <!-- by ECharts Prepare a size（Width and height）The DOM -->
    <div id="main" style="width: 600px;height:400px;"></div>
    <script type="text/javascript">
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts Introduction'
            },
            tooltip: {},
            legend: {
                data:['Sales volume']
            },
            xAxis: {
                data: ["shirt","Cardigan","Chiffon shirt","trousers","High-heeled shoes","Socks"]
            },
            yAxis: {},
            series: [{
                name: 'Sales volume',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    </script>
    
</body>

</html>