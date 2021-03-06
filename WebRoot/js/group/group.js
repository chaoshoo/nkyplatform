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
//		$("#group_add").hide();
//	}
//	
//	if(type=='H'){
//		$("#group_add").hide();
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
	$('#group_detail_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				submit_model_window();
				
			}
		},{
			text:'取 消',
			handler:function(){
				$('#group_detail_dialog').dialog('close');
			}
		}]
	});
	
	//初始化表格
	initDataGrid();
	
	//添加用户
	$('#group_add').click(function(){
		$('#group_detail_form')[0].reset();
		$('#groupId').val('');
		$('#group_detail_dialog').dialog('open');		
	});
		
	//条件查询
	$("#group_search").click(function(){

		parameter['FIT-hospitalcode'] =$("#hospital_code").val();
		parameter['FIT-officecode'] = $('#office_code').combobox('getValue');
		parameter['FIT-doctorname'] =$("#doctor_name").val();
		parameter['FIT-groupName'] =$("#groupName").val();
		parameter['FIT-begintime'] =  $('#begin_time').datetimebox('getValue');
		parameter['FIT-endtime'] = $('#end_time').datetimebox('getValue');
		initDataGrid();
		parameter = {};		
	});
	
	
	$('#group_reset').click(function(){
		$('#group_qry_form')[0].reset();
		$("#hospital_code").val();
		$("#office_code").combobox('setValue','');
	});
		
});

//修改
function groupEdit(visitId){
	
	$('#group_table').datagrid('selectRecord',visitId);
	var rowInfo =  $('#group_table').datagrid('getSelected');
	
	if(rowInfo){
		//设置弹出框信息
		generateDialog(rowInfo);
		$('#group_detail_dialog').dialog('open');
	}
}

//保存
function submit_model_window(){
	
	var groupId = $("#groupId").val();
	
	var name = $("#name").val();
	if(name==null||name==''){
		$.messager.alert(titleInfo,'请填写群名称!');
		return;
	}	
	
	var remark = $("#remark").val();
	if(remark==null||remark==''){
		$.messager.alert(titleInfo,'请填写群描述!');
		return;
	}	
	
	var groupInfo = {			
			"name":name,
			"remark":remark
	};

	if(groupId!=null&&groupId!=""){
		groupInfo['id']=groupId;		
		$.post("vipgroup/updategroup.json",groupInfo,function(data){
			if(data.code==1){
				$('#group_detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
				$('#group_table').datagrid('load',parameter);
			}else{				
				$.messager.alert(titleInfo,'修改失败！');
			}
		},"json");
	}else{
		$.post("vipgroup/addgroup.json",groupInfo,function(data){
			if(data.code==1){
				$('#group_detail_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'添加成功！',timeout:timeoutValue,showType:'slide'});
				$('#group_table').datagrid('load',parameter);
			}else {
				$.messager.alert(titleInfo,'添加失败！');
			}
		},"json");
	}
}

//初始化table
function initDataGrid(){
	$('#group_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'vipgroup/getGroupList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
				{field:'name',title:'群名称',width:100},
				{field:'remark',title:'群描述',width:100},
				{field:'hospital_name',title:'医院名称',width:100},	
				{field:'office_name',title:'科室名称',width:100},	
				{field:'doctor_name',title:'医生名称',width:100},
				{field:'create_time',title:'创建时间',width:100},				
				{field:'id',title:'操作',width:85,
						formatter:function(value){
							return '<a href="javascript:groupEdit('+value+')">编辑</a>';
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



//设置弹出框信息 
function generateDialog(rowInfo){
	
	$('#groupId').val(rowInfo.id);
	$('#name').val(rowInfo.name);
	$('#remark').val(rowInfo.remark);
}

