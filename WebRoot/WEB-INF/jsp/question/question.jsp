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
<title>message management</title>
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/common/common.js"></script>
<script type="text/javascript" src="js/openDialog.js"></script>
<script type="text/javascript" src="js/visit/selHospital.js"></script>
<script type="text/javascript" src="js/question/question.js"></script>
</head>
<body class="easyui-layout">
  <div data-options="region:'center',title:'message management'" class="regionCenter">
    <div id="common_search" class="common_search common_search_nopadding">       
      <input type="hidden" id="type" name="type" value="${type}" />	
     <form action="" id="ques_qry_form">
	   <input type="hidden" id="hospital_code" name="hospital_code" value="" />	 
	   <c:if test="${type == 'D'}">
	  	 <div style="display:none">
		  	 <input type="hidden" id="office_code" name="office_code" value="" />
			 <input type="hidden" id="doctor_name" name="doctor_name" value="" />
		 </div>
			<table id="dataTable">
			    <tr>
		            <td>Member name</td>
		            <td><input type="text" id="vip_name" style="width: 200px;" /></td>
		            <td>Membership card</td>
		            <td><input type="text" id="papers_num" style="width: 200px;" /></td>
		            <td>Member phone</td>
		            <td><input type="text" id="mobile" style="width: 200px;" /></td>
		          </tr>
				  <tr>
		            <td>Processing status</td>
		            <td>  <select id="status" style="width: 200px;" >
		            		 <option value ="">All</option> 
							 <option value ="1">Processed</option> 
							 <option value ="0">Untreated</option> 
						 </select>
				    </td>
		            <td>Created time</td>
		            <td colspan='3'><input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="begin_time" />
	                to <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="end_time" />
	                <button type="button" id="question_search" class="btn btn-success btn-success-small"><i class="icon-search"></i>Search</button> 
	                </td>
				</tr>
			</table> 
		</c:if>
	     <c:if test="${type == 'S'}">
	     	<table id="dataTable">
	     		<tr>
		            <td>Hospital</td>
		            <td> <input style="width: 200px;"  type ="text" id="hospitalname" name="hospitalname" value="" readonly="readonly"/>					    
		  				<button type="button" id="hospital_qry_button" onclick="addhospital()" class="btn btn-success btn-success-small" style="margin-left: 20px;">Select hospital</button> 
		  			</td>
		            <td>section&nbsp;&nbsp;room</td>
		            <td><input style="width: 200px;"  class="easyui-combobox" id="office_code" name="office_code"  value=""/> </td> 
		            <td>Doctor name</td>
		            <td> <input type="text" id="doctor_name"  style="width: 200px;" /></td>
				</tr>
				<tr>
					<td>Member name</td>
		            <td><input type="text" id="vip_name"  style="width: 200px;"/></td>
		            <td>Member phone</td>
		            <td><input type="text" id="mobile" style="width: 200px;" /></td>
		            <td>Membership card</td>
		            <td><input type="text" id="papers_num" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td>Processing status</td>
		            <td>  <select id="status" style="width: 200px;" >
		            		 <option value ="">All</option> 
							 <option value ="1">Processed</option> 
							 <option value ="0">Untreated</option> 
						 </select>
				    </td>
		            <td>Created time</td>
		            <td colspan='3'><input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="begin_time" />
	                to <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="end_time" />
	                <button type="button" id="question_search" class="btn btn-success btn-success-small"><i class="icon-search"></i>Search</button> 
	                </td>
				</tr>
			</table> 
		</c:if>
		 <c:if test="${type == 'H'}">
			<table id="dataTable">
	     		<tr>
		            <td>section&nbsp;&nbsp;room</td>
		            <td> <input style="width: 200px;"  class="easyui-combobox" id="office_code" name="office_code"  value=""/></td>
		            <td>Membership card</td>
		            <td><input type="text" id="papers_num" style="width: 200px;" /></td>
		            <td>Member phone</td>
		            <td><input type="text" id="mobile" style="width: 200px;" /></td>
		         </tr>
				 <tr>
				 	<td>Member name</td>
		            <td><input type="text" id="vip_name"  style="width: 200px;"/></td>
		            <td>Doctor name</td>
		            <td> <input type="text" id="doctor_name"  style="width: 200px;" /></td>
		            <td>Processing status</td>
		            <td>  <select id="status" style="width: 200px;" >
		            		 <option value ="">All</option> 
							 <option value ="1">Processed</option> 
							 <option value ="0">Untreated</option> 
						 </select>
				    </td>
				</tr>
				<tr>
		            <td>Created time</td>
		            <td colspan='5'><input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="begin_time" />
	                to <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="end_time" />
	                <button type="button" id="question_search" class="btn btn-success btn-success-small"><i class="icon-search"></i>Search</button> 
	               </td>
				</tr>
			</table> 
		</c:if>
	 </form> 
        
     <!--  <button type="button" id="question_reset" class="btn btn-success btn-success-small">
        	Re&nbsp;The
      </button>  -->
    </div>
 
    <table id="question_table"></table>
    
    <div id="question_detail_dialog" data-options="closed:true,modal:true,title:'Message information',iconCls:'icon-save'" style="padding: 5px; width: 750px; height: 550px;">
     	<br>
     	<input type="hidden" id="questionId">
     	<strong>Message： </strong>    <span id='quest_content'></span> 
     	<br>
     	<br>
     	<br>
     	
     	<table id="question_detail_table" class="easyui-datagrid" style="height:280px;width:700px;"
			data-options="url:'question/getDetailList.json',queryParams: {},fitColumns:true,singleSelect:true,checkbox:true,pagination:true,rownumbers:true,idField:'id',toolbar:'dg_vip_tb'">
			<thead>
				<tr>
					<th data-options="field:'id',hidden:true"></th>
					<th data-options="field:'answer_name',width:50">Replier name</th>
					<th data-options="field:'answer_content',width:100">Reply content</th>
					<th data-options="field:'create_time',width:50">Created time</th>
				</tr>
			</thead>
		</table>
     	
     	<div id="answer_div">
     		<br/>
     		<strong>return&nbsp;complex：</strong> <textarea  style="width: 300px;" rows="2" cols="20" id="answer_content" name="answer_content"></textarea>
     	</div>  
     	<!--  <button type="button" id="answer_submit" class="btn btn-success btn-success-small" >carry&nbsp;hand over</button> --> 
    </div>    
  </div>
</body>
</html>