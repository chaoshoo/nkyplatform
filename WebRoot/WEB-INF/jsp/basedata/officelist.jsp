<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>宁康园管理平台</title>
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/jquery/tree/zTreeStyle.css" />
<link rel="stylesheet" href="<%=basePath%>css/all.css" />
<link rel="stylesheet" href="<%=basePath%>css/jquery/easyui.css" />
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/common.js"></script>
<script type="text/javascript" src="<%=basePath%>js/form.js"></script>
<script type="text/javascript" src="<%=basePath%>js/openDialog.js"></script>
<script type="text/javascript">
var parameter = {};
var dataForm={};
var add = true; 

//修改
function openedit(id){
	$('#base_table').datagrid('selectRecord',id);
	var rowInfo =  $('#base_table').datagrid('getSelected');
	if(rowInfo){
		//设置弹出框信息 
		$('#ksid').val(rowInfo.ID);
		$('#kscode').val(rowInfo.CODE);
		$('#ksname').val(rowInfo.NAME);
		$('#ksdes').val(rowInfo.DES); 
		$('#user_detail_dialog').dialog('open');
	}
}

/**
 * 数据表格刷新
 * @param param
 */
function dataGridload(param){
	$('#base_table').datagrid('reload');
}

function del(code){  //删除操作  
    $.messager.confirm('确认','确认删除?',function(row){  
        if(row){  
        	$.post('office/del.json?code='+code,function(data){
    			if(data.code==1){
    				$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
    			}else{
            		//alert("删除失败");
    				$.messager.alert(titleInfo,data.msg);
    			}
				dataGridload(parameter);
            	//window.location.href=window.location.href;
    		},"json"); 
        }  
    });
  }  

/**
 * 将数据提交到json
 */
function submit_model_window(){
	if($("#kscode").val()==null || $("#kscode").val()==""){
		$.messager.alert(titleInfo,'请输入科室编码!');
		return;
	} 
	if($("#ksname").val()==null || $("#ksname").val()==""){
		$.messager.alert(titleInfo,'请输入科室名称!');
		return;
	} 
	var formdata = $.serializeObject($("#user_detail_form"));
	
	var ksid = $('#ksid').val();
	if(ksid != null && ksid != ""){
		$.post("office/update.json",formdata,function(data){
			if(data.code==1){
				$('#detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'更新成功！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,data.msg);
			}
			$('#user_detail_dialog').dialog('close');
		},"json");
	}else{
		$.post("office/save.json",formdata,function(data){
			if(data.code==1){
				$('#detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,data.msg);
			}
			$('#user_detail_dialog').dialog('close');
		},"json");
	}
}  

$(function() {
	//条件查询
	$("#auth_search").click(function(){
		parameter = $.serializeObject($("#query_form"));
		initDataGrid();
		parameter = {};
		
	});
	 $("#auth_reset").click(function(){
		$("#FIT-LIKE-name").val("");
	}); 
	
	//初始化弹出框
	$('#user_detail_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				submit_model_window();
			}
		},{
			text:'取消',
			handler:function(){
				$('#user_detail_dialog').dialog('close');
			}
		}]
	});
	
	//初始化表格
	initDataGrid();

	//添加用户
	$('#data_add').click(function(){
		$('#user_detail_form')[0].reset();
		$('#id').val('');
		$('#user_detail_dialog').dialog('open');
	});
	
});

/** 初始化数据表格 */
function initDataGrid(){
	$('#base_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'office/list.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'ID',
		columns:[[
		    {field:'CODE',title:'科室编码',width:100},
		    {field:'NAME',title:'科室名字',width:100},
		    {field:'DES',title:'备注',width:100},
			{field : 'CREATE_TIME',title : '创建时间',width : 100,
				formatter : function(value) {
					var date = new Date(value);
					return formatterDateTime(date);
				}
			},
			{field:'ID',title:'操作',width:120,
				formatter:function(value,row){ 
					return  '<a href="javascript:openedit('+value+')">修改</a> &nbsp;<a onclick="javascript:del(\''+row.CODE+'\')" ><font color="red">删除</font></a>';
					//return '<a href="javascript:initPassWord('+value+')">初始化密码</a> <a href="javascript:userEdit('+value+')">编辑</a> <a   onclick="del('+value+')" ><font color="red">删除</font></a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	}); 
}
</script>
</head>
<body class="easyui-layout">
	<div data-options="region:'center',title:'科室查询'" class="regionCenter">
	  
		<div id="common_search" class="common_search common_search_nopadding">	
		 <form action="goods/tail/detail.json" id="query_form">		
			&nbsp;&nbsp;&nbsp;&nbsp; 科室名称&nbsp;&nbsp;<input type="text" id="FIT-LIKE-name" name="FIT-LIKE-name"/>
        <button type="button" id="auth_search" 
				class="btn btn-success"><i class="icon-search"></i>&nbsp;查询</button>
		<!-- <button type="button"
				id="auth_reset" class="btn btn-success"><i class="icon-refresh"></i>&nbsp;重置</button> -->
		<button type="button" id="data_add" class="btn btn-success"><i class="icon-plus"></i>&nbsp;添加</button>
		 </form>
		</div>
		<table id="base_table"></table>
        <div id="editfrom_dialog"></div>
 
 	<div id="user_detail_dialog" data-options="closed:true,modal:true,title:'科室信息',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 400px;">
      <form action="offlice/list.json" id="user_detail_form">
        <input type="hidden" id="ksid" name="id" />
        <table style="margin-left: 10px"> 
			<tr id="code_tr" >
				<td>科室编码</td>
				<td>
				<input style="width: 200px;" type="text" id="kscode" name="code" />
				</td>
			</tr>
			<tr>
				<td>科室名字</td>
				<td>
				<input style="width: 200px;" type="text" id="ksname" name="name"  />
				</td>
			</tr>
			<tr>
				<td style="width: 70px;">科室简介</td>
				<td>
				<textarea style="width: 200px;" rows="3" cols="20" id="ksdes" name="des"></textarea>
				</td>
			</tr> 
		</table>
      </form>
    </div>
	</div>
	
</body>
</html>