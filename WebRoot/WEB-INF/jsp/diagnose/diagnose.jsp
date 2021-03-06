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
<title>远程咨询管理</title>
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<script type="text/javascript" src="js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/common/common.js"></script>
<script type="text/javascript" src="js/openDialog.js"></script>
<script type="text/javascript" src="js/visit/selHospital.js"></script>
<script type="text/javascript" src="https://app.cloopen.com/im50/ytx-web-im-min-new.js"></script>
<script type="text/javascript" src="<%=path %>/js/justdo.js"></script>
<script type="text/javascript" src="<%=path %>/js/diagnose/diagnose.js?v=3"></script>
<style type="text/css">
	/*.panel-body{padding:0px;}*/
	.btn{color:#428bca !important;text-decoration:none !important;}
	.btn:hover{color:#428bca !important;text-decoration:none !important;}
</style>
</head>
<body class="easyui-layout" onkeydown="IM.EV_keyCode(event)">
  <div data-options="region:'center',title:'远程咨询管理'" class="regionCenter">
    <div id="common_search" class="common_search common_search_nopadding">       
      <input type="hidden" id="type" name="type" value="${type}" />
      <input type="hidden" id="doctorCode" name="doctorCode" value="${currentUser.codeId}" />
     <form action="" id="ques_qry_form">
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
		            <td>会员身份证</td>
		            <td><input type="text" id="papers_num" style="width: 200px;" /></td>
		            <td>会员手机</td>
		            <td><input type="text" id="mobile" style="width: 200px;" /></td>
		         </tr>
				 <tr>
		            <td>处理状态</td>
		            <td>  <select id="status" style="width: 200px;" >
		            		 <option value ="">全部</option> 
							 <option value ="1">已处理</option> 
							 <option value ="0">未处理</option> 
						 </select>
				    </td>
		            <td>预约时间</td>
		            <td colspan='3'><input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="begin_time" />
	                至 <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="end_time" />
	                <button type="button" id="diagnose_search" class="btn btn-success btn-success-small"><i class="icon-search"></i>查&nbsp;询</button>   
	                </td>
				</tr>
			</table> 
		</c:if>
	     <c:if test="${type == 'S'}">
	     	<table id="dataTable">
	     		<tr>
		            <td>医&nbsp;&nbsp;院</td>
		            <td> <input style="width: 150px;"  type ="text" id="hospitalname" name="hospitalname" value="" readonly="readonly"/>					    
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
		            <td>会员手机</td>
		            <td><input type="text" id="mobile" style="width: 200px;" /></td>
		            <td>处理状态</td>
		            <td>  <select id="status" style="width: 200px;" >
		            		 <option value ="">全部</option> 
							 <option value ="1">已处理</option> 
							 <option value ="0">未处理</option> 
						 </select>
				    </td>
				</tr>
				<tr>
					<td>会员身份证</td>
		            <td><input type="text" id="papers_num" style="width: 200px;" /></td>
		            <td>预约时间</td>
		            <td colspan='3'><input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="begin_time" />
	                至 <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="end_time" />
					<button type="button" id="diagnose_search" class="btn btn-success btn-success-small"><i class="icon-search"></i>查&nbsp;询</button>   
					</td>
				</tr>
			</table> 
		</c:if>
		 <c:if test="${type == 'H'}">
			<table id="dataTable">
				<tr>
		            <td>科&nbsp;&nbsp;室</td>
		            <td> <input style="width: 200px;"  class="easyui-combobox" id="office_code" name="office_code"  value=""/></td>
		            <td>会员身份证</td>
		            <td><input type="text" id="papers_num" style="width: 200px;" /></td>
		            <td>会员手机</td>
		            <td><input type="text" id="mobile" style="width: 200px;" /></td>
		        </tr>
				<tr>
		            <td>会员名称</td>
		            <td><input type="text" id="vip_name"  style="width: 200px;"/></td>
		            <td>医生名称</td>
		            <td> <input type="text" id="doctor_name"  style="width: 200px;" /></td>
		            <td>处理状态</td>
		            <td>  <select id="status" style="width: 200px;" >
		            		 <option value ="">全部</option> 
							 <option value ="1">已处理</option> 
							 <option value ="0">未处理</option> 
						 </select>
				    </td>
				 </tr>
				 <tr>
		            <td>预约时间</td>
		            <td colspan='5'><input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="begin_time" />
	                至 <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="beginTime" id="end_time" />
	                <button type="button" id="diagnose_search" class="btn btn-success btn-success-small"><i class="icon-search"></i>查&nbsp;询</button> 
	                </td>
				</tr>
			</table> 
		</c:if>
	 </form> 
      
    <!--   <button type="button" id="diagnose_reset" class="btn btn-success btn-success-small">
        	重&nbsp;置
      </button>  -->
    </div>
 
    <table id="diagnose_table"></table>
    <div id="lvjing" style="display: none; z-index: 668888; position: absolute; margin-left: 0px; padding-left: 0px; left: 0px; top: 0px; height: 0px; width: 0px;">
		<canvas id="lvjing_canvas" style="border:1px solid #aaa; display: block;"></canvas>
	</div>
    <div id="diagnose_operation_dialog" class="easyui-dialog" data-options="closed:true,modal:true,title:'远程咨询',iconCls:'icon-save'" style="width: 644px; height: 450px;">
    	<input type="hidden" id="callerId" name="callerId" value="" />
     	<div id="pop_videoView" style="display: block; width: 636px; position: absolute; top: 36px;left: 3px; margin: 5px 0 5px 0;height:397px">
			<canvas id="videoViewCanvas" style="width:100%;height:100%;z-index: 50;position: absolute;top:0px;left:0px;"></canvas>
			<div id="videoView" style="width:100%;height:100%;position: absolute; top:0px; left:0px; z-index: 100; text-align:center;display:block;background:gray">
				<video autoplay="autoplay" id="receivedVideo" width="100%" height="90%" style="z-index:200;"></video>
				<video autoplay="autoplay" id="localVideo" width="30%" style="position:absolute;top:10px;right:-1px; z-index:300;"></video>
			</div>
			<div id="voiceCallDiv_audio" style="width:50%;position: absolute; top: 40px; z-index: 100; text-align:center;display:none;background:gray;padding-top:20px;padding-bottom:10px">
				<audio id="voiceCallAudio" autoplay="autoplay" controls="controls"></audio>
			</div>
			<audio id="voipCallRing" src="<%=path %>/js/ringback.wav" style="display:none" loop="loop"></audio>
		</div>
    </div>
    <div id="diagnose_detail_dialog" data-options="closed:true,modal:true,title:'查看信息',iconCls:'icon-save'" style="padding: 5px; width: 750px; height: 550px;">
     	<br>
     	<input type="hidden" id="remoteInspectCode">
     	咨询内容：<span id='diagnose_content'></span> 
     	<br>
     	<br>
     	<table id="diagnose_detail_table" class="easyui-datagrid" style="height:280px;width:700px;"
			data-options="url:'diagnose/getDetailList.json',queryParams: {},fitColumns:true,singleSelect:true,checkbox:true,pagination:true,rownumbers:true,idField:'id',toolbar:'dg_vip_tb'">
			<thead>
				<tr>
					<th data-options="field:'id',hidden:true"></th>
					<th data-options="field:'answer_name',width:50">回复人名称</th>
					<th data-options="field:'des',width:100">回复内容</th>
					<th data-options="field:'create_time',width:50">回复时间</th>
				</tr>
			</thead>
		</table>
     	<div id="answer_div">
     		回&nbsp;复： <textarea  style="width: 300px;" rows="2" cols="20" id="answer_content" name="answer_content"></textarea>
     	</div>  
    </div>
  </div>
</body>
</html>