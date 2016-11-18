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
		title : '处理',
		width : 450,
		height : 330,
		closed : true,
		title : '',
		closed : true,
		buttons : [{
			text : '处理',
			iconCls : 'icon-ok',
			handler : function() {
				//插入
				save("1");
			}
		},{
			text : '取消',
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
			$('#feedback_type').combobox('setValue',"请选择");
		}
	});
}

//初始化table
function initDataGrid(){
	$('#feedback_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,	//禁止文字自动换行
		autoRowHeight: true,	//禁止自动调整row高度
		striped: true,	//有条纹
		toolbar: "#common_search",	//工具栏
		fit:true,	//自适应
		fitColumns:true,	//列自适应
		collapsible:true,	//窗口是否可以折叠
		url:'feedback/getList.json' ,	//请求远程数据
		queryParams:parameter,	//请求远程数据发送的额外数据
		remoteSort: false,	//禁止服务器对数据排序
		singleSelect:true,	//只能单选
		idField:'id',
		columns:[[
			{field:'feedback_type',title:'意见反馈类型',width:100
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
			{field:'feedback_content',title:'建议内容',width:100},
			{field:'contact_way',title:'联系方式',width:100},
			{field:'is_handle',title:'是否处理',width:70,
				formatter:function(value){
					if(1==value){
						return '是';
					}else if(0==value){
						return '否';
					}
				}
		},
			{field:'remark',title:'备注',width:100},
			{field : 'create_time',title : '创建时间',width : 100,
				formatter : function(value) {
					var date = new Date(value);
					return formatterDateTime(date);
				}
			},
			{field : 'handle_time',title : '处理时间',width : 100,
				formatter : function(value) {
					if(value==null){
						return "";
					}else{
						var date = new Date(value);
						return formatterDateTime(date);
					}
				}
			},
			{field:'id',title:'操作',width:70,
					formatter:function(value,row,index){
						return '<a href = javascript:compile('+value+')>处理</a>';
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
		$.messager.alert('提示','请输入备注');
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
							msg : '处理成功！',
							timeout : timeoutValue,
							showType : 'slide'
						});
						$('#feedback_table').datagrid(
								'load', parameter);
					} else {
						$.messager.alert('提示', '操作失败');
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
	
	$('#feedback_add_dialog').dialog('setTitle','修改图片路径');
	$('#feedback_add_dialog').dialog('open');
}

/**
 * date类型转换成字符串显示
 */
function formatterDateTime(date) {
    var datetime = date.getFullYear()
            + "-"// "年"
            + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
                    + (date.getMonth() + 1))
            + "-"// "月"
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