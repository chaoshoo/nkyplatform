var parameter = {};
$(function() {
	// 初始化表格
	initDataGrid();

	$('#urlPic_add').bind('click', function() {
		urlPic_id = null;
		$('#urlPic_add_dialog').dialog('setTitle', 'Add image path');
		$('#urlPic_form')[0].reset();
		$('#id').val('');
		$('#url_pic_type').combobox('setValue', "Please select");
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
		title : 'Add image path',
		width : 450,
		height : 330,
		closed : true,
		title : '',
		closed : true,
		buttons : [ {
			text : 'Confirmed',
			iconCls : 'icon-ok',
			handler : function() {
				// 插入
				save();
			}
		}, {
			text : 'cancel',
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
			$('#url_pic_type').combobox('setValue', "Please select");
		}
	});
}

// 初始化table
function initDataGrid() {
	$('#urlPic_table')
			.datagrid(
					{
						iconCls : 'icon-save',
						nowrap : true, // Prohibit text wrap
						autoRowHeight : true, // Automatic adjustmentrowheight
						striped : true, // Striped
						toolbar : "#common_search", // toolbar
						fit : true, // self-adaption
						fitColumns : true, // Column adaptive
						collapsible : true, // Whether the window can be folded
						url : 'urlPic/getList.json', // Request remote data
						queryParams : parameter, // Additional data requested for remote data transmission
						remoteSort : false, // Prohibit the server to sort the data
						singleSelect : true, // Only the radio
						idField : 'id',
						columns : [ [
								{
									field : 'title',
									title : 'Title',
									width : 100
								},
								{
									field : 'url_pic_type',
									title : 'type',
									width : 70,
									formatter : function(value) {
										if ("roll" == value) {
											return 'Carousel figure';
										} else if ("help" == value) {
											return 'Help';
										} else if ("app_roll" == value) {
											return 'Mobile phone map carousel';
										} else if ("store_roll" == value) {
											return 'Store carousel figure';
										} else if ("partner" == value) {
											return 'Strategic partner';
										} else if ("speek_link" == value) {
											return 'Short-cut entrance';
										} else if ("store_add" == value) {
											return 'Apply to join';
										} else if ("approll" == value) {
											return 'Mobile home';
										}
									}
								},
								{
									field : 'create_time',
									title : 'Created time',
									width : 100,
									formatter : function(value) {
										var date = new Date(value);
										return formatterDateTime(date);
									}
								},
								{
									field : 'url',
									title : 'picture',
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
									title : 'Operation',
									width : 70,
									formatter : function(value, row, index) {
										return '<a href = javascript:compile('
												+ value
												+ ')>edit</a>&nbsp;&nbsp;&nbsp;<a href=javascript:del('
												+ value
												+ ')><font color="red">delete</font></a>';
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
		$.messager.alert('Prompt', 'Please enter a title');
		return;
	}
	var url_pic_type = $('#url_pic_type').combobox('getValue');
	if (url_pic_type == "Please select") {
		$.messager.alert('Prompt', 'Please select type');
		return;
	}
	var regUrl = /(http\:\/\/)?([\w.]+)(\/[\w- \.\/\?%&=]*)?/gi;
	var url = $('#url').val();
	var result2 = url.match(regUrl);
	if (url == "") {
		$.messager.alert('Prompt', 'Please enter the image path');
		return;
	}
	if(result2==null){
		$.messager.alert('Prompt', 'Image path format error');
		return;
	}
	
	var url_link = $('#url_link').val();
	var result1 = url_link.match(regUrl);
	if (url_link == "") {
		$.messager.alert('Prompt', 'Please enter the project path');
		return;
	}
	
	if(result1==null){
		$.messager.alert('Prompt', 'Project path format error');
		return;
	}
	
	var sort = $('#sort').val();
	if (isNaN(sort)) {
		$.messager.alert('Prompt', 'Sort number can only be a number！');
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
				$.messager.show({title:titleInfo,msg:'Changed！',timeout:timeoutValue,showType:'slide'});
				$('#urlPic_table').datagrid('load',parameter);
			} else {
				$.messager.alert('Prompt', 'Change failed');
			}
		}, 'json');
	} else {
		$.post('urlPic/save.json', urlPic, function(result) {
			if (result.code == 1) {
				$('#urlPic_add_dialog').dialog('close');
				$.messager.show({title:titleInfo,msg:'New success！',timeout:timeoutValue,showType:'slide'});
				$('#urlPic_table').datagrid('load',parameter);
			} else {
				$.messager.alert('Prompt', 'New failed');
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

	$('#urlPic_add_dialog').dialog('setTitle', 'Change image path');
	$('#urlPic_add_dialog').dialog('open');
}

function del(value) {
	$.messager.confirm('Prompt', 'Delete it??', function(y) {
		if (y) {
			$.post('urlPic/delete.json', {
				"id" : value
			}, function(result) {
				if (result.code == 1) {
					$.messager.alert('Prompt', 'Deleted');
					$('#urlPic_table').datagrid('reload', {});
				} else {
					$.messager.alert('Prompt', 'Delete failed');
				}
			}, 'json');
		}
	});

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