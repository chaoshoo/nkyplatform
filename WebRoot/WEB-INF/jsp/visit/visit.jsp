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
<title>医生出访</title>
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/common/common.js"></script>
<script type="text/javascript" src="js/openDialog.js"></script>
<script type="text/javascript" src="js/visit/visit.js"></script>
<script type="text/javascript" src="js/visit/selHospital.js"></script>
</head>
<body class="easyui-layout">
  <div data-options="region:'center',title:'医生出访'" class="regionCenter">
    <div id="common_search" class="common_search common_search_nopadding">   
    <input type="hidden" id="type" name="type" value="${type}" />	
    <form action="" id="visit_qry_form">
    <input type="hidden" id="hospital_code" name="hospital_code" value="" />
    
     <c:if test="${type == 'D'}">
     
     	<div style="display:none">
	  	 <input type="hidden" id="office_code" name="office_code" value="" />
		 <input type="hidden" id="doctor_name" name="doctor_name" value="" />
		 </div>
		 
		<table id="dataTable">
		    <tr>
	            <td>会员名称</td>
	            <td><input type="text" id="vip_name" style="width: 200px;" /></td>
	            <td>出访时间</td>
	            <td><input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="begin_time" />
                至 <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="end_time" id="end_time" />
                <button type="button" id="visit_search" class="btn btn-success"><i class="icon-search"></i>查&nbsp;询</button>  
                <button type="button" id="visit_add" class="btn btn-success"><i class="icon-plus"></i>增&nbsp;加 </button>  
                </td>
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
	            <td>会员名称</td>
	            <td><input type="text" id="vip_name"  style="width: 200px;"/></td>
	         </tr>
			 <tr>
	            <td>医生名称</td>
	            <td> <input type="text" id="doctor_name"  style="width: 200px;" /></td>
	            <td>出访时间</td>
	            <td colspan='3'><input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="begin_time" />
                至 <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="end_time" id="end_time" />
                 <button type="button" id="visit_search" class="btn btn-success"><i class="icon-search"></i>查&nbsp;询</button>
                 </td>
			</tr>
		</table> 
	</c:if>
	 <c:if test="${type == 'H'}">
		<table id="dataTable">
     		<tr>
	            <td>科&nbsp;&nbsp;室</td>
	            <td> <input style="width: 200px;"  class="easyui-combobox" id="office_code" name="office_code"  value=""/>
	            <td>会员名称</td>
	            <td><input type="text" id="vip_name"  style="width: 200px;"/></td>
	            <td>医生名称</td>
	            <td> <input type="text" id="doctor_name"  style="width: 200px;" /></td>
			</tr>
			<tr>
	            <td>出访时间</td>
	            <td colspan='5'><input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="begin_time" />
                至 <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="end_time" id="end_time" />
                 <button type="button" id="visit_search" class="btn btn-success"><i class="icon-search"></i>查&nbsp;询</button>
                </td>
			</tr>
		</table> 
	</c:if>
    
      </form>          
 	
      <!-- <button type="button" id="visit_reset" class="btn btn-success btn-success-small">
        	重&nbsp;置
      </button>      -->
     
    </div>
 
    <table id="visit_table"></table>
    
    <div id="visit_detail_dialog" data-options="closed:true,modal:true,title:'出访信息',iconCls:'icon-save'" style="padding: 5px; width: 580px; height: 395px;">
      <form action="" id="visit_detail_form">
        <input type="hidden" id="visitId">
        <table style="margin-left: 10px">
          <tr>
            <td style="width:80px;">会员名称：</td>
            <td><input type="text" id="vipName" readonly > <input type="hidden" id="vipId"></td>
            <a id="btnSelVip" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >&nbsp;选择会员</a>
          </tr>                
          <tr>
            <td style="width:80px;">开始时间：</td>
            <td>
            <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="beginTime" /> 
            </td>
          </tr>
          <tr>
            <td style="width:80px;">结束时间：</td>
            <td>
            <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width: 200px;" name="endTime" id="endTime" />
            </td>
          </tr>
          <tr>
            <td style="width:80px;">出访内容：</td>
            <td>
            <textarea  style="width: 300px;" rows="3" cols="20" id="content" name="content"></textarea>
            </td>
          </tr>          
        </table>
      </form>
    </div>
    <div id="dialog_select_vip"></div>
  </div>
</body>
</html>