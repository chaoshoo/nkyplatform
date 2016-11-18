<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
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
<script type="text/javascript" src="<%=basePath%>js/common/jquery/datagrid-detailview.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/common.js"></script>
<script type="text/javascript" src="<%=basePath%>js/form.js"></script>
<script type="text/javascript" src="<%=basePath%>js/openDialog.js"></script>
<style type="text/css">
.tabs-title {
    font-size: 14px !important;
    font-weight: bold;
}
.Tab{border-collapse:collapse; text-align:left;margin-top:5px;font-size:13px;}  
.Tab td{ border:#CCCCCC 1px solid}  
</style>
<script type="text/javascript">
var parameter = {};
var dataForm={};
var add = true; 

var parameter2 = {};
var parametertmp = {};//推送结果集的
/* 尿酸历史数据*/
function questionsDatasC06Grid(card_code){
	$('#C06_datas_table').datagrid({
		nowrap: true,
		striped: true,
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'vip/listc06.json',
		queryParams:{"FIT-EQ-card_code":card_code,"FIT-EQ-inspect_code":"C06"},
		//param.put("EQ-card_code","");
		//param.put("EQ-inspect_code","C06"); 
		remoteSort: false,
		singleSelect:true,
        autoRowHeight: true,
        loadMsg: '请稍等...', 
		idField:'ID',
		columns:[[
		          {field:'LEU',title:'白细胞',width:50},
		          {field:'NIT',title:'亚硝酸盐',width:50},
		          {field:'UBG',title:'尿胆原',width:50},
		          {field:'PH',title:'酸碱度',width:50},
		          {field:'BLD',title:'葡萄糖',width:50},
		          {field:'GLU',title:'白细胞',width:50},
		          {field:'KET',title:'酮体',width:50},
		          {field:'PRO',title:'蛋白质',width:50},
		          {field:'BIL',title:'胆红素',width:50},
		          {field:'VC',title:'维生素',width:50},
		          {field:'SG',title:'比重',width:50}, 
				  {field:'INSPECT_TIME',title : '检测时间',width : 100,formatter : function(value) {return getTimeStr(value);  } }
		]],
		pagination:true,
		rownumbers:true 
	});  
	$('#user_inspect_detail_dialog_C06').dialog('open');
}

/*  
   咨询"  id="questions_datas"> 		questions_datas_table
消息"  id="messages_datas">   messages_datas_table
*/
function questionsDatasDGrid(id){
	$('#questions_datas_table_d').datagrid({
		nowrap: true,
		striped: true,
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'vipquestionslogquery/list.json',
		queryParams:{"FIT-EQ-vip_questions_id":id},
		remoteSort: false,
		singleSelect:true,
        autoRowHeight: true,
        loadMsg: '请稍等...', 
		idField:'ID',
		columns:[[
			{field:'ANSWER_CODE',title:'客户或医生',width:100,
				formatter : function(value) {
					//if(obj.substring(0,4) == "idiv")
					if(value != null && value!='' && value.length > 0){
						if(value.substring(0,1) == "V" || value.substring(0,1) == "v" ){
							return "客户";
						}else if(value.substring(0,1) == "D" || value.substring(0,1) == "d" ){
							return "医生";
						} 
					}
					return "";
				}
			}
			,{field:'ANSWER_CONTENT',title:'内容',width:300}
			,{field :'CREATE_TIME',title : '创建时间',width : 100,formatter : function(value) {return getTimeStr(value);  } }
		]],
		pagination:true,
		rownumbers:true 
	});  
	$('#user_inspect_detail_dialog_d2').dialog('open');
}

function questionsDatasGrid(vipCode){
	$('#questions_datas_table').datagrid({
		nowrap: true,
		striped: true,
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'vipquestionsquery/list.json',
		queryParams:{"FIT-EQ-i.vip_code":vipCode},
		remoteSort: false,
		singleSelect:true,
        autoRowHeight: true,
        loadMsg: '请稍等...',
		idField:'ID',
		columns:[[
		          //SELECT i.id,i.vip_code,i.doctor_code,d.name,i.order_time,i.affirm_time,i.isZd,i.isDeal,i.zd_begin_time,i.zd_end_Time,i.create_time
			{field:'VIP_CODE',title:'会员编码',width:100}
			,{field:'NAME',title:'医生',width:100}
			,{field:'TITLE',title:'标题',width:150}
		    ,{field:'CONTENT',title:'内容',width:200} 
			,{field :'CREATE_TIME',title : '创建时间',width : 100,formatter : function(value) {return getTimeStr(value);  } }
			,{field :'STATUS',title : '是否咨询',width : 100,formatter : function(value) {
				if(null != value && value == "1"){
					return "已咨询";
				}else{
					return "未咨询";
				}
			} }
/* 			//7：咨询 标记是否咨询  详情不需要
			,{field:'ID',title:'操作',width:120,
				formatter:function(value,row){ 
					return  '<a href="javascript:questionsDatasDGrid(\''+row.ID+'\')" >详情</a>';
					//return '<a href="javascript:initPassWord('+value+')">初始化密码</a> <a href="javascript:userEdit('+value+')">编辑</a> <a   onclick="del('+value+')" ><font color="red">删除</font></a>';
				}
			} */
		]],
		pagination:true,
		rownumbers:true 
	});  
}

var msgTmpJson = [];
var msgTmpJsons = [];

function onselecttmp(){
	var id = $("#msg-msg_template_select").val();
	if(id == 0){
		$("#msg-msg_type").val(0);   
		$("#msg_title").val("");   
		$("#msg_content").val("");
	}
	for(var o in msgTmpJson){  
        if(msgTmpJson[o].id == id){
			$("#msg-msg_type").val(msgTmpJson[o].msg_type);   
			$("#msg_title").val(msgTmpJson[o].title);   
			$("#msg_content").val(msgTmpJson[o].content);
        } 
      }  
}

function onselecttmps(){
	var id = $("#msgs-msg_template_select").val();
	if(id == 0){
		$("#msgs-msg_type").val(0);   
		$("#msgs_title").val("");   
		$("#msgs_content").val("");
	}
	for(var o in msgTmpJsons){  
        if(msgTmpJsons[o].id == id){
			$("#msgs-msg_type").val(msgTmpJsons[o].msg_type);   
			$("#msgs_title").val(msgTmpJsons[o].title);   
			$("#msgs_content").val(msgTmpJsons[o].content);
        } 
      }  
}

/**
 * 更新页面查询处的标签.
 */
function refreshSearchTag(){
	$("#group-tag-list_select").empty();  
	$("<option value='' >--请选择--</option>").appendTo("#group-tag-list_select")//添加下拉框的option
	$.ajax({ 
          type : "post", 
          url : "vip/tags/@all.json?rand ="+Math.random(), 
          async : false, 
          dataType : "json",  
          success : function(data){ 
        	  if(data.code==1 && data.categories != null && data.categories.length >0){
      			for(var o in data.categories){   
      				$("<option value='"+data.categories[o].id+"' >"+data.categories[o].name +"</option>").appendTo("#group-tag-list_select")//添加下拉框的option
      		    }  
      		}
          } 
    }); 
}

/**
 * 消息模版查询   msg-msg_template_select 
 */
function messagesTmpGrid(id){ 
	$("#msg-msg_template_select").empty();
	msgTmpJson =[];
	//msg-msg_template_select 
	$.ajax({ 
          type : "post", 
          url : "vip/messagetmp.json?rand ="+Math.random(), 
          async : false, 
          dataType : "json",  
          success : function(data){ 
        	  if(data.code==1 && data.categories != null && data.categories.length >0){
      			$("<option value='0'>--请选择模版--</option>").appendTo("#msg-msg_template_select")//添加下拉框的option
      			for(var o in data.categories){  
      				var obj = {};
      				obj.id = data.categories[o].id;
      				obj.msg_type = data.categories[o].msg_type;
      				obj.title = data.categories[o].title;
      				var tmpTitle =  data.categories[o].title;
      				if(data.categories[o].title.length>15){
      					tmpTitle = tmpTitle.substring(0,15);
      				}
      				obj.content = data.categories[o].content;
      				msgTmpJson.push(obj);
      				$("<option value='"+data.categories[o].id+"' >"+tmpTitle +"</option>").appendTo("#msg-msg_template_select")//添加下拉框的option
      		    } 
      		}
          } 
    });	
}

/**
 * 消息模版查询   msg-msg_template_select 
 */
function messagesTmpGrids(){ 
	$("#msgs-msg_template_select").empty();
	//msg-msg_template_select 
	msgTmpJsons =[];
	$.ajax({ 
          type : "post", 
          url : "vip/messagetmp.json?rand ="+Math.random(), 
          async : false, 
          dataType : "json",  
          success : function(data){ 
        	  if(data.code==1 && data.categories != null && data.categories.length >0){
      			$("<option value='0'>--请选择模版--</option>").appendTo("#msgs-msg_template_select")//添加下拉框的option
      			for(var o in data.categories){  
      				var obj = {};
      				obj.id = data.categories[o].id;
      				obj.msg_type = data.categories[o].msg_type;
      				obj.title = data.categories[o].title;
      				var tmpTitle =  data.categories[o].title;
      				if(data.categories[o].title.length>15){
      					tmpTitle = tmpTitle.substring(0,15);
      				}
      				obj.content = data.categories[o].content;
      				msgTmpJsons.push(obj); 
      				$("<option value='"+data.categories[o].id+"' >"+tmpTitle+"</option>").appendTo("#msgs-msg_template_select")//添加下拉框的option
      		    } 
      		}
          } 
    });	
}

/**
 * 消息管理 
 */
function messagesDatasGrid(id){
	$('#messages_datas_table').datagrid({
		nowrap: true,
		striped: true,
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'messagequery/list.json',
		queryParams:{"FIT-EQ-c.reciver":id},
		remoteSort: false,
		singleSelect:true,
        autoRowHeight: true,
        loadMsg: '请稍等...',
		idField:'ID',
		columns:[[
		          //m.id,m.msg_type,m.creator  m.isvalid,m.create_time,c.reciver,c.send_time
			{field:'MSG_TYPE',title:'消息类型',width:100,
				formatter : function(value) {
					if(value !=null || value != '' ){
						if(value == 1){
							return "文本";
						}else if (value == 2){
							return "链接";
						}else{
							return "";
						}
					}else{
						return "";
					}
				}
			}
			,{field:'TITLE',title:'标题',width:150}
		    ,{field:'CONTENT',title:'内容',width:200,formatter : function(value) {
		    		if(value != null && value.length > 20){
		    			return value.substring(0,20)+"...";
		    		}
		    		return value;
		    	} 
		    } 
			/* ,{field :'CREATE_TIME',title : '创建时间',width : 100,formatter : function(value) {return getTimeStr(value);  } } */
			,{field :'SEND_TIME',title : '发送时间',width : 100,formatter : function(value) {return getTimeStr(value);  } }
		    /* ,{field:'ID',title:'操作',width:120,
				formatter:function(value,row){ 
					return  '<a href="javascript:questionsDatasDGrid(\''+row.ID+'\')" >详情</a>';
				}
			} */
		]],
		pagination:true,
		rownumbers:true 
	});  
}

/**远程咨询*/
function remotesDatasDGrid(code){
	$('#remotes_datas_table_d').datagrid({
		nowrap: true,
		striped: true,
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'remoteinspectlogquery/list.json',
		queryParams:{"FIT-EQ-remote_inspect_code":code},
		remoteSort: false,
		singleSelect:true,
        autoRowHeight: true,
        loadMsg: '请稍等...', 
		idField:'ID',
		columns:[[
			{field:'VIP_OR_DOCTOR',title:'客户或医生',width:100,
				formatter : function(value) {
					if(value == 'doc' || value == 'DOC' ){
						return "医生";
					}else if(value == 'vip' || value == 'VIP'){
						return "客户";
					}else{
						return "";
					}
				}
			}
			,{field:'DES',title:'内容',width:100}
			,{field :'CREATE_TIME',title : '创建时间',width : 100,formatter : function(value) {return getTimeStr(value);  } }
		]],
		pagination:true,
		rownumbers:true 
	});  
	$('#user_inspect_detail_dialog_d').dialog('open');
}

function remotesDatasGrid(vipCode){
	$('#remotes_datas_table').datagrid({
		nowrap: true,
		striped: true,
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'remoteinspectquery/list.json',
		queryParams:{"FIT-EQ-i.vip_code":vipCode},
		remoteSort: false,
		singleSelect:true,
        autoRowHeight: true,
        loadMsg: '请稍等...',
		idField:'ID',
		columns:[[
		          //SELECT i.id,i.vip_code,i.doctor_code,d.name,i.order_time,i.affirm_time,i.isZd,i.isDeal,i.zd_begin_time,i.zd_end_Time,i.create_time
			{field:'VIP_CODE',title:'会员编码',width:100},
			{field:'NAME',title:'医生',width:100},
		    {field:'ISZD',title:'是否应诊',width:100,
				formatter : function(value) {
					if(value == 1 ){
						return "处理";
					}else if(value == 0){
						return "不处理";
					}else{
						return "";
					}
				}
			},{field:'ISDEAL',title:'是否处理',width:100,
				formatter : function(value) {
					if(value == 1 ){
						return "处理";
					}else if(value == 0){
						return "不处理";
					}else{
						return "";
					}
				}
			},{field :'ORDER_TIME',title : '预约时间',width : 100,formatter : function(value) {return getTimeStr(value);  } }
			,{field :'AFFIRM_TIME',title : '医生确认时间',width : 100,formatter : function(value) {return getTimeStr(value);  } }
			/* ,{field :'ZD_BEGIN_TIME',title : '诊断开始时间',width : 100,formatter : function(value) {return getTimeStr(value);  } }
			,{field :'ZD_END_TIME',title : '诊断结束时间',width : 100,formatter : function(value) {return getTimeStr(value);  } }
			,{field :'CREATE_TIME',title : '创建时间',width : 100,formatter : function(value) {return getTimeStr(value);  } }
		    ,{field:'REMARK',title:'备注',width:100} 
		     */,{field:'ID',title:'操作',width:120,
				formatter:function(value,row){ 
					return  '<a href="javascript:remotesDatasDGrid(\''+row.CODE+'\')" >详情</a>';
					//return '<a href="javascript:initPassWord('+value+')">初始化密码</a> <a href="javascript:userEdit('+value+')">编辑</a> <a   onclick="del('+value+')" ><font color="red">删除</font></a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true 
	});  
}

//last_inspect_ecg_datas  CARD_CODE 'vipInspectEcg/list.json',
function ecgDatasGrid(cardCode){
	$('#ecg_table').datagrid({
		nowrap: true,
		striped: true,
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'vipInspectEcg/list.json',
		queryParams:{"FIT-EQ-card_code":cardCode},
		remoteSort: false,
		singleSelect:true,
        autoRowHeight: true,
        loadMsg: '请稍等...',
		idField:'ID',
		columns:[[
			  {field:'ANALYZERESULTSTR',title : '检测结果',width : 200 },
			  {field:'INSPECT_TIME',title : '检测时间',width : 100,formatter : function(value) {return getTimeStr(value);  } }
			 ,{field:'ID',title:'操作',width:120,
				formatter:function(value,row){ 
					return  '<a href="<%=basePath%>vip/createEcg/'+row.ID+'.html" target="_blank" >查看</a>';
				}
			}
		]],
		pagination:true,
		rownumbers:true 
	});  
}

function getTimeStr(value){
	if(value == null || value == ""){
		return "";
	}
	var date = new Date(value);
	return formatterDateTime(date);
}


function openmedirec(id)
{
	$('#base_table').datagrid('selectRecord',id);
	var rowInfo =  $('#base_table').datagrid('getSelected');
	if(rowInfo && rowInfo.CARD_CODE != null && rowInfo.VIP_CODE != null)
	{
		/* $('#dialog_medi_record').dialog({
			title: '电子病历',
			width: 800,
			height: 500,
			cache: false,
			href: 'medirec/show.html?vipCode='+rowInfo.VIP_CODE,
			modal: true,
			buttons:[{
				text:'关闭',
				handler:function(){
					$('#dialog_medi_record').panel('close');
				}
			}]
		}); */
		
		window.open('medirec/show.html?vipCode='+rowInfo.VIP_CODE);
	}
}

function openDelete(id){
	$('#base_table').datagrid('selectRecord',id);
	var rowInfo =  $('#base_table').datagrid('getSelected');
	if(rowInfo && rowInfo.ID != null){
	    $.messager.confirm('确认','确认删除?',function(row){  
	        if(row){  
	        	$.post('vip/del.json?id='+rowInfo.ID,function(data){
	    			if(data.code==1){
	    				$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
	    			}else{
	            		//alert("删除失败");
	    				$.messager.alert(titleInfo,data.msg);
	    			}
					dataGridload(parameter); 
	    		},"json"); 
	        }  
	    });
	}
}

//尿酸的数据用表格展示TODO 
//查看最新的检查结果   vipInspectConfigFz 
function openview(id){ //user_inspect_detail_dialog
	$('#base_table').datagrid('selectRecord',id);
	var rowInfo =  $('#base_table').datagrid('getSelected');
	if(rowInfo && rowInfo.CARD_CODE != null && rowInfo.VIP_CODE != null){
		$.post("vip/inspectlatest/"+rowInfo.CARD_CODE+".json",function(data){
			if(data.code==1){
				var htmls = "";
				if(data.categories != null && data.categories.length >0){
					//last_inspect_datas">
					htmls += '<table class="Tab" width="100%">';
					htmls += "<tr><td>名字</td> <td>检测编码</td> <td>检测名字</td> <td>检测值</td> <td>检测时间</td> <td>操作</td> </tr>";
					for(var o in data.categories){  
						//data.categories[o].inspect_value
						
						if(data.categories[o].detail != null && data.categories[o].detail.length >0){
							var tmpI = 1 ; 
							for(var t in data.categories[o].detail){  
								if(tmpI == 1 ){
									htmls += "<tr><td rowspan='"+data.categories[o].detail.length+"'>";
									htmls += ""+data.categories[o].name+"</td><td>";			
								  //指标编码/+data.categories[o].code 
								}else{
									htmls += "<tr><td>";
								}
								htmls +=  data.categories[o].detail[t].code+"</td> <td>"+data.categories[o].detail[t].name+
								"</td><td>"+data.categories[o].detail[t].value+data.categories[o].detail[t].unit+"</td><td>"
								+data.categories[o].detail[t].dateTime+"</td>";
								
								if(tmpI == 1 ){
									if(data.categories[o].code != "C06"){
										//http://114.55.228.245:83/nkyplatform/vipInspectData/inspectchart/420984199109021741/C01/ALL/0-0/0.html 
										htmls += "<td rowspan='"+data.categories[o].detail.length+"'><a href='<%=basePath%>vipInspectData/chartall/"+rowInfo.CARD_CODE+"/"+data.categories[o].code+"/ALL/0-0/0.html' target='_blank'>"+data.categories[o].name +"历史记录</a></td>";										
									}else{
										//console.log("<td rowspan='"+data.categories[o].detail.length+"'><a href='javascript:void(0)' onClick='questionsDatasC06Grid(\'"+ rowInfo.CARD_CODE+"\')'>"+data.categories[o].name +"历史记录</a></td>");
										//<a href="javascript:void(0)" onclick="questionsDatasC06Grid(" 429001198710264633')'="">血氧历史记录</a>
										htmls += "<td rowspan='"+data.categories[o].detail.length+"'><a href='javascript:void(0)' onClick='questionsDatasC06Grid(\""+ rowInfo.CARD_CODE+"\")'>"+data.categories[o].name +"历史记录</a></td>";										
									}
								}
								htmls +="</tr>";
								tmpI = tmpI +1;
							}
						}
					}
				    htmls += '<table>';
				}else{
					 htmls +="<p>暂无数据</p>";
				}
				$("#last_inspect_datas").html(htmls); //TODO 
				$('#user_inspect_detail_dialog').dialog('open'); 
			}else{
				$.messager.alert(titleInfo,"查看失败");
			}
		},"json"); 
		
		ecgDatasGrid(rowInfo.CARD_CODE);
		remotesDatasGrid(rowInfo.VIP_CODE);
		questionsDatasGrid(rowInfo.VIP_CODE);
		messagesDatasGrid(rowInfo.ID);
	}
} 
/**
 * 将数据提交到json
 */
function submit_message_model_window(){
	if($("#msg_cardCode").val()==null || $("#msg_cardCode").val()==""){
		$.messager.alert(titleInfo,'数据不足!');
		return;
	} 
	if($("#msg_title").val()==null || $("#msg_title").val()==""){
		$.messager.alert(titleInfo,'请输入消息标题!');
		return;
	} 
	if($("#msg_content").val()==null || $("#msg_content").val()==""){
		$.messager.alert(titleInfo,'请输入消息内容!');
		return;
	} 
	var formdata = $.serializeObject($("#user_message_detail_form"));
	$.post("vip/message.json",formdata,function(data){
		if(data.code==1){
			$('#user_msg_detail_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'消息已发送！',timeout:timeoutValue,showType:'slide'});
			dataGridload(parameter);
		}else{
			if(null != data.msg && "" != data.msg){
				$.messager.alert(titleInfo,data.msg);
				
			}else{
				$.messager.alert(titleInfo,"消息发送");
			}
		}
	},"json");
} 

function openGroupPush(){//group-tag-list_select
	//FIT-GEQ-age
	var geqAge =$("#FIT-GEQ-age").val();
	if(geqAge != null && geqAge != "" ){
		if((!isPInt(geqAge))){
			$.messager.alert(titleInfo,"请输入合法的年龄");
			return ;
		}else if(geqAge < 1 || geqAge>100){
			$.messager.alert(titleInfo,"请输入合法的年龄段");
			return ;
		}
	}
	var leqAge =$("#FIT-LEQ-age").val();
	if(leqAge != null && leqAge != ""){
		if((!isPInt(leqAge))){
			$.messager.alert(titleInfo,"请输入合法的年龄");
			return ;
		}else if(leqAge < 1 || leqAge>100){
			$.messager.alert(titleInfo,"请输入合法的年龄段");
			return ;
		}
	}
	parametertmp = $.serializeObject($("#query_form"));
	$.post("vip/list.json",parametertmp,function(data){
		if(data!=null && data.total != null && data.total > 0){
			messagesTmpGrids();
			$('#msgs_groupname').html(data.total);//这里现在显示人说
			$('#msgs_total').val(data.total);
			$('#users_msg_detail_dialog').dialog('open');
		}else{
			$.messager.alert(titleInfo,"结果集为空，无需推送消息.");
		}
	},"json");
}

/**会员新增*/
function openNew(){
	document.getElementById("users_new_form").reset(); 
	if(initAreaFlag && areaJsons != []  && areaJsons.length > 0){
    	$("<option value='0'>--请选择--</option>").appendTo("#un_AREA")//添加下拉框的option
		for(var o in areaJsons){  
			$("<option value='"+areaJsons[o].id+"' >"+areaJsons[o].name +"</option>").appendTo("#un_AREA")//添加下拉框的option
	    }  
	} 
	$('#users_new_dialog').dialog('open');
}

/**
 * 将数据提交到json
 */
function submits_usernew_window(){
	if($("#un_LOGIN_ACCOUNT").val()==null || $("#un_LOGIN_ACCOUNT").val()==""){
		$.messager.alert(titleInfo,'请输入登录账户!');
		return;
	} 
	if($("#un_NICK_NAME").val()==null || $("#un_NICK_NAME").val()==""){
		$.messager.alert(titleInfo,'请输入会员昵称!');
		return;
	}  
	if($("#un_REAL_NAME").val()==null || $("#un_REAL_NAME").val()==""){
		$.messager.alert(titleInfo,'请输入真实姓名!');
		return;
	}  
	if($("#un_MOBILE").val()==null || $("#un_MOBILE").val()==""){
		$.messager.alert(titleInfo,'请输入手机号!');
		return;
	}  
	//birthday
	if($("#users_new_form input[name='birthday']").val()==null || $("#users_new_form input[name='birthday']").val()==""){
		$.messager.alert(titleInfo,'请输入出生日期!');
		return;
	}  
	if($("#un_AGE").val()==null || $("#un_AGE").val()==""){
		$.messager.alert(titleInfo,'请输入年龄!');
		return;
	}  
	if($("#un_PAPERS_NUM").val()==null || $("#un_PAPERS_NUM").val()==""){
		$.messager.alert(titleInfo,'请输入证件号码!');
		return;
	}
	
	var formdata = $.serializeObject($("#users_new_form"));
	$.post("vip/save.json?rand ="+Math.random(),formdata,function(data){
		if(data.code==1){
			$('#users_new_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'新增成功！',timeout:timeoutValue,showType:'slide'});
			dataGridload(parameter);
		}else{
			if(data.code != null){
				$.messager.alert(titleInfo,data.msg);
			}else{
				$.messager.alert(titleInfo,"新增失败");
			}
		}
	},"json");
}  

/**
 * 将数据提交到json
 */
function submits_message_model_window(){
	if($("#msgs_title").val()==null || $("#msgs_title").val()==""){
		$.messager.alert(titleInfo,'请输入消息标题!');
		return;
	} 
	if($("#msgs_content").val()==null || $("#msgs_content").val()==""){
		$.messager.alert(titleInfo,'请输入消息内容!');
		return;
	} 
	var formdata = $.serializeObject($("#users_message_detail_form"));
	$.extend(formdata, parametertmp);
	$.post("vip/message.json",formdata,function(data){
		if(data.code==1){
			$('#users_msg_detail_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'推送成功！',timeout:timeoutValue,showType:'slide'});
			dataGridload(parameter);
		}else{
			$.messager.alert(titleInfo,"消息发送失败");
		}
	},"json");
}  

//推送消息 
function openmessage(id){  
	$('#base_table').datagrid('selectRecord',id);
	var rowInfo =  $('#base_table').datagrid('getSelected');
	if(rowInfo  && rowInfo.CARD_CODE != null && rowInfo.CARD_CODE != "" ){
		$('#msg_cardCode').val(rowInfo.CARD_CODE); 
		messagesTmpGrid(rowInfo.ID);
		$('#user_msg_detail_dialog').dialog('open');
	} 
}

var areaJsons = [];
var initAreaFlag = false;
function initArea(){
	//查询所有的区域
	areaJsons =[];
	$.ajax({ 
          type : "post", 
          url : "vip/area.json?rand ="+Math.random(), 
          async : false, 
          dataType : "json",  
          success : function(data){ 
        	  if(data.code==1 && data.categories != null && data.categories.length >0){
      			for(var o in data.categories){  
      				var obj = {};
      				obj.id = data.categories[o].id;
      				obj.name = data.categories[o].name;
      				areaJsons.push(obj); 
      		    } 
      			initAreaFlag = true;
      		}
          } 
    });
}

if(!initAreaFlag){
	initArea();
}

//修改
function openedit(id){
	$('#base_table').datagrid('selectRecord',id);
	var rowInfo =  $('#base_table').datagrid('getSelected');
	if(initAreaFlag && areaJsons != []  && areaJsons.length > 0){
    	$("<option value='0'>--请选择--</option>").appendTo("#u_AREA")//添加下拉框的option
		for(var o in areaJsons){  
			$("<option value='"+areaJsons[o].id+"' >"+areaJsons[o].name +"</option>").appendTo("#u_AREA")//添加下拉框的option
	    }  
	} 

	$(".usergroupIdClass").each(function (i){
		$(this).checked = false; //.prop("checked",false);
	});
	
	if(rowInfo){
		//设置弹出框信息 
		$('#u_ID').val(rowInfo.ID);
		$('#u_VIP_CODE').val(rowInfo.VIP_CODE);
		$('#u_CARD_CODE').val(rowInfo.CARD_CODE);
		$('#u_LOGIN_ACCOUNT').val(rowInfo.LOGIN_ACCOUNT);
		$('#u_NICK_NAME').val(rowInfo.NICK_NAME);
		$('#u_REAL_NAME').val(rowInfo.REAL_NAME);
		$('#u_MOBILE').val(rowInfo.MOBILE); 
		$('#u_PAPERS_TYPE').val(rowInfo.PAPERS_TYPE); 
		$('#u_PAPERS_NUM').val(rowInfo.PAPERS_NUM);  
		$('#u_WEIGHT').val(rowInfo.WEIGHT);  
		$('#u_HEIGHT').val(rowInfo.HEIGHT);   
		$('#u_AGE').val(rowInfo.AGE);  
		$('#u_ILL_HISTORY').val(rowInfo.ILL_HISTORY);  
		$('#u_GM').val(rowInfo.GM);  
		$('#u_PHONE').val(rowInfo.PHONE);  
		$('#u_POST_CODE').val(rowInfo.POST_CODE);     
		$('#u_ISVALID').val(rowInfo.ISVALID);       //u_ISVALID 
		$('#u_SEX').val(rowInfo.SEX);   
		$('#u_ACCOUNT_MAIL').val(rowInfo.ACCOUNT_MAIL);     
		$('#u_BIRTHDAY').val(rowInfo.BIRTHDAY);      
		$('#u_QQ').val(rowInfo.QQ);      
		
		$('#u_AREA').val(rowInfo.AREA);    //还要获取下拉列表TODO 
		$('#u_ADDRESS').val(rowInfo.ADDRESS);	
		
		$('#ub_vip_id').val(rowInfo.ID);//TODO 这里写入慢病表，这里考虑是不是可以放到一个对象中
		$('#ub_ischronic').val(0);
		$('#ub_ill_name').val("");
		$('#ub_inspect_time').val("");
		$('#ub_ill_med').val("");
		//$('.chronic_type').attr('checked','checked'); 

		var arr = $('.chronic_type');//$(':checkbox').attr('checked',''); 
		for(var i=0;i<arr.length;i++){
			arr[i].checked = "";
		} 
		var arr2 = $('.ill_type');//$(':checkbox').attr('checked',''); 
		for(var i=0;i<arr2.length;i++){
			arr2[i].checked = "";
		} 
  			
		$.post('vip/getmb/'+rowInfo.ID+'.json',function(data){
      	 	if(data.code==1 && data.obj != null && data.obj.vip_id != null){
      			$('#ub_ischronic').val(data.obj.ischronic);
      			$('#ub_ill_name').val(data.obj.ill_name);
      			$('#ub_inspect_time').val(data.obj.inspect_timeStr);
      			$('#ub_inspect_time').datetimebox('setValue', data.obj.inspect_timeStr);
      			
      			$('#ub_ill_med').val(data.obj.ill_med);
      			$('#ub_yb_type').val(data.obj.yb_type);

      			if(data.obj.ill_type != null && data.obj.ill_type.length > 0){
      				var arr3 = $('.ill_type'); 
      				var tmps = ","+data.obj.ill_type+",";
          			for(var i=0;i<arr3.length;i++){
          				if(tmps.indexOf(","+$(arr3[i]).attr("value")+",")>=0 ){
							arr3[i].checked = "checked";
						}
          			} 
      			}
   				if(data.obj.chronic_type != null && data.obj.chronic_type.length > 0){
   					var arr4 = $('.chronic_type'); 
    				var tmps2 = ","+data.obj.chronic_type+",";
        			for(var i=0;i<arr4.length;i++){
        				if(tmps2.indexOf(","+$(arr4[i]).attr("value")+",")>=0 ){
        					arr4[i].checked = "checked";
						}
         			} 
      			} 
			} 
		},"json"); 
		
		$("#tags_ids").html("<span style='color:red'>暂无</span>");
		$("#group-list_select").empty(); 
		$("#group_vipCode").val("");
		
		$('#base_table').datagrid('selectRecord',id);
		var rowInfo =  $('#base_table').datagrid('getSelected');
		
		$("#group_vipCode").val(rowInfo.VIP_CODE);//save
		refreshTag(rowInfo.VIP_CODE,true);
	}
}

/**
 * 更新弹出的标签. 标签更新完后再打开弹出窗口
 */
function refreshTag(VIP_CODE,open){
	$("#tags_ids").html("");
	$("#group-list_select").empty();  
	
	$.ajax({ 
          type : "post", 
          url : "vip/tags/"+VIP_CODE+".json?rand ="+Math.random(), 
          async : false, 
          dataType : "json",  
          success : function(data){ 
        	  if(data.code==1 && data.categories != null && data.categories.length >0){
        		//var hs = "";
      			for(var o in data.categories){   
      				//console.log(data.categories[o]);
      				$("#usergroupId"+data.categories[o].id).prop("checked",false);
      				if(data.categories[o].group){
      					//console.log("usergroupId"+data.categories[o].id +" check true");
          				$("#usergroupId"+data.categories[o].id).attr("checked",true);
          				$("#usergroupId"+data.categories[o].id).prop("checked",true);
      				}else{
      					//console.log("usergroupId"+data.categories[o].id +" check null");
      				}
      		    } 
      			/* $("#tags_ids").html(hs);
      			if(hs == ""){
          			$("#tags_ids").html("<span style='color:red'>暂无</span>");
      			} */
      		}

      		$('#user_detail_dialog').dialog('open'); 
      		//console.log("open");
          } 
    });	
	/* if(open){
		$('#user_group_detail_dialog').dialog('open');
	} */
}


//客户打标签 
function addtag(){
	var vipCode = $("#group_vipCode").val();
	var tagids  = "tags";
	if(vipCode == null || vipCode == ""  ){
		$.messager.alert(titleInfo,"设置群组失败，数据不全");
		return "";
	}
	
	$(".usergroupIdClass").each(function (i){
		if($(this).is(':checked')){
			tagids +=","+ $(this).attr("value");
		}
	});
	
	$.ajax({ 
      type : "post", 
      url : "vip/addtag/"+tagids+"/"+vipCode+".json?rand ="+Math.random(), 
      async : false, 
      dataType : "json",  
      success : function(data){ 
    	  	if(data.code==1 ){
    	  		$.messager.show({title:titleInfo,msg:'设置群组成功！',timeout:timeoutValue,showType:'slide'});
  		}else{
	  			$.messager.show({title:titleInfo,msg:'设置群组失败！',timeout:timeoutValue,showType:'slide'});
				//$.messager.alert(titleInfo,"添加失败");
  		}
      } 
});	
}



/**
 * 数据表格刷新
 * @param param
 */
function dataGridload(param){
	$('#base_table').datagrid('reload');
}

function updateStatus(code){  //删除操作  
	var id = $('#u_ID').val();
	var status =$("#u_ISVALID").val();
	
	$.post('vip/updateStatus/'+id+'/'+status+'.json',function(data){
		if(data.code==1){
			$.messager.show({title:titleInfo,msg:'更新状态成功！',timeout:timeoutValue,showType:'slide'});
		}else{ 
			$.messager.alert(titleInfo,data.msg);
		}
		dataGridload(parameter); 
	},"json"); 
  }  

/**
 * 将数据提交到json
 */
function submit_model_window(){ 
	var formdata = $.serializeObject($("#user_detail_form"));
	$.post("vip/update.json",formdata,function(data){
		if(data.code==1){
			$('#detail_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'更新成功！',timeout:timeoutValue,showType:'slide'});
			dataGridload(parameter);
		}else{
			$.messager.alert(titleInfo,data.msg);
		}
	},"json");
}  

/**
 * 将数据提交到json
 */
function submit_model_windowmb(){ 
	var formdata = $.serializeObject($("#user_detail_form2"));
	$.post("vip/updatemb.json",formdata,function(data){
		if(data.code==1){
			$('#detail_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'更新成功！',timeout:timeoutValue,showType:'slide'});
		}else{
			$.messager.alert(titleInfo,data.msg);
		}
	},"json");  
}  

//正整数
function isPInt(str) {
	var g = /^[1-9]*[1-9][0-9]*$/;
	return g.test(str);
}
$(function() {
	//条件查询
	$("#auth_search").click(function(){
		//FIT-GEQ-age
		var geqAge =$("#FIT-GEQ-age").val();
		if(geqAge != null && geqAge != "" ){
			if((!isPInt(geqAge))){
				$.messager.alert(titleInfo,"请输入合法的年龄");
				return ;
			}else if(geqAge < 1 || geqAge>100){
				$.messager.alert(titleInfo,"请输入合法的年龄段");
				return ;
			}
		}
		var leqAge =$("#FIT-LEQ-age").val();
		if(leqAge != null && leqAge != ""){
			if((!isPInt(leqAge))){
				$.messager.alert(titleInfo,"请输入合法的年龄");
				return ;
			}else if(leqAge < 1 || leqAge>100){
				$.messager.alert(titleInfo,"请输入合法的年龄段");
				return ;
			}
		}
		parameter = $.serializeObject($("#query_form"));
		initDataGrid();
		parameter = {};
		
	});
	$("#auth_reset").click(function(){
		$("#FIT-LIKE-vip_code").val("");
		$("#FIT-LIKE-doctorc").val("");
		$("#FIT-LIKE-doctor").val("");
		$("#FIT-GEQ-age").val("");
		$("#FIT-LEQ-age").val("");
		initDataGrid();
	});
	
	//初始化弹出框
	$('#user_detail_dialog').dialog({});
	/* $('#user_detail_dialog').dialog({
		buttons:[
       	<c:if test="${currentUser.roles eq '3'}">
		   {
			text:'更新',
			handler:function(){
				submit_model_window();
			}
		},</c:if>
		{
			text:'取消',
			handler:function(){
				$('#user_detail_dialog').dialog('close');
			}
		}]
	}); */
	
	//初始化弹出框
	$('#user_msg_detail_dialog').dialog({
		buttons:[{
			text:'推送消息',
			handler:function(){
				submit_message_model_window();
			}
		},{
			text:'取消',
			handler:function(){
				$('#user_msg_detail_dialog').dialog('close');
			}
		}]
	});
	
	//初始化弹出框
	$('#users_msg_detail_dialog').dialog({
		buttons:[{
			text:'推送消息',
			handler:function(){
				submits_message_model_window();
			}
		},{
			text:'取消',
			handler:function(){
				$('#users_msg_detail_dialog').dialog('close');
			}
		}]
	});
	
	//初始化弹出框
	$('#users_new_dialog').dialog({
		buttons:[{
			text:'新增',
			handler:function(){
				submits_usernew_window();
			}
		},{
			text:'取消',
			handler:function(){
				$('#users_new_dialog').dialog('close');
			}
		}]
	});
	
	//初始化弹出框
	$('#user_group_detail_dialog').dialog({
		buttons:[{
			text:'取消',
			handler:function(){
				$('#user_group_detail_dialog').dialog('close');
			}
		}]
	});
	
	//初始化弹出框
	$('#user_inspect_detail_dialog').dialog({
		buttons:[ {
			text:'关闭',
			handler:function(){
				$('#user_inspect_detail_dialog').dialog('close');
			}
		}]
	});

	//初始化弹出框
	$('#user_inspect_detail_dialog_d').dialog({
		buttons:[ {
			text:'关闭',
			handler:function(){
				$('#user_inspect_detail_dialog_d').dialog('close');
			}
		}]
	});
	
	//初始化弹出框
	$('#user_inspect_detail_dialog_d2').dialog({
		buttons:[ {
			text:'关闭',
			handler:function(){
				$('#user_inspect_detail_dialog_d2').dialog('close');
			}
		}]
	});
	
	//初始化弹出框
	$('#user_inspect_detail_dialog_C06').dialog({
		buttons:[ {
			text:'关闭',
			handler:function(){
				$('#user_inspect_detail_dialog_C06').dialog('close');
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
		url:'vip/list.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'ID',
		columns:[[
		    {field:'VIP_CODE',title:'会员编码',width:50},
		    {field:'CARD_CODE',title:'卡号',width:80},
		    {field:'LOGIN_ACCOUNT',title:'登录账户',width:50}, 
		    {field:'NICK_NAME',title:'会员昵称',width:50}, 
		    {field:'REAL_NAME',title:'真实姓名',width:50}, 
		    {field:'MOBILE',title:'手机号',width:80}, 
		    /* {field:'PAPERS_TYPE',title:'证件类型',width:100},  
		    {field:'PAPERS_NUM',title:'证件号码',width:80}, */
		  /*   {field:'WEIGHT',title:'体重',width:100}, 
		    {field:'HEIGHT',title:'身高',width:100}, 
		    {field:'SEX',title:'性别',width:100}, 
		    {field:'AGE',title:'年龄',width:100}, 
		    {field:'WXOPENID',title:'wxopenid',width:100}, 
		    {field:'ANDROID_TV_CHANNEL_ID',title:'channel_id',width:100},  */
		    /* `heard_img_url` varchar(250) DEFAULT NULL COMMENT '头像地址',
		    `isvalid` tinyint(4) DEFAULT NULL COMMENT '是否有效,1有效,0无效', 
		    `account_mail` varchar(50) DEFAULT NULL COMMENT '邮箱', 
		    `area` varchar(250) DEFAULT NULL COMMENT '省市区',
		    `address` varchar(250) DEFAULT NULL COMMENT '详细地址',
		    `birthday` varchar(32) DEFAULT NULL COMMENT '出生日期',
		    `post_code` varchar(32) DEFAULT NULL COMMENT '邮编',
		    `phone` varchar(32) DEFAULT NULL COMMENT '固定电话',
		    `ill_history` text COMMENT '病史',
		    `gm` varchar(250) DEFAULT NULL COMMENT '过敏史',
		    `qq` varchar(15) DEFAULT NULL COMMENT 'QQ',
		    `android_tv_token_id` varchar(40) DEFAULT NULL COMMENT 'android_tv_token',
		    `modify_time` datetime DEFAULT NULL COMMENT '修改时间', */
			/* {field : 'CREATE_TIME',title : '创建时间',width : 100,
				formatter : function(value) {
					var date = new Date(value);
					return formatterDateTime(date);
				}
			}, */
			{field:'ID',title:'操作',width:150,
				formatter:function(value,row){  
					//'<a href="javascript:openedit('+value+')">修改</a> &nbsp;<a onclick="javascript:del(\''+row.CODE+'\')" ><font color="red">删除</font></a>';
					var hm = '<a href="javascript:openedit('+value+')">详情</a>&nbsp;<a href="javascript:openview('+value+')">检测情况</a>&nbsp;<a href="javascript:openmessage('+value+')">推消息</a>&nbsp;<a href="javascript:openmedirec('+value+')">电子病历</a>&nbsp;<a href="javascript:openDelete('+value+')">删除</a>&nbsp;';
					return hm;
				}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	}); 
}

$(document).ready(function(e) {
	$('#user_inspect_detail_tab').tabs({  
	     border:false  
	 }); 
	
	//如果是医生，加载医生当前的标签
    <c:if test="${currentUser.roles eq '3'}">
		refreshSearchTag();
  	</c:if>
  	
});
</script>
</head>
<body class="easyui-layout">
	<div data-options="region:'center',title:'客户查询'" class="regionCenter">
		<div id="common_search" class="common_search common_search_nopadding">	
		 <form action="" id="query_form">		
			客户编码&nbsp;<input type="text" id="FIT-LIKE-vip_code" name="FIT-LIKE-vip_code"/>
			&nbsp;姓名&nbsp;<input type="text" id="FIT-LIKE-real_name" name="FIT-LIKE-real_name"/>
			&nbsp;电话&nbsp;<input type="text"  style="width: 100px;"  id="FIT-LIKE-mobile" name="FIT-LIKE-mobile"/>
			&nbsp;年龄范围:<input type="text" style="width: 40px;" id="FIT-GEQ-age" name="FIT-GEQ-age"/>
			-<input type="text" style="width: 40px;" id="FIT-LEQ-age" name="FIT-LEQ-age"/>
       <!-- hospitals 2B C 标签-->
       	<c:if test="${currentUser.roles eq '1'}">
       	<br/>&nbsp;医院:<select id="FIT-EQ-hospital" name="FIT-EQ-hospital">
			      <option value="">-请选择-</option> 
			      <c:forEach var="item" items="${hospitals}">
							<option value="${item[0]}"><c:out value="${item[1]}" /></option>
				  </c:forEach>
				</select> 
       	</c:if>
       	<!-- 医生的检索，是管理员或医院才可以看的 -->
       	<c:if test="${currentUser.roles eq '2' or currentUser.roles eq '1'}">
         	&nbsp; 医生编码&nbsp;<input type="text" id="FIT-LIKE-doctorc" name="FIT-LIKE-doctorc"/>  
         	&nbsp;医生名字&nbsp;<input type="text" id="FIT-LIKE-doctor" name="FIT-LIKE-doctor"/>  
         </c:if>
       <%--   <c:if test="${currentUser.roles eq '3'}">
       		&nbsp;&nbsp;客户群组:<select id="group-tag-list_select"  name="FIT-EQ-group"></select>
				<button onclick="openGroupPush();" type="button" class="btn btn-success  ">推送群组消息</button>
       	</c:if> --%>
           <!-- style="padding: 6px 10px !important; " btn-success-min  -->
				
         <c:if test="${currentUser.roles eq '3'}">
          	<c:if test="${not empty dgList}">
	       		<br/>&nbsp; 选择群组:
			      <c:forEach var="item" items="${dgList}">
	       				<input type="checkbox" name="FIT-IN-groupId" value="${item.id }" />&nbsp;${item.name }&nbsp;&nbsp;
				  </c:forEach>
      	 	</c:if> 
       	</c:if>
        <button type="button" id="auth_search"  class="btn btn-success  "><i class="icon-search"></i>&nbsp;查询</button>
		<button onclick="openGroupPush();" type="button" class="btn btn-success">对结果集推送消息</button>
		
         <c:if test="${currentUser.roles eq '3'}">
			<button type="button" onclick="openNew();"  class="btn btn-success"><i class="icon-plus"></i>增&nbsp;加</button>
      	</c:if>
	<!-- 	<button type="button"
				id="auth_reset" class="btn btn-success btn-success-min" style="padding: 6px 10px !important; "><i class="icon-refresh"></i>&nbsp;重置</button> -->
		<!-- <button type="button" id="data_add" class="btn btn-success"><i class="icon-plus"></i>&nbsp;添加</button> -->
		 </form>
		</div>
		<table id="base_table"></table>
        <div id="editfrom_dialog"></div>
 
    <!-- 用户详情,用户能启停， 医生除了身份证和电话都可以修改 --> 
 	<div id="user_detail_dialog" data-options="closed:true,modal:true,title:'客户信息',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 500px;">
		<div id="user_detail_dialog_detail_tab" class="easyui-tabs" style="width:680px;height:420px;"> 
		     <div title="客户基本信息" >
		     	<form action="vip/update.json" id="user_detail_form">
			        <input type="hidden" id="u_ID" name="id" />
			        <table style="margin-left: 10px"> 
						<tr id="code_tr" >
							<td>客户编码</td>
							<td>
								<input style="width: 200px;background: #CCC" type="text" id="u_VIP_CODE" name="vip_code" readonly="readonly" />
							</td> 
							<td>卡号</td>
							<td>
								<input style="width: 200px;" type="text" id="u_CARD_CODE" name="card_code" readonly="readonly" />
							</td>
						</tr>
						<tr id="code_tr" >
							<!-- <td>出生日期</td>
							<td>
								<input style="width: 200px;background: #CCC" type="text" id="u_BIRTHDAY" name="birthday"  readonly="readonly"/>
							</td> -->
							<td>证件号码</td>
							<td>
								<input style="width: 200px;" type="text" id="u_PAPERS_NUM" name="papers_num" />
							</td> 
							<td>手机号</td>
							<td>
								<input style="width: 200px;" type="text" id="u_MOBILE" name="mobile" />
							</td>
						</tr>
						<tr id="code_tr" >
							<td>登录账户</td>
							<td>
								<input style="width: 200px; " type="text" id="u_LOGIN_ACCOUNT" name="login_account" />
							</td> 
							<td>会员昵称</td>
							<td>
								<input style="width: 200px; " type="text" id="u_NICK_NAME" name="nick_name" />
							</td>
						</tr>
						<tr id="code_tr" >
							<td>真实姓名</td>
							<td>
								<input style="width: 200px;" type="text" id="u_REAL_NAME" name="real_name" />
							</td> 
							<!-- <td>手机号</td>
							<td>
								<input style="width: 200px;background: #CCC" type="text" id="u_MOBILE" name="mobile"  readonly="readonly" />
							</td> -->
						</tr>
						<tr id="code_tr" >
							<!-- <td>证件类型</td>
							<td>
								<input style="width: 200px;background: #CCC" type="text" id="u_PAPERS_TYPE" name="papers_type"   readonly="readonly"/>
							</td>  -->
							<td>出生日期</td>
							<td>
								<input class="easyui-datetimebox" type="text"  
								data-options="formatter:myformatter,parser:myparser" 
								style="width:200px;" name="birthday" id="u_BIRTHDAY"/>
								<!-- <input style="width: 200px; " type="text" id="u_BIRTHDAY" name="birthday" /> -->
							</td>
							<td>年龄</td>
							<td>
								<input style="width: 200px; "  type="text" id="u_AGE" name="age"  />
							</td> 
						</tr>
						<tr id="code_tr" >
							<td>体重(KG)</td>
							<td>
								<input style="width: 200px;" type="text" id="u_WEIGHT" name="weight"  />
							</td> 
							<td>身高(CM)</td>
							<td>
								<input style="width: 200px;" type="text" id="u_HEIGHT" name="height"  />
							</td>
						</tr>
						<tr id="code_tr" >
							<td>性别</td>
							<td>
								<select id="u_SEX" name="sex">
										<m:getItems name="gender" />
								</select>
								<!-- <input style="width: 200px;" type="text" id="u_SEX" name="sex"  /> -->
							</td>
							<td>是否有效</td>
							<td>
								<select id="u_ISVALID" name="isvalid">
										<m:getItems name="isEffective" />
								</select>
								<!-- <input style="width: 200px;" type="text" id="u_ISVALID" name="isvalid"  /> -->
								<button  type="button"  class="btn btn-success btn-success-min" style="padding: 6px 10px !important; " onclick="updateStatus()">更新状态</button>
							</td>
						</tr>
						<tr id="code_tr" >
							<td>过敏史</td>
							<td>
							<textarea style="width: 200px;" rows="3" cols="20" id="u_GM" name="gm"></textarea>
								<!-- <input style="width: 200px;" type="text" id="u_GM" name="gm"  /> -->
							</td> 
							<td>病史</td>
							<td>
							<textarea style="width: 200px;" rows="3" cols="20" id="u_ILL_HISTORY" name="ill_history"></textarea>
								<!-- <input style="width: 200px;" type="text" id="u_ILL_HISTORY" name="ill_history"  /> -->
							</td>
						</tr>
						<tr id="code_tr" >
							<td>固定电话</td>
							<td>
								<input style="width: 200px;" type="text" id="u_PHONE" name="phone"  />
							</td>
							<td>邮编</td>
							<td>
								<input style="width: 200px;" type="text" id="u_POST_CODE" name="post_code"  />
							</td> 
						</tr>
						<tr id="code_tr" >
							<td>QQ</td>
							<td>
								<input style="width: 200px;" type="text" id="u_QQ" name="qq"  />
							</td> 
							<td>邮箱</td>
							<td>
								<input style="width: 200px;" type="text" id="u_ACCOUNT_MAIL" name="account_mail"  />
							</td> 
						</tr>
						<tr>
							<td >省市区</td>
							<td>
								<select id="u_AREA" name="area" style="width: 200px;" > 
								</select>
							<!-- <textarea style="width: 200px;" rows="3" cols="20" id="u_AREA" name="area"></textarea> -->
							</td>
							<td >详细地址</td>
							<td>
							<textarea style="width: 200px;" rows="3" cols="20" id="u_ADDRESS" name="address"></textarea>
							</td>
						</tr> 
						<tr>
							<td colspan="4" style="text-align: center">	
								<c:if test="${currentUser.roles eq '3'}">
									<button  onclick="submit_model_window();"   type="button"  
									class="btn btn-success"  >更新</button>  
								</c:if>
							</td>
						</tr> 
					</table>
			      </form>
		     </div> 
		      <div title="慢病管理" > 
					<form action="vip/updatemb.json" id="user_detail_form2">
			        <input type="hidden" id="ub_vip_id" name="vip_id" />
			        <table style="margin-left: 10px;width:97%"> 
						<tr id="code_tr" >
							<td>是否慢性病</td>
							<td>
								<select id="ub_ischronic" name="ischronic">
										<option value="0">否</option>
										<option value="1">是</option>
								</select>
							</td>  
						</tr>
						<tr id="code_tr" >
							<td>慢性病类型</td>
							<td>
							<c:if test="${not empty mbTypes}">
								<table>
								      <c:forEach var="item" items="${mbTypes}"  varStatus="status">
								      <c:if test="${status.count==1}" ><tr style="text-align: left"></c:if>
								      	<td><input type="checkbox" class="chronic_type" name="chronic_type" value="${item.key }" />&nbsp;${item.value }&nbsp;&nbsp;</td>
								      	<c:if test="${status.count%3==0}" ></tr></c:if>
									  </c:forEach>
								      <c:if test="${fn:length(mbTypes) >0 && fn:length(mbTypes)%3!=0}" ></tr></c:if>
								</table>
					       	</c:if>  
							</td>  
						</tr>
						<tr id="code_tr" >
							<td>医保种类</td><!-- 1城镇居民职工医保，2新农合，3商业保险，4无保险 -->
							<td>
								<select id="ub_yb_type" name="yb_type">
										<m:getItems name="ybtype" />
								</select>
							</td>  
						</tr>
						<tr id="code_tr" >
							<td>病名</td>
							<td>
								<input style="width: 200px;" type="text" id="ub_ill_name" name="ill_name"  />
							</td>  
						</tr>
						<tr id="code_tr" >
							<td>患病时间</td>
							<td>
								<input class="easyui-datetimebox" type="text"  
								data-options="formatter:myformatter,parser:myparser" 
								style="width:200px;" name="inspect_timeStr" id="ub_inspect_time" />
							</td>  
						</tr>
						<tr id="code_tr" >
							<td >用药情况</td>
							<td>
							<textarea style="width: 200px;" rows="3" cols="20" id="ub_ill_med" name="ill_med"></textarea>
							</td>
						</tr>
						
						<tr id="code_tr" >
							<td>疾病类型</td>
							<td>
							<c:if test="${not empty illTypes}">
							      <c:forEach var="item" items="${illTypes}">
					       				<input type="checkbox" class="ill_type" name="ill_type" value="${item.key }" />&nbsp;${item.value }&nbsp;&nbsp;
								  </c:forEach>
					       	</c:if>  
								<%-- <select id="ub_ill_type" name="ill_type"> <m:getItems name="ill_type" /> </select> --%>
							</td>  
						</tr>
						<tr>
							<td colspan="4" style="text-align: center">	
								<c:if test="${currentUser.roles eq '3'}">
									<button  onclick="submit_model_windowmb();"   type="button"  
									class="btn btn-success"  >更新</button>  
								</c:if>
							</td>
						</tr> 
					  </table>
					</form>
		     </div> 
		      <c:if test="${currentUser.roles eq '3'}">
		      <div title="群组" > 
		        <!-- <div id="user_group_detail_dialog" data-options="closed:true,modal:true,title:'群组',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 400px;"> -->
			      <form action="vip/tag.json" id="user_group_detail_form">
			        <input type="hidden" id="group_vipCode" />
			          <br/>
				      <c:forEach var="item" items="${dgList}">
		       				<input type="checkbox"  name="usergroupIds" id="usergroupId${item.id }" class="usergroupIdClass" value="${item.id }" />&nbsp;${item.name }&nbsp;&nbsp;
					  </c:forEach>
					  <div style="text-align: center;margin: 0 auto;">
					  	<button  onclick="addtag();"   type="button"  class="btn btn-success"  >设置群组</button>
					  </div>
			            
			        <!-- <table style="margin-left: 10px"> 
						<tr id="code_tr" >
							<td>客户已加群组:</td>
						    <td id="tags_ids"><span style="color:red">暂无</span>
							</td> 
						</tr> 
					    <tr id="code_tr" >
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						</tr>
						
						<tr id="code_tr" >
							<td>选择群组</td>
							<td>
								<select id="group-list_select"></select>
								<button  onclick="addtag();"   type="button"  class="btn btn-success"  >设置群组</button>  
							</td>
						</tr> 
					</table> -->
			      </form>
			    </div>
		         	 	
             </c:if>
		     <!-- 再添加一个群组 hm += '<a href="javascript:opentag('+value+')">群组</a>'; -->
		     
	     </div> 
    </div>
    
    <!-- 远程咨询详情 -->
	<div id="user_inspect_detail_dialog_d" data-options="closed:true,modal:true,title:'远程咨询详情'" style="padding: 5px; width: 850px; height: 450px;">
			<table id="remotes_datas_table_d"></table>
	</div>
    
    <!-- 咨询详情 -->
	<div id="user_inspect_detail_dialog_d2" data-options="closed:true,modal:true,title:'咨询详情'" style="padding: 5px; width: 850px; height: 450px;">
			<table id="questions_datas_table_d"></table>
	</div>
    
    <!-- 尿酸历史记录 -->
	<div id="user_inspect_detail_dialog_C06" data-options="closed:true,modal:true,title:'尿酸历史记录'" style="padding: 5px; width: 900px; height: 450px;">
			<table id="C06_datas_table"></table>
	</div>
    
    <!-- 用户检测详情 -->
	<div id="user_inspect_detail_dialog" data-options="closed:true,modal:true,title:'检测详情'" style="padding: 5px; width: 850px; height: 450px;">
		<!-- <table id="base_detail_table"></table> -->
		<div id="user_inspect_detail_tab" class="easyui-tabs" style="width:810px;height:330px;"> 
		     <div title="最新检测记录  " id="last_inspect_datas">
		     	暂无数据!
		     </div> 
		     <div title="心电图检测记录  " id="last_inspect_ecg_datas">
				<table id="ecg_table"></table>
		     </div> 
		      <div title="远程咨询" id="remotes_datas"> 
					<table id="remotes_datas_table"></table>
		     </div> 
		      <div title="咨询"  id="questions_datas"> 
					<table id="questions_datas_table"></table>
		     </div>
		      <div title="消息"  id="messages_datas"> 
					<table id="messages_datas_table"></table>
		     </div>
		 </div>   
    </div>
    
 	<div id="user_msg_detail_dialog" data-options="closed:true,modal:true,title:'推送单个信息',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 400px;">
      <form action="vip/message.json" id="user_message_detail_form">
        <input type="hidden" id="msg_cardCode" name="cardCode"  />
        <table style="margin-left: 10px"> 
			<tr id="code_tr" >
				<td>消息类型</td>
				<td>
					<select id="msg-msg_type" name="msgType">
				     	 <option value="1">文本</option>
				     	 <option value="2">链接</option>
					</select>  
				</td>
				<td>&nbsp;&nbsp;&nbsp;选择模版</td>
				<td>
					<select id="msg-msg_template_select" onchange="onselecttmp()"></select>  
				</td>
			</tr>
			<tr id="code_tr" >
				<td>消息标题</td>
				<td colspan="3">
				<input style="width: 200px;" type="text" name="title"  id="msg_title" />
				</td>
			</tr>
			<tr>
				<td>消息内容</td>
				<td colspan="3">
				<textarea style="width: 200px;" rows="3" cols="20" id="msg_content" name="content"></textarea>
				<!-- <input style="width: 200px;" type="text" name="content"  id="msg_content"  /> -->
				</td>
			</tr>
		</table>
      </form>
    </div>
    
 	<div id="users_msg_detail_dialog" data-options="closed:true,modal:true,title:'推送结果集消息',iconCls:'icon-save'" style="padding: 5px; width: 800px; height: 400px;">
      <form action="vip/message.json" id="users_message_detail_form">
        <input type="hidden" id="msgs_groupid" name="recivergroupid"/>
        <table style="margin-left: 10px"> 
			<tr id="code_tr" >
				<td width="20%">接受消息客户人数：</td>
				<td colspan="3" id="msgs_groupname"></td>
				<input type="hidden" name="total"  id="msgs_total" />
			</tr>
			<tr id="code_tr" >
				<td width="20%">消息类型</td>
				<td>
					<select id="msgs-msg_type" name="msgType">
				     	 <option value="1">文本</option>
				     	 <option value="2">链接</option>
					</select>  
				</td>
				<td>&nbsp;&nbsp;&nbsp;选择模版</td>
				<td>
					<select id="msgs-msg_template_select" onchange="onselecttmps()"></select>  
				</td>
			</tr>
			<tr id="code_tr" >
				<td>消息标题</td>
				<td colspan="3">
				<input style="width: 200px;" type="text" name="title"  id="msgs_title" maxlength="50"/>
				</td>
			</tr>
			<tr>
				<td>消息内容</td>
				<td colspan="3">
				<textarea style="width: 200px;" rows="3" cols="20" id="msgs_content" name="content"></textarea>
				<!-- <input style="width: 200px;" type="text" name="content"  id="msgs_content"  /> -->
				</td>
			</tr>
		</table>
      </form>
    </div>
    
 	<div id="users_new_dialog" data-options="closed:true,modal:true,title:'客户新增',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 500px;">
      <form action="vip/save.json" id="users_new_form">
           <table style="margin-left: 10px"> 
			<!-- <tr id="code_tr" >
				<td>客户编码</td>
				<td>
					<input style="width: 200px;" type="text" id="un_VIP_CODE" name="vip_code" />
				</td> 
				<td>卡号</td>
				<td>
					<input style="width: 200px;" type="text" id="un_CARD_CODE" name="card_code"  />
				</td>
			</tr> -->
			<tr id="code_tr" >
				<td>登录账户<span style="color:red">*</span></td>
				<td>
					<input style="width: 200px;" type="text" id="un_LOGIN_ACCOUNT" name="login_account" />
				</td> 
				<td>会员昵称<span style="color:red">*</span></td>
				<td>
					<input style="width: 200px;" type="text" id="un_NICK_NAME" name="nick_name"  />
				</td>
			</tr>
			<tr id="code_tr" >
				<td>真实姓名<span style="color:red">*</span></td>
				<td>
					<input style="width: 200px;" type="text" id="un_REAL_NAME" name="real_name"  />
				</td> 
				<td>手机号<span style="color:red">*</span></td>
				<td>
					<input style="width: 200px;" type="text" id="un_MOBILE" name="mobile" />
				</td>
			</tr>
			<tr id="code_tr" >
				<td>出生日期<span style="color:red">*</span></td>
				<td>
					<!-- <input style="width: 200px;" type="text" id="un_BIRTHDAY" name="birthday" /> -->
					<input class="easyui-datetimebox" type="text"  
								data-options="formatter:myformatter,parser:myparser" 
								style="width:200px;" name="birthday" id="un_BIRTHDAY"/>
				</td>
				<td>年龄<span style="color:red">*</span></td>
				<td>
					<input style="width: 200px;"  type="text" id="un_AGE" name="age" />
				</td> 
			</tr>
			<tr id="code_tr" >
				<td>证件号码<span style="color:red">*</span></td>
				<td>
					<input style="width: 200px;" type="text" id="un_PAPERS_NUM" name="papers_num" />
				</td> 
			</tr>
			<tr id="code_tr" >
				<td>体重(KG)</td>
				<td>
					<input style="width: 200px;" type="text" id="un_WEIGHT" name="weight"  />
				</td> 
				<td>身高(CM)</td>
				<td>
					<input style="width: 200px;" type="text" id="un_HEIGHT" name="height"  />
				</td>
			</tr>
			<tr id="code_tr" >
				<td>性别</td>
				<td>
					<select id="un_SEX" name="sex">
							<m:getItems name="gender" />
					</select>
				</td>
				<td>是否有效</td>
				<td>
					<select id="un_ISVALID" name="isvalid">
							<m:getItems name="isEffective" />
					</select>
				</td>
			</tr>
			<tr id="code_tr" >
				<td>过敏史</td>
				<td>
				<textarea style="width: 200px;" rows="3" cols="20" id="un_GM" name="gm"></textarea>
				</td> 
				<td>病史</td>
				<td>
				<textarea style="width: 200px;" rows="3" cols="20" id="un_ILL_HISTORY" name="ill_history"></textarea>
				</td>
			</tr>
			<tr id="code_tr" >
				<td>固定电话</td>
				<td>
					<input style="width: 200px;" type="text" id="un_PHONE" name="phone"  />
				</td>
				<td>邮编</td>
				<td>
					<input style="width: 200px;" type="text" id="un_POST_CODE" name="post_code"  />
				</td> 
			</tr>
			<tr id="code_tr" >
				<td>QQ</td>
				<td>
					<input style="width: 200px;" type="text" id="un_QQ" name="qq"  />
				</td> 
				<td>邮箱</td>
				<td>
					<input style="width: 200px;" type="text" id="un_ACCOUNT_MAIL" name="account_mail"  />
				</td> 
			</tr>
			<tr>
				<td >省市区</td>
				<td>
					<select id="un_AREA" name="area" style="width: 200px;" ></select>
				</td>
				<td >详细地址</td>
				<td>
				<textarea style="width: 200px;" rows="3" cols="20" id="un_ADDRESS" name="address"></textarea>
				</td>
			</tr>
		</table>
      </form>
    </div> 
    
   <div id="dialog_medi_record"></div>
</div>
	
</body>
</html>