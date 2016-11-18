$(function() {
	
	$('#root_layout').panel({
		tools : '#common_search'
	});
	
	getDepartmentTreeData();
//	$("body").bind(
//			//鼠标点击事件不在节点上时隐藏右键菜单  
//			"mousedown",
//			function(event) {
//				if (!(event.target.id == "rMenu" || $(event.target).parents(
//						"#rMenu").length > 0)) {
//					$("#rMenu").hide();
//				}
//			});
	//初始化弹出框
	$('#saveUpdateDepartment_detail_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				submit_model_window();
			}
		},{
			text:'取消',
			handler:function(){
				$('#saveUpdateDepartment_detail_dialog').dialog('close');
			}
		}]
	});
});

function clickAdd() {
	$('#saveUpdateDepartment_detail_form')[0].reset();
	$('#id').val('');
	$('#saveUpdateDepartment_detail_dialog').dialog('open');
	if(rightClickId != null && rightClickId != "" && rightClickId != undefined) {
		$('#parent').val(rightClickId);
	}
}

function submit_model_window(){
	var id = $("#id").val();
	var department = {
			"name":$("#name").val(),
			"status":$("#status").val(),
			"description":$("#description").val(),
			"remark":$("#remark").val(),
			"isDelete":$("#isDelete").val(),
			"pId":$("#parent").val(),
	};
	if (id != null && id != "") {
		department['id'] = id;
		$.post("departmentInfo/updateDepartment.json", department, function(data) {
			if (data.code == 1) {
				$('#saveUpdateDepartment_detail_dialog').dialog('close');
				$.messager.show({title : titleInfo, msg : '修改成功！', timeout : timeoutValue, showType : 'slide'});
				window.location.href = window.location.href;
			} else if(data.code == 2) {
				var parentName = $("#parent").find("option:selected").text();
				var name = $("#name").val();
				$.messager.alert(titleInfo, parentName + "已存在部门名称为“" + name + "”的部门！");
			} else {
				$.messager.alert(titleInfo, '修改失败！');
			}
		}, "json");
	} else {
		$.post("departmentInfo/addDepartment.json", department, function(data) {
			if (data.code == 1) {
				$('#saveUpdateDepartment_detail_dialog').dialog('close');
				$.messager.show({title : titleInfo, msg : '添加成功！', timeout : timeoutValue, showType : 'slide'});
				window.location.href = window.location.href;
			} else if(data.code == 2) {
				var parentName = $("#parent").find("option:selected").text();
				var name = $("#name").val();
				$.messager.alert(titleInfo, parentName + "已存在部门名称为“" + name + "”的部门！");
			} else {
				$.messager.alert(titleInfo, '添加失败！');
			}
		}, "json");
	}
}
function getDepartmentTreeData(){
	$.post('departmentInfo/getAllDepartmentToTree.json',function(data){
		var treeData = data.rows;
		getAuthTree(treeData);
	},"json");
}
function getAuthTree(treeData){
	var setting = {
		check : {
			enable : false,
		},
		data : {
			simpleData : {
				enable : true
			}
		},
		callback : { //回调函数  
			onClick: zTreeOnRightClick
		}
	};
	var zNodes =[];
	$.each(treeData,function(authIndex,part){
		zNodes[authIndex]={id:part.tId,pId:part.pId,name:part.name,authority:part.code,open:true};
	});
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
}
//显示右键菜单  
//function showRMenu(type, x, y) {
//	$("#rMenu").show();
//	if (type == "root") {
//		$("#m_del").css("display","none");
//	}else{
//		$("#m_del").css("display","block");
//	}
//	$("#rMenu").css( {
//		"top" : y + "px",
//		"left" : (x+20) + "px",
//		"display" : "block"
//	});
//}
//隐藏右键菜单  
//function hideRMenu() {
//	$("#rMenu").hide();
//}
//鼠标右键事件-创建右键菜单  
var rightClickId = null;
var isisParent = null;
function zTreeOnRightClick(event, treeId, treeNode) {
	rightClickId = treeNode.id;
	isisParent = treeNode.isParent;
//	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
//	if (!treeNode) {
//		treeObj.cancelSelectedNode();
//		showRMenu("root", event.clientX, event.clientY);
//	} else if (treeNode && !treeNode.noR) { //noR属性为true表示禁止右键菜单  
//		if (treeNode.isParent) {//是否父节点，父节点不允许删除
//			treeObj.cancelSelectedNode();
//			showRMenu("root", event.clientX, event.clientY);
//		} else {
//			treeObj.selectNode(treeNode);
//			showRMenu("node", event.clientX, event.clientY);
//		}
//	}
}

function addPrivilege(){
	$('#saveUpdateDepartment_detail_form')[0].reset();
	$('#id').val('');
	$('#saveUpdateDepartment_detail_dialog').dialog('open');
	$('#parent').val(rightClickId);
}
function editPrivilege(){
	if (rightClickId == null) {
		$.messager.alert(titleInfo,'请选择一个节点进行修改！');
		return;
	}
	var department = {
		"tId":rightClickId,
	};
	$.post("departmentInfo/findDepartMentBytId.json",department,function(data){
			if(data.id!=null){
				$('#saveUpdateDepartment_detail_dialog').dialog('open');
				generateDialog(data);
			}else{
				$.messager.alert(titleInfo,'查询失败！');
			}
		},"json");
}
function delPrivilege() {
	if (rightClickId == null) {
		$.messager.alert(titleInfo,'请选择一个节点进行删除！');
		return;
	}
	if(isisParent) {
		$.messager.alert('提示', "您选择的部门有下级部门，不能删除！");
	} else {
		$.messager.confirm('确认','确认删除?',function(row) {
			if (row) {
				$.ajax({
					url:'departmentInfo/delDepartment.json?tId=' + rightClickId,
					async: true,
					beforeSend: function() {
						$.messager.progress({title : "删除部门", msg : "正在删除部门，请稍等……"});
					},
					success: function(data) {
						$.messager.progress('close');
						if(data.code == 1) {
							$.messager.alert(titleInfo, '删除成功！', "info", function() {window.location.reload();});
						} else {
							$.messager.alert(titleInfo,'删除失败！');
						}
					},
					fail: function() {
						$.messager.progress('close');
						$.messager.alert('提示', "调用接口失败！");
					}
				});
			}
		});
	}
}
function queryPrivilege(){
	
}
function generateDialog(rowInfo){
	$('#id').val(rowInfo.id);
	$('#name').val(rowInfo.name);
	$('#description').val(rowInfo.description);
	$('#status').val(rowInfo.status);
	$('#remark').val(rowInfo.remark);
	$('#parent').val(rowInfo.pId);
}
