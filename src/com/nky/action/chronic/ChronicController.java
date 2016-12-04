package com.nky.action.chronic;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.service.chronic.ChronicService;
import com.nky.service.exception.ExceptionService;
import com.nky.vo.DocGroupVo;
import com.sys.action.BaseAction;
import com.sys.entity.LoginEntity;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.KVvo;
import com.sys.entity.bo.ScriptPage;

/**
 * Screening for chronic diseases
 * @author zw
 *
 */
@Controller
@RequestMapping(value = "/chronic")
public class ChronicController extends BaseAction{
	
	@Autowired
	private ChronicService chronicService;
	
	@RequestMapping(value = "/show")
	public String show(HttpServletRequest request) {
		
		List<KVvo> mbTypes = new ArrayList<KVvo>();
		List<Record> mbtypeList = Db.find("select DIC_NAME,DIC_VALUE from dic where DIC_TYPE =? ","exam_norm");
		if(mbtypeList != null && mbtypeList.size()>0){
			for(Record r : mbtypeList){
				KVvo kv = new KVvo(r.getStr("DIC_NAME"),r.getStr("DIC_VALUE"));
				mbTypes.add(kv);
			}
		}
		
		List<KVvo> inspect = new ArrayList<KVvo>();
		List<Record> inspectList = Db.find("select DIC_NAME,DIC_VALUE from dic where DIC_TYPE =? and dic_name <> '0' ","inspect_is_normal");
		if(inspectList != null && inspectList.size()>0){
			for(Record r : inspectList){
				KVvo kv = new KVvo(r.getStr("DIC_NAME"),r.getStr("DIC_VALUE"));
				inspect.add(kv);
			}
		}
		List<KVvo> illtype = new ArrayList<KVvo>();
		List<Record> illtypeList = Db.find("select * from dic where dic_type='mbtype'");
		if(illtypeList != null && illtypeList.size()>0){
			for(Record r : illtypeList){
				KVvo kv = new KVvo(r.getStr("DIC_NAME"),r.getStr("DIC_VALUE"));
				illtype.add(kv);
			}
		}
		List<KVvo> hospitals = new ArrayList<KVvo>();
		List<Record> hosList = Db.find("select code,name from hospital");
		if(hosList != null && hosList.size()>0){
			for(Record r : hosList){
				KVvo kv = new KVvo(r.getStr("name"),r.getStr("code"));
				hospitals.add(kv);
			}
		}

		request.setAttribute("role", getSession().getRoles());
		request.setAttribute("mbTypes", mbTypes);//illTypes  mbTypes
		request.setAttribute("inspect", inspect);//illTypes  mbTypes
		request.setAttribute("illtype", illtype);//illTypes  mbTypes
		request.setAttribute("hospitals", hospitals);//illTypes  mbTypes
		return "chronic/chroniclist";
	}
	
	
	@RequestMapping(value = "/getChronicList")
	@ResponseBody
	public ScriptPage getDiagnoseList(HttpServletRequest request,AjaxPage ajaxPage) {
		Map<String,Object> param = getParam(request);
		String role = getSession().getRoles();
		if("2".equals(role)){//Hospital
			String hospitalCode  = getSession().getHospital().getHospital_code();
			param.put("hospital", hospitalCode);
		}else if ("3".equals(role)){//Doctor
			String docCode  = getSession().getDoctor().getCode();
			Record docRecord = Db.findFirst("select hospital_code from doctor where code=?",docCode);
			param.put("hospital", docRecord.getStr("hospital_code"));
			param.put("doctorc", docCode);
			
		}
		ScriptPage scriptPage = chronicService.getRegistrationList(param,ajaxPage.getPageNo(),ajaxPage.getPageSize());
		return scriptPage;
	}
	
	
	@RequestMapping(value = "/update")
	@ResponseBody
	public Data update(HttpServletRequest request, String dealResult,String id,String dataid) {
		Data d = new Data();
		LoginEntity loginEntity = getSession();
		try {
			int i = chronicService.updateDealResult(id,dealResult,dataid,loginEntity.getName());
			if(i>0){
				d.setCode(0);
				d.setMsg("Done");	
			}else {
				d.setCode(1);
				d.setMsg("Process failed，Please contact system administrator");
			}
			
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		return d;
	}
	
	

}