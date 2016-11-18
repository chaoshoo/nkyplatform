<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="com.sys.entity.sys.SysAuth"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<%@taglib prefix="m" tagdir="/WEB-INF/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
    String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="Mosaddek">
<meta name="keyword" content="">
<title>宁康园管理平台</title>
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">
<link href="css/font-awesome.css" rel="stylesheet" />

<script type="text/javascript" src="js/jquery.js"></script> 
<script type="text/javascript" src="js/bootstrap.min.js"></script>
</head>
<body>
<header class="header white-bg"> <a href="#" class="logo" style="color: #FFF;font-weight:bold">宁康园管理平台
<!-- 
<img src="img/index/logo.png" width="300" height="43">
 -->
</a>
  <div class="top-nav ">
    <ul class="nav pull-right top-menu" style=" padding-top:10px;">
      <li style="color:#fff; margin-top:10px; "><i class=" icon-user" style="color: #fff; font-size:16px; position:relative;top:1px;"></i>欢迎您，<font style="color:#A3FF00;">${currentUser.name }</font> &nbsp;<c:choose><c:when test="${type eq 'doctor'}">医生</c:when><c:when test="${type eq 'hospital'}">医院</c:when><c:when test="${type eq 'sys'}">管理员</c:when></c:choose>&nbsp;</li>
      <li class="dropdown dropdown1"> <a data-toggle="dropdown" class="dropdown-toggle" href="#"> <span class="username"><i class="icon-cog"></i>&nbsp;设置</span> <b class="caret"></b> </a>
        <ul class="dropdown-menu extended logout">
          <div class="log-arrow-up"></div>
          <li><a href="javascript:void(0)" onclick="Open('修改密码','changepwd/changePwd.html')"><i class=" icon-suitcase"></i>修改密码</a></li>
          <li><a href="javascript:void(0)" onclick="Open('我的信息','myinfo/info.html')"><i class=" icon-suitcase"></i>我的信息</a></li>
          <li><a href="logout.html?type=${type}"><i class="icon-key"></i>退出</a></li>
        </ul>
      </li>
    </ul>
  </div>
</header>

<aside>
  <div id="sidebar"  class="nav-collapse ">
    <div class="sidebar-toggle-box">
      <div data-original-title="Toggle Navigation" data-placement="right" class="icon-reorder tooltips"> <i id="left-tip" class=" icon-double-angle-left"></i></div>
    </div>
    <ul class="sidebar-menu" id="nav-accordion">
      <li> <a href="#"> <i class="icon-list-ul" style="color:#fff;"></i><span style="font-weight:bold; color:#fff; font-size:16px;">菜单</span> </a>
        <div class="dcjq-parent1"></div>
      </li>
      
		<c:forEach items="${authList }" var="list">
    <% try{ %>
			<shiro:hasPermission name="${list.authority }">
			<li class="sub-menu"> <a href="javascript:;"> <span>${list.authName }</span> </a>
				<ul class="sub">
					<c:forEach items="${list.children }" var="children">
						<shiro:hasPermission name="${children.authority }">
						<li><a href="javascript:void(0)" onclick="Open('${children.authName }','${children.authAction }')"
							name="menu">${children.authName }</a></li>
						</shiro:hasPermission>
					</c:forEach>
				</ul>
	        	<div class="dcjq-parent1"></div>
			</li>
			</shiro:hasPermission>
      <% }catch(Exception e){
        //TODO
      	} %>
		</c:forEach>
		
    </ul>
  </div>
</aside>

<section id="main-content">
	<div class="quick-actions_homepage-top"></div>
	<!--tabs展现区 -->
	<div id="tabs" class="easyui-tabs" fit="true" border="false" >
	</div>
</section>

<script type="text/javascript"	src="js/common/jquery/jquery.easyui.min.js"></script>
<script type="text/javascript"	src="js/jquery.nicescroll.min.js"></script>
<script type="text/javascript" src="js/jquery.scrollTo.min.js"></script>
<script type="text/javascript">
$(document).ready(function(e) {
    $(".quick-actions_homepage ul li").click(function(){
		$(this).siblings().removeClass("cur");
		$(this).addClass("cur");
	});
	$(".sub li").click(function(){
		$(".sub").find("li.cur").removeClass("cur");
		$(this).addClass("cur");
	});
});
//在右边center区域打开菜单，新增tab
function Open(text, url) { 
	var closableVal = true;
	if(text == "首页"){
		closableVal = false;
	}
    if ($("#tabs").tabs('exists', text)) {
        $('#tabs').tabs('select', text); 
        //RefreshTab(url);
    } else {
        $('#tabs').tabs('add', {
            title : text,
            fit:true ,
            closable : closableVal,
            tools:[{
            	        iconCls:'icon-tab-refresh',
            	        handler:function(){
            	        RefreshTab(url);
            	       }
               }],
         	content : '<iframe scrolling="auto" frameborder="0"  src="'+url+'"></iframe>'
        }); 
        $("iframe").css({
          "width":($(window).width()-240),
          "height":($(window).height()-130) 
        });
    }
};
//刷新事件的实现
function RefreshTab(url) {    		 
      var current_tab = $('#tabs').tabs('getSelected');
       $('#tabs').tabs('update',{
           tab:current_tab,
           fit:true ,
           options : {
        	   content : '<iframe scrolling="auto" frameborder="0"  src="'+url+'"></iframe>' 
           }
        });
       $("iframe").css({
         "width":($(window).width()-240),
         "height":($(window).height()-130) 
       });
 };
</script>
</body>
</html>