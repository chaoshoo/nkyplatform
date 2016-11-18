var parameter = {};
$(function() {
	//初始化表格
	initDataGrid();
	
	$('#question_add').bind('click',function() {
		question_id = null;
		$('#question_add_dialog').dialog('setTitle','新增常见问题');
		$('#question_form')[0].reset();
		$('#id').val('');
		$('#quest_group').combobox('setValue',"请选择");
		$('#quest_type').combobox('setValue',"请选择");
		$('#question_add_dialog').dialog('open');
		
	});
	$("#question_search").click(function(){
		if($("#title1").val()!=''){
			parameter['title'] =$("#title1").val();
		}
		initDataGrid();
		parameter = {};
		
	});
	
	$("#question_reset").click(function(){
		$("#title1").val("");
	});
	
	initCombobox();
	
	initDialog();
	
});

function initDialog() {
	
	$('#question_add_dialog').dialog({
		title : '新增常见问题',
		width : 600,
		height : 400,
		closed : true,
		title : '',
		closed : true,
		buttons : [{
			text : '确定',
			iconCls : 'icon-ok',
			handler : function() {
				//插入
				save();
			}
		},{
			text : '取消',
			iconCls : 'icon-cancel',
			handler : function() {
				$('#question_add_dialog').dialog('close');
			}
		}],
		onClose : function() {
		}
	});
}

function initCombobox() {
	$('#quest_group').combobox({
		valueField : 'dicName',
		textField : 'dicValue',
		editable : false,
		url : 'pubData/getDicList.json?dicType=quest_group',
		onLoadSuccess : function() {
			$('#quest_group').combobox('setValue',"请选择");
		}
	});
	
	$('#quest_type').combobox({
		valueField : 'dicName',
		textField : 'dicValue',
		editable : false,
		url : 'pubData/getDicList.json?dicType=isPopular',
		onLoadSuccess : function() {
			$('#quest_type').combobox('setValue',"请选择");
		}
	});
}

//初始化table
function initDataGrid(){
	$('#question_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,	//禁止文字自动换行
		autoRowHeight: true,	//禁止自动调整row高度
		striped: true,	//有条纹
		toolbar: "#common_search",	//工具栏
		fit:true,	//自适应
		fitColumns:true,	//列自适应
		collapsible:true,	//窗口是否可以折叠
		url:'question/getList.json' ,	//请求远程数据
		queryParams:parameter,	//请求远程数据发送的额外数据
		remoteSort: false,	//禁止服务器对数据排序
		singleSelect:true,	//只能单选
		idField:'id',
		columns:[[
			{field:'quest_gname',title:'分组名称',width:100},
			{field:'title',title:'标题',width:100},
			{field:'content',title:'问题内容',width:100},
			{field:'quest_type',title:'是否热门',width:70,
				formatter:function(value){
					if(1==value){
						return '是';
					}else if(0==value){
						return '否';
					}
				}
		},
			{field : 'create_time',title : '创建时间',width : 100,
				formatter : function(value) {
					var date = new Date(value);
					return formatterDateTime(date);
				}
			},
			{field:'id',title:'操作',width:70,
					formatter:function(value,row,index){
						return '<a href = javascript:compile('+value+')>编辑</a>&nbsp;&nbsp;&nbsp;<a href=javascript:del('+value+')><font color="red">删除</font></a>';
					}
			}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	});
}

function save() {
	var id = $('#id').val();
	var quest_gname = $('#quest_group').combobox('getText');
	var quest_group = $('#quest_group').combobox('getValue');
	if (quest_group == "请选择") {
		$.messager.alert('提示','请选择问题分组');
		return;
	}
	var title = $('#title').val();
	if (title == "") {
		$.messager.alert('提示','请输入标题');
		return;
	}
	
	var content = $('#content').val();
	if (content == "") {
		$.messager.alert('提示','请输入内容');
		return;
	}
	var quest_type = $('#quest_type').combobox('getValue');
	if (quest_type == "请选择") {
		$.messager.alert('提示','请选择是否热门');
		return;
	}
	var orders = $('#orders').val();
	if (isNaN(orders)) {
		$.messager.alert('提示','排序号只能是数字！');
		return;
	}
	var question = {
			"id":id,
			"quest_group":quest_group,
			"quest_gname":quest_gname,
			"title":title,
			"content":content,
			"quest_type":quest_type,
			"orders":orders
	};
			if (id != null && id != "") {
				$.post('question/update.json',question,function(result) {
					if (result.code == 1) {
						$('#question_add_dialog').dialog('close');
						$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
						$('#question_table').datagrid('load',parameter);
					} else {
						$.messager.alert('提示','修改失败');
					}
				},'json');
			} else {
				$.post('question/save.json',question,function(result) {
					if (result.code == 1) {
						$('#question_add_dialog').dialog('close');
						$.messager.show({title:titleInfo,msg:'新增成功！',timeout:timeoutValue,showType:'slide'});
						$('#question_table').datagrid('load',parameter);
					} else {
						$.messager.alert('提示','新增失败');
					}
				},'json');
			}
}

function compile(value) {
	
	$('#question_table').datagrid('selectRecord',value);
	var row =  $('#question_table').datagrid('getSelected');
	$('#id').val(row.id);
	$('#title').val(row.title);
	$('#quest_group').combobox('setValue',row.quest_gname);
	$('#content').val(row.content);
	$('#quest_type').combobox('setValue',row.quest_type);
	$('#orders').val(row.orders);
	
	$('#question_add_dialog').dialog('setTitle','修改常见问题');
	$('#question_add_dialog').dialog('open');
}

function del(value){
	$.messager.confirm('提示','确认要删除吗?',function(y) {
		if (y) {
			$.post('question/delete.json',{"id":value},function(result) {
				if (result.code == 1) {
					$.messager.alert('提示','删除成功');
					$('#question_table').datagrid('reload',{});
				} else {
					$.messager.alert('提示','删除失败');
				}
			},'json');
		}
	});
	
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