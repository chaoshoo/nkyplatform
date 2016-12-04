var parameter = {};
$(function() {
	
	initCombobox();
	//初始化表格
	initDataGrid();
	
	initDialog();
	
	$("#feedback_search").click(function(){
		if($("#feedback_content1").val()!=''){
			parameter['feedback_content'] =$("#feedback_content1").val();
		}
		if($('#is_handle1').val()!=''){
			parameter['is_handle'] =$('#is_handle1').val();
		}
		initDataGrid();
		parameter = {};
	});
	
	$("#feedback_reset").click(function(){
		$("#feedback_content1").val("");
	});
	
});

function initDialog() {
	
	$('#feedback_add_dialog').dialog({
		title : 'Handle',
		width : 450,
		height : 330,
		closed : true,
		title : '',
		closed : true,
		buttons : [{
			text : 'Handle',
			iconCls : 'icon-ok',
			handler : function() {
				//插入
				save("1");
			}
		},{
			text : 'cancel',
			iconCls : 'icon-cancel',
			handler : function() {
				$('#feedback_add_dialog').dialog('close');
			}
		}],
		onClose : function() {
		}
	});
}

function initCombobox() {
	$('#feedback_type').combobox({
		valueField : 'dicName',
		textField : 'dicValue',
		editable : false,
		url : 'pubData/getDicList.json?dicType=feedback_type',
		onLoadSuccess : function(data) {
			$('#feedback_type').combobox('setValue',"Please select");
		}
	});
}

//初始化table
function initDataGrid(){
	$('#feedback_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,	//Prohibit text wrap
		autoRowHeight: true,	//Automatic adjustmentrowheight
		striped: true,	//Striped
		toolbar: "#common_search",	//toolbar
		fit:true,	//self-adaption
		fitColumns:true,	//Column adaptive
		collapsible:true,	//Whether the window can be folded
		url:'feedback/getList.json' ,	//Request remote data
		queryParams:parameter,	//Additional data requested for remote data transmission
		remoteSort: false,	//Prohibit the server to sort the data
		singleSelect:true,	//Only the radio
		idField:'id',
		columns:[[
			{field:'feedback_type',title:'Opinion feedback type',width:100
				//formatter:function(value){
					//if("zllc"==value){
						//return '租赁流程';
					//}else if("wlwt"==value){
						//return '物流问题';
					//}else if("shfw"==value){
						//return '售后服务';
					//}else if("jfyhq"==value){
						//return '积分/优惠券';
					//}else if("xpty"==value){
						//return '新品提议';
					//}else if("qtjy"==value){
						//return '其他建议';
					//}
				//}
			},
			{field:'feedback_content',title:'Recommended content',width:100},
			{field:'contact_way',title:'Contact ]',width:100},
			{field:'is_handle',title:'Whether to deal with',width:70,
				formatter:function(value){
					if(1==value){
						return 'yes';
					}else if(0==value){
						return 'no';
					}
				}
		},
			{field:'remark',title:'Remarks',width:100},
			{field : 'create_time',title : 'Created time',width : 100,
				formatter : function(value) {
					var date = new Date(value);
					return formatterDateTime(date);
				}
			},
			{field : 'handle_time',title : 'processing time',width : 100,
				formatter : function(value) {
					if(value==null){
						return "";
					}else{
						var date = new Date(value);
						return formatterDateTime(date);
					}
				}
			},
			{field:'id',title:'Operation',width:70,
					formatter:function(value,row,index){
						return '<a href = javascript:compile('+value+')>Handle</a>';
					}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}

function save(value) {
	var id = $('#id').val();
	var remark = $('#remark').val();
	if (remark == "") {
		$.messager.alert('Prompt','Please enter remarks');
		return;
	}
	var feedback = {
			"id":id,
			"remark":remark,
			"is_handle":value
	};
			if (id!=null && id!="") {
				$.post('feedback/update.json',feedback,function(result) {
					if (result.code == 1) {
						$('#feedback_add_dialog').dialog('close');
						$.messager.show({
							title : titleInfo,
							msg : 'Done！',
							timeout : timeoutValue,
							showType : 'slide'
						});
						$('#feedback_table').datagrid(
								'load', parameter);
					} else {
						$.messager.alert('Prompt', 'operation failed');
					}
				},'json');
			}
}

function compile(value) {
	
	$('#feedback_table').datagrid('selectRecord',value);
	var row =  $('#feedback_table').datagrid('getSelected');
	
	$('#id').val(row.id);
	$('#feedback_type').combobox('setValue',row.feedback_type);
	$('#feedback_content').val(row.feedback_content);
	$('#contact_way').val(row.contact_way);
	
	$('#feedback_add_dialog').dialog('setTitle','Change image path');
	$('#feedback_add_dialog').dialog('open');
}

/**
 * dateType convert to string display
 */
function formatterDateTime(date) {
    var datetime = date.getFullYear()
            + "-"// "year"
            + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
                    + (date.getMonth() + 1))
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