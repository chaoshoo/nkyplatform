package com.nky.action.gh;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nky.service.diagnose.DiagnoseService;
import com.nky.service.gh.RegistrationService;
import com.sys.action.BaseAction;
import com.sys.entity.LoginEntity;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.ScriptPage;

@Controller
@RequestMapping(value = "/registration")
public class RegistrationController extends BaseAction{
	
	@Autowired
	private RegistrationService registrationService;
	
	@RequestMapping(value = "/show")
	public String show(HttpServletRequest request) {
//		LoginEntity loginEntity = getSession();
//		String type = loginEntity.getType();
//		request.setAttribute("type", type);
		return "ghorder/ghorderlist";
	}
	
	
	@RequestMapping(value = "/getRegistrationList")
	@ResponseBody
	public ScriptPage getDiagnoseList(HttpServletRequest request,AjaxPage ajaxPage) {
		Map<String,Object> param = getParam(request);
		ScriptPage scriptPage = registrationService.getRegistrationList(param,ajaxPage.getPageNo(),ajaxPage.getPageSize());
		return scriptPage;
	}
	
}

