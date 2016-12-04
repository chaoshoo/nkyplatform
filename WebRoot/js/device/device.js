var parameter = {};
var dataForm={};
var add = true;
$(function() {
	$('#data_add').click(function(){
		add = true;
		openDialog2('Add equipment','device/add.html','500','300');
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
	openDialog2('Edit device information','device/edit.html?id='+id,'500','400');
}

function del(id){  //Delete operation  
	var str = "delete?？";
    $.messager.confirm('confirm',str,function(row){  
        if(row){  
            $.ajax({  
            	 type:"POST",
                url:'device/del.json?id='+id,    
                success:function(data){
                	if(data.code==1) {
                		 $.messager.show({title:titleInfo,msg:'Successful operation！',timeout:timeoutValue,showType:'slide'});
         				dataGridload(parameter);
                	}else{
                		 $.messager.alert(titleInfo,data.msg);
                	}
                } ,
                fail:function(){
                	$.messager.alert(titleInfo,'operation failed！');
                }
            });  
        }  
    })  
  }  

/**
 * Data table refresh
 * @param param
 */
function dataGridload(param){
	$('#base_table').datagrid('reload');
}

function dcommit(){
	if($("#sn").val()==null || $("#sn").val()==""){
		$.messager.alert(titleInfo,'Please deviceSN!');
		return;
	}
	if($("#device_type").combobox('getValue')==null || $("#device_type").combobox('getValue')==""){
		$.messager.alert(titleInfo,'Please select the device type!');
		return;
	}
	if($("#product_time").datebox('getValue')==null || $("#product_time").datebox('getValue')==""){
		$.messager.alert(titleInfo,'Please enter the production time!');
		return;
	} 
	if($("#deliver_time").datetimebox('getValue')==null || $("#deliver_time").datetimebox('getValue')==""){
		$.messager.alert(titleInfo,'Please enter the delivery time!');
		return;
	} 
	var formdata = $.serializeObject($("#device_form"));
//	alert(JSON.stringify(formdata));
		$.post("device/save.json",formdata,function(data){
			if(data.code==1){
				$.messager.alert(titleInfo,"Save success");
				$('#editfrom_dialogtemp').dialog('close');
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,data.msg);
			}
		},"json");
		
}

