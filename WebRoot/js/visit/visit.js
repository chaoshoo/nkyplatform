var parameter = {};

var type = "D";

$(function() {
	
	type = $("#type").val();

//	if(type=='D'){
//		$("#hospitalInfo").hide();
//		$("#officeInfo").hide();
//		$("#docInfo").hide();
//	}
//	
//	if(type=='S'){
//		$("#visit_add").hide();
//	}
//	
//	if(type=='H'){
//		$("#visit_add").hide();
//		$("#hospitalInfo").hide();
//	}
		
	$('#office_code').combobox({
		valueField : 'CODE',
		textField : 'NAME',
		height : 26,
		editable : false,
		url:'office/getItem.json?v='+Math.random(),		
	});
	
	//初始化弹出框
	$('#visit_detail_dialog').dialog({
		buttons:[{
			text:'Indeed set',
			handler:function(){
				submit_model_window();
				
			}
		},{
			text:'take eliminate',
			handler:function(){
				$('#visit_detail_dialog').dialog('close');
			}
		}]
	});
	
	//初始化表格
	initDataGrid();
	
	$('#visit_add').click(function(){
		$('#visit_detail_form')[0].reset();
		$('#visitId').val('');
		$('#visit_detail_dialog').dialog('open');		
	});
	
	$('#visit_reset').click(function(){
		$('#visit_qry_form')[0].reset();	
		$("#hospital_code").val();
		$("#office_code").combobox('setValue','');
	});
		
	//条件查询
	$("#visit_search").click(function(){

		parameter['FIT-hospitalcode'] =$("#hospital_code").val();
		parameter['FIT-officecode'] = $('#office_code').combobox('getValue');
		parameter['FIT-doctorname'] =$("#doctor_name").val();
		parameter['FIT-vipname'] =$("#vip_name").val();
		parameter['FIT-begintime'] =  $('#begin_time').datetimebox('getValue');
		parameter['FIT-endtime'] = $('#end_time').datetimebox('getValue');

		initDataGrid();
		parameter = {};		
	});
	
	
	$("#btnSelVip").click(function(){
		vipDialogShow();
	});
	
});

//修改
function visitEdit(visitId){
	
	$('#visit_table').datagrid('selectRecord',visitId);
	var rowInfo =  $('#visit_table').datagrid('getSelected');
	
	if(rowInfo){
		//设置弹出框信息
		generateDialog(rowInfo);
		$('#visit_detail_dialog').dialog('open');
	}
}

//保存
function submit_model_window(){
	var visitId = $("#visitId").val();
	var vipId = $("#vipId").val();
	if(vipId==null||vipId==''){		
		$.messager.alert(titleInfo,'Please select members!');
		return;
	}
	var content = $("#content").val();
	if(content==null||content==''){
		$.messager.alert(titleInfo,'Please input visit record!');
		return;
	}	
	

	var beginTime = $('#beginTime').datetimebox('getValue');
	var endTime = $('#endTime').datetimebox('getValue');
	
	var visitInfo = {			
			"visit_user":vipId,
			"content":content,
			"begin_time":beginTime,
			"end_time":endTime			
	};

	if(visitId!=null&&visitId!=""){
		visitInfo['id']=visitId;		
		$.post("visit/updateVisit.json",visitInfo,function(data){
			if(data.code==1){
				$('#visit_detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'Changed！',timeout:timeoutValue,showType:'slide'});
				$('#visit_table').datagrid('load',parameter);
			}else{				
				$.messager.alert(titleInfo,'Change failed！');
			}
		},"json");
	}else{
		$.post("visit/addVisit.json",visitInfo,function(data){
			if(data.code==1){
				$('#visit_detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'Added！',timeout:timeoutValue,showType:'slide'});
				$('#visit_table').datagrid('load',parameter);
			}else {
				$.messager.alert(titleInfo,'Add failed！');
			}
		},"json");
	}
}

//初始化table
function initDataGrid(){
	$('#visit_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'visit/getVisitList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
				{field:'vip_name',title:'Member name',width:80},
				{field:'visit_user',title:'Member identification',hidden:true},
				{field:'content',title:'Visit content',width:100},	
				{field:'hospital_name',title:'Hospital name',width:80},	
				{field:'office_name',title:'Department name',width:80},	
				{field:'doctor_name',title:'Doctor name',width:80},	
				{field:'begin_time',title:'start time',width:150},
				{field:'end_time',title:'End time',width:150},
				{field:'create_time',title:'Created time',width:150},				
				{field:'visitid',title:'Operation',width:85,
						formatter:function(value){
							return '<a href="javascript:visitEdit('+value+')">edit</a>';
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
		$("#visit_table").datagrid('hideColumn', 'hospital_name');
		$("#visit_table").datagrid('hideColumn', 'office_name');
		$("#visit_table").datagrid('hideColumn', 'doctor_name');
	}
	if(type == "S")
	{
		$("#visit_table").datagrid('hideColumn', 'visitid');
	}
	if(type == "H")
	{
		$("#visit_table").datagrid('hideColumn', 'hospital_name');
		$("#visit_table").datagrid('hideColumn', 'visitid');
	}
	
	//$("#visit_table").datagrid('showColumn', 'vipId');
}



//设置弹出框信息 
function generateDialog(rowInfo){
	
	$('#visitId').val(rowInfo.visitid);	
	$('#vipId').val(rowInfo.visit_user);
	$('#vipName').val(rowInfo.vip_name);
	$('#endTime').datetimebox('setValue',rowInfo.end_time);
	$('#beginTime').datetimebox('setValue',rowInfo.begin_time);
	$('#content').val(rowInfo.content);
}


function vipDialogShow(flag){
	$('#dialog_select_vip').dialog({
		title: 'Select members',
		width: 600,
		height: 500,
		cache: false,
		href: 'visit/vipDialog.html',
		modal: true,
		buttons:[{
			text:'confirm',
			handler:function(){
				var ssobj  = $('#dialog_select_vip').dialog('panel').find('#dg_vip');
				var checkedRows = $(ssobj).datagrid('getChecked');
				if(checkedRows){					
					for(var i=0;i<checkedRows.length;i++){	
						$('#vipId').val(checkedRows[i].id);
						$('#vipName').val(checkedRows[i].real_name);
					}					
				}
				$('#dialog_select_vip').panel('close');
			}
		},{
			text:'Close',
			handler:function(){
				$('#dialog_select_vip').panel('close');
			}
		}]
	});
}