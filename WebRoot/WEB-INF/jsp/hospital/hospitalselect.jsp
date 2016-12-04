<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<html>
<body class="easyui-layout">
<div style="heigh:90%">
		<div id="select_div" class="common_search">
			&nbsp; Hospital name&nbsp;&nbsp;<input type="text"
				id="FIT-LIKE-d-name" name="FIT-LIKE-d-name" />
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="button"
				id="select_search" class="btn btn-success" value="query" /> <!-- <input
				type="button" id="select_reset" class="btn btn-success" value="Reset" /> -->
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
			 * Initialize data form
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
									    {field:'CODE',title:'Hospital code',width:100},
									    {field:'NAME',title:'Hospital name',width:200},
									    {field:'LEVER',title:'Hospital level',width:100,
									    	formatter:function(value){
									    		var LEVER = value;
									    		return levermap[LEVER];
											}
									    },
										{field:'AREANAME',title:'Hospital address',width:200},
										{
											field : 'ID',
											title : 'Operation',
											width : 70,
											formatter : function(value, row, index) {
												return '<a href="javascript:select('+value+')">Choose</a> ';
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