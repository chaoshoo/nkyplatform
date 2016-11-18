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
			text:'确 定',
			handler:function(){
				submit_model_window();
				
			}
		},{
			text:'取 消',
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
		$.messager.alert(titleInfo,'请填选择会员!');
		return;
	}
	var content = $("#content").val();
	if(content==null||content==''){
		$.messager.alert(titleInfo,'请填写出访记录!');
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
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
				$('#visit_table').datagrid('load',parameter);
			}else{				
				$.messager.alert(titleInfo,'修改失败！');
			}
		},"json");
	}else{
		$.post("visit/addVisit.json",visitInfo,function(data){
			if(data.code==1){
				$('#visit_detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
				$('#visit_table').datagrid('load',parameter);
			}else {
				$.messager.alert(titleInfo,'添加失败！');
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
				{field:'vip_name',title:'会员名称',width:80},
				{field:'visit_user',title:'会员标识',hidden:true},
				{field:'content',title:'出访内容',width:100},	
				{field:'hospital_name',title:'医院名称',width:80},	
				{field:'office_name',title:'科室名称',width:80},	
				{field:'doctor_name',title:'医生名称',width:80},	
				{field:'begin_time',title:'开始时间',width:150},
				{field:'end_time',title:'结束时间',width:150},
				{field:'create_time',title:'创建时间',width:150},				
				{field:'visitid',title:'操作',width:85,
						formatter:function(value){
							return '<a href="javascript:visitEdit('+value+')">编辑</a>';
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
		title: '选择会员',
		width: 600,
		height: 500,
		cache: false,
		href: 'visit/vipDialog.html',
		modal: true,
		buttons:[{
			text:'确认',
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
			text:'关闭',
			handler:function(){
				$('#dialog_select_vip').panel('close');
			}
		}]
	});
}
