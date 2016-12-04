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
<title>GD Administration</title>
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
var parametertmp = {};//Push result set
/* Uric acid history data*/
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
        loadMsg: 'One moment please...', 
		idField:'ID',
		columns:[[
		          {field:'LEU',title:'white blood cell',width:50},
		          {field:'NIT',title:'nitrite',width:50},
		          {field:'UBG',title:'Urinary bladder',width:50},
		          {field:'PH',title:'Degree of acidity and alkalinity',width:50},
		          {field:'BLD',title:'Glucose',width:50},
		          {field:'GLU',title:'white blood cell',width:50},
		          {field:'KET',title:'Ketone',width:50},
		          {field:'PRO',title:'Protein',width:50},
		          {field:'BIL',title:'bilirubin',width:50},
		          {field:'VC',title:'Vitamin',width:50},
		          {field:'SG',title:'proportion',width:50}, 
				  {field:'INSPECT_TIME',title : 'Detection time',width : 100,formatter : function(value) {return getTimeStr(value);  } }
		]],
		pagination:true,
		rownumbers:true 
	});  
	$('#user_inspect_detail_dialog_C06').dialog('open');
}

/*  
   Consultation"  id="questions_datas"> 		questions_datas_table
Message"  id="messages_datas">   messages_datas_table
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
        loadMsg: 'One moment please...', 
		idField:'ID',
		columns:[[
			{field:'ANSWER_CODE',title:'A client or a doctor',width:100,
				formatter : function(value) {
					//if(obj.substring(0,4) == "idiv")
					if(value != null && value!='' && value.length > 0){
						if(value.substring(0,1) == "V" || value.substring(0,1) == "v" ){
							return "Customer";
						}else if(value.substring(0,1) == "D" || value.substring(0,1) == "d" ){
							return "Doctor";
						} 
					}
					return "";
				}
			}
			,{field:'ANSWER_CONTENT',title:'content',width:300}
			,{field :'CREATE_TIME',title : 'Created time',width : 100,formatter : function(value) {return getTimeStr(value);  } }
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
        loadMsg: 'One moment please...',
		idField:'ID',
		columns:[[
		          //SELECT i.id,i.vip_code,i.doctor_code,d.name,i.order_time,i.affirm_time,i.isZd,i.isDeal,i.zd_begin_time,i.zd_end_Time,i.create_time
			{field:'VIP_CODE',title:'Member code',width:100}
			,{field:'NAME',title:'Doctor',width:100}
			,{field:'TITLE',title:'Title',width:150}
		    ,{field:'CONTENT',title:'content',width:200} 
			,{field :'CREATE_TIME',title : 'Created time',width : 100,formatter : function(value) {return getTimeStr(value);  } }
			,{field :'STATUS',title : 'Whether consultation',width : 100,formatter : function(value) {
				if(null != value && value == "1"){
					return "Consulted";
				}else{
					return "Not consulted";
				}
			} }
/* 			//7：Consultation Tag is advisory  No need for details
			,{field:'ID',title:'Operation',width:120,
				formatter:function(value,row){ 
					return  '<a href="javascript:questionsDatasDGrid(\''+row.ID+'\')" >details</a>';
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
 * Update tab for page query.
 */
function refreshSearchTag(){
	$("#group-tag-list_select").empty();  
	$("<option value='' >--Please select--</option>").appendTo("#group-tag-list_select")//Add drop boxoption
	$.ajax({ 
          type : "post", 
          url : "vip/tags/@all.json?rand ="+Math.random(), 
          async : false, 
          dataType : "json",  
          success : function(data){ 
        	  if(data.code==1 && data.categories != null && data.categories.length >0){
      			for(var o in data.categories){   
      				$("<option value='"+data.categories[o].id+"' >"+data.categories[o].name +"</option>").appendTo("#group-tag-list_select")//Add drop boxoption
      		    }  
      		}
          } 
    }); 
}

/**
 * Message template query   msg-msg_template_select 
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
      			$("<option value='0'>--Please select a template--</option>").appendTo("#msg-msg_template_select")//Add drop boxoption
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
      				$("<option value='"+data.categories[o].id+"' >"+tmpTitle +"</option>").appendTo("#msg-msg_template_select")//Add drop boxoption
      		    } 
      		}
          } 
    });	
}

/**
 * Message template query   msg-msg_template_select 
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
      			$("<option value='0'>--Please select a template--</option>").appendTo("#msgs-msg_template_select")//Add drop boxoption
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
      				$("<option value='"+data.categories[o].id+"' >"+tmpTitle+"</option>").appendTo("#msgs-msg_template_select")//Add drop boxoption
      		    } 
      		}
          } 
    });	
}

/**
 * Message management 
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
        loadMsg: 'One moment please...',
		idField:'ID',
		columns:[[
		          //m.id,m.msg_type,m.creator  m.isvalid,m.create_time,c.reciver,c.send_time
			{field:'MSG_TYPE',title:'Message type',width:100,
				formatter : function(value) {
					if(value !=null || value != '' ){
						if(value == 1){
							return "text";
						}else if (value == 2){
							return "link";
						}else{
							return "";
						}
					}else{
						return "";
					}
				}
			}
			,{field:'TITLE',title:'Title',width:150}
		    ,{field:'CONTENT',title:'content',width:200,formatter : function(value) {
		    		if(value != null && value.length > 20){
		    			return value.substring(0,20)+"...";
		    		}
		    		return value;
		    	} 
		    } 
			/* ,{field :'CREATE_TIME',title : 'Created time',width : 100,formatter : function(value) {return getTimeStr(value);  } } */
			,{field :'SEND_TIME',title : 'Sending time',width : 100,formatter : function(value) {return getTimeStr(value);  } }
		    /* ,{field:'ID',title:'Operation',width:120,
				formatter:function(value,row){ 
					return  '<a href="javascript:questionsDatasDGrid(\''+row.ID+'\')" >details</a>';
				}
			} */
		]],
		pagination:true,
		rownumbers:true 
	});  
}

/**Remote consultation*/
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
        loadMsg: 'One moment please...', 
		idField:'ID',
		columns:[[
			{field:'VIP_OR_DOCTOR',title:'A client or a doctor',width:100,
				formatter : function(value) {
					if(value == 'doc' || value == 'DOC' ){
						return "Doctor";
					}else if(value == 'vip' || value == 'VIP'){
						return "Customer";
					}else{
						return "";
					}
				}
			}
			,{field:'DES',title:'content',width:100}
			,{field :'CREATE_TIME',title : 'Created time',width : 100,formatter : function(value) {return getTimeStr(value);  } }
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
        loadMsg: 'One moment please...',
		idField:'ID',
		columns:[[
		          //SELECT i.id,i.vip_code,i.doctor_code,d.name,i.order_time,i.affirm_time,i.isZd,i.isDeal,i.zd_begin_time,i.zd_end_Time,i.create_time
			{field:'VIP_CODE',title:'Member code',width:100},
			{field:'NAME',title:'Doctor',width:100},
		    {field:'ISZD',title:'Meet?',width:100,
				formatter : function(value) {
					if(value == 1 ){
						return "Handle";
					}else if(value == 0){
						return "Not handle";
					}else{
						return "";
					}
				}
			},{field:'ISDEAL',title:'Whether to deal with',width:100,
				formatter : function(value) {
					if(value == 1 ){
						return "Handle";
					}else if(value == 0){
						return "Not handle";
					}else{
						return "";
					}
				}
			},{field :'ORDER_TIME',title : 'Appointment time',width : 100,formatter : function(value) {return getTimeStr(value);  } }
			,{field :'AFFIRM_TIME',title : 'Doctor confirmation time',width : 100,formatter : function(value) {return getTimeStr(value);  } }
			/* ,{field :'ZD_BEGIN_TIME',title : 'Diagnostic start time',width : 100,formatter : function(value) {return getTimeStr(value);  } }
			,{field :'ZD_END_TIME',title : 'End time of diagnosis',width : 100,formatter : function(value) {return getTimeStr(value);  } }
			,{field :'CREATE_TIME',title : 'Created time',width : 100,formatter : function(value) {return getTimeStr(value);  } }
		    ,{field:'REMARK',title:'Remarks',width:100} 
		     */,{field:'ID',title:'Operation',width:120,
				formatter:function(value,row){ 
					return  '<a href="javascript:remotesDatasDGrid(\''+row.CODE+'\')" >details</a>';
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
        loadMsg: 'One moment please...',
		idField:'ID',
		columns:[[
			  {field:'ANALYZERESULTSTR',title : 'detection result',width : 200 },
			  {field:'INSPECT_TIME',title : 'Detection time',width : 100,formatter : function(value) {return getTimeStr(value);  } }
			 ,{field:'ID',title:'Operation',width:120,
				formatter:function(value,row){ 
					return  '<a href="<%=basePath%>vip/createEcg'+row.ID+'.html" target="_blank" >See</a>';
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
			title: 'Electronic medical record',
			width: 800,
			height: 500,
			cache: false,
			href: 'medirec/show.html?vipCode='+rowInfo.VIP_CODE,
			modal: true,
			buttons:[{
				text:'Close',
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
	    $.messager.confirm('confirm','confirm deletion?',function(row){  
	        if(row){  
	        	$.post('vip/del.json?id='+rowInfo.ID,function(data){
	    			if(data.code==1){
	    				$.messager.show({title:titleInfo,msg:'Deleted！',timeout:timeoutValue,showType:'slide'});
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
					htmls += "<tr><td>Name</td> <td>Detection coding</td> <td>Test name</td> <td>Detection value</td> <td>Detection time</td> <td>Operation</td> </tr>";
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
										htmls += "<td rowspan='"+data.categories[o].detail.length+"'><a href='<%=basePath%>vipInspectData/chartall/"+rowInfo.CARD_CODE+"/"+data.categories[o].code+"/ALL/0-0/0.html' target='_blank'>"+data.categories[o].name +"History record</a></td>";										
									}else{
										//console.log("<td rowspan='"+data.categories[o].detail.length+"'><a href='javascript:void(0)' onClick='questionsDatasC06Grid(\'"+ rowInfo.CARD_CODE+"\')'>"+data.categories[o].name +"历史记录</a></td>");
										//<a href="javascript:void(0)" onclick="questionsDatasC06Grid(" 429001198710264633')'="">血氧历史记录</a>
										htmls += "<td rowspan='"+data.categories[o].detail.length+"'><a href='javascript:void(0)' onClick='questionsDatasC06Grid(\""+ rowInfo.CARD_CODE+"\")'>"+data.categories[o].name +"History record</a></td>";										
									}
								}
								htmls +="</tr>";
								tmpI = tmpI +1;
							}
						}
					}
				    htmls += '<table>';
				}else{
					 htmls +="<p>No data</p>";
				}
				$("#last_inspect_datas").html(htmls); //TODO 
				$('#user_inspect_detail_dialog').dialog('open'); 
			}else{
				$.messager.alert(titleInfo,"View failed");
			}
		},"json"); 
		
		ecgDatasGrid(rowInfo.CARD_CODE);
		remotesDatasGrid(rowInfo.VIP_CODE);
		questionsDatasGrid(rowInfo.VIP_CODE);
		messagesDatasGrid(rowInfo.ID);
	}
} 
/**
 * Submit data tojson
 */
function submit_message_model_window(){
	if($("#msg_cardCode").val()==null || $("#msg_cardCode").val()==""){
		$.messager.alert(titleInfo,'Insufficient data!');
		return;
	} 
	if($("#msg_title").val()==null || $("#msg_title").val()==""){
		$.messager.alert(titleInfo,'Please enter a message header!');
		return;
	} 
	if($("#msg_content").val()==null || $("#msg_content").val()==""){
		$.messager.alert(titleInfo,'Please enter the message content!');
		return;
	} 
	var formdata = $.serializeObject($("#user_message_detail_form"));
	$.post("vip/message.json",formdata,function(data){
		if(data.code==1){
			$('#user_msg_detail_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'Message sent！',timeout:timeoutValue,showType:'slide'});
			dataGridload(parameter);
		}else{
			if(null != data.msg && "" != data.msg){
				$.messager.alert(titleInfo,data.msg);
				
			}else{
				$.messager.alert(titleInfo,"Send message");
			}
		}
	},"json");
} 

function openGroupPush(){//group-tag-list_select
	//FIT-GEQ-age
	var geqAge =$("#FIT-GEQ-age").val();
	if(geqAge != null && geqAge != "" ){
		if((!isPInt(geqAge))){
			$.messager.alert(titleInfo,"Please enter a valid age");
			return ;
		}else if(geqAge < 1 || geqAge>100){
			$.messager.alert(titleInfo,"Enter a valid age");
			return ;
		}
	}
	var leqAge =$("#FIT-LEQ-age").val();
	if(leqAge != null && leqAge != ""){
		if((!isPInt(leqAge))){
			$.messager.alert(titleInfo,"Please enter a valid age");
			return ;
		}else if(leqAge < 1 || leqAge>100){
			$.messager.alert(titleInfo,"Enter a valid age");
			return ;
		}
	}
	parametertmp = $.serializeObject($("#query_form"));
	$.post("vip/list.json",parametertmp,function(data){
		if(data!=null && data.total != null && data.total > 0){
			messagesTmpGrids();
			$('#msgs_groupname').html(data.total);//Here now show people say
			$('#msgs_total').val(data.total);
			$('#users_msg_detail_dialog').dialog('open');
		}else{
			$.messager.alert(titleInfo,"Result set is empty，No push messages.");
		}
	},"json");
}

/**New member*/
function openNew(){
	document.getElementById("users_new_form").reset(); 
	if(initAreaFlag && areaJsons != []  && areaJsons.length > 0){
    	$("<option value='0'>--Please select--</option>").appendTo("#un_AREA")//Add drop boxoption
		for(var o in areaJsons){  
			$("<option value='"+areaJsons[o].id+"' >"+areaJsons[o].name +"</option>").appendTo("#un_AREA")//Add drop boxoption
	    }  
	} 
	$('#users_new_dialog').dialog('open');
}

/**
 * Submit data tojson
 */
function submits_usernew_window(){
	if($("#un_LOGIN_ACCOUNT").val()==null || $("#un_LOGIN_ACCOUNT").val()==""){
		$.messager.alert(titleInfo,'Please enter your login account!');
		return;
	} 
	if($("#un_NICK_NAME").val()==null || $("#un_NICK_NAME").val()==""){
		$.messager.alert(titleInfo,'Please enter a member nickname!');
		return;
	}  
	if($("#un_REAL_NAME").val()==null || $("#un_REAL_NAME").val()==""){
		$.messager.alert(titleInfo,'Please enter your real name!');
		return;
	}  
	if($("#un_MOBILE").val()==null || $("#un_MOBILE").val()==""){
		$.messager.alert(titleInfo,'Please enter your phone number!');
		return;
	}  
	//birthday
	if($("#users_new_form input[name='birthday']").val()==null || $("#users_new_form input[name='birthday']").val()==""){
		$.messager.alert(titleInfo,'Please enter birthday!');
		return;
	}  
	if($("#un_AGE").val()==null || $("#un_AGE").val()==""){
		$.messager.alert(titleInfo,'Please enter the age!');
		return;
	}  
	if($("#un_PAPERS_NUM").val()==null || $("#un_PAPERS_NUM").val()==""){
		$.messager.alert(titleInfo,'Please enter the ID number!');
		return;
	}
	
	var formdata = $.serializeObject($("#users_new_form"));
	$.post("vip/save.json?rand ="+Math.random(),formdata,function(data){
		if(data.code==1){
			$('#users_new_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'New success！',timeout:timeoutValue,showType:'slide'});
			dataGridload(parameter);
		}else{
			if(data.code != null){
				$.messager.alert(titleInfo,data.msg);
			}else{
				$.messager.alert(titleInfo,"New failed");
			}
		}
	},"json");
}  

/**
 * Submit data tojson
 */
function submits_message_model_window(){
	if($("#msgs_title").val()==null || $("#msgs_title").val()==""){
		$.messager.alert(titleInfo,'Please enter a message header!');
		return;
	} 
	if($("#msgs_content").val()==null || $("#msgs_content").val()==""){
		$.messager.alert(titleInfo,'Please enter the message content!');
		return;
	} 
	var formdata = $.serializeObject($("#users_message_detail_form"));
	$.extend(formdata, parametertmp);
	$.post("vip/message.json",formdata,function(data){
		if(data.code==1){
			$('#users_msg_detail_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'Push success！',timeout:timeoutValue,showType:'slide'});
			dataGridload(parameter);
		}else{
			$.messager.alert(titleInfo,"Message sending failed");
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
    	$("<option value='0'>--Please select--</option>").appendTo("#u_AREA")//Add drop boxoption
		for(var o in areaJsons){  
			$("<option value='"+areaJsons[o].id+"' >"+areaJsons[o].name +"</option>").appendTo("#u_AREA")//Add drop boxoption
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
		
		$('#u_AREA').val(rowInfo.AREA);    //Also get the drop-down listTODO 
		$('#u_ADDRESS').val(rowInfo.ADDRESS);	
		
		$('#ub_vip_id').val(rowInfo.ID);//TODO Write slow table here，Here is whether you can put it in an object.
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
		
		$("#tags_ids").html("<span style='color:red'>No</span>");
		$("#group-list_select").empty(); 
		$("#group_vipCode").val("");
		
		$('#base_table').datagrid('selectRecord',id);
		var rowInfo =  $('#base_table').datagrid('getSelected');
		
		$("#group_vipCode").val(rowInfo.VIP_CODE);//save
		refreshTag(rowInfo.VIP_CODE,true);
	}
}

/**
 * Update pop up tab. After the label is updated, then open the pop-up window.
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
          			$("#tags_ids").html("<span style='color:red'>No</span>");
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
		$.messager.alert(titleInfo,"Set up group failed，Incomplete data");
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
    	  		$.messager.show({title:titleInfo,msg:'Set up group successfully！',timeout:timeoutValue,showType:'slide'});
  		}else{
	  			$.messager.show({title:titleInfo,msg:'Set up group failed！',timeout:timeoutValue,showType:'slide'});
				//$.messager.alert(titleInfo,"添加失败");
  		}
      } 
});	
}



/**
 * Data table refresh
 * @param param
 */
function dataGridload(param){
	$('#base_table').datagrid('reload');
}

function updateStatus(code){  //Delete operation  
	var id = $('#u_ID').val();
	var status =$("#u_ISVALID").val();
	
	$.post('vip/updateStatus/'+id+'/'+status+'.json',function(data){
		if(data.code==1){
			$.messager.show({title:titleInfo,msg:'Status updated！',timeout:timeoutValue,showType:'slide'});
		}else{ 
			$.messager.alert(titleInfo,data.msg);
		}
		dataGridload(parameter); 
	},"json"); 
  }  

/**
 * Submit data tojson
 */
function submit_model_window(){ 
	var formdata = $.serializeObject($("#user_detail_form"));
	$.post("vip/update.json",formdata,function(data){
		if(data.code==1){
			$('#detail_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'Updated！',timeout:timeoutValue,showType:'slide'});
			dataGridload(parameter);
		}else{
			$.messager.alert(titleInfo,data.msg);
		}
	},"json");
}  

/**
 * Submit data tojson
 */
function submit_model_windowmb(){ 
	var formdata = $.serializeObject($("#user_detail_form2"));
	$.post("vip/updatemb.json",formdata,function(data){
		if(data.code==1){
			$('#detail_dialog').dialog('close');
			$.messager.show({title:titleInfo,msg:'Updated！',timeout:timeoutValue,showType:'slide'});
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
				$.messager.alert(titleInfo,"Please enter a valid age");
				return ;
			}else if(geqAge < 1 || geqAge>100){
				$.messager.alert(titleInfo,"Enter a valid age");
				return ;
			}
		}
		var leqAge =$("#FIT-LEQ-age").val();
		if(leqAge != null && leqAge != ""){
			if((!isPInt(leqAge))){
				$.messager.alert(titleInfo,"Please enter a valid age");
				return ;
			}else if(leqAge < 1 || leqAge>100){
				$.messager.alert(titleInfo,"Enter a valid age");
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
			text:'Update',
			handler:function(){
				submit_model_window();
			}
		},</c:if>
		{
			text:'cancel',
			handler:function(){
				$('#user_detail_dialog').dialog('close');
			}
		}]
	}); */
	
	//初始化弹出框
	$('#user_msg_detail_dialog').dialog({
		buttons:[{
			text:'Push message',
			handler:function(){
				submit_message_model_window();
			}
		},{
			text:'cancel',
			handler:function(){
				$('#user_msg_detail_dialog').dialog('close');
			}
		}]
	});
	
	//初始化弹出框
	$('#users_msg_detail_dialog').dialog({
		buttons:[{
			text:'Push message',
			handler:function(){
				submits_message_model_window();
			}
		},{
			text:'cancel',
			handler:function(){
				$('#users_msg_detail_dialog').dialog('close');
			}
		}]
	});
	
	//初始化弹出框
	$('#users_new_dialog').dialog({
		buttons:[{
			text:'Newly added',
			handler:function(){
				submits_usernew_window();
			}
		},{
			text:'cancel',
			handler:function(){
				$('#users_new_dialog').dialog('close');
			}
		}]
	});
	
	//初始化弹出框
	$('#user_group_detail_dialog').dialog({
		buttons:[{
			text:'cancel',
			handler:function(){
				$('#user_group_detail_dialog').dialog('close');
			}
		}]
	});
	
	//初始化弹出框
	$('#user_inspect_detail_dialog').dialog({
		buttons:[ {
			text:'Close',
			handler:function(){
				$('#user_inspect_detail_dialog').dialog('close');
			}
		}]
	});

	//初始化弹出框
	$('#user_inspect_detail_dialog_d').dialog({
		buttons:[ {
			text:'Close',
			handler:function(){
				$('#user_inspect_detail_dialog_d').dialog('close');
			}
		}]
	});
	
	//初始化弹出框
	$('#user_inspect_detail_dialog_d2').dialog({
		buttons:[ {
			text:'Close',
			handler:function(){
				$('#user_inspect_detail_dialog_d2').dialog('close');
			}
		}]
	});
	
	//初始化弹出框
	$('#user_inspect_detail_dialog_C06').dialog({
		buttons:[ {
			text:'Close',
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
		url:'vip/list.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'ID',
		columns:[[
		    {field:'VIP_CODE',title:'Member code',width:50},
		    {field:'CARD_CODE',title:'Credit Card Number',width:80},
		    {field:'LOGIN_ACCOUNT',title:'Login account',width:50}, 
		    {field:'NICK_NAME',title:'Member nickname',width:50}, 
		    {field:'REAL_NAME',title:'Real name',width:50}, 
		    {field:'MOBILE',title:'Cell number',width:80}, 
		    /* {field:'PAPERS_TYPE',title:'Id type',width:100},  
		    {field:'PAPERS_NUM',title:'Id Number',width:80}, */
		  /*   {field:'WEIGHT',title:'weight',width:100}, 
		    {field:'HEIGHT',title:'height',width:100}, 
		    {field:'SEX',title:'Gender',width:100}, 
		    {field:'AGE',title:'Age',width:100}, 
		    {field:'WXOPENID',title:'wxopenid',width:100}, 
		    {field:'ANDROID_TV_CHANNEL_ID',title:'channel_id',width:100},  */
		    /* `heard_img_url` varchar(250) DEFAULT NULL COMMENT 'Avatar address',
		    `isvalid` tinyint(4) DEFAULT NULL COMMENT 'Whether effective,1effective,0invalid', 
		    `account_mail` varchar(50) DEFAULT NULL COMMENT 'mailbox', 
		    `area` varchar(250) DEFAULT NULL COMMENT 'Provincial city',
		    `address` varchar(250) DEFAULT NULL COMMENT 'Detailed address',
		    `birthday` varchar(32) DEFAULT NULL COMMENT 'Birthday',
		    `post_code` varchar(32) DEFAULT NULL COMMENT 'Zip code',
		    `phone` varchar(32) DEFAULT NULL COMMENT 'Landline',
		    `ill_history` text COMMENT 'Medical history',
		    `gm` varchar(250) DEFAULT NULL COMMENT 'Allergic History',
		    `qq` varchar(15) DEFAULT NULL COMMENT 'QQ',
		    `android_tv_token_id` varchar(40) DEFAULT NULL COMMENT 'android_tv_token',
		    `modify_time` datetime DEFAULT NULL COMMENT 'Modification time', */
			/* {field : 'CREATE_TIME',title : 'Created time',width : 100,
				formatter : function(value) {
					var date = new Date(value);
					return formatterDateTime(date);
				}
			}, */
			{field:'ID',title:'Operation',width:150,
				formatter:function(value,row){  
					//'<a href="javascript:openedit('+value+')">修改</a> &nbsp;<a onclick="javascript:del(\''+row.CODE+'\')" ><font color="red">删除</font></a>';
					var hm = '<a href="javascript:openedit('+value+')">details</a>&nbsp;<a href="javascript:openview('+value+')">Detection condition</a>&nbsp;<a href="javascript:openmessage('+value+')">Push messages</a>&nbsp;<a href="javascript:openmedirec('+value+')">Electronic medical record</a>&nbsp;<a href="javascript:openDelete('+value+')">delete</a>&nbsp;';
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
	<div data-options="region:'center',title:'Customer inquiry'" class="regionCenter">
		<div id="common_search" class="common_search common_search_nopadding">	
		 <form action="" id="query_form">		
			Customer code&nbsp;<input type="text" id="FIT-LIKE-vip_code" name="FIT-LIKE-vip_code"/>
			&nbsp;Name&nbsp;<input type="text" id="FIT-LIKE-real_name" name="FIT-LIKE-real_name"/>
			&nbsp;Telephone&nbsp;<input type="text"  style="width: 100px;"  id="FIT-LIKE-mobile" name="FIT-LIKE-mobile"/>
			&nbsp;Age range:<input type="text" style="width: 40px;" id="FIT-GEQ-age" name="FIT-GEQ-age"/>
			-<input type="text" style="width: 40px;" id="FIT-LEQ-age" name="FIT-LEQ-age"/>
       <!-- hospitals 2B C Label-->
       	<c:if test="${currentUser.roles eq '1'}">
       	<br/>&nbsp;Hospital:<select id="FIT-EQ-hospital" name="FIT-EQ-hospital">
			      <option value="">-Please select-</option> 
			      <c:forEach var="item" items="${hospitals}">
							<option value="${item[0]}"><c:out value="${item[1]}" /></option>
				  </c:forEach>
				</select> 
       	</c:if>
       	<!-- Doctor index，It`s an administrator or a hospital. -->
       	<c:if test="${currentUser.roles eq '2' or currentUser.roles eq '1'}">
         	&nbsp; Doctor code&nbsp;<input type="text" id="FIT-LIKE-doctorc" name="FIT-LIKE-doctorc"/>  
         	&nbsp;Doctor name&nbsp;<input type="text" id="FIT-LIKE-doctor" name="FIT-LIKE-doctor"/>  
         </c:if>
       <%--   <c:if test="${currentUser.roles eq '3'}">
       		&nbsp;&nbsp;Customer group:<select id="group-tag-list_select"  name="FIT-EQ-group"></select>
				<button onclick="openGroupPush();" type="button" class="btn btn-success  ">Push group messages</button>
       	</c:if> --%>
           <!-- style="padding: 6px 10px !important; " btn-success-min  -->
				
         <c:if test="${currentUser.roles eq '3'}">
          	<c:if test="${not empty dgList}">
	       		<br/>&nbsp; Select group:
			      <c:forEach var="item" items="${dgList}">
	       				<input type="checkbox" name="FIT-IN-groupId" value="${item.id }" />&nbsp;${item.name }&nbsp;&nbsp;
				  </c:forEach>
      	 	</c:if> 
       	</c:if>
        <button type="button" id="auth_search"  class="btn btn-success  "><i class="icon-search"></i>&nbsp;query</button>
		<button onclick="openGroupPush();" type="button" class="btn btn-success">Push messages to result-group</button>
		
         <c:if test="${currentUser.roles eq '3'}">
			<button type="button" onclick="openNew();"  class="btn btn-success"><i class="icon-plus"></i>add</button>
      	</c:if>
	<!-- 	<button type="button"
				id="auth_reset" class="btn btn-success btn-success-min" style="padding: 6px 10px !important; "><i class="icon-refresh"></i>&nbsp;Reset</button> -->
		<!-- <button type="button" id="data_add" class="btn btn-success"><i class="icon-plus"></i>&nbsp;Add</button> -->
		 </form>
		</div>
		<table id="base_table"></table>
        <div id="editfrom_dialog"></div>
 
    <!-- User details,User can start and stop， In addition to the doctor in addition to the ID card and phone can be modified --> 
 	<div id="user_detail_dialog" data-options="closed:true,modal:true,title:'Customer information',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 500px;">
		<div id="user_detail_dialog_detail_tab" class="easyui-tabs" style="width:680px;height:420px;"> 
		     <div title="Customer basic information" >
		     	<form action="vip/update.json" id="user_detail_form">
			        <input type="hidden" id="u_ID" name="id" />
			        <table style="margin-left: 10px"> 
						<tr id="code_tr" >
							<td>Customer code</td>
							<td>
								<input style="width: 200px;background: #CCC" type="text" id="u_VIP_CODE" name="vip_code" readonly="readonly" />
							</td> 
							<td>Credit Card Number</td>
							<td>
								<input style="width: 200px;" type="text" id="u_CARD_CODE" name="card_code" readonly="readonly" />
							</td>
						</tr>
						<tr id="code_tr" >
							<!-- <td>Birthday</td>
							<td>
								<input style="width: 200px;background: #CCC" type="text" id="u_BIRTHDAY" name="birthday"  readonly="readonly"/>
							</td> -->
							<td>Id Number</td>
							<td>
								<input style="width: 200px;" type="text" id="u_PAPERS_NUM" name="papers_num" />
							</td> 
							<td>Cell number</td>
							<td>
								<input style="width: 200px;" type="text" id="u_MOBILE" name="mobile" />
							</td>
						</tr>
						<tr id="code_tr" >
							<td>Login account</td>
							<td>
								<input style="width: 200px; " type="text" id="u_LOGIN_ACCOUNT" name="login_account" />
							</td> 
							<td>Member nickname</td>
							<td>
								<input style="width: 200px; " type="text" id="u_NICK_NAME" name="nick_name" />
							</td>
						</tr>
						<tr id="code_tr" >
							<td>Real name</td>
							<td>
								<input style="width: 200px;" type="text" id="u_REAL_NAME" name="real_name" />
							</td> 
							<!-- <td>Cell number</td>
							<td>
								<input style="width: 200px;background: #CCC" type="text" id="u_MOBILE" name="mobile"  readonly="readonly" />
							</td> -->
						</tr>
						<tr id="code_tr" >
							<!-- <td>Id type</td>
							<td>
								<input style="width: 200px;background: #CCC" type="text" id="u_PAPERS_TYPE" name="papers_type"   readonly="readonly"/>
							</td>  -->
							<td>Birthday</td>
							<td>
								<input class="easyui-datetimebox" type="text"  
								data-options="formatter:myformatter,parser:myparser" 
								style="width:200px;" name="birthday" id="u_BIRTHDAY"/>
								<!-- <input style="width: 200px; " type="text" id="u_BIRTHDAY" name="birthday" /> -->
							</td>
							<td>Age</td>
							<td>
								<input style="width: 200px; "  type="text" id="u_AGE" name="age"  />
							</td> 
						</tr>
						<tr id="code_tr" >
							<td>weight(KG)</td>
							<td>
								<input style="width: 200px;" type="text" id="u_WEIGHT" name="weight"  />
							</td> 
							<td>height(CM)</td>
							<td>
								<input style="width: 200px;" type="text" id="u_HEIGHT" name="height"  />
							</td>
						</tr>
						<tr id="code_tr" >
							<td>Gender</td>
							<td>
								<select id="u_SEX" name="sex">
										<m:getItems name="gender" />
								</select>
								<!-- <input style="width: 200px;" type="text" id="u_SEX" name="sex"  /> -->
							</td>
							<td>Whether effective</td>
							<td>
								<select id="u_ISVALID" name="isvalid">
										<m:getItems name="isEffective" />
								</select>
								<!-- <input style="width: 200px;" type="text" id="u_ISVALID" name="isvalid"  /> -->
								<button  type="button"  class="btn btn-success btn-success-min" style="padding: 6px 10px !important; " onclick="updateStatus()">Update status</button>
							</td>
						</tr>
						<tr id="code_tr" >
							<td>Allergic History</td>
							<td>
							<textarea style="width: 200px;" rows="3" cols="20" id="u_GM" name="gm"></textarea>
								<!-- <input style="width: 200px;" type="text" id="u_GM" name="gm"  /> -->
							</td> 
							<td>Medical history</td>
							<td>
							<textarea style="width: 200px;" rows="3" cols="20" id="u_ILL_HISTORY" name="ill_history"></textarea>
								<!-- <input style="width: 200px;" type="text" id="u_ILL_HISTORY" name="ill_history"  /> -->
							</td>
						</tr>
						<tr id="code_tr" >
							<td>Landline</td>
							<td>
								<input style="width: 200px;" type="text" id="u_PHONE" name="phone"  />
							</td>
							<td>Zip code</td>
							<td>
								<input style="width: 200px;" type="text" id="u_POST_CODE" name="post_code"  />
							</td> 
						</tr>
						<tr id="code_tr" >
							<td>QQ</td>
							<td>
								<input style="width: 200px;" type="text" id="u_QQ" name="qq"  />
							</td> 
							<td>mailbox</td>
							<td>
								<input style="width: 200px;" type="text" id="u_ACCOUNT_MAIL" name="account_mail"  />
							</td> 
						</tr>
						<tr>
							<td >Provincial city</td>
							<td>
								<select id="u_AREA" name="area" style="width: 200px;" > 
								</select>
							<!-- <textarea style="width: 200px;" rows="3" cols="20" id="u_AREA" name="area"></textarea> -->
							</td>
							<td >Detailed address</td>
							<td>
							<textarea style="width: 200px;" rows="3" cols="20" id="u_ADDRESS" name="address"></textarea>
							</td>
						</tr> 
						<tr>
							<td colspan="4" style="text-align: center">	
								<c:if test="${currentUser.roles eq '3'}">
									<button  onclick="submit_model_window();"   type="button"  
									class="btn btn-success"  >Update</button>  
								</c:if>
							</td>
						</tr> 
					</table>
			      </form>
		     </div> 
		      <div title="Chronic disease management" > 
					<form action="vip/updatemb.json" id="user_detail_form2">
			        <input type="hidden" id="ub_vip_id" name="vip_id" />
			        <table style="margin-left: 10px;width:97%"> 
						<tr id="code_tr" >
							<td>Chronic disease</td>
							<td>
								<select id="ub_ischronic" name="ischronic">
										<option value="0">no</option>
										<option value="1">yes</option>
								</select>
							</td>  
						</tr>
						<tr id="code_tr" >
							<td>Chronic disease types</td>
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
							<td>Medical insurance type</td><!-- 1Urban residents Health insurance，2ncms，3commercial insurance，4Not covered -->
							<td>
								<select id="ub_yb_type" name="yb_type">
										<m:getItems name="ybtype" />
								</select>
							</td>  
						</tr>
						<tr id="code_tr" >
							<td>Name of disease</td>
							<td>
								<input style="width: 200px;" type="text" id="ub_ill_name" name="ill_name"  />
							</td>  
						</tr>
						<tr id="code_tr" >
							<td>Diagnosis date</td>
							<td>
								<input class="easyui-datetimebox" type="text"  
								data-options="formatter:myformatter,parser:myparser" 
								style="width:200px;" name="inspect_timeStr" id="ub_inspect_time" />
							</td>  
						</tr>
						<tr id="code_tr" >
							<td >Medication</td>
							<td>
							<textarea style="width: 200px;" rows="3" cols="20" id="ub_ill_med" name="ill_med"></textarea>
							</td>
						</tr>
						
						<tr id="code_tr" >
							<td>Disease types</td>
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
									class="btn btn-success"  >Update</button>  
								</c:if>
							</td>
						</tr> 
					  </table>
					</form>
		     </div> 
		      <c:if test="${currentUser.roles eq '3'}">
		      <div title="group" > 
		        <!-- <div id="user_group_detail_dialog" data-options="closed:true,modal:true,title:'group',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 400px;"> -->
			      <form action="vip/tag.json" id="user_group_detail_form">
			        <input type="hidden" id="group_vipCode" />
			          <br/>
				      <c:forEach var="item" items="${dgList}">
		       				<input type="checkbox"  name="usergroupIds" id="usergroupId${item.id }" class="usergroupIdClass" value="${item.id }" />&nbsp;${item.name }&nbsp;&nbsp;
					  </c:forEach>
					  <div style="text-align: center;margin: 0 auto;">
					  	<button  onclick="addtag();"   type="button"  class="btn btn-success"  >Set up group</button>
					  </div>
			            
			        <!-- <table style="margin-left: 10px"> 
						<tr id="code_tr" >
							<td>Client joined group:</td>
						    <td id="tags_ids"><span style="color:red">No</span>
							</td> 
						</tr> 
					    <tr id="code_tr" >
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						</tr>
						
						<tr id="code_tr" >
							<td>Select group</td>
							<td>
								<select id="group-list_select"></select>
								<button  onclick="addtag();"   type="button"  class="btn btn-success"  >Set up group</button>  
							</td>
						</tr> 
					</table> -->
			      </form>
			    </div>
		         	 	
             </c:if>
		     <!-- Add another group hm += '<a href="javascript:opentag('+value+')">group</a>'; -->
		     
	     </div> 
    </div>
    
    <!-- Remote consultation details -->
	<div id="user_inspect_detail_dialog_d" data-options="closed:true,modal:true,title:'Remote consultation details'" style="padding: 5px; width: 850px; height: 450px;">
			<table id="remotes_datas_table_d"></table>
	</div>
    
    <!-- Consultation details -->
	<div id="user_inspect_detail_dialog_d2" data-options="closed:true,modal:true,title:'Consultation details'" style="padding: 5px; width: 850px; height: 450px;">
			<table id="questions_datas_table_d"></table>
	</div>
    
    <!-- Uric acid history -->
	<div id="user_inspect_detail_dialog_C06" data-options="closed:true,modal:true,title:'Uric acid history'" style="padding: 5px; width: 900px; height: 450px;">
			<table id="C06_datas_table"></table>
	</div>
    
    <!-- User detection details -->
	<div id="user_inspect_detail_dialog" data-options="closed:true,modal:true,title:'Detection details'" style="padding: 5px; width: 850px; height: 450px;">
		<!-- <table id="base_detail_table"></table> -->
		<div id="user_inspect_detail_tab" class="easyui-tabs" style="width:810px;height:330px;"> 
		     <div title="Latest test record  " id="last_inspect_datas">
		     	No data!
		     </div> 
		     <div title="ECG Test Records  " id="last_inspect_ecg_datas">
				<table id="ecg_table"></table>
		     </div> 
		      <div title="Remote consultation" id="remotes_datas"> 
					<table id="remotes_datas_table"></table>
		     </div> 
		      <div title="Consultation"  id="questions_datas"> 
					<table id="questions_datas_table"></table>
		     </div>
		      <div title="Message"  id="messages_datas"> 
					<table id="messages_datas_table"></table>
		     </div>
		 </div>   
    </div>
    
 	<div id="user_msg_detail_dialog" data-options="closed:true,modal:true,title:'Push single message',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 400px;">
      <form action="vip/message.json" id="user_message_detail_form">
        <input type="hidden" id="msg_cardCode" name="cardCode"  />
        <table style="margin-left: 10px"> 
			<tr id="code_tr" >
				<td>Message type</td>
				<td>
					<select id="msg-msg_type" name="msgType">
				     	 <option value="1">text</option>
				     	 <option value="2">link</option>
					</select>  
				</td>
				<td>&nbsp;&nbsp;&nbsp;Select template</td>
				<td>
					<select id="msg-msg_template_select" onchange="onselecttmp()"></select>  
				</td>
			</tr>
			<tr id="code_tr" >
				<td>Message title</td>
				<td colspan="3">
				<input style="width: 200px;" type="text" name="title"  id="msg_title" />
				</td>
			</tr>
			<tr>
				<td>Message content</td>
				<td colspan="3">
				<textarea style="width: 200px;" rows="3" cols="20" id="msg_content" name="content"></textarea>
				<!-- <input style="width: 200px;" type="text" name="content"  id="msg_content"  /> -->
				</td>
			</tr>
		</table>
      </form>
    </div>
    
 	<div id="users_msg_detail_dialog" data-options="closed:true,modal:true,title:'Push result set message',iconCls:'icon-save'" style="padding: 5px; width: 800px; height: 400px;">
      <form action="vip/message.json" id="users_message_detail_form">
        <input type="hidden" id="msgs_groupid" name="recivergroupid"/>
        <table style="margin-left: 10px"> 
			<tr id="code_tr" >
				<td width="20%">Number of customers receiving news：</td>
				<td colspan="3" id="msgs_groupname"></td>
				<input type="hidden" name="total"  id="msgs_total" />
			</tr>
			<tr id="code_tr" >
				<td width="20%">Message type</td>
				<td>
					<select id="msgs-msg_type" name="msgType">
				     	 <option value="1">text</option>
				     	 <option value="2">link</option>
					</select>  
				</td>
				<td>&nbsp;&nbsp;&nbsp;Select template</td>
				<td>
					<select id="msgs-msg_template_select" onchange="onselecttmps()"></select>  
				</td>
			</tr>
			<tr id="code_tr" >
				<td>Message title</td>
				<td colspan="3">
				<input style="width: 200px;" type="text" name="title"  id="msgs_title" maxlength="50"/>
				</td>
			</tr>
			<tr>
				<td>Message content</td>
				<td colspan="3">
				<textarea style="width: 200px;" rows="3" cols="20" id="msgs_content" name="content"></textarea>
				<!-- <input style="width: 200px;" type="text" name="content"  id="msgs_content"  /> -->
				</td>
			</tr>
		</table>
      </form>
    </div>
    
 	<div id="users_new_dialog" data-options="closed:true,modal:true,title:'New customer',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 500px;">
      <form action="vip/save.json" id="users_new_form">
           <table style="margin-left: 10px"> 
			<!-- <tr id="code_tr" >
				<td>Customer code</td>
				<td>
					<input style="width: 200px;" type="text" id="un_VIP_CODE" name="vip_code" />
				</td> 
				<td>Credit Card Number</td>
				<td>
					<input style="width: 200px;" type="text" id="un_CARD_CODE" name="card_code"  />
				</td>
			</tr> -->
			<tr id="code_tr" >
				<td>Login account<span style="color:red">*</span></td>
				<td>
					<input style="width: 200px;" type="text" id="un_LOGIN_ACCOUNT" name="login_account" />
				</td> 
				<td>Member nickname<span style="color:red">*</span></td>
				<td>
					<input style="width: 200px;" type="text" id="un_NICK_NAME" name="nick_name"  />
				</td>
			</tr>
			<tr id="code_tr" >
				<td>Real name<span style="color:red">*</span></td>
				<td>
					<input style="width: 200px;" type="text" id="un_REAL_NAME" name="real_name"  />
				</td> 
				<td>Cell number<span style="color:red">*</span></td>
				<td>
					<input style="width: 200px;" type="text" id="un_MOBILE" name="mobile" />
				</td>
			</tr>
			<tr id="code_tr" >
				<td>Birthday<span style="color:red">*</span></td>
				<td>
					<!-- <input style="width: 200px;" type="text" id="un_BIRTHDAY" name="birthday" /> -->
					<input class="easyui-datetimebox" type="text"  
								data-options="formatter:myformatter,parser:myparser" 
								style="width:200px;" name="birthday" id="un_BIRTHDAY"/>
				</td>
				<td>Age<span style="color:red">*</span></td>
				<td>
					<input style="width: 200px;"  type="text" id="un_AGE" name="age" />
				</td> 
			</tr>
			<tr id="code_tr" >
				<td>Id Number<span style="color:red">*</span></td>
				<td>
					<input style="width: 200px;" type="text" id="un_PAPERS_NUM" name="papers_num" />
				</td> 
			</tr>
			<tr id="code_tr" >
				<td>weight(KG)</td>
				<td>
					<input style="width: 200px;" type="text" id="un_WEIGHT" name="weight"  />
				</td> 
				<td>height(CM)</td>
				<td>
					<input style="width: 200px;" type="text" id="un_HEIGHT" name="height"  />
				</td>
			</tr>
			<tr id="code_tr" >
				<td>Gender</td>
				<td>
					<select id="un_SEX" name="sex">
							<m:getItems name="gender" />
					</select>
				</td>
				<td>Whether effective</td>
				<td>
					<select id="un_ISVALID" name="isvalid">
							<m:getItems name="isEffective" />
					</select>
				</td>
			</tr>
			<tr id="code_tr" >
				<td>Allergic History</td>
				<td>
				<textarea style="width: 200px;" rows="3" cols="20" id="un_GM" name="gm"></textarea>
				</td> 
				<td>Medical history</td>
				<td>
				<textarea style="width: 200px;" rows="3" cols="20" id="un_ILL_HISTORY" name="ill_history"></textarea>
				</td>
			</tr>
			<tr id="code_tr" >
				<td>Landline</td>
				<td>
					<input style="width: 200px;" type="text" id="un_PHONE" name="phone"  />
				</td>
				<td>Zip code</td>
				<td>
					<input style="width: 200px;" type="text" id="un_POST_CODE" name="post_code"  />
				</td> 
			</tr>
			<tr id="code_tr" >
				<td>QQ</td>
				<td>
					<input style="width: 200px;" type="text" id="un_QQ" name="qq"  />
				</td> 
				<td>mailbox</td>
				<td>
					<input style="width: 200px;" type="text" id="un_ACCOUNT_MAIL" name="account_mail"  />
				</td> 
			</tr>
			<tr>
				<td >Provincial city</td>
				<td>
					<select id="un_AREA" name="area" style="width: 200px;" ></select>
				</td>
				<td >Detailed address</td>
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