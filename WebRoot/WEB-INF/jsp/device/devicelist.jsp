<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>宁康园管理平台</title>
<link rel="stylesheet" type="text/css" href="<%=path%>/css/jquery/tree/zTreeStyle.css" />
<link rel="stylesheet" href="<%=path%>/css/all.css" />
<link rel="stylesheet" href="<%=path%>/css/jquery/easyui.css" />
<script type="text/javascript" src="<%=path%>/js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/common.js"></script>
<script type="text/javascript" src="<%=path%>/js/form.js"></script>
<script type="text/javascript" src="<%=path%>/js/openDialog.js"></script>
<script type="text/javascript" src="<%=path%>/js/device/device.js?v=20160824"></script>
</head>
<body class="easyui-layout">
	<div data-options="region:'center',title:'设备查询'" class="regionCenter">
	  
		<div id="common_search" class="common_search common_search_nopadding">	
		 <form action="goods/tail/detail.json" id="query_form">		
			设备SN&nbsp;&nbsp;<input
				type="text" id="FIT-LIKE-sn" name="FIT-LIKE-sn"/> &nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" id="auth_search" 
				class="btn btn-success"><i class="icon-search"></i>&nbsp;查询</button>
		<!-- <button type="button"
				id="auth_reset" class="btn btn-success"><i class="icon-refresh"></i>&nbsp;重置</button> -->
		<button type="button" id="data_add" class="btn btn-success"><i class="icon-plus"></i>&nbsp;添加</button>
		 </form>
		</div>
		<table id="base_table"></table>
        <div id="editfrom_dialog"></div>
	</div>
	
	<div id="device_doctor_id" data-options="closed:true,modal:true,title:'设备关联医生'" style="padding: 5px; width: 880px; height: 500px;">
				&nbsp;设备：<span id="deviceSnDiv"></span>
				&nbsp;是否已关联设备：<select id="deviceSnStatus" name="deviceSnStatus">
			      <option value="1">已关联</option> 
			      <option value="0">未关联</option> 
				</select> 
				医生：<input type="text" id="FIT-LIKE-doctor" name="FIT-LIKE-doctor"/>  
				<button type="button" id="auth_search" onclick="dataGridReload()"  class="btn btn-success  "><i class="icon-search"></i>&nbsp;查询</button>
				
			<div style="padding: 5px; width: 830px; height: 350px;">
				<table id="device_doctor_table" style="width: 90%"></table>
			</div>
	</div>
	
</body>
<script type="text/javascript">
$(function() {
	//初始化表格
	initDataGrid();
});

//初始化弹出框
$('#device_doctor_id').dialog({
	buttons:[ {
		text:'关闭',
		handler:function(){
			$('#device_doctor_id').dialog('close');
		}
	}]
});

var deviceidt = 0;

function getparam(){
	return {"FIT-EQ-id":deviceidt,"FIT-EQ-status":$("#deviceSnStatus").val(),"FIT-LIKE-doctor":$("#FIT-LIKE-doctor").val()};
}

function bind(doctorId,deviceId){
	//console.log("bind:"+doctorId+","+deviceId);
	var str = "确定绑定？";
    $.messager.confirm('确认',str,function(row){  
        if(row){  
            $.ajax({  
            	 type:"POST",
                url:'device/docbind.json?doctorId='+doctorId+"&deviceId="+deviceId,    
                success:function(data){
                	if(data.code==1) {
                		 $.messager.show({title:titleInfo,msg:'绑定成功！',timeout:timeoutValue,showType:'slide'});
         				 dataGridReload();
                	}else{
                		 $.messager.alert(titleInfo,data.msg);
                	}
                } ,
                fail:function(){
                	$.messager.alert(titleInfo,'绑定失败！');
                }
            });  
        }  
    })  
} 

function unbind(doctorId,deviceId){
	//console.log("unbind:"+doctorId+","+deviceId);
	var str = "确定解绑？";
    $.messager.confirm('确认',str,function(row){  
        if(row){  
            $.ajax({  
            	 type:"POST",
                url:'device/docunbind.json?doctorId='+doctorId+"&deviceId="+deviceId,    
                success:function(data){
                	if(data.code==1) {
                		 $.messager.show({title:titleInfo,msg:'解绑成功！',timeout:timeoutValue,showType:'slide'});
         				 dataGridReload();
                	}else{
                		 $.messager.alert(titleInfo,data.msg);
                	}
                } ,
                fail:function(){
                	$.messager.alert(titleInfo,'解绑失败！');
                }
            });  
        }  
    })  
}

/**
 * 数据表格刷新
 * @param param
 */
function dataGridReload(){
	initGridDoctor();
}

function initGridDoctor(){
	$('#device_doctor_table').datagrid({
		nowrap: true,
		striped: true,
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'device/doctor.json',
		queryParams:getparam(),
		remoteSort: false,
		singleSelect:true,
        autoRowHeight: true,
        loadMsg: '请稍等...', 
		idField:'ID',
		columns:[[
			{field:'NAME',title:'医生',width:100}
			,{field:'HOSPITALNAME',title:'医院',width:100}
			,{field:'STATUS',title:'状态',width:100},
			{field:'ID',title:'操作',width:120,
				formatter:function(value,row){
					if(row.STATUS == "已关联"){
						return  '<a href="javascript:unbind('+value+','+deviceidt+')">解除关联</a> &nbsp;';
					}else if(row.STATUS == "未关联"){
						return  '<a href="javascript:bind('+value+','+deviceidt+')">关联设备</a> &nbsp;';
					}
					return "";

				}
			} 
		]],
		pagination:true,
		rownumbers:true 
	});  
	
	$('#device_doctor_table').datagrid('resize',{
	       width:800,
	       heigth:400
   });
	console.log("device_doctor_table");
}

//关联医生
function doctor(idt,sn){
	deviceidt = idt;
	$("#deviceSnDiv").html(sn);
	initGridDoctor();
	$('#device_doctor_id').dialog('open');
	//openDialog2('设备关联医生信息','device/doctor.html?id='+id,'600','500');
}

function formatterDateTime2(date) {
    var datetime = date.getFullYear()
            + "-"// "年"
            + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0"
                    + (date.getMonth() + 1))
            + "-"// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                    .getDate())
            + " "
            + (date.getHours() < 10 ? "0" + date.getHours() : date
                    .getHours())
            + ":"
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                    .getMinutes())
            + ":"
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                    .getSeconds());
    return datetime;
}

/**
 * 初始化数据表格
 */
function initDataGrid(){
	var parameter = $.serializeObject($("#query_form"));
	$('#base_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'device/list.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'ID',
		columns:[[
		    {field:'DEVICE_ID',title:'设备ID',width:100},
		    {field:'SN',title:'设备SN',width:100},
		    {field:'DEVICE_TYPESTR',title:'设备类型',width:100},
		    {field:'PRODUCT_TIME',title:'生产时间',width:100,
		    	formatter : function(value) {
					if(value == null || value == ""){
						return "";
					}
					var date = new Date(value);
					return myformatter(date);
				}
		    },
		    {field:'DELIVER_TIME',title:'发货时间',width:100,
		    	formatter : function(value) {
					if(value == null || value == ""){
						return "";
					}
					var date = new Date(value);
					return formatterDateTime2(date);
				}
		    },
			{field:'ID',title:'操作',width:120,
				formatter:function(value,row){
					var str = '<a href="javascript:openedit(\'false\','+value+')">修改</a> &nbsp;';
					str +=' &nbsp;<a  href="javascript:del('+value+')" ><font color="red">删除</font></a> &nbsp;';
					str +=' &nbsp;<a  href="javascript:doctor('+value+',\''+row.SN+'\')" ><font color="red">关联医生</font></a>';
					return str;

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
</html>