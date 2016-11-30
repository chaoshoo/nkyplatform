package com.sys.action;

import java.math.BigInteger;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sys.dao.sys.SysRoleDao;
import com.sys.entity.LoginEntity;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.LoginAttribute;
import com.sys.entity.bo.ScriptPage;
import com.sys.entity.sys.SysRole;
import com.sys.entity.sys.SysUser;
import com.sys.service.IdCoderService;
import com.sys.service.sys.SysUserService;

@Controller
@RequestMapping("/sysUser")
public class SysUserAction {
	@Autowired
	private SysUserService sysUserService;
	
	@Autowired
	private IdCoderService idCoderService;
	
	@Autowired
	private SysRoleDao sysRoleDao;

	@RequestMapping(value = "/getList")
	@ResponseBody
	public ScriptPage getSysUserList(SysUser sysUser, AjaxPage ajaxPage) {
		ScriptPage scriptPage = null;
		try {
			sysUser.copy(ajaxPage);
			scriptPage = sysUserService.getSysUserList(sysUser);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return scriptPage;
	}

	@RequestMapping("/updateSysUserById")
	@ResponseBody
	public Data updateSysUserById(SysUser user, HttpServletRequest req) {
		Data data = new Data();
		Object obj = req.getSession().getAttribute(LoginAttribute.ATTRIBUTE_USER);
		if (null == obj) {
			data.setCode(0);
			return data;
		}
		LoginEntity currentUser = (LoginEntity) obj;
		user.setUpdatedBy(currentUser.getCodeId());
		int flag = sysUserService.updateSysUser(user);
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

	@RequestMapping("/addSysUser")
	@ResponseBody
	public Data addSysUser(SysUser user, HttpServletRequest req) throws Exception {
		Data data = new Data();
		Object obj = req.getSession().getAttribute(LoginAttribute.ATTRIBUTE_USER);
		if (null == obj) {
			data.setCode(0);
			return data;
		}
		LoginEntity currentUser = (LoginEntity) obj;
		user.setCreatedBy(currentUser.getCodeId());
		user.setSys_id(idCoderService.getSys());
		user.setUserPwd("123456");
		int flag = sysUserService.addSysUser(user);
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
	
	@RequestMapping("/initPwd")
	@ResponseBody
	public String initPwd(int id) {
		
		int i = sysUserService.initPwd(id);
		if (i > 0) {
			return "success";
		} else {
			return "fail";
		}
		
	}
	
	@RequestMapping("/delUser")
	@ResponseBody
	public String delUser(BigInteger id){
		if (sysUserService.delUser(id) > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	@RequestMapping(value = "/show")
	public String show(HttpServletRequest req) {
		List<SysRole> roles = sysRoleDao.getAllSysRoleList();
		req.setAttribute("roles", roles);
		return "sys/user_list";
	}
}