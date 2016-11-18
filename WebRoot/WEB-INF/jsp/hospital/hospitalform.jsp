<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>宁康园管理平台</title>
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/jquery/tree/zTreeStyle.css" />
<link rel="stylesheet" href="<%=basePath%>css/all.css" />
<link rel="stylesheet" href="<%=basePath%>css/jquery/easyui.css" />
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/common.js"></script>
<script type="text/javascript" src="<%=basePath%>js/form.js"></script>
<script type="text/javascript" src="<%=basePath%>js/hospital/hospital.js?v=20160824"></script>
<script type="text/javascript" src="<%=basePath%>js/area/jquery.lSelect.js"></script>
<script type="text/javascript" src="<%=basePath%>js/area/area.js"></script>
<script type="text/javascript" src="<%=basePath%>js/openDialog.js"></script>
<script type="text/javascript" src="<%=basePath%>js/resizeimg/lrz.pc.min.js?v=20150714"></script>
<script type="text/javascript" src="<%=basePath%>js/resizeimg/localResizeIMG.js?v=20160714"></script>
</head>
<body class="easyui-layout">

		<form action="hospital/save.json" id="hospital_form">
		        <input type="hidden" id="id" name="id" value="${hospital.id}" />		
		        <table id="dataTable">
				    <tr id="code_tr" style="display: none">
		            <td>医院编码</td>
		            <td><input style="width: 200px;"  type ="text" id="code" name="code" value="${hospital.code}" readonly="readonly" /></td>
		            <td>创建时间</td>
		            <td>
		             <fmt:formatDate value="${hospital.create_time}" type="both" timeStyle="medium" dateStyle="medium" />
		             <%-- <input style="width: 200px;"  type ="text" id="create_time" name="create_time" value="${hospital.create_time}" readonly="readonly" /> --%>
		            </td>
					</tr>
		          <tr>	
						<td>医院名字<font color="red">*</font></td>
						<td>
					    	<input style="width: 200px;"  type ="text" id="name" name="name" value="${hospital.name}" />
						</td>
						<td>医院电话</td>
						<td>
					    	<input style="width: 200px;"  type ="text" id="mobile" name="mobile" value="${hospital.mobile}" />
						</td>
					</tr>
					<tr>	
						<td>医院级别<font color="red">*</font></td>
						<td>
					    	<input style="width: 200px;"  class="easyui-combobox" id="hospitallever" name="lever"  value="${hospital.lever}"/>
						</td>
						<td>医院网站</td>
						<td>
					    	<input style="width: 200px;"  type ="text" id="website" name="website" value="${hospital.website}" />
						</td>
					</tr>
					<tr>	
						<td>地址</td>
						<td colspan="3">
						    <input type="hidden" id="areaid_" name="area" value="${hospital.area}" />
						    <input type="hidden" id="arealever_" name="arealever_" value="${lever}" />
						</td>
					</tr>
					<tr>	
						<td>详细地址</td>
						<td colspan="3">
					    	<input style="width: 500px;"  type ="text" id="address" name="address" value="${hospital.address}" />
						</td>
					</tr>
					<tr>
		            <td style="width: 70px;">交通</td>
		            <td  colspan="3"><textarea style="width: 500px;" rows="3" cols="20" id="traffic" name="traffic">${hospital.traffic}</textarea></td>
		          </tr>
		          <tr>
		            <td style="width: 70px;">特色</td>
		            <td  colspan="3"><textarea style="width: 500px;" rows="3" cols="20" id="feature" name="feature">${hospital.feature}</textarea></td>
		          </tr>
		          <tr>
		            <td style="width: 70px;">简介</td>
		            <td  colspan="3"><textarea style="width: 500px;" rows="3" cols="20" id="info" name="info">${hospital.info}</textarea></td>
		          </tr>  
		          <tr>
		            <td style="width: 70px;">图片</td>		            
		            <td  colspan="3">
		             <div id="pic"></div>
		            </td>
		          </tr>        
					</table>
					<br/><br/>
					<table>
					<tr><td>					
			       <div id="savediv" >
				      <button type="button" id="d_save_button" onclick="dcommit()" class="btn btn-success btn-success-small" style="margin-left: 20px;">
				        	保存
				      </button>
				      <button type="button" id="d_cancle_button" onclick="dialogClose2()" class="btn btn-success btn-success-small" style="margin-left: 20px;">
				        	取消
				      </button>
			      </div>
			      
					</td></tr>
		        </table> 
		        <div id="lookpicdiv"></div>
		      </form>
 <script type="text/javascript">
 //${hospital.create_time}
var vparameter = {};
$(function() {
	 
	if('${add}'==1){
		$("#code_tr").show();
	}
	$('#hospitallever').combobox({
		valueField : 'dic_name',
		textField : 'dic_value',
		height : 26,
		editable : false,
		url:'dic/getDic.json?dicType=hospatil_lever&v='+Math.random(),
/*		onLoadSuccess : function() {
				$('#edu').combobox('setValue','${doctor.edu}');
		},*/
	});
	loadArea();
	imginit('pic', '上传图片','${hospital.pic}');
	imglookinit('lookpicdiv');
});
function dcommit(){
	if($("#name").val()==null || $("#name").val()==""){
		$.messager.alert(titleInfo,'请输入医院名字!');
		return;
	}
	if($('#hospitallever').combobox('getValue')==null || $('#hospitallever').combobox('getValue')==""){
		$.messager.alert(titleInfo,'请选择医院级别!');
		return;
	} 
	var formdata = $.serializeObject($("#hospital_form"));
//	alert(JSON.stringify(formdata));
		$.post("hospital/save.json",formdata,function(data){
			if(data.code==1){
				$.messager.alert(titleInfo,"保存成功！");
				dialogClose2();
				dataGridload(parameter);
			}else{
				$.messager.alert(titleInfo,data.msg);
			}
		},"json");
		
}

</script>       
</body>

</html>