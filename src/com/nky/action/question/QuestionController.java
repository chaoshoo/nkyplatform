package com.nky.action.question;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.question.VipQuestionLog;
import com.nky.service.basedata.MessageService;
import com.nky.service.question.QuestionService;
import com.sys.action.BaseAction;
import com.sys.entity.LoginEntity;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;

@Controller
@RequestMapping(value = "/question")
public class QuestionController extends BaseAction{
	
	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private MessageService messageService;
	
	@RequestMapping(value = "/show")
	public String show(HttpServletRequest request) {
		LoginEntity loginEntity = getSession();
		String type = loginEntity.getType();
		request.setAttribute("type", type);
		return "question/question";
	}
	
	
	@RequestMapping(value = "/getQuestionList")
	@ResponseBody
	public ScriptPage getQuestionList(HttpServletRequest request,AjaxPage ajaxPage) {
		Map<String,Object> param = getParam(request);
		LoginEntity loginEntity = getSession();
		String type = loginEntity.getType();
		if("D".equals(type)) param.put("doctor_code", loginEntity.getDoctor().getCode());
		if("H".equals(type)) param.put("hospitalcode", loginEntity.getHospital().getHospital_code());
		ScriptPage scriptPage = questionService.getQuestionList(param,ajaxPage.getPageNo(),ajaxPage.getPageSize());
		return scriptPage;
	}
	
	@RequestMapping(value = "/getDetailList")
	@ResponseBody
	public ScriptPage getDetailList(HttpServletRequest request,AjaxPage ajaxPage) {
		Map<String,Object> param = getParam(request);
		ScriptPage scriptPage = questionService.getDetailList(param,ajaxPage.getPageNo(),ajaxPage.getPageSize());
		return scriptPage;
	}
	
	@RequestMapping("/addQuesLog")
	@ResponseBody
	public Data addQuesLog(VipQuestionLog ques) {
		Data data =	new Data();
		ques.setCreate_time(new Date());
		
		LoginEntity loginEntity = getSession();
		ques.setAnswer_code(loginEntity.getDoctor().getCode());
		data=questionService.addQuesLog(ques);
		//留言回复做一个消息推送
		try {
			if(data.getCode() == 1 ){
				//查询用户
				Record r = Db.findFirst("select * from t_vip where vip_code=(select vip_code from vip_questions vq where  vq.id=?)",ques.getVip_questions_id());
				Record r2 = Db.findFirst("select * from doctor where code=?",ques.getAnswer_code());
				if(r != null && r2 != null){
					messageService.saveMessage("1", r2.get("id")+"", r.get("id")+"", "Received"+r2.get("name")+"Reply，Please check my message.");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return data;
	}

}