package com.nky.action.group;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nky.entity.group.GroupEntity;
import com.nky.service.group.GroupService;
import com.sys.action.BaseAction;
import com.sys.entity.LoginEntity;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;

@Controller
@RequestMapping(value = "/vipgroup")
public class GroupController extends BaseAction{
	
	@Autowired
	private GroupService groupService;
	
	@RequestMapping(value = "/show")
	public String show(HttpServletRequest request) {
		LoginEntity loginEntity = getSession();
		String type = loginEntity.getType();
		request.setAttribute("type", type);
		return "group/group";
	}
	
	@RequestMapping(value = "/getGroupList")
	@ResponseBody
	public ScriptPage getGroupList(HttpServletRequest request,AjaxPage ajaxPage) {
		Map<String,Object> param = getParam(request);
		LoginEntity loginEntity = getSession();
		String type = loginEntity.getType();
		if("D".equals(type)) param.put("doctor_code", loginEntity.getDoctor().getCode());
		if("H".equals(type)) param.put("hospitalcode", loginEntity.getHospital().getHospital_code());
		ScriptPage scriptPage = groupService.getGroupList(param,ajaxPage.getPageNo(),ajaxPage.getPageSize());
		return scriptPage;
	}
	
	
	@RequestMapping("/addgroup")
	@ResponseBody
	public Data addGroup(GroupEntity group) {
		Data data =	new Data();
		group.setCreate_time(new Date());
		LoginEntity loginEntity = getSession();
		group.setDoctor_code(loginEntity.getDoctor().getCode());
		data=groupService.addGroup(group);
		return data;
	}
	
	
	@RequestMapping("/updategroup")
	@ResponseBody
	public Data updateGroup(GroupEntity group) {
		Data data =	groupService.updateGroup(group);	
		return data;
	}

}