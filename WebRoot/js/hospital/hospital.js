var parameter = {};
var dataForm={};
var add = true;
$(function() {
	
	$('#hospital_add').click(function(){
		add = true;
		openDialog2('添加医院','hospital/add.html','900','500');
	});
	//条件查询
	$("#auth_search").click(function(){
		parameter = $.serializeObject($("#query_form"));
		initDataGrid();
		parameter = {};
		
	});
	$("#auth_reset").click(function(){
		$("#FIT-LIKE-name").val("");
		$("#FIT-h-code").val("");
	});
	
});


//修改
function openedit(id){
	add = false;
	openDialog2('编辑医院','hospital/edit.html?id='+id,'900','500');
}

function del(id){  //删除操作  
    $.messager.confirm('确认','确认删除?',function(row){  
        if(row){  
            $.ajax({  
                url:'hospital/del.json?hospital_code='+id,    
                success:function(data){
                	if(data.code==1) {
                		 $.messager.show({title:titleInfo,msg:'删除成功！',timeout:timeoutValue,showType:'slide'});
         				dataGridload(parameter);
                	}else{
                		 $.messager.alert(titleInfo,data.msg);
                	}
                } ,
                fail:function(){
                	$.messager.alert(titleInfo,'删除失败！');
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

//管理用户
function adduser(code){
	add = false;
	openDialog2('设置管理员','hospital/adduser.html?hospital_code='+code,'900','500');
}


