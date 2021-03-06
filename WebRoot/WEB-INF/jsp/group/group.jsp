<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>会员群管理</title>
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/common/common.js"></script>
<script type="text/javascript" src="js/openDialog.js"></script>
<script type="text/javascript" src="js/visit/selHospital.js"></script>
<script type="text/javascript" src="js/group/group.js"></script>
</head>
<body class="easyui-layout">
  <div data-options="region:'center',title:'会员群管理'" class="regionCenter">
    <div id="common_search" class="common_search common_search_nopadding">   
    <input type="hidden" id="type" name="type" value="${type}" />	
     <form action="" id="group_qry_form">
    <input type="hidden" id="hospital_code" name="hospital_code" value="" />
    
    <c:if test="${type == 'D'}">
		<table id="dataTable">
		    <tr>
	            <td>群名称</td>
	            <td><input type="text" id="groupName" style="width: 200px;" /></td>
	        
	             <input type="hidden" id="office_code" name="office_code" value="" />
			     <input type="hidden" id="doctor_name" name="doctor_name" value="" />
	            <td>创建时间</td>
	            <td ><input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="begin_time" />
                			至 <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="end_time" /></td>
			</tr>
		</table> 
	</c:if>
     <c:if test="${type == 'S'}">
     	<table id="dataTable">
     		<tr>
	            <td>医&nbsp;&nbsp;院</td>
	            <td> <input style="width: 200px;"  type ="text" id="hospitalname" name="hospitalname" value="" readonly="readonly"/>					    
	  				<button type="button" id="hospital_qry_button" onclick="addhospital()" class="btn btn-success btn-success-small" style="margin-left: 20px;">选择医院</button> 
	  			</td>
	            <td>科&nbsp;&nbsp;室</td>
	            <td><input style="width: 200px;"  class="easyui-combobox" id="office_code" name="office_code"  value=""/> </td>
			</tr>
			  <tr>
	            <td>群名称</td>
	            <td><input type="text" id="groupName"  style="width: 200px;"/></td>
	            <td>医生名称</td>
	            <td> <input type="text" id="doctor_name"  style="width: 200px;" /></td>
			</tr>
			<tr>
	            <td>创建时间</td>
	            <td colspan='3'><input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="begin_time" />
                至 <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="end_time" /></td>
			</tr>
		</table> 
	</c:if>
	 <c:if test="${type == 'H'}">
		<table id="dataTable">
     		<tr>
	            <td>科&nbsp;&nbsp;室</td>
	            <td> <input style="width: 200px;"  class="easyui-combobox" id="office_code" name="office_code"  value=""/>
	  			</td>
	            <td>群名称</td>
	            <td><input type="text" id="groupName"  style="width: 200px;"/></td>
	      
			</tr>
			<tr>
			      <td>医生名称</td>
	            <td> <input type="text" id="doctor_name"  style="width: 200px;" /></td>
	            <td>创建时间</td>
	            <td ><input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="begin_time" />
               		 至 <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="end_time" id="end_time" /></td>
			</tr>
		</table> 
	</c:if>
    
   
     </form> 
      <button type="button" id="group_search" class="btn btn-success"><i class="icon-search"></i>
        	查&nbsp;询
      </button>      
     <!--  <button type="button" id="group_reset" class="btn btn-success btn-success-small">
        	重&nbsp;置
      </button>  -->
      <c:if test="${type == 'D'}">
      <button type="button" id="group_add" class="btn btn-success"><i class="icon-plus"></i>
        	增&nbsp;加
      </button>   
      </c:if> 
    </div>
 
    <table id="group_table"></table>
    
    <div id="group_detail_dialog" data-options="closed:true,modal:true,title:'会员群信息',iconCls:'icon-save'" style="padding: 5px; width: 580px; height: 395px;">
      <form action="" id="group_detail_form">
        <input type="hidden" id="groupId">
        <table style="margin-left: 10px">
          <tr>
            <td style="width:80px;">群名称：</td>
            <td><input type="text" id="name" ></td>
          </tr>   
           <tr>
            <td style="width:80px;">群描述：</td>
            <td><textarea  style="width: 300px;" rows="3" cols="20" id="remark" name="remark"></textarea></td>
          </tr> 
        </table>
      </form>
    </div>
  </div>
</body>
</html>