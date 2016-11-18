var parameter = {};

var type = "D";

$(function() {
	
	type = $("#type").val();
	
//	if(type=='D'){
//		$("#hospitalInfo").hide();
//		$("#officeInfo").hide();
//		$("#docInfo").hide();
//		
//	}
//	
//	if(type=='S'){
//		$("#visit_add").hide();
//		$("#answer_content").hide();
//	}
//	
//	if(type=='H'){
//		$("#visit_add").hide();
//		$("#hospitalInfo").hide();
//		$("#answer_content").hide();
//	}
	
	
	$('#office_code').combobox({
		valueField : 'CODE',
		textField : 'NAME',
		height : 26,
		editable : false,
		url:'office/getItem.json?v='+Math.random(),		
	});
	
	//初始化弹出框
	$('#question_detail_dialog').dialog({
		buttons:[{
			text:'提  交',
			handler:function(){
				var saFlag = saveAnser();
				if(saFlag == '1') 
				{
					var param = {};	
					param['FIT-questionId'] = $("#questionId").val();
					$('#question_detail_table').datagrid('load',param);
				}					
			}
		},{
			text:'关  闭',
			handler:function(){
				$('#question_detail_dialog').dialog('close');
			}
		}]
	});
	
	//初始化表格
	initDataGrid();
	
	//条件查询
	$("#question_search").click(function(){
	
		parameter['FIT-hospitalcode'] =$("#hospital_code").val();
		parameter['FIT-officecode'] = $('#office_code').combobox('getValue');
		parameter['FIT-doctorname'] =$("#doctor_name").val();
		parameter['FIT-vipname'] =$("#vip_name").val();
		parameter['FIT-begintime'] =  $('#begin_time').datetimebox('getValue');
		parameter['FIT-endtime'] = $('#end_time').datetimebox('getValue');
		
		initDataGrid();
		parameter = {};		
	});
		
	//回复提交
	$("#answer_submit").click(function(){
				
		var saFlag = saveAnser();
		if(saFlag == '1') 
		{
			var param = {};	
			param['FIT-questionId'] = $("#questionId").val();
			$('#question_detail_table').datagrid('load',param);
		}		
	});	
	
	$('#question_reset').click(function(){
		$('#ques_qry_form')[0].reset();	
		$("#hospital_code").val();
		$("#office_code").combobox('setValue','');
	});
});

//修改
function showQuesDetail(qId){	
	$('#question_table').datagrid('selectRecord',qId);
	var rowInfo =  $('#question_table').datagrid('getSelected');
	if(rowInfo){		
		
		$('#quest_content').html(rowInfo.content); 
		$('#questionId').val(qId);			
				
		//初始化咨询详情列表
		var param = {};	
		param['FIT-questionId'] = qId;
		$('#question_detail_table').datagrid('load',param);	
		 
		$('#question_detail_dialog').dialog('open');
	}
}


function saveAnser()
{
	var answerCont = $("#answer_content").val();
	if(answerCont=="") return '0';
	
	var url="question/addQuesLog.json";
	var param = {
			answer_content : $("#answer_content").val(),
			vip_questions_id : $("#questionId").val()
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

//初始化table
function initDataGrid(){
	$('#question_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'question/getQuestionList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
				{field:'vip_name',title:'会员名称',width:100},
				{field:'hospital_name',title:'医院名称',width:100},	
				{field:'office_name',title:'科室名称',width:100},	
				{field:'doctor_name',title:'医生名称',width:100},
				{field:'title',title:'标题',width:100},
				{field:'content',title:'内容',hidden:true},
				{field:'create_time',title:'创建时间',width:100},				
				{field:'id',title:'操作',width:85,
						formatter:function(value){
							return '<a href="javascript:showQuesDetail('+value+')">查看</a>';
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
		$("#question_table").datagrid('hideColumn', 'hospital_name');
		$("#question_table").datagrid('hideColumn', 'office_name');
		$("#question_table").datagrid('hideColumn', 'doctor_name');
	}
	if(type == "H")
	{
		$("#question_table").datagrid('hideColumn', 'hospital_name');
	}
	
	//$("#visit_table").datagrid('hideColumn', 'createTime');
	//$("#visit_table").datagrid('showColumn', 'vipId');
}






