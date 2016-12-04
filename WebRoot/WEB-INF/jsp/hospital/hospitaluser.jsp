<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
</head>
<body class="easyui-layout">
	<form action="hospital/saveuser.json" id="hospital_user_form">
			&nbsp;&nbsp;&nbsp;&nbsp; Phone number&nbsp;&nbsp;
			<input type="text" id="FIT-LIKE-tel" name="FIT-LIKE-tel"/>
			&nbsp;&nbsp;&nbsp;&nbsp; Name&nbsp;&nbsp;
			<input type="text" id="username" name="username"/>
			<input type="hidden" id="FIT-hospital_code" name="FIT-hospital_code"/>

		<button type="button" id="hospital_user_add" class="btn btn-success"><i class="icon-plus"></i>&nbsp;Add</button>
</form>
		<table id="hospital_user_table"></table>
<script type="text/javascript">
$(function() {
	//初始化表格
	inituserDataGrid();
	var hospital_code='${hospital_code}';
	$("#hospital_user_add").click(function(){
		var tel = $("#FIT-LIKE-tel").val();
		var username = $("#username").val();
		if(tel==null || tel==""){
			$.messager.alert(titleInfo,'Please enter your administrator phone number!');
			return;
		}
		 parameter={};
		 parameter['tel']=tel;
		 parameter['username']=username;
		 parameter['hospital_code']=hospital_code;
		$.post("hospital/saveuser.json",parameter,function(data){
			if(data.code==1){
				$.messager.alert(titleInfo,"Added！");
				$('#hospital_user_table').datagrid('reload');
			}else{
				$.messager.alert(titleInfo,data.msg);
			}
		},"json");
	});
});
/**
 * Initialize data form
 */
 function formatterDateTime(date) {
	    var datetime = date.getFullYear()
	            + "-"// "year"
	            + /*((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
	                    + (date.getMonth() + 1))*/
	            ((date.getMonth() + 1) < 10 ?('0'+(date.getMonth() + 1)):(date.getMonth() + 1))
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
function inituserDataGrid(){
	$('#hospital_user_table').datagrid({
		iconCls:'icon-save',
		nowrap: true,
		autoRowHeight: true,
		striped: true,
//		toolbar: "#common_search",
		fit:true,
		fitColumns:true,
		collapsible:true,
		url:'hospital/listuser.json?hospital_code=${hospital_code}',
		queryParams:parameter,
		remoteSort: false,
		singleSelect:true,
		idField:'ID',
		columns:[[
		    {field:'TEL',title:'Administrator phone number',width:200},
		    {field:'USERNAME',title:'Administrator name',width:200},
		    {field:'CREATE_TIME',title:'Created time',width:200,
		    	formatter : function(value) {
					 var date = new Date(value);
					return formatterDateTime(date);
				}},
		    {field:'ISVALID',title:'Whether effective',width:100,
		    	formatter:function(value){
		    		if(value=='1'){
		    			return 'effective';
		    		}else if(value=='0'){
		    			return 'invalid';
		    		}
		    		return '';
				}
		    },
			{field:'ID',title:'Operation',width:200,
				formatter:function(value,row){
					return '<a href="javascript:openedituser('+value+')">modify</a> &nbsp;'
					+'<a onclick="operator(1,\''+value+'\')">Enable</a> &nbsp;'
					+'<a onclick="operator(0,\''+value+'\')" ><font color="red">Disable</font></a> &nbsp;'
					+'<a onclick="resetuserpwd(\''+value+'\')" >reset password</a>';
				}
		}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	}); 
}	
function operator(type,id){  //Delete operation  
	var str = "Confirm enable？";
	if(type== 0){
		str = "Confirm disable？";
	}
    $.messager.confirm('confirm',str,function(row){  
        if(row){  
            $.ajax({  
            	 type:"POST",
                url:'hospital/opertor.json?id='+id+"&isvalid="+type,    
                success:function(data){
                	if(data.code==1) {
                		 $.messager.show({title:titleInfo,msg:'Successful operation！',timeout:timeoutValue,showType:'slide'});
                		 $('#hospital_user_table').datagrid('reload');
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
function resetuserpwd(id){ 
	var str = "Confirm to reset password123456？";
    $.messager.confirm('confirm',str,function(row){  
        if(row){  
            $.ajax({  
            	 type:"POST",
                url:'hospital/resetpwd.json?id='+id,    
                success:function(data){
                	if(data.code==1) {
                		 $.messager.show({title:titleInfo,msg:'Successful operation！',timeout:timeoutValue,showType:'slide'});
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
function openedituser(id){
	add = false;
	openDialog('Change administrator','hospital/edituser.html?id='+id,'400','300');
}
</script>
</body>
</html>