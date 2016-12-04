var parameter = {};

$(function() {
	//初始化表格
	initDataGrid();
	
	//条件查询
	$("#diagnose_search").click(function(){
	
		parameter['FIT-hospitalname'] =$("#hospitalname").val();
		parameter['FIT-departmentname'] = $('#departmentname').val();
		parameter['FIT-doctorname'] =$("#doctor_name").val();
		parameter['FIT-vipname'] =$("#vip_name").val();
		parameter['FIT-begintime'] =  $('#begin_time').datetimebox('getValue');
		parameter['FIT-endtime'] = $('#end_time').datetimebox('getValue');
		
		initDataGrid();
		parameter = {};		
	});
		
});

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
		url:'registration/getRegistrationList.json',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'id',
		columns:[[
				{field:'patientname',title:'Patient name',width:100},
				{field:'patientsex',title:'Patient sex',width:50,
					formatter:function(value){
						return util.getValueBykeyDic('gender',value);
					 }
				},
				{field:'patientbirthday',title:'Birthday',width:100},
				{field:'create_time',title:'Registration Time',width:100},
				{field:'orderfee',title:'Registration fee',width:50},
				{field:'hosname',title:'Hospital name',width:100},	
				{field:'deptname',title:'Department name',width:100},	
				{field:'docname',title:'Doctor name',width:100},
				{field:'status',title:'Order status',width:100,
					formatter:function(value){
						return util.getValueBykeyDic('gh_status',value);
					 }
				},				
//				{field:'id',title:'操作',width:85,
//						formatter:function(value){
//							return '<a href="javascript:diagnoseFunc('+value+')">咨询</a>';
//						}
//				}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
	
}





