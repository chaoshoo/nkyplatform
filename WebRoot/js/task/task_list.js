var parameter = {};
$(function() {
	//初始化表格
	initDataGrid();
	
	$('#question_add').bind('click',function() {
		question_id = null;
		$('#question_add_dialog').dialog('setTitle','New common problems');
		$('#question_form')[0].reset();
		$('#id').val('');
		$('#quest_group').combobox('setValue',"Please select");
		$('#quest_type').combobox('setValue',"Please select");
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
		title : 'New common problems',
		width : 600,
		height : 400,
		closed : true,
		title : '',
		closed : true,
		buttons : [{
			text : 'Confirmed',
			iconCls : 'icon-ok',
			handler : function() {
				//插入
				save();
			}
		},{
			text : 'cancel',
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
			$('#quest_group').combobox('setValue',"Please select");
		}
	});
	
	$('#quest_type').combobox({
		valueField : 'dicName',
		textField : 'dicValue',
		editable : false,
		url : 'pubData/getDicList.json?dicType=isPopular',
		onLoadSuccess : function() {
			$('#quest_type').combobox('setValue',"Please select");
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
			{field:'quest_gname',title:'Group name',width:100},
			{field:'title',title:'Title',width:100},
			{field:'content',title:'Content problem',width:100},
			{field:'quest_type',title:'Whether popular',width:70,
				formatter:function(value){
					if(1==value){
						return 'yes';
					}else if(0==value){
						return 'no';
					}
				}
		},
			{field : 'create_time',title : 'Created time',width : 100,
				formatter : function(value) {
					var date = new Date(value);
					return formatterDateTime(date);
				}
			},
			{field:'id',title:'operation',width:70,
					formatter:function(value,row,index){
						return '<a href = javascript:compile('+value+')>edit</a>&nbsp;&nbsp;&nbsp;<a href=javascript:del('+value+')><font color="red">delete</font></a>';
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
	if (quest_group == "Please select") {
		$.messager.alert('Prompt','Please select group of questions');
		return;
	}
	var title = $('#title').val();
	if (title == "") {
		$.messager.alert('Prompt','Please enter a title');
		return;
	}
	
	var content = $('#content').val();
	if (content == "") {
		$.messager.alert('Prompt','Please enter the content');
		return;
	}
	var quest_type = $('#quest_type').combobox('getValue');
	if (quest_type == "Please select") {
		$.messager.alert('Prompt','Please choose whether or not popular');
		return;
	}
	var orders = $('#orders').val();
	if (isNaN(orders)) {
		$.messager.alert('Prompt','Sort number can only be a number！');
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
						$.messager.show({title:titleInfo,msg:'Changed！',timeout:timeoutValue,showType:'slide'});
						$('#question_table').datagrid('load',parameter);
					} else {
						$.messager.alert('Prompt','Change failed');
					}
				},'json');
			} else {
				$.post('question/save.json',question,function(result) {
					if (result.code == 1) {
						$('#question_add_dialog').dialog('close');
						$.messager.show({title:titleInfo,msg:'New success！',timeout:timeoutValue,showType:'slide'});
						$('#question_table').datagrid('load',parameter);
					} else {
						$.messager.alert('Prompt','New failed');
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
	
	$('#question_add_dialog').dialog('setTitle','Modify common problems');
	$('#question_add_dialog').dialog('open');
}

function del(value){
	$.messager.confirm('Prompt','Delete it??',function(y) {
		if (y) {
			$.post('question/delete.json',{"id":value},function(result) {
				if (result.code == 1) {
					$.messager.alert('Prompt','Deleted');
					$('#question_table').datagrid('reload',{});
				} else {
					$.messager.alert('Prompt','Delete failed');
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