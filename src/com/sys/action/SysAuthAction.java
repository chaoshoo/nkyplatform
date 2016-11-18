package com.sys.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sys.entity.LoginEntity;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.LoginAttribute;
import com.sys.entity.bo.ScriptPage;
import com.sys.entity.sys.SysAuth;
import com.sys.entity.sys.SysUser;
import com.sys.service.sys.SysAuthService;
import com.sys.singleton.AuthoritySingleton;

@Controller
@RequestMapping("/sysAuth")
public class SysAuthAction {

	static Logger LOG = LoggerFactory.getLogger(SysAuthAction.class);

	@Autowired
	private SysAuthService sysAuthService;
	
	
	/**
	 * 修改权限
	 * @param roleId
	 * @return
	 */
	@RequestMapping(value = "/getAuthByRoleId", produces = { "application/json;charset=UTF-8" })
	@ResponseBody
	public ScriptPage getAuthByRoleId(int roleId) {
		ScriptPage scriptPage = new ScriptPage();
		List<SysAuth> sysAuthList = sysAuthService.getSysAuthByRoleId(roleId);
		scriptPage.setRows(sysAuthList);
		scriptPage.setTotal(sysAuthList.size());
		return scriptPage;
	}

	@RequestMapping(value = "/getAllAuthToTree", produces = { "application/json;charset=UTF-8" })
	@ResponseBody
	public ScriptPage getAllAuthToTree() {
		ScriptPage scriptPage = new ScriptPage();
		List<SysAuth> sysAuthList = sysAuthService.getSysAuthByRoleId(-1);
		scriptPage.setRows(sysAuthList);
		return scriptPage;
	}

	@RequestMapping(value = "/getParentAuth", produces = { "application/json;charset=UTF-8" })
	@ResponseBody
	public ScriptPage getParentAuth() {
		ScriptPage scriptPage = new ScriptPage();
		List<SysAuth> sysAuthList = sysAuthService.getParentAuth();
		scriptPage.setRows(sysAuthList);
		return scriptPage;
	}

	@RequestMapping(value = "/getSysAuthList", produces = { "application/json;charset=UTF-8" })
	@ResponseBody
	public ScriptPage getSysAuthList(SysAuth sysAuth, AjaxPage ajaxPage) {
		sysAuth.copy(ajaxPage);
		return sysAuthService.getSysAuthListTree(sysAuth);
	}

	@RequestMapping("/updateSysAuth")
	@ResponseBody
	public Data updateSysAuth(SysAuth sysAuth) {
		Data data = new Data();
		int i = sysAuthService.updateSysAuth(sysAuth);
		if (i > 0) {
			data.setCode(1);
			AuthoritySingleton.getInstance().reload();
		} else {
			data.setCode(0);
		}
		return data;
	}
	
	@RequestMapping("/delSysAuth")
	@ResponseBody
	public String delSysAuth(int id) {
		
		int i = sysAuthService.deleteSysAuth(id);
		if (i > 0) {
			AuthoritySingleton.getInstance().reload();
			return "success";
		} else {
			return "fail";
		}
		
	}

	@RequestMapping("/addSysAuth")
	@ResponseBody
	public Data addSysAuth(SysAuth sysAuth) {
		Data data = new Data();
		if (sysAuthService.addSysAuth(sysAuth) > 0) {
			data.setCode(1);
			AuthoritySingleton.getInstance().reload();
		} else {
			data.setCode(0);
		}
		return data;
	}

	@RequestMapping(value = "/getLeftAuth")
	@ResponseBody
	public ScriptPage getLeftAuth(HttpServletRequest req) {
		ScriptPage scriptPage = new ScriptPage();
		try {
			Object obj = req.getSession().getAttribute(LoginAttribute.ATTRIBUTE_USER);
			if (null != obj) {
				LoginEntity user = (LoginEntity) obj;
				scriptPage.setRows(sysAuthService.getLeftAuth(user.getRoles()));
			} 
			return scriptPage;
		} catch (Exception e) {
			e.printStackTrace();
			return scriptPage;
		}
	}

	@RequestMapping(value = "/show")
	public String show() {
		return "sys/auth_list";
	}

}
