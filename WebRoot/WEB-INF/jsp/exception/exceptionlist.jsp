<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@include file="/head.jsp"%>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Registered management</title>
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/common/common.js"></script>
<script type="text/javascript" src="js/openDialog.js"></script>

<script type="text/javascript" src="<%=path %>/js/exception/exceptionlist.js"></script>
<style type="text/css">
	/*.panel-body{padding:0px;}*/
	.btn{color:#428bca !important;text-decoration:none !important;}
	.btn:hover{color:#428bca !important;text-decoration:none !important;}
</style>
</head>
<body class="easyui-layout" onkeydown="IM.EV_keyCode(event)">
  <div data-options="region:'center',title:'Exception management'" class="regionCenter">
    <div id="common_search" class="common_search common_search_nopadding">       
     <form action="" id="ques_qry_form">
		<table id="dataTable">
		    <tr>
	            <td>Check man<td>
	            <td> <input style="width: 200px;"  type ="text" id="real_name"/>					    
	  			</td>
	            <td>Inspection index</td>
	            <td><input style="width: 200px;" type ="text" id="inspect_code" /> </td>
	            <td>Inspection certificate</td>
	            <td> <input type="text" id="card_code"  style="width: 200px;" /></td>
	          <td>
	           <button type="button" id="diagnose_search" class="btn btn-success">
        	Search
     			 </button> 
	          </td>
			</tr>
	
		</table>
		 
	 </form> 
       
    </div>
    <table id="diagnose_table"></table>
  </div>
  
  <div id="user_detail_dialog" data-options="closed:true,modal:true,title:'Exception details',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 400px;">
      <form id="user_detail_form">
        <input type="hidden" id="form-id" name="id" />
        <input type="hidden" id="inspectdataid" name="id" /> 
        <input type="hidden" id="dataid" name="id" />
        <table style="margin-left: 10px"> 
			<tr id="code_tr" >
				<td style="width: 60px;" id="prtd">Pulse rate</td>
				<td id="prinput">
				<input  type="text" id="pr" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td style="width: 60px;" id="systd">Systolic Blood Pressure</td>
				<td id="sysinput">
				<input  type="text" id="sys" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="diatd">Diastolic Blood Pressure</td>
				<td id="diainput">
				<input  type="text" id="dia" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="glu0td">Random blood glucose</td>
				<td id="glu0input">
				<input  type="text" id="glu0" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="glu1td">Pre-meal blood glucose</td>
				<td id="glu1input">
				<input  type="text" id="glu1" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="glu2td">Postprandial blood glucose</td>
				<td id="glu2input">
				<input  type="text" id="glu2" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="heighttd">height</td>
				<td id="heightinput">
				<input  type="text" id="height" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="weighttd">weight</td>
				<td id="weightinput">
				<input  type="text" id="weight" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
		<tr id="code_tr" >
				<td id="bmitd">BMI</td>
				<td id="bmiinput">
				<input  type="text" id="bmi" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="temptd">temperature</td>
				<td id="tempinput">
				<input  type="text" id="temp" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="spo2td">Oxygen</td>
				<td id="spo2input">
				<input  type="text" id="spo2" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="pr2td">Pulse rate2</td>
				<td id="pr2input">
				<input  type="text" id="pr2" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="leutd">white blood cell</td>
				<td id="leuinput">
				<input  type="text" id="leu" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="nittd">nitrite</td>
				<td id="nitinput">
				<input  type="text" id="nit" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="ubgtd">Urinary bladder</td>
				<td id="ubginput">
				<input  type="text" id="ubg" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="phtd">Degree of acidity and alkalinity</td>
				<td id="phinput">
				<input  type="text" id="ph" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="bldtd">Red blood cell</td>
				<td id="bldinput">
				<input  type="text" id="bld" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="glutd">Glucose</td>
				<td id="gluinput">
				<input  type="text" id="glu" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="kettd">Ketone</td>
				<td id="ketinput">
				<input  type="text" id="ket" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="protd">Protein</td>
				<td id="proinput">
				<input  type="text" id="pro" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="biltd">bilirubin</td>
				<td id="bilinput">
				<input  type="text" id="bil" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="vctd">Vitamin</td>
				<td id="vcinput">
				<input  type="text" id="vc" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="sgtd">proportion</td>
				<td id="sginput">
				<input  type="text" id="sg" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
			<tr id="code_tr" >
				<td>Processing opinion</td>
				<td colspan="3">
					<textarea  rows="4" cols="20" id="dealResultShow" name="dealResultShow"></textarea>
				</td>
			</tr>
		</table>
      </form>
    </div>
    
     <div id="deal_resut" data-options="closed:true,modal:true,title:'Fill in the treatment advice',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 400px;">
      <form id="user_detail_form">
        <table style="margin-left: 10px"> 
			<tr id="code_tr" >
				<td>Fill in the treatment advice</td>
				<td>
				<textarea style="width: 500px;" rows="4" cols="20" id="dealResult" name="dealResult"></textarea>
				</td>
			</tr>
			
			
		</table>
      </form>
    </div>
    
    
</body>
</html>