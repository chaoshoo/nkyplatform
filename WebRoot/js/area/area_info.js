var parameter = {};
var dataList={};
var updateFormValid;
var validateResult;
$(function() {
	
	getAreaList();
	$('#saveUpdateArea_detail_dialog').dialog({
		buttons:[{
			text:'确 定',
			handler:function(){
				submit_model_window();
			}
		},{
			text:'取消',
			handler:function(){
				$('#saveUpdateArea_detail_dialog').dialog('close');
			}
		}]
	});
});

function submit_model_window(){
	var id = $("#id").val();
	var name = $("#name").val();
	if(name == null || name == "") {
		$.messager.alert(titleInfo,'请输入区域名称！');
		return;
	}
	var area = {
			"name":name,
			"parent":$("#pid").val()
	};
	if(id!=null&&id!=""){
		area['id']=id;
		$.post("areatree/updateArea.json",area,function(data){
			if(data.code==1){
				$('#saveUpdateArea_detail_dialog').dialog('close');
//				alert("修改成功！");
				$.messager.alert(titleInfo,'修改成功!');
				window.location.href=window.location.href;
			}else{
//				alert("修改失败！");
				$.messager.alert(titleInfo,'修改失败!');
			}
		},"json");
	}else{
		$.post("areatree/addArea.json",area,function(data){
			if(data.code==1){
				$('#saveUpdateArea_detail_dialog').dialog('close');
//				alert("添加成功！");
				$.messager.alert(titleInfo,'添加成功!');
				window.location.href=window.location.href;
			}else{
//				alert("添加失败！");
				$.messager.alert(titleInfo,'添加失败!');
			}
		},"json");
	}
}

function getAreaList(){
	$.post('areatree/getArea.json',function(data){
		var treeData = data.rows;
		getAuthTree(treeData);
	},"json");
}

function getAuthTree(treeData){
	var setting = {
		check : {
			enable : true,
			chkboxType: {"Y": "", "N": ""}
		},
		data : {
			simpleData : {
				enable : true
			}
		}
	};
	var zNodes =[];
	$.each(treeData,function(authIndex,part){
		zNodes[authIndex]={id:part.id,pId:part.parent,name:part.name};
	});
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
}

function privilege(data){
	$('#saveUpdateArea_detail_form')[0].reset();
	$('#id').val('');
	var zTree=$.fn.zTree.getZTreeObj("treeDemo");
	var tree_nodes=zTree.getCheckedNodes(true);
	if(((data=='del'||data=='edit')&&tree_nodes.length==0)||(data!='del'&&tree_nodes.length>1)) {
		$.messager.alert(titleInfo,'请选择一个区域!');
		return;
	}
	
	if(data=='add') {
		$('#saveUpdateArea_detail_dialog').dialog('open');
		if(tree_nodes.length != 0) {
			$("#pid").val(tree_nodes[0].id);
			$("#pname").val(tree_nodes[0].name);
		}else {
			$("#pid").val("0");
		}
	}
	if(data=='edit') {
		$('#saveUpdateArea_detail_dialog').dialog('open');
		$('#id').val(tree_nodes[0].id);
		var nodes = zTree.getNodeByParam("id", tree_nodes[0].pId, null);
		$("#name").val(tree_nodes[0].name);
		if(nodes!=null) {
			$("#pname").val(nodes.name);
			$("#pid").val(tree_nodes[0].pId);
		}else {
			$("#pid").val("0");
		}
	}
	if(data == 'del') {
		var ids = "";
		for ( var int = 0; int < tree_nodes.length; int++) {
			ids += tree_nodes[int].id + ",";
		}
		ids = ids.substring(0, ids.length-1);
		$.messager.confirm("确定", "您确定要删除吗？", function (data) {  
	         if (data) { 
	        	 $.post('areatree/delArea.json',{"tId":ids},function(data){
		    			if(data.code==1){
		    				$.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
		    				window.location.href=window.location.href;
		    			}else{
		            		//alert("删除失败");
		    				$.messager.alert(titleInfo,data.msg);
		    			}	
		    		},"json");   
	         }
	         return;
	     });  
		
		/*var ids = "";
		for ( var int = 0; int < tree_nodes.length; int++) {
			ids += tree_nodes[int].id + ",";
		}
		ids = ids.substring(0, ids.length-1);
		$.post("areatree/delArea.json",{"tId":ids},function(data){
//			alert(data.msg);
			$.messager.alert(titleInfo,data.msg);
			window.location.href=window.location.href;
		},"json");	
		return;*/
	}
	//$('#saveUpdateArea_detail_dialog').dialog('open');
}

