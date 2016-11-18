<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@include file="/head.jsp"%>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>慢病筛查</title>
<link rel="stylesheet" href="css/all.css" />
<link rel="stylesheet" href="css/jquery/easyui.css" />
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/jquery/datagrid-detailview.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/common.js"></script>
<script type="text/javascript" src="<%=basePath%>js/form.js"></script>
<script type="text/javascript" src="<%=basePath%>js/openDialog.js"></script>

<script type="text/javascript" src="<%=path %>/js/chronic/chroniclist.js"></script>
<style type="text/css">
	/*.panel-body{padding:0px;}*/
	.btn{color:#428bca !important;text-decoration:none !important;}
	.btn:hover{color:#428bca !important;text-decoration:none !important;}
</style>
</head>
<body class="easyui-layout" onkeydown="IM.EV_keyCode(event)">
  <div data-options="region:'center',title:'慢性病管理'" class="regionCenter">
    <div id="common_search" class="common_search common_search_nopadding">       
     <form action="" id="ques_qry_form">
	     		&nbsp;客户编码<input type="text"   id="FIT-vip_code" style="width: 100px;" name="FIT-vip_code"/>
				&nbsp;姓  名<input type="text" id="FIT-real_name" style="width: 100px;" name="FIT-real_name"/>
				&nbsp;性  别
					<select id=FIT-sex name="FIT-sex" >
				      <option value="">-请选择-</option>
					  <m:getItems name="gender"></m:getItems>
					</select>
				&nbsp;电  话&nbsp;<input type="text"   id="FIT-mobile" style="width: 100px;" name="FIT-mobile"/>
				&nbsp;年龄范围:<input type="text"  id="FIT-GEQ-age" name="FIT-GEQ-age" style="width: 50px;"/>
				-<input type="text"  id="FIT-LEQ-age" name="FIT-LEQ-age" style="width: 50px;"/>
       <!-- hospitals 2B C 标签-->
	       	<c:if test="${currentUser.roles eq '1'}">
	       	<br/><br/>&nbsp;医  院<select id="FIT-hospital" name="FIT-hospital">
				      <option value="">-请选择-</option> 
				      <c:forEach var="item" items="${hospitals}">
								<option value="${item.value }"><c:out value="${item.key }" /></option>
					  </c:forEach>
					</select> 
	       	</c:if>
	       	<!-- 医生的检索，是管理员或医院才可以看的 -->
	       	<c:if test="${currentUser.roles eq '2' or currentUser.roles eq '1'}">
	       		<c:if test="${currentUser.roles eq '2'}"><br/><br/><br/></c:if>
	         	&nbsp; 医生编码&nbsp;<input type="text" id="FIT-doctorc" name="FIT-doctorc"/>  
	         	&nbsp;医生名字&nbsp;<input type="text" id="FIT-doctor" name="FIT-doctor"/> 
	         </c:if>
	  		<br/>&nbsp;是否慢病
	            <select id="FIT-ischronic" name="FIT-ischronic" >
			      <option value="">-请选择-</option>
				  <m:getItems name="ischronic"></m:getItems>
				</select>
	            &nbsp;体检时间
	            <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="FIT-beginTime" id="FIT-beginTime" />
                至 <input class="easyui-datetimebox" type="text" data-options="formatter:formattime,parser:timeparser" style="width:200px;" name="FIT-end_time" id="FIT-end_time" />
					<button onclick="openGroupPush();" type="button" class="btn btn-success">选择指标类型</button>
			    	<input type="radio" id="FIT-cond" name="FIT-cond" value="or" />或者
			    	<input type="radio" id="FIT-cond"  checked="checked" name="FIT-cond" value="and" />并且
			<br/>&nbsp;慢性病类型
					<c:forEach var="item" items="${illtype}" varStatus="status">
	       				<input type="checkbox" name="illtypebox" value="${item.key }" >&nbsp;${item.value }&nbsp;&nbsp;</input>
	       				  <c:if test="${status.count%8==0}" ></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</c:if>
				  	</c:forEach>
	          	<br/>&nbsp;疾病类型
	            <select id="FIT-ill_type" name="FIT-ill_type" >
			      <option value="">-请选择-</option>
				  <m:getItems name="ill_type"></m:getItems>
				</select>
		           <button type="button" id="diagnose_search" class="btn btn-success">
	        			查&nbsp;询
	     			 </button> 
	 </form> 
       
    </div>
    <table id="diagnose_table"></table>
  </div>
	<div id="user_detail_dialog"
		data-options="closed:true,modal:true,title:'选择指标类型',iconCls:'icon-save'"
		style="padding: 5px; width: 500px; height: 350px;">
		<form id="user_detail_form">
			<table style="margin-left: 10px" width=450  border="1">

				<c:if test="${not empty mbTypes}">
					<tr>
						<td colspan="1" align="center" >指标类型</td>
						<td colspan="2" align="center" style="width: 100px;" >异常值</td>
					</tr>
					<c:forEach var="item" items="${mbTypes}" varStatus="st">
						<tr align=center>
							<td  align="left">
								<input type="checkbox" id="id${st.index}M" class="checkbox first"
									name="chronic_type" onclick="mbselect(${st.index},-1)" value="${item.key}"/>&nbsp;${item.value}&nbsp;&nbsp;
							</td>
							<td  align="left">
								<c:if test="${not empty inspect}">
									<c:forEach var="item" items="${inspect}" varStatus="stc">
										<input type="checkbox" class="checkbox first" id="id${st.index}${stc.index}"
											name="inspectname${st.index}" value="${item.key }" onclick="mbselect(${st.index},${stc.index})" />&nbsp;${item.value }&nbsp;&nbsp;
  									</c:forEach>
								</c:if>
							</td>
						</tr>
					</c:forEach>
				</c:if>
			</table>
		</form>
	</div>

	<div id="deal_resut" data-options="closed:true,modal:true,title:'填写处理意见',iconCls:'icon-save'" style="padding: 5px; width: 700px; height: 400px;">
      <form id="user_detail_form">
        <input type="hidden" id="inspectdataid" name="id" /> 
        <input type="hidden" id="dataid" name="id" />
        
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