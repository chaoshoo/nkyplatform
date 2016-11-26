package com.nky.action.visit;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nky.entity.visit.VisitEntity;
import com.nky.service.visit.VisitService;
import com.sys.action.BaseAction;
import com.sys.entity.LoginEntity;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;

@Controller
@RequestMapping(value = "/visit")
public class VisitController extends BaseAction{
	
	@Autowired
	private VisitService visitService;
	
	@RequestMapping(value = "/show")
	public String show(HttpServletRequest request) {
		LoginEntity loginEntity = getSession();
		String type = loginEntity.getType();
		request.setAttribute("type", type);
		return "visit/visit";
	}
	
	@RequestMapping(value = "/getVisitList")
	@ResponseBody
	public ScriptPage getVisitList(HttpServletRequest request,AjaxPage ajaxPage) {
		Map<String,Object> param = getParam(request);
		
		LoginEntity loginEntity = getSession();
		String type = loginEntity.getType();
		if("D".equals(type)) param.put("doctor_code", loginEntity.getDoctor().getCode());
		if("H".equals(type)) param.put("hospitalcode", loginEntity.getHospital().getHospital_code());
		ScriptPage scriptPage = visitService.getVisitList(param,ajaxPage.getPageNo(),ajaxPage.getPageSize());
		return scriptPage;
	}
	
	
	@RequestMapping("/addVisit")
	@ResponseBody
	public Data addVisit(VisitEntity visit) {
		Data data =	new Data();
		visit.setCreate_time(new Date());	
		LoginEntity loginEntity = getSession();
		visit.setDoctor_code(loginEntity.getDoctor().getCode());
		data=visitService.addVisit(visit);
		return data;
	}
	
	
	@RequestMapping("/updateVisit")
	@ResponseBody
	public Data updateVisit(VisitEntity visit) {
		Data data =	visitService.updateVisit(visit);	
		return data;
	}

	@RequestMapping(value = "/vipDialog")
	public String vipDialog() {
		return "visit/vip_dialog";
	}
	
	@RequestMapping(value = "/listVip")
	@ResponseBody
	public ScriptPage listVip(HttpServletRequest request,AjaxPage ajaxPage) {
		Map<String,Object> param = getParam(request);
		ScriptPage scriptPage = visitService.getVipList(param,ajaxPage.getPageNo(),ajaxPage.getPageSize());
		return scriptPage;
	}
}