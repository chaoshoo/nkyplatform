<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@include file="/head.jsp"%>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>挂号管理</title>
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
  <div data-options="region:'center',title:'异常管理'" class="regionCenter">
    <div id="common_search" class="common_search common_search_nopadding">       
     <form action="" id="ques_qry_form">
		<table id="dataTable">
		    <tr>
	            <td>检查人<td>
	            <td> <input style="width: 200px;"  type ="text" id="real_name"/>					    
	  			</td>
	            <td>检查指标</td>
	            <td><input style="width: 200px;" type ="text" id="inspect_code" /> </td>
	            <td>检查证件</td>
	            <td> <input type="text" id="card_code"  style="width: 200px;" /></td>
	          <td>
	           <button type="button" id="diagnose_search" class="btn btn-success">
        	查&nbsp;询
     			 </button> 
	          </td>
			</tr>
	
		</table>
		 
	 </form> 
       
    </div>
    <table id="diagnose_table"></table>
  </div>
  
  <div id="user_detail_dialog" data-options="closed:true,modal:true,title:'异常详细信息',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 400px;">
      <form id="user_detail_form">
        <input type="hidden" id="form-id" name="id" />
        <input type="hidden" id="inspectdataid" name="id" /> 
        <input type="hidden" id="dataid" name="id" />
        <table style="margin-left: 10px"> 
			<tr id="code_tr" >
				<td style="width: 60px;" id="prtd">脉率</td>
				<td id="prinput">
				<input  type="text" id="pr" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td style="width: 60px;" id="systd">收缩压</td>
				<td id="sysinput">
				<input  type="text" id="sys" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="diatd">舒张压</td>
				<td id="diainput">
				<input  type="text" id="dia" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="glu0td">随机血糖</td>
				<td id="glu0input">
				<input  type="text" id="glu0" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="glu1td">餐前血糖</td>
				<td id="glu1input">
				<input  type="text" id="glu1" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="glu2td">餐后血糖</td>
				<td id="glu2input">
				<input  type="text" id="glu2" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="heighttd">身高</td>
				<td id="heightinput">
				<input  type="text" id="height" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="weighttd">体重</td>
				<td id="weightinput">
				<input  type="text" id="weight" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
		<tr id="code_tr" >
				<td id="bmitd">BMI</td>
				<td id="bmiinput">
				<input  type="text" id="bmi" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="temptd">体温</td>
				<td id="tempinput">
				<input  type="text" id="temp" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="spo2td">血氧</td>
				<td id="spo2input">
				<input  type="text" id="spo2" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="pr2td">脉率2</td>
				<td id="pr2input">
				<input  type="text" id="pr2" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="leutd">白细胞</td>
				<td id="leuinput">
				<input  type="text" id="leu" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="nittd">亚硝酸盐</td>
				<td id="nitinput">
				<input  type="text" id="nit" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="ubgtd">尿胆原</td>
				<td id="ubginput">
				<input  type="text" id="ubg" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="phtd">酸碱度</td>
				<td id="phinput">
				<input  type="text" id="ph" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="bldtd">红细胞</td>
				<td id="bldinput">
				<input  type="text" id="bld" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="glutd">葡萄糖</td>
				<td id="gluinput">
				<input  type="text" id="glu" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="kettd">酮体</td>
				<td id="ketinput">
				<input  type="text" id="ket" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="protd">蛋白质</td>
				<td id="proinput">
				<input  type="text" id="pro" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="biltd">胆红素</td>
				<td id="bilinput">
				<input  type="text" id="bil" name="title"  maxlength="50" disabled="disabled"/>
				</td>
				<td id="vctd">维生素</td>
				<td id="vcinput">
				<input  type="text" id="vc" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
				<tr id="code_tr" >
				<td id="sgtd">比重</td>
				<td id="sginput">
				<input  type="text" id="sg" name="title"  maxlength="50" disabled="disabled"/>
				</td>
			</tr>
			<tr id="code_tr" >
				<td>处理意见</td>
				<td colspan="3">
					<textarea  rows="4" cols="20" id="dealResultShow" name="dealResultShow"></textarea>
				</td>
			</tr>
		</table>
      </form>
    </div>
    
     <div id="deal_resut" data-options="closed:true,modal:true,title:'填写处理意见',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 400px;">
      <form id="user_detail_form">
        <table style="margin-left: 10px"> 
			<tr id="code_tr" >
				<td>填写处理意见</td>
				<td>
				<textarea style="width: 500px;" rows="4" cols="20" id="dealResult" name="dealResult"></textarea>
				</td>
			</tr>
			
			
		</table>
      </form>
    </div>
    
    
</body>
</html>