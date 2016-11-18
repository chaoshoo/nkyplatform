package com.nky.action.parameter;

import java.math.BigInteger;

import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;
import com.sys.entity.parameter.SysParameter;
import com.sys.service.IdCoderService;
import com.sys.service.parameter.SysParameterService;

@Controller
@RequestMapping("/sysParameter")
public class SysParameterAction {
	@Autowired
	private SysParameterService sysParameterService;
	
	@Autowired
	private IdCoderService idCoderService;

	@RequestMapping(value = "/getList")
	@ResponseBody
	public ScriptPage getSysParameterList(SysParameter sysParameter,AjaxPage ajaxPage) {
		ScriptPage scriptPage = null;
		try {
			sysParameter.copy(ajaxPage);
			scriptPage = sysParameterService.getSysParameterList(sysParameter);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return scriptPage;
	}

	@RequestMapping("/updateSysParameter")
	@ResponseBody
	public Data updateSysParameter(SysParameter SysParameter, HttpServletRequest req) {
		Data data = new Data();
		int flag = sysParameterService.updateSysParameter(SysParameter);
		if (flag > 0) {
			data.setCode(1);
		} else if (flag == -1) {
			data.setCode(-1);
			data.setMsg("mail_same");
		} else {
			data.setCode(0);
		}
		return data;
	}

	@RequestMapping("/addSysParameter")
	@ResponseBody
	public Data addSysParameter(SysParameter SysParameter, HttpServletRequest req) throws Exception {
		Data data = new Data();
		String code = idCoderService.getSupplyClientCode();
		SysParameter.setCode(code);
		int flag = sysParameterService.addSysParameter(SysParameter);
		//判断code编码唯一
		int count =sysParameterService.getCount(SysParameter);
		if (flag > 0) {
			data.setCode(1);
		} else if (flag == -1) {
			data.setCode(-1);
			data.setMsg("mail_same");
		} else {
			data.setCode(0);
		}
		return data;
	}
	
	@RequestMapping("/delSysParameter")
	@ResponseBody
	public String delSysParameter(BigInteger id){
		if (sysParameterService.delSysParameter(id) > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	@RequestMapping(value = "/show")
	public String show() {
			return "parameter/sysParameter_list";
	}
}
