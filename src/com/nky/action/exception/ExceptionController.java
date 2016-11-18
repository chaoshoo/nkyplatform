package com.nky.action.exception;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.basedata.MessageTemplateEntity;
import com.nky.service.exception.ExceptionService;
import com.sys.action.BaseAction;
import com.sys.entity.LoginEntity;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;
import com.sys.jfinal.JFinalDb;

@Controller
@RequestMapping(value = "/exception")
public class ExceptionController extends BaseAction{
	
	@Autowired
	private ExceptionService exceptionService;
	
	@RequestMapping(value = "/show")
	public String show(HttpServletRequest request) {
//		LoginEntity loginEntity = getSession();
//		String type = loginEntity.getType();
//		request.setAttribute("type", type);
		return "exception/exceptionlist";
	}
	
	
	@RequestMapping(value = "/getExceptionList")
	@ResponseBody
	public ScriptPage getDiagnoseList(HttpServletRequest request,AjaxPage ajaxPage) {
		Map<String,Object> param = getParam(request);
		ScriptPage scriptPage = exceptionService.getRegistrationList(param,ajaxPage.getPageNo(),ajaxPage.getPageSize());
		return scriptPage;
	}
	
	
	@RequestMapping(value = "/update")
	@ResponseBody
	public Data update(HttpServletRequest request, String dealResult,String id,String dataid) {
		Data d = new Data();
		LoginEntity loginEntity = getSession();
		try {
			int i = exceptionService.updateDealResult(id,dealResult,dataid,loginEntity.getName());
			if(i>0){
				d.setCode(0);
				d.setMsg("处理成功");	
			}else {
				d.setCode(1);
				d.setMsg("处理失败，请联系系统管理员");
			}
			
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		return d;
	}
	
	

}
