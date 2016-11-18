var parameter = {};
$(function() {
	// 初始化表格
	initDataGrid();

	$('#urlPic_add').bind('click', function() {
		urlPic_id = null;
		$('#urlPic_add_dialog').dialog('setTitle', '新增图片路径');
		$('#urlPic_form')[0].reset();
		$('#id').val('');
		$('#url_pic_type').combobox('setValue', "请选择");
		$('#urlPic_add_dialog').dialog('open');

	});

	$("#urlPic_search").click(function() {
		if ($("#title1").val() != '') {
			parameter['title'] = $("#title1").val();
		}
		initDataGrid();
		parameter = {};

	});

	$("#urlPic_reset").click(function() {
		$("#title1").val("");
	});

	initCombobox();

	initDialog();

});

function initDialog() {

	$('#urlPic_add_dialog').dialog({
		title : '新增图片路径',
		width : 450,
		height : 330,
		closed : true,
		title : '',
		closed : true,
		buttons : [ {
			text : '确定',
			iconCls : 'icon-ok',
			handler : function() {
				// 插入
				save();
			}
		}, {
			text : '取消',
			iconCls : 'icon-cancel',
			handler : function() {
				$('#urlPic_add_dialog').dialog('close');
			}
		} ],
		onClose : function() {
		}
	});
}

function initCombobox() {
	$('#url_pic_type').combobox({
		valueField : 'dicName',
		textField : 'dicValue',
		editable : false,
		url : 'pubData/getDicList.json?dicType=url_pic_ype',
		onLoadSuccess : function(data) {
			$('#url_pic_type').combobox('setValue', "请选择");
		}
	});
}

// 初始化table
function initDataGrid() {
	$('#urlPic_table')
			.datagrid(
					{
						iconCls : 'icon-save',
						nowrap : true, // 禁止文字自动换行
						autoRowHeight : true, // 禁止自动调整row高度
						striped : true, // 有条纹
						toolbar : "#common_search", // 工具栏
						fit : true, // 自适应
						fitColumns : true, // 列自适应
						collapsible : true, // 窗口是否可以折叠
						url : 'urlPic/getList.json', // 请求远程数据
						queryParams : parameter, // 请求远程数据发送的额外数据
						remoteSort : false, // 禁止服务器对数据排序
						singleSelect : true, // 只能单选
						idField : 'id',
						columns : [ [
								{
									field : 'title',
									title : '标题',
									width : 100
								},
								{
									field : 'url_pic_type',
									title : '类型',
									width : 70,
									formatter : function(value) {
										if ("roll" == value) {
											return '轮播图';
										} else if ("help" == value) {
											return '帮助';
										} else if ("app_roll" == value) {
											return '手机轮播图';
										} else if ("store_roll" == value) {
											return '门店轮播图';
										} else if ("partner" == value) {
											return '战略合作伙伴';
										} else if ("speek_link" == value) {
											return '快截入口';
										} else if ("store_add" == value) {
											return '申请入驻';
										} else if ("approll" == value) {
											return '手机首页';
										}
									}
								},
								{
									field : 'create_time',
									title : '创建时间',
									width : 100,
									formatter : function(value) {
										var date = new Date(value);
										return formatterDateTime(date);
									}
								},
								{
									field : 'url',
									title : '图片',
									width : 50,
									formatter : function(value, row) {
										var str = "";
										if (value != "" || value != null) {
											str = "<img style=\"height: 80px;width: 150px;\" src=\""
													+ value + "\"/>";
											return str;
										}
									}
								},
								{
									field : 'id',
									title : '操作',
									width : 70,
									formatter : function(value, row, index) {
										return '<a href = javascript:compile('
												+ value
												+ ')>编辑</a>&nbsp;&nbsp;&nbsp;<a href=javascript:del('
												+ value
												+ ')><font color="red">删除</font></a>';
									}
								} ] ],
						pagination : true,
						rownumbers : true,
						onClickRow : function(rowIndex) {
						}
					});
}

function save() {
	var id = $('#id').val();
	var title = $('#title').val();
	if (title == "") {
		$.messager.alert('提示', '请输入标题');
		return;
	}
	var url_pic_type = $('#url_pic_type').combobox('getValue');
	if (url_pic_type == "请选择") {
		$.messager.alert('提示', '请选择类型');
		return;
	}
	var regUrl = /(http\:\/\/)?([\w.]+)(\/[\w- \.\/\?%&=]*)?/gi;
	var url = $('#url').val();
	var result2 = url.match(regUrl);
	if (url == "") {
		$.messager.alert('提示', '请输入图片路径');
		return;
	}
	if(result2==null){
		$.messager.alert('提示', '图片路径格式错误');
		return;
	}
	
	var url_link = $('#url_link').val();
	var result1 = url_link.match(regUrl);
	if (url_link == "") {
		$.messager.alert('提示', '请输入项目路径');
		return;
	}
	
	if(result1==null){
		$.messager.alert('提示', '项目路径格式错误');
		return;
	}
	
	var sort = $('#sort').val();
	if (isNaN(sort)) {
		$.messager.alert('提示', '排序号只能是数字！');
		return;
	}
	var urlPic = {
		"id" : id,
		"title" : title,
		"url_pic_type" : url_pic_type,
		"url_link" : url_link,
		"url" : url,
		"sort" : sort
	};
	if (id != null && id != "") {
		$.post('urlPic/update.json', urlPic, function(result) {
			if (result.code == 1) {
				$('#urlPic_add_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'修改成功！',timeout:timeoutValue,showType:'slide'});
				$('#urlPic_table').datagrid('load',parameter);
			} else {
				$.messager.alert('提示', '修改失败');
			}
		}, 'json');
	} else {
		$.post('urlPic/save.json', urlPic, function(result) {
			if (result.code == 1) {
				$('#urlPic_add_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'新增成功！',timeout:timeoutValue,showType:'slide'});
				$('#urlPic_table').datagrid('load',parameter);
			} else {
				$.messager.alert('提示', '新增失败');
			}
		}, 'json');
	}
}

function compile(value) {

	$('#urlPic_table').datagrid('selectRecord', value);
	var row = $('#urlPic_table').datagrid('getSelected');

	$('#id').val(row.id);
	$('#title').val(row.title);
	$('#url_pic_type').combobox('setValue', row.url_pic_type);
	$('#url_link').val(row.url_link);
	$('#url').val(row.url);
	$('#sort').val(row.sort);

	$('#urlPic_add_dialog').dialog('setTitle', '修改图片路径');
	$('#urlPic_add_dialog').dialog('open');
}

function del(value) {
	$.messager.confirm('提示', '确认要删除吗?', function(y) {
		if (y) {
			$.post('urlPic/delete.json', {
				"id" : value
			}, function(result) {
				if (result.code == 1) {
					$.messager.alert('提示', '删除成功');
					$('#urlPic_table').datagrid('reload', {});
				} else {
					$.messager.alert('提示', '删除失败');
				}
			}, 'json');
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
			+ (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
			+ " "
			+ (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
			+ ":"
			+ (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
					.getMinutes())
			+ ":"
			+ (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
					.getSeconds());
	return datetime;
}