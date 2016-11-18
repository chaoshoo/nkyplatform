package com.nky.action.basedata;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.testng.collections.Lists;

import com.nky.entity.exam.VipExam;
import com.nky.entity.exam.VipExamNorm;
import com.nky.entity.exam.VipExamPic;
import com.nky.service.basedata.VipMediRecService;
import com.sys.action.BaseAction;
import com.sys.entity.LoginEntity;
import com.sys.entity.auth.Dic;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;
import com.sys.jfinal.JFinalDb;
import com.sys.service.auth.DicService;
import com.sys.singleton.DicSingleton;

@Controller
@RequestMapping(value = "/medirec")
public class VipMediRecController extends BaseAction{
	
	@Autowired
	VipMediRecService vipMediRecService;
	
	@Autowired
	DicService dicService;
	
	@RequestMapping(value = "/show")
    public String show(HttpServletRequest request,String vipCode) {
    	
		LoginEntity loginEntity = getSession();
		String type = loginEntity.getType();
		request.setAttribute("type", type);
		request.setAttribute("vipCode", vipCode);
		request.setAttribute("norms",dicService.getDicList(203));
		return "basedata/vipmedirec";
    	
	}
	
	@RequestMapping(value = "/addVipExam")
	@ResponseBody
    public Data addVipExam(VipExam vipExam) {
		Data data = vipMediRecService.addVipExam(vipExam);
		return data;
	}
	
	@RequestMapping(value = "/delexam")
	@ResponseBody
    public Data delexam(Long id) {
		Data data = vipMediRecService.delVipExam(id);
		return data;
	}
	
	
	@RequestMapping(value = "/addVipExamPic")
	@ResponseBody
    public Data addVipExamPic(VipExamPic vipExampic) {
		Data data = vipMediRecService.addVipExamPic(vipExampic);
		return data;
	}
	
	@RequestMapping(value = "/addExamNormData")
	@ResponseBody
    public Data addExamNormData(VipExamNorm vipExamNorm) {
		Data data = vipMediRecService.addExamNormData(vipExamNorm);
		return data;
	}
	
	@RequestMapping(value = "/delVipExamNorm")
	@ResponseBody
    public Data delVipExamNorm(Long id) {
		Data data = vipMediRecService.delVipExamNorm(id);
		return data;
	}
	
	
	
    @RequestMapping(value = "/delVipExamPic")
	@ResponseBody
    public Data delVipExamPic(Long id) {
		Data data = vipMediRecService.delVipExamPic(id);
		return data;
	}
    
	@RequestMapping(value = "/updateVipExam")
	@ResponseBody
    public Data updateVipExam(VipExam vipExam) {
		Data data = vipMediRecService.updateVipExam(vipExam);
		return data;
	}
	
	@RequestMapping(value = "/getExamList")
	@ResponseBody
    public ScriptPage getExamList(VipExam vipExam,AjaxPage ajaxPage) throws Exception {
		
		ScriptPage sp = vipMediRecService.getExamList(vipExam,ajaxPage);
		
		//ScriptPage sp = JFinalDb.findPage(ajaxPage.getPageNo(), ajaxPage.getPageSize(), vipExam, "");
		 return sp ;
	}

	@RequestMapping(value = "/getimages")
	@ResponseBody
    public List<VipExamPic> getimages(Long examId) throws Exception {
    	
		VipExamPic vipExamPic = new VipExamPic();
		vipExamPic.setExam_id(examId);
		//vipExamPic.setExam_pic_state("1");
		List<VipExamPic> list = JFinalDb.find(vipExamPic);
		if(list == null){
			return Lists.newArrayList();
		}
		return list;
	}
	
	@RequestMapping(value = "/getExamNorms")
	@ResponseBody
    public List<VipExamNorm> getExamNorms(Long examId) throws Exception {
    	
		VipExamNorm vipExamNorm = new VipExamNorm();
		vipExamNorm.setExam_id(examId);
		//vipExamPic.setExam_pic_state("1");
		List<VipExamNorm> list = JFinalDb.find(vipExamNorm);
		if(list == null){
			return Lists.newArrayList();
		}
		return list;
	}
	
}
