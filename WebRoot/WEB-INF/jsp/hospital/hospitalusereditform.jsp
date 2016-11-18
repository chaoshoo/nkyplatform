<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
</head>
<body class="easyui-layout">

		<form action="hospital/detail.json" id="hospital_edituser_form">
        <input type="hidden" id="hospitaluserid" name="hospitaluserid" value="${user.id}">
         <table id="productTable">
          <tr>
            <td>电话号码<font>*</font></td>
            <td><input style="width: 200px;" type="text" id="edittel" name="tel" value="${user.tel}"/></td>
          </tr>
          <tr>
            <td>名字</td>
            <td><input style="width: 200px;" type="text" id="editusername" name="username" value="${user.username}" /></td>
          </tr>
        </table>
        <br/><br/>
					<table>
					<tr><td>					
			       <div id="savediv" >
				      <button type="button" id="du_save_button" onclick="ducommit()" class="btn btn-success btn-success-small" style="margin-left: 20px;">
				        	保存
				      </button>
				      <button type="button" id="du_cancle_button" onclick="dialogClose()" class="btn btn-success btn-success-small" style="margin-left: 20px;">
				        	取消
				      </button>
			      </div>
			      
					</td></tr>
		        </table> 
      </form>
 <script type="text/javascript">
var vparameter = {};
function ducommit(){
	if($("#edittel").val()==null || $("#edittel").val()==""){
		$.messager.alert(titleInfo,'请输入电话号码!');
		return;
	}
	 parameter={};
	 parameter['tel']=$("#edittel").val();
	 parameter['username']=$("#editusername").val();
	 parameter['id']=$("#hospitaluserid").val();
	$.post("hospital/saveuser.json",parameter,function(data){
		if(data.code==1){
			$.messager.alert(titleInfo,"修改成功！");
			dialogClose();
			$('#hospital_user_table').datagrid('reload');
		}else{
			$.messager.alert(titleInfo,data.msg);
		}
	},"json");
		
}

</script>       
</body>

</html>