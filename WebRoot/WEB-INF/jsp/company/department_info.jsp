<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>支付后台</title>
		<%@include file="/head.jsp"%>
		<link rel="stylesheet" type="text/css" href="css/jquery/tree/zTreeStyle.css" />
		<link rel="stylesheet" href="css/all.css" />
		<link rel="stylesheet" href="css/jquery/easyui.css" />
		<link rel="stylesheet" href="css/jquery/easyui-icon/icon.css"/>
		<script type="text/javascript" src="<%=basePath%>js/company/department_info.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery.ztree.core-3.5.min.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/common/jquery/jquery.ztree.excheck-3.5.min.js"></script>
	</head>
	<body class="easyui-layout">
		<div id="common_search common_search_nopadding">
			<button id="add" class="btn btn-success" data-options="iconCls:'icon-add'" onclick="clickAdd()"><i class="icon-plus"></i>&nbsp;添加部门</button>
			<button id="update" class="btn btn-success" data-options="iconCls:'icon-edit'" onclick="editPrivilege()"><i class="icon-edit"></i>&nbsp;修改部门</button>
			<button id="delete" class="btn btn-success" data-options="iconCls:'icon-remove'" onclick="delPrivilege()"><i class="icon-remove"></i>&nbsp;删除部门 </button>
		</div>
	<div id="root_layout">
		
		<table id="departmentInfo_table"></table>
		<div id="saveUpdateDepartment_detail_dialog"
			data-options="closed:true,modal:true,title:'部门信息',iconCls:'icon-save'"
			style="padding:5px;width:700px;height:300px;">
			<form action="departmentInfo/getList.json" id="saveUpdateDepartment_detail_form">
				<input type="hidden" id="id">
				<table>
					<tr>
						<td style="min-width: 100px">上级部门</td>
						<td width="150px;">
							<select id="parent">
								<option value="${0}">--选择--</option>
								<c:forEach items="${departMentLst}" var="departLst">
									<option value="${departLst.tId}" >${departLst.name}</option>
								</c:forEach>
							</select>
						</td>
						<td style="min-width: 100px">部门名称</td>
						<td width="150px;">
<!--							<select id="departmentName">-->
<!--								<m:getItems name="ksmc"></m:getItems>-->
<!--							</select>-->
							<input type="text" id="name">
						</td>
					</tr>
					
					<tr>
						<td style="min-width: 100px">部门描述</td>
						<td width="150px;">
							<input type="text" id="description"/>
						</td>
						<td style="min-width: 100px">备注</td>
						<td width="150px;">
							<input type="text" id="remark"/>
						</td>
					</tr>
					<tr>
						<td style="min-width: 100px">状态</td>
						<td width="150px;">
							<select id="status">
								<m:getItems name="status"></m:getItems>
							</select>
						</td>
						<td style="min-width: 100px">&nbsp;</td>
						<td width="150px;"></td>
					</tr>
					
				</table>
			</form>
		</div>
		<table id="department_tree">
					<tr>
						<td colspan="2">
							<div id="auth_tree">
								<ul id="treeDemo" class="ztree"></ul>
							</div>
						</td>
					</tr>
		</table>
		<div id="rMenu" class="easyui-menu" style="position: absolute; display: none;width:120px;">
			<div id="m_add" onclick="addPrivilege();">
				<li>增加</li>
			</div>
			<div id="m_edit" onclick="editPrivilege();">
				<li>编辑</li>
			</div>
			<div id="m_del" onclick="delPrivilege();">
				<li>删除</li>
			</div>
<!--			<div id="m_show" onclick="queryPrivilege();">-->
<!--				<li>查看</li>-->
<!--			</div>-->
		</div>
</body>
</html>