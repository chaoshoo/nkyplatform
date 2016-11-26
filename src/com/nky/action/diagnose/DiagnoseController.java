package com.nky.action.diagnose;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.doctor.RemoteInspectLog;
import com.nky.service.basedata.MessageService;
import com.nky.service.diagnose.DiagnoseService;
import com.sys.action.BaseAction;
import com.sys.entity.LoginEntity;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;

import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/diagnose")
public class DiagnoseController extends BaseAction{
	
	@Autowired
	private DiagnoseService diagnoseService;
	@Autowired
	private MessageService messageService;
	
	@RequestMapping(value = "/show")
	public String show(HttpServletRequest request) {
		LoginEntity loginEntity = getSession();
		String type = loginEntity.getType();
		request.setAttribute("type", type);
		return "diagnose/diagnose";
	}
	
	
	@RequestMapping(value = "/getDiagnoseList")
	@ResponseBody
	public ScriptPage getDiagnoseList(HttpServletRequest request,AjaxPage ajaxPage) {
		Map<String,Object> param = getParam(request);
		LoginEntity loginEntity = getSession();
		String type = loginEntity.getType();
		if("D".equals(type)) param.put("doctor_code", loginEntity.getDoctor().getCode());
		if("H".equals(type)) param.put("hospitalcode", loginEntity.getHospital().getHospital_code());
		ScriptPage scriptPage = diagnoseService.getDiagnoseList(param,ajaxPage.getPageNo(),ajaxPage.getPageSize());
		return scriptPage;
	}
	
	@RequestMapping(value = "/getDetailList")
	@ResponseBody
	public ScriptPage getDetailList(HttpServletRequest request,AjaxPage ajaxPage) {
		Map<String,Object> param = getParam(request);
		ScriptPage scriptPage = diagnoseService.getDetailList(param,ajaxPage.getPageNo(),ajaxPage.getPageSize());
		return scriptPage;
	}
	
	@RequestMapping("/addInspectLog")
	@ResponseBody
	public Data addQuesLog(RemoteInspectLog remoteInspectLog) {
		Data data =	new Data();
		remoteInspectLog.setCreateTime(new Date());
		remoteInspectLog.setVipOrDoctor("1");
		
		data=diagnoseService.addInspectLog(remoteInspectLog);
		return data;
	}
	
	@RequestMapping(value = "/videoDiagnoseOper")
	@ResponseBody
	public JSONObject videoDiagnoseOper(HttpServletRequest request , String id , String flag) {
		JSONObject result = diagnoseService.videoDiagnoseOper(id , flag);
		String success = result.getString("result");
		if(success.equals("success") && flag.equals("D")){
			//拒绝视频
			String sql = "select v.id,d.id as did,d.name from remote_inspect r,t_vip v,doctor d "
					+ " where r.vip_code=v.vip_code and r.doctor_code=d.code and r.id="+id;
			Record r = Db.findFirst(sql);
			if(r != null){
				messageService.saveMessage("2", r.get("did")+"", r.get("id")+"", "Unfortunately,Your reservation"+r.get("name")+"Been rejected。");
			}
		}
		return result;
	}
	
}