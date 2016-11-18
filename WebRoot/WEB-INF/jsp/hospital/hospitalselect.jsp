<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<html>
<body class="easyui-layout">
<div style="heigh:90%">
		<div id="select_div" class="common_search">
			&nbsp; 医院名称&nbsp;&nbsp;<input type="text"
				id="FIT-LIKE-d-name" name="FIT-LIKE-d-name" />
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="button"
				id="select_search" class="btn btn-success" value="查询" /> <!-- <input
				type="button" id="select_reset" class="btn btn-success" value="重置" /> -->
		</div>
		<table id="select_table" ></table>
</div>
	<script type="text/javascript">
	var levermap = JSON.parse('${lever}');
		var parameter = {};
		$(function() {
			//初始化表格
			initDataGrid();
			//条件查询
			$("#select_search").click(
					function() {
						if ($("#FIT-LIKE-d-name").val() != '') {
							parameter['FIT-LIKE-h.name'] = $("#FIT-LIKE-d-name").val();
						}
						initDataGrid();
						parameter = {};

					});
			$("#select_reset").click(function() {
				$("#FIT-LIKE-d-name").val("");
			});
			/**
			 * 初始化数据表格
			 */
			function initDataGrid() {
				$('#select_table').datagrid(
						{
							iconCls : 'icon-save',
							nowrap : true,
							autoRowHeight : false,
							striped : true,
							height:400,
							fitColumns : true,
							collapsible : true,
							url:'hospital/list.json',
							queryParams : parameter,
							remoteSort : false,
							singleSelect : true,
							idField : 'ID',
							columns:[[
									    {field:'CODE',title:'医院编码',width:100},
									    {field:'NAME',title:'医院名称',width:200},
									    {field:'LEVER',title:'医院级别',width:100,
									    	formatter:function(value){
									    		var LEVER = value;
									    		return levermap[LEVER];
											}
									    },
										{field:'AREANAME',title:'医院地址',width:200},
										{
											field : 'ID',
											title : '操作',
											width : 70,
											formatter : function(value, row, index) {
												return '<a href="javascript:select('+value+')">选择</a> ';
											}
										}
									]],
							pagination : true,
							rownumbers : true,
						});
			}

		});
		function select(obj) {
			var selections = $('#select_table').datagrid('getSelections');
		//	alert(JSON.stringify(selections));
			$.modalDialog.callBack(selections[0]);
			$.modalDialog.callBack = undefined;
			$.modalDialog.handler.window("close");
		}
	</script>
</body>
</html>