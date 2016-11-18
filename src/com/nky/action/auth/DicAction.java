package com.nky.action.auth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.sys.entity.auth.Dic;
import com.sys.entity.bo.Data;
import com.sys.service.auth.DicService;
import com.sys.singleton.DicSingleton;
@Controller
@RequestMapping("/dic")
public class DicAction {
	@Autowired
	private DicService dicService;
	
	@RequestMapping("/show")
	public ModelAndView show() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("auth/dicList");
		return mv;
	}
	@RequestMapping("/getDic")
	@ResponseBody
	public String getDic(String dicType){
		return JSON.toJSONString(DicSingleton.getInstance().getDic(dicType));
	}
	@RequestMapping(value = "/addDic")
	@ResponseBody
	public Data addDic(Dic sysAuth) {
		Data data = new Data();
		if (dicService.addDic(sysAuth) > 0) {
			data.setCode(1);
			DicSingleton.getInstance().reload();
		} else {
			data.setCode(0);
		}
		return data;
	}
}