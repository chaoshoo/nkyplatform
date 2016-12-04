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
<title>GD Administration</title>
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
var parameter2 = {};
var dataForm={}; 
var isLoad = false;

function loadSubGrid(){
	$('#base_detail_table').datagrid({
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'vipInspectConfigFz/list.json',
		queryParams:parameter2,
		remoteSort: false,
		singleSelect:true,
		idField:'ID',
		columns:[[
			{field:'KIP_CODE',title:'Index coding',width:100},
		    {field:'SEX',title:'Gender',width:100,
				formatter : function(value) {
					if(value == 1 ){
						return "male";
					}else if(value == 0){
						return "female";
					}else{
						return "";
					}
				}
			},
		    {field:'AGE_MIN',title:'Minimum age',width:100},
		    {field:'AGE_MAX',title:'Maximum age',width:100},
		    {field:'FZ_MIN',title:'Minimum threshold index',width:100},
		    {field:'FZ_MAX',title:'Maximum threshold index',width:100},
		    {field:'ID',title:'Operation',width:120,
				formatter:function(value,row){ 
						return  '<a href="javascript:edit('+value+')">modify</a> &nbsp;<a onclick="javascript:del(\''+value+'\')" ><font color="red">delete</font></a>'
				}
			}
		    
		]],
		pagination:false,
		rownumbers:false 
	});  
}
/* {field:'CREATE_TIME',title : 'Created time',width : 100,
formatter : function(value) {
	if(value == null || value == ""){
		return "";
	}
	var date = new Date(value);
	return formatterDateTime(date);
}
},  */

 function formatterDateTime(date) {
    var datetime = date.getFullYear()
            + "-"// "year"
            + ((date.getMonth() + 1) < 10 ?('0'+(date.getMonth() + 1)):(date.getMonth() + 1))
            + "-"// "month"
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

//编辑
function edit(id){
	//debugger;
	$('#base_detail_table').datagrid('selectRecord',id);
	var rowInfo =  $('#base_detail_table').datagrid('getSelected');
	 if(rowInfo){
		//设置弹出框信息 
		$('#fzid').val(rowInfo.ID);
		$('#fzcode').val(rowInfo.KIP_CODE);
		//$('#sex').val(rowInfo.SEX); 
		if(rowInfo.SEX=="0" ||rowInfo.SEX== 0){
			 jQuery("#sex").val(0);
		}else if(rowInfo.SEX=="1"  ||rowInfo.SEX== 1){
			jQuery("#sex").val(1);
		}
		$('#min_age').val(rowInfo.AGE_MIN); 
		$('#max_age').val(rowInfo.AGE_MAX);
		$('#min_fz').val(rowInfo.FZ_MIN);
		$('#max_fz').val(rowInfo.FZ_MAX); 
		$('#user_detail_dialog1').dialog('open');
	 }
}
//删除
function del(id){  //Delete operation  
	//base_detail_table
	$('#base_detail_table').datagrid('selectRecord',id);
	var rowInfo =  $('#base_detail_table').datagrid('getSelected');
	if(rowInfo){
		$.messager.confirm('confirm','confirm deletion?',function(row){  
	        if(row){  
	        	$.post('vipInspectConfigFz/del.json?id='+rowInfo.ID,function(data){
	    			if(data.code==1){
	    				$('#user_detail_dialog').dialog('close');
	    				$.messager.show({title:titleInfo,msg:'Deleted！',timeout:timeoutValue,showType:'slide'});
	    			}else{
	            		//alert("删除失败");
	    				$.messager.alert(titleInfo,data.msg);
	    			}
					//dataGridload(parameter);
					dataGridloaddel(parameter);
	            	//window.location.href=window.location.href;
	    		},"json"); 
	        }  
	    });	
	}
  }  

//修改
function openedit(id){
	$('#base_table').datagrid('selectRecord',id);
	var rowInfo =  $('#base_table').datagrid('getSelected');
	if(rowInfo && rowInfo.CODE != null){
		$('#user_detail_dialog').dialog('open');
		parameter2 = {"FIT-EQ-kip_code":rowInfo.CODE};
		loadSubGrid();
		//parameter2 = {}; 
	}
}

/**
 * Data table refresh
 * @param param
 */
function dataGridloaddel(parameter){
	$('#base_detail_table').datagrid('load');
}
function dataGridload(parameter2){
	$('#base_table').datagrid('reload');
}
 
$(function() {
	//条件查询
	$("#auth_search").click(function(){
		parameter = $.serializeObject($("#query_form"));
		initDataGrid();
		parameter = {};
		
	});
	$("#auth_reset").click(function(){
		$("#FIT-LIKE-inspect_code").val("");
		$("#FIT-LIKE-code").val("");
		$("#FIT-LIKE-name").val("");
		initDataGrid();
	});
	
	//初始化弹出框
	$('#user_detail_dialog').dialog({
		buttons:[{
			text:'Close',
			handler:function(){
				$('#user_detail_dialog').dialog('close');
			}
		}]
	});
	
	//初始化表格
	initDataGrid();
	
	$('#data_add').click(function(){
	    $('#user_detail_form')[0].reset();
		$('#id').val('');
	   // $('#base_table').datagrid('selectRecord',id); 
		var rowInfo =  $('#base_table').datagrid('getSelected');
		if(rowInfo && rowInfo.CODE != null){
		$('#fzcode').val(rowInfo.CODE);
		$('#user_detail_dialog1').dialog('open');
		}
	});
	
	$('#user_detail_dialog1').dialog({
		buttons:[{
			text:'Indeed set',
			handler:function(){
				submit_model_window();
			}
		},{
			text:'cancel',
			handler:function(){
				$('#user_detail_dialog1').dialog('close');
			}
		}]
	});
});


function submit_model_window(){
	var str1=$("#min_age").val().trim();
	var str2=$("#max_age").val().trim();	
	if(str1.length!=0&&str2.length!=0){
		var reg=/^[0-9]*$/;
		if(reg.test(str1)&&reg.test(str2)){
			
		}else{
			$.messager.alert(titleInfo,'Age is invalid');
			return;
		}
	}else{
		$.messager.alert(titleInfo,'Please input age!');
		return;
		}
	
	if($("#fzcode").val()==null || $("#fzcode").val()==""){
		$.messager.alert(titleInfo,'Please enter the index code!');
		return;
	}

	if($("#min_age").val()==null || $("#min_age").val()==""){
		$.messager.alert(titleInfo,'Please enter the minimum age!');
		return;
	}
	
	if($("#max_age").val()==null || $("#max_age").val()==""){
		$.messager.alert(titleInfo,'Please enter the maximum age!');
		return;
	}
	
	if($("#min_fz").val()==null || $("#min_fz").val()==""){
		$.messager.alert(titleInfo,'Input index minimum threshold!');
		return;
	}
	
	if($("#max_fz").val()==null || $("#max_fz").val()==""){
		$.messager.alert(titleInfo,'Input index maximum threshold!');
		return;
	}
	
	var formdata = $.serializeObject($("#user_detail_form"));
	var fzid=$("#fzid").val();
    if(fzid != null && fzid != ""){
    	 /* if($("#min_age").val()>$("#max_age").val()){
    		$.messager.alert(titleInfo,'The maximum age can not be smaller than the minimum age!');
    		return;
    	}else{ */ 
    	$.post("vipInspectConfigFz/update.json",formdata,function(data){
			if(data.code==1){
				$('#user_detail_dialog1').dialog('close');
				$.messager.show({title:titleInfo,msg:'Updated！',timeout:timeoutValue,showType:'slide'});
				$('#base_detail_table').datagrid('reload',parameter2); 
			}else{
				$.messager.alert(titleInfo,data.msg);
			}
			$('#user_detail_dialog1').dialog('close');
		},"json");
    	/* } */
     }else{
    	/*  if($("#min_age").val()>$("#max_age").val()){
    			$.messager.alert(titleInfo,'The maximum age can not be smaller than the minimum age!');
    			return;
    		}else{ */
		$.post("vipInspectConfigFz/save.json",formdata,function(data){
			if(data.code==1){
				$('#user_detail_dialog1').dialog('close');
				$.messager.show({title:titleInfo,msg:'Added！',timeout:timeoutValue,showType:'slide'});
				$('#base_detail_table').datagrid('reload',parameter2);
			}else{
				$.messager.alert(titleInfo,data.msg);
			}
			$('#user_detail_dialog1').dialog('close');
		},"json");
		/* } */
	  } 
}

/* function radiocheck(value){
	if(value == '0'){
		$("input[type=radio][value='0']").attr("checked","checked");
		$("input[type=radio][value='1']").removeAttr("checked");
	}else if(value == '1'){
		$("input[type=radio][value='1']").attr("checked","checked");
		$("input[type=radio][value='0']").removeAttr("checked");
	} */
//用js验证阈值列表中的最大年龄和最小年龄是否符合规则
/* function IsNum(){
	var str1=document.getElementByName('age_min').value.trim();
	var str2=document.getElementByName('age_max').value.trim();
	if(str1.length!=0&&str2.length!=0){
		var reg=/^[0-9]*$/;
		if(reg.test(str)&&reg.test(str)){
			
		}else{
			$.messager.alert(titleInfo,'Age is invalid');
		}
	}else{
		$.messager.alert(titleInfo,'Please input age!');
		} 
} */

/** Initialize data form */
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
		url:'vipInspectConfig/list.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'ID',
		columns:[[
			{field:'INSPECT_CODE',title:'Detection coding',width:100},
		    {field:'CODE',title:'Code',width:100},
		    {field:'NAME',title:'Name',width:100},
		    {field:'KPI_MIN',title:'Maximum threshold index',width:100},
		    {field:'KPI_MAX',title:'Minimum threshold index',width:100} ,
		    {field:'UNIT',title:'Company',width:100},
			{field:'ID',title:'Operation',width:120,
				formatter:function(value,row){ 
					/* if(row.CHILD){ */
						return  '<a href="javascript:openedit('+value+')">Threshold list</a>';
					/* } */
					/* return ""; */
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
	<div data-options="region:'center',title:'Detection index query'" class="regionCenter">
		<div id="common_search" class="common_search common_search_nopadding">	
		 <form action="" id="query_form">		
		&nbsp;&nbsp;&nbsp;&nbsp;Detection coding&nbsp;&nbsp;<input type="text" id="FIT-LIKE-inspect_code" name="FIT-LIKE-inspect_code"/>
        &nbsp;&nbsp;&nbsp;&nbsp;Index coding&nbsp;&nbsp;<input type="text" id="FIT-LIKE-code" name="FIT-LIKE-code"/>
		&nbsp;&nbsp;&nbsp;&nbsp;Index name&nbsp;&nbsp;<input type="text" id="FIT-LIKE-name" name="FIT-LIKE-name"/>
		 <button type="button" id="auth_search" 
				class="btn btn-success btn-success-min"><i class="icon-search"></i>&nbsp;query</button>
		<!-- <button type="button"
				id="auth_reset" class="btn btn-success btn-success-min"><i class="icon-refresh"></i>&nbsp;Reset</button> -->
		<!-- <button type="button" id="data_add" class="btn btn-success"><i class="icon-plus"></i>&nbsp;Add</button> -->
		 </form>
		</div>
		<table id="base_table"></table>
        <div id="editfrom_dialog"></div>
	</div>
	
	<div id="user_detail_dialog" data-options="closed:true,modal:true,title:'Threshold list'" style="padding: 5px; width: 700px; height: 400px;">
		<button type="button" id="data_add" class="btn btn-success"><i class="icon-plus"></i>&nbsp;Add</button>
		 
		<table id="base_detail_table"></table>
    </div>
    <div id="user_detail_dialog1" data-options="closed:true,modal:true,title:'Threshold detail',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 400px;">
         <form action="vipInspectConfigFz/list.json" id="user_detail_form">
          <input type="hidden" id="fzid" name="id" />
           <table style="margin-left: 10px">
             <tr id="code_tr" >
				<td>Index coding</td>
				<td>
				<input style="width: 200px;" type="text" value="" id="fzcode" name="kip_code" readonly="readonly"/>
				</td>
			</tr>
			<tr id="sex_tr" >
				<td>Gender</td>
				<td >
				<!-- <input type="hidden" name="sex" value="1" id="sex1"/>male
				<input type="hidden" name="sex" value="0" id="sex2"/>female -->
				<select id="sex" name="sex">
                <option value="1">male</option>
				<option value="0">female</option>
                </select>
				</td>
			</tr>
			<tr id="age_tr" >
				<td>Minimum age</td>
				<td>
				<input style="width: 200px;" type="text" id="min_age" name="age_min" />
				</td>
			</tr>
			<tr id="age_tr1" >
				<td>Maximum age</td>
				<td>
				<input style="width: 200px;" type="text" id="max_age" name="age_max" />
				</td>
			</tr>
			<tr id="min_fz_tr" >
				<td>Index minimum threshold</td>
				<td>
				<input style="width: 200px;" type="text" id="min_fz" name="fz_min" />
				</td>
			</tr>
			<tr id="max_fz_tr" >
				<td>Index maximum threshold</td>
				<td>
				<input style="width: 200px;" type="text" id="max_fz" name="fz_max" />
				</td>
			</tr>
           </table>
          </form>
    </div>
</body>
</html>