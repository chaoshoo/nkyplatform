var parameter = {};
var dataForm={};
var add = true;
$(function() {

	$('#data_add').click(function(){
		add = true;
		openDialog2('Add doctor','doctor/add.html','900','500');
	});
	//条件查询
	$("#auth_search").click(function(){
		parameter = $.serializeObject($("#query_form"));
		initDataGrid();
		parameter = {};
		
	});
	$("#auth_reset").click(function(){
		$("#FIT-LIKE-name").val("");
		$("#FIT-LIKE-dname").val("");
//		$("form[name='query_form']input[name='FIT-LIKE-h.name']").val("");
//		$("form[name='query_form']input[name='FIT-LIKE-d.name']").val("");
	});
	
});


//修改
function openedit(check,id){
	add = false;
	openDialog2('Edit doctor`s information','doctor/edit.html?id='+id+'&check='+check,'900','500');
}

function opertor(id,type){  //Delete operation  
	var str = "Confirm enable？";
	if(type== -1){
		str = "Confirm disable？";
	}
    $.messager.confirm('confirm',str,function(row){  
        if(row){  
            $.ajax({  
            	 type:"POST",
                url:'doctor/opertor.json?id='+id+"&isvalid="+type,    
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


function addhospital(){
	   $.modalDialog({
			title : 'Select hospital',
			width : 850,
			height : 520,
			href : 'hospital/select.html',
			closable : true
		}); 
		//定义模式化窗口的回调函数，用户在本页面设置相关业务值。
		$.modalDialog.callBack = function (data){
			$('#hospital_code').val(data.CODE);
			$('#hospitalname').val(data.NAME);
		}
		//2秒后关闭进度条
		setTimeout(function(){
			//关闭进度条
			$.messager.progress('close');
		},300);
}
function dcommit(type){
	//type为0表示新加   1 表示修改  2 表示注册
	if($("#name").val()==null || $("#name").val()==""){
		$.messager.alert(titleInfo,'Please enter doctor`s name.!');
		return;
	}
	if($("#tel").val()==null || $("#tel").val()==""){
		$.messager.alert(titleInfo,'Please enter doctor`s telephone number.!');
		return;
	}
	if($("#idCard").val()==null || $("#idCard").val()==""){
		$.messager.alert(titleInfo,'Please Enter Doctor`s ID Number!');
		return;
	}
	if($("#hospitalname").val()==null || $("#hospitalname").val()==""){
		$.messager.alert(titleInfo,'Please select a hospital!');
		return;
	} 
	if($('#office_code').combobox('getValue')==null || $('#office_code').combobox('getValue')==""){
		$.messager.alert(titleInfo,'Please select Department!');
		return;
	} 
	var formdata = $.serializeObject($("#doctor_form"));
//	alert(JSON.stringify(formdata));
		$.post("doctor/save.json",formdata,function(data){
			if(data.code==1){
				if(type == 1){
					$.messager.alert(titleInfo,"Changed。");
				}else if(type == 0){
					$.messager.alert(titleInfo,"Save success,Initial password123456,Please change in time！");
				}else if(type == 2){
					$.messager.alert(titleInfo,"Registered,Initial password123456,Please sing in on login page！");
					window.close();
				}
				$('#editfrom_dialogtemp').dialog('close');
				if(type==0){
					dataGridload(parameter);
				}				
			}else{
				$.messager.alert(titleInfo,data.msg);
			}
		},"json");
		
}
function dcheck(id,type){
	var check_desc=$("#check_desc").val()
	           if(type == 2 && check_desc==""){
	        	   $.messager.alert(titleInfo,"Please input audit note！");
	        	   return "";
	           }
	            $.ajax({  
	            	 type:"POST",
	                url:'doctor/opertor.json?id='+id+"&isvalid="+type+"&check_desc="+check_desc,    
	                success:function(data){
	                	if(data.code==1) {
	                		 $.messager.show({title:titleInfo,msg:'Successful operation！',timeout:timeoutValue,showType:'slide'});
	                		 $('#editfrom_dialogtemp').dialog('close');
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


function radiocheck(value){
	if(value == '0'){
		$("input[type=radio][value='0']").attr("checked","checked");
		$("input[type=radio][value='1']").removeAttr("checked");
	}else if(value == '1'){
		$("input[type=radio][value='1']").attr("checked","checked");
		$("input[type=radio][value='0']").removeAttr("checked");
	}
}