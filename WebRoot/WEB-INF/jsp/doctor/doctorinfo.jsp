<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
<title>Ning Kang Yuan management platform</title>
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/jquery/tree/zTreeStyle.css" />
<link rel="stylesheet" href="<%=basePath%>css/all.css" />
<link rel="stylesheet" href="<%=basePath%>css/jquery/easyui.css" />
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/common.js"></script>
<script type="text/javascript" src="<%=basePath%>js/form.js"></script>
<script type="text/javascript" src="<%=basePath%>js/openDialog.js"></script>
<script type="text/javascript" src="<%=basePath%>js/doctor/doctor.js?v=20160824"></script>
<script type="text/javascript" src="<%=basePath%>js/area/jquery.lSelect.js"></script>
<script type="text/javascript" src="<%=basePath%>js/area/area.js"></script>
<script type="text/javascript" src="<%=basePath%>js/resizeimg/lrz.pc.min.js?v=20150714"></script>
<script type="text/javascript" src="<%=basePath%>js/resizeimg/localResizeIMG.js?v=20160714"></script>

</head>
<body class="easyui-layout">
	<div data-options="region:'center',title:'Doctor information'" class="regionCenter">
		<div id="common_search" class="common_search common_search_nopadding">	
		<form action="doctor/save.json" id="doctor_form">
		        <input type="hidden" id="id" name="id" value="${doctor.id}" />		
		         <input type="hidden" id="region" name="region" value="${region}" />	
		        <input type="hidden" id="hospital_code" name="hospital_code" value="${doctor.hospital_code}" />	       
		        <table id="dataTable">
				    <tr>
		            <td>Doctor code</td>
		            <td><input style="width: 200px;"  type ="text" id="code" name="code" value="${doctor.code}" readonly="readonly" /></td>
		            <td>Created time</td>
		            <td><input style="width: 200px;"  type ="text" id="create_time" name="create_timestr" value="${doctor.create_time}" readonly="readonly" /></td>
					</tr>
		          <tr>	
						<td>Doctor name<font color="red">*</font></td>
						<td>
					    	<input style="width: 200px;"  type ="text" id="name" name="name" value="${doctor.name}" />
						</td>
						<td>Doctor phone NO.<font color="red">*</font></td>
						<td>
					    	<input style="width: 200px;"  type ="text" id="tel" name="tel" value="${doctor.tel}" />
						</td>
					</tr>
					<tr>	
						<td>Gender</td>
						<td>
					    	<input type="radio" name="sex" value="0" />male
					    	<input type="radio" name="sex" value="1" />female
						</td>
						<td>Birthday</td>
						<td>
					    	<input style="height: 20px; width: 120px;" class="easyui-datebox" id="birthday" name="birthdaystr" value="${doctor.birthday}" data-options="formatter:myformatter,parser:myparser"/>
						</td>
					</tr>
					<tr>
		            <td style="width: 70px;">Icon</td>		            
		            <td  colspan="3">
		             <div id="pic"></div>
		            </td>
		          </tr>   
					<tr>	
						<td>Education</td>
						<td>
					    	<input style="width: 200px;"  class="easyui-combobox" id="edu" name="edu"  value="${doctor.edu}"/>
						</td>
						<td>Affiliated Hospital<font color="red">*</font></td>
						<td>
					    	<input style="width: 200px;"  type ="text" id="hospitalname" name="hospitalname" value="${hospitalname}" readonly="readonly"/>					    
					    	<button type="button" id="vip_save_button" onclick="addhospital()" class="btn btn-success btn-success-small" style="margin-left: 20px;">Select hospital</button>
						</td>
					</tr>
					<tr>	
						<td>Department<font color="red">*</font></td>
						<td>
					    	<input style="width: 200px;"  class="easyui-combobox" id="office_code" name="office_code"  value="${doctor.office_code}"/>
						</td>
						<td>Title</td>
						<td>
							<input style="width: 200px;"  class="easyui-combobox" id="doctor_title" name="title"  value="${doctor.title}"/>
						</td>
					</tr>
					<tr>	
						<td>address</td>
						<td colspan="3">
						    <input type="hidden" id="areaid_" name="area" value="${doctor.area}" />
						    <input type="hidden" id="arealever_" name="lever" value="${lever}" />
						</td>
					</tr>
					<tr>	
						<td>Detailed address</td>
						<td colspan="3">
					    	<input style="width: 500px;"  type ="text" id="address" name="address" value="${doctor.address}" />
						</td>
					</tr>
					<tr>
		            <td style="width: 70px;">Specialty</td>
		            <td  colspan="3"><textarea style="width: 500px;" rows="3" cols="20" id="special" name="special">${doctor.special}</textarea></td>
		          </tr>
		          <tr>
		            <td style="width: 70px;">Introduction</td>
		            <td  colspan="3"><textarea style="width: 500px;" rows="3" cols="20" id="info" name="info">${doctor.info}</textarea></td>
		          </tr>
                    <tr id="checktr" style="display: none">
		            <td style="width: 70px;" >Description</td>
		            <td  colspan="3"><textarea style="width: 500px;"  rows="3" cols="20" id="check_desc" name="check_desc">${doctor.check_desc}</textarea></td>
		            </tr>
					</table>
					<table>
					<tr><td>					
			       <div id="savediv" >
				      <button type="button" id="d_save_button" onclick="dcommit(1)" class="btn btn-success btn-success-small" style="margin-left: 20px;">
				        	Save
				      </button>
				      <button type="button" id="d_cancle_button" onclick="dialogClose2()" class="btn btn-success btn-success-small" style="margin-left: 20px;">
				        	cancel
				      </button>
			      </div>
					</td></tr>
		        </table> 
		          <div id="lookpicdiv"></div>
		      </form>
		      </div>
		</div>
 <script type="text/javascript">
var vparameter = {};
var ismy = '${ismy}';
$(function() {
	if(ismy=='true'){
		$("#d_cancle_button").hide();
		$("#vip_save_button").hide();
		
	}
	$('#office_code').combobox({
		valueField : 'CODE',
		textField : 'NAME',
		height : 26,
		editable : false,
		url:'office/getItem.json?v='+Math.random(),
		/*		onLoadSuccess : function() {
			$('#office_code').combobox('setValue','${doctor.office_code}');
		},*/
	});
	$('#edu').combobox({
		valueField : 'dic_name',
		textField : 'dic_value',
		height : 26,
		editable : false,
		url:'dic/getDic.json?dicType=edu&v='+Math.random(),
/*		onLoadSuccess : function() {
				$('#edu').combobox('setValue','${doctor.edu}');
		},*/
	});
	$('#doctor_title').combobox({
		valueField : 'dic_name',
		textField : 'dic_value',
		height : 26,
		editable : false,
		url:'dic/getDic.json?dicType=doctor_title&v='+Math.random(),
		/*onLoadSuccess : function() {
				$('#doctor_title').combobox('setValue','${doctor.title}');
		},*/
	});
	loadArea();
	radiocheck('${doctor.sex}');
	imginit('pic', 'Upload Avatar','${doctor.pic}');
	imglookinit('lookpicdiv');
});

</script>       
</body>

</html>