package com.nky.action.auth;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sys.entity.auth.Dic;
import com.sys.entity.auth.DicDefine;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;
import com.sys.service.auth.DicDefineService;
import com.sys.service.auth.DicService;
import com.sys.singleton.DicSingleton;

@Controller
@RequestMapping("/dicDefine")
public class DicDefineAction {
	@Autowired
	DicDefineService dicDefineService;
	@Autowired
	DicService dicService;
	@RequestMapping("/show")
	public ModelAndView show() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("auth/dicDefine_list");
		return mv;
	}
	
	@RequestMapping("/dicList")
	public String aa(@RequestParam("id") Integer id,ModelMap map ) {
		List<Dic> list=dicService.getDicList(id);
		map.addAttribute("list", list);
		return "auth/dicList";
	}
	
	@RequestMapping(value = "/getDicDefineList", produces = { "application/json;charset=UTF-8" })
	@ResponseBody
	public ScriptPage getDicDefineList(DicDefine dicDefine, AjaxPage ajaxPage) {
		dicDefine.copy(ajaxPage);
		return dicDefineService.getDicDefineList(dicDefine);
	}
	

	@RequestMapping(value = "/delDicDefine")
	@ResponseBody
	public String delDicDefine(Integer id) {
		if (dicDefineService.delDicDefine(id) > 0) {
			DicSingleton.getInstance().reload();
			return "success";
		}
		return "fail";
	}
	
	@RequestMapping(value = "/delDic")
	@ResponseBody
	public String delDic(Integer id) {
		if (dicService.delDic(id) > 0) {
			DicSingleton.getInstance().reload();
			return "success";
		}
		return "fail";
	}
	
	@RequestMapping("/addDicDefine")
	@ResponseBody
	public Data addDicDefine(DicDefine sysAuth) {
		Data data = new Data();
		if (dicDefineService.addDicDefine(sysAuth) > 0) {
			data.setCode(1);
			DicSingleton.getInstance().reload();
		} else {
			data.setCode(0);
		}
		return data;
	}
	@RequestMapping("/updateDicDefine")
	@ResponseBody
	public String updateDicDefine(DicDefine sysAuth) {
		if (dicDefineService.updateDicDefine(sysAuth) > 0) {
			DicSingleton.getInstance().reload();
			return "1";
		} else {
			return "0";
		}
	}
}