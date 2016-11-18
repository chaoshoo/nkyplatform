<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
</head>
<body class="easyui-layout">
	<form action="hospital/saveuser.json" id="hospital_user_form">
			&nbsp;&nbsp;&nbsp;&nbsp; 电话号码&nbsp;&nbsp;
			<input type="text" id="FIT-LIKE-tel" name="FIT-LIKE-tel"/>
			&nbsp;&nbsp;&nbsp;&nbsp; 名字&nbsp;&nbsp;
			<input type="text" id="username" name="username"/>
			<input type="hidden" id="FIT-hospital_code" name="FIT-hospital_code"/>

		<button type="button" id="hospital_user_add" class="btn btn-success"><i class="icon-plus"></i>&nbsp;添加</button>
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
			$.messager.alert(titleInfo,'请输入管理员电话号码!');
			return;
		}
		 parameter={};
		 parameter['tel']=tel;
		 parameter['username']=username;
		 parameter['hospital_code']=hospital_code;
		$.post("hospital/saveuser.json",parameter,function(data){
			if(data.code==1){
				$.messager.alert(titleInfo,"添加成功！");
				$('#hospital_user_table').datagrid('reload');
			}else{
				$.messager.alert(titleInfo,data.msg);
			}
		},"json");
	});
});
/**
 * 初始化数据表格
 */
 function formatterDateTime(date) {
	    var datetime = date.getFullYear()
	            + "-"// "年"
	            + /*((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
	                    + (date.getMonth() + 1))*/
	            ((date.getMonth() + 1) < 10 ?('0'+(date.getMonth() + 1)):(date.getMonth() + 1))
	            + "-"// "月"
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
		    {field:'TEL',title:'管理员手机号',width:200},
		    {field:'USERNAME',title:'管理员名字',width:200},
		    {field:'CREATE_TIME',title:'创建时间',width:200,
		    	formatter : function(value) {
					 var date = new Date(value);
					return formatterDateTime(date);
				}},
		    {field:'ISVALID',title:'是否有效',width:100,
		    	formatter:function(value){
		    		if(value=='1'){
		    			return '有效';
		    		}else if(value=='0'){
		    			return '无效';
		    		}
		    		return '';
				}
		    },
			{field:'ID',title:'操作',width:200,
				formatter:function(value,row){
					return '<a href="javascript:openedituser('+value+')">修改</a> &nbsp;'
					+'<a onclick="operator(1,\''+value+'\')">启用</a> &nbsp;'
					+'<a onclick="operator(0,\''+value+'\')" ><font color="red">禁用</font></a> &nbsp;'
					+'<a onclick="resetuserpwd(\''+value+'\')" >重置密码</a>';
				}
		}
		]],
		pagination:true,
		rownumbers:true,
		onClickRow:function(rowIndex){
        }
	}); 
}	
function operator(type,id){  //删除操作  
	var str = "确认启用？";
	if(type== 0){
		str = "确认禁用？";
	}
    $.messager.confirm('确认',str,function(row){  
        if(row){  
            $.ajax({  
            	 type:"POST",
                url:'hospital/opertor.json?id='+id+"&isvalid="+type,    
                success:function(data){
                	if(data.code==1) {
                		 $.messager.show({title:titleInfo,msg:'操作成功！',timeout:timeoutValue,showType:'slide'});
                		 $('#hospital_user_table').datagrid('reload');
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
function resetuserpwd(id){ 
	var str = "确认重置密码为123456？";
    $.messager.confirm('确认',str,function(row){  
        if(row){  
            $.ajax({  
            	 type:"POST",
                url:'hospital/resetpwd.json?id='+id,    
                success:function(data){
                	if(data.code==1) {
                		 $.messager.show({title:titleInfo,msg:'操作成功！',timeout:timeoutValue,showType:'slide'});
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
function openedituser(id){
	add = false;
	openDialog('修改管理员','hospital/edituser.html?id='+id,'400','300');
}
</script>
</body>
</html>