var parameter = {};
var curId = null;
var gCurObj = null;
var type = "D";

$(function() {
	type = $("#type").val();
	
	$('#office_code').combobox({
		valueField : 'CODE',
		textField : 'NAME',
		height : 26,
		editable : false,
		url:'office/getItem.json?v='+Math.random(),		
	});
	
	//初始化表格
	initDataGrid();
	
	//条件查询
	$("#diagnose_search").click(function(){
	
		parameter['FIT-hospitalcode'] =$("#hospital_code").val();
		parameter['FIT-officecode'] = $('#office_code').combobox('getValue');
		parameter['FIT-doctorname'] =$("#doctor_name").val();
		parameter['FIT-vipname'] =$("#vip_name").val();
		parameter['FIT-begintime'] =  $('#begin_time').datetimebox('getValue');
		parameter['FIT-endtime'] = $('#end_time').datetimebox('getValue');
		parameter['FIT-papers_num'] =$("#papers_num").val();
		parameter['FIT-mobile'] =$("#mobile").val();
		parameter['FIT-status'] =$("#status").val();
		
		initDataGrid();
		parameter = {};		
	});
	
	if(type=='D'){
		$('#diagnose_detail_dialog').dialog({
			buttons:[{
				text:'carry  hand over',
				handler:function(){
					var saFlag = saveAnser();
					if(saFlag == '1') 
					{
						var param = {};	
						param['FIT-remoteInspectCode'] = $("#remoteInspectCode").val();
						$('#diagnose_detail_table').datagrid('load',param);
					}					
				}
			},{
				text:'shut down  close',
				handler:function(){
					$('#diagnose_detail_dialog').dialog('close');
				}
			}]
		});
	}else{	
		$("#answer_div").hide();
		$('#diagnose_detail_dialog').dialog({
			buttons:[{
				text:'shut down  close',
				handler:function(){
					$('#diagnose_detail_dialog').dialog('close');
				}
			}]
		});
	}
		
	$('#diagnose_reset').click(function(){
		$('#ques_qry_form')[0].reset();	
		$("#hospital_code").val();
		$("#office_code").combobox('setValue','');
	});
	IM.init();
});

function saveAnser()
{
	var answerCont = $("#answer_content").val();
	if(answerCont=="") return '0';
	
	var url="diagnose/addInspectLog.json";
	var param = {
		des : $("#answer_content").val(),
		remoteInspectCode : $("#remoteInspectCode").val()
	};
	$.post(url,param,function(data){		
		if(data.code==1) 
		{
			$("#answer_content").val("");
			return "1";
		}
		return "0";
		
	},"json").error(function(XMLHttpRequest, textStatus, errorThrown){
		alert("error");
		return "0";
	});
	
	return "1";
}

function diagnoseFunc(obj,qId){	
	$('#diagnose_table').datagrid('selectRecord',qId);
	var rowInfo =  $('#diagnose_table').datagrid('getSelected');
	if(rowInfo){
		gCurObj = obj;
		IM._login($("#doctorCode").val(),"");
		$("#callerId").val(rowInfo.vip_code);
		curId = rowInfo.id;
		ajaxLoading("Connecting,One moment please...");
		IM.DO_inviteCall(1);
	}
}

function denyDiagnoseFunc(obj,qId){
	$.messager.confirm('confirm','Confirm to refuse appointment？',function(del){  
		$.post("diagnose/videoDiagnoseOper.json",{id:qId,flag:"D"},function(data){
			if(!data.result == "success"){
				$.messager.alert("Prompt", data.info);
			}else{
				$("#diagnose_search").click();
			}
		},"json");
	})  
}

//初始化table
function initDataGrid(){
	$('#diagnose_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'diagnose/getDiagnoseList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
				{field:'vip_name',title:'Member name',width:100},
				{field:'hospital_name',title:'Hospital name',width:100},	
				{field:'office_name',title:'Department name',width:100},	
				{field:'doctor_name',title:'Doctor name',width:100},
				{field:'order_time',title:'Appointment time',width:100},	
				{field:'remark',title:'content',width:100},		
				{field:'isdeal',title:'Processing status',width:100,
					formatter : function (value) {
						if(value=="1")
						{
							return "Processed";
						}else if(value=="2")
						{
							return "Refused";
						}
						return "Untreated";
					}
				},	
				{field:'id',title:'Operation',width:85,
						formatter:function(value,row){
							if(row.isdeal == "1" || row.isdeal == "2") {
								return '<a href="javascript:void(0)" style="color:#cccccc;text-decoration:none">Video Call</a>&nbsp;&nbsp;<a href="javascript:showDiagnoseDetail('+value+')">See</a>';
							} else {
								return '<a href="javascript:diagnoseFunc(this,'+value+')">Video Call</a>&nbsp;&nbsp;<a href="javascript:denyDiagnoseFunc(this,'+value+')">Refuse video chat</a>&nbsp;&nbsp;<a href="javascript:showDiagnoseDetail('+value+')">See</a>';	
							}
						}
				}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
	
	if(type == "D")
	{
		$("#diagnose_table").datagrid('hideColumn', 'hospital_name');
		$("#diagnose_table").datagrid('hideColumn', 'office_name');
		$("#diagnose_table").datagrid('hideColumn', 'doctor_name');
	}
	if(type == "H")
	{
		$("#diagnose_table").datagrid('hideColumn', 'hospital_name');
		$("#diagnose_table").datagrid('hideColumn', 'id');
	}
	
	if(type == "S")
	{
		$("#diagnose_table").datagrid('hideColumn', 'id');
	}
	
}

function ajaxLoading(tipsValue){
    $("<div class=\"datagrid-mask\"></div>").css({display:"block",width:"100%",height:"100%",'font-size':"14px",'font-weight':"normal"}).appendTo("body"); 
    $("<div class=\"datagrid-mask-msg\"></div>").html(tipsValue).appendTo("body").css({display:"block",left:"50%",top:"50%",'font-size':"14px",'font-weight':"normal"}); 
}

function ajaxLoadEnd(){ 
    $(".datagrid-mask").remove(); 
    $(".datagrid-mask-msg").remove();      
}

function showDiagnoseDetail(qId){
	$('#diagnose_table').datagrid('selectRecord',qId);
	var rowInfo =  $('#diagnose_table').datagrid('getSelected');
	if(rowInfo){
		$('#diagnose_content').html(rowInfo.remark); 
		$('#remoteInspectCode').val(qId);			
		//初始化咨询详情列表
		var param = {};	
		param['FIT-remoteInspectCode'] = qId;
		$('#diagnose_detail_table').datagrid('load',param);	
		$('#diagnose_detail_dialog').dialog('open');
	}
}

function startVideoDiagnose(){
	$.post("diagnose/videoDiagnoseOper.json",{id:curId,flag:"S"},function(data){
		if(!data.result == "success"){
			$.messager.alert("Prompt", data.info);
		}
	},"json");
}

function finishVideoDiagnose(){
	$.post("diagnose/videoDiagnoseOper.json",{id:curId,flag:"E"},function(data){
		if(!data.result == "success"){
			$.messager.alert("Prompt", data.info);
		}else{
			IM.EV_logout();
			$("#diagnose_search").click();
		}
	},"json");
}






