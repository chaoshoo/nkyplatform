var parameter = {};
var dataForm={};
var add = true;
$(function() {
	$('#data_add').click(function(){
		add = true;
		openDialog2('添加设备','device/add.html','500','300');
	});
	//条件查询
	$("#auth_search").click(function(){
		parameter = $.serializeObject($("#query_form"));
		initDataGrid();
		parameter = {};
		
	});
	$("#auth_reset").click(function(){
		$("#FIT-LIKE-sn").val("");
	});
	
});


//修改
function openedit(check,id){
	add = false;
	openDialog2('编辑设备信息','device/edit.html?id='+id,'500','400');
}

function del(id){  //删除操作  
	var str = "确定删除？";
    $.messager.confirm('确认',str,function(row){  
        if(row){  
            $.ajax({  
            	 type:"POST",
                url:'device/del.json?id='+id,    
                success:function(data){
                	if(data.code==1) {
                		 $.messager.show({title:titleInfo,msg:'操作成功！',timeout:timeoutValue,showType:'slide'});
         				dataGridload(parameter);
                	}else{
                		 $.messager.alert(titleInfo,data.msg);
                	}
                } ,
                fail:function(){
                	$.messager.alert(titleInfo,'操作失败！');
                }
            });  
        }  
    })  
  }  

/**
 * 数据表格刷新
 * @param param
 */
function dataGridload(param){
	$('#base_table').datagrid('reload');
}

function dcommit(){
	if($("#sn").val()==null || $("#sn").val()==""){
		$.messager.alert(titleInfo,'请设备SN!');
		return;
	}
	if($("#device_type").combobox('getValue')==null || $("#device_type").combobox('getValue')==""){
		$.messager.alert(titleInfo,'请选择设备类型!');
		return;
	}
	if($("#product_time").datebox('getValue')==null || $("#product_time").datebox('getValue')==""){
		$.messager.alert(titleInfo,'请输入生产时间!');
		return;
	} 
	if($("#deliver_time").datetimebox('getValue')==null || $("#deliver_time").datetimebox('getValue')==""){
		$.messager.alert(titleInfo,'请输入发货时间!');
		return;
	} 
	var formdata = $.serializeObject($("#device_form"));
//	alert(JSON.stringify(formdata));
		$.post("device/save.json",formdata,function(data){
			if(data.code==1){
				$.messager.alert(titleInfo,"保存成功");
				$('#editfrom_dialogtemp').dialog('close');
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,data.msg);
			}
		},"json");
		
}


