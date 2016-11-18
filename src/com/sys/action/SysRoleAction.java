package com.sys.action;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;
import com.sys.entity.sys.SysAuth;
import com.sys.entity.sys.SysRole;
import com.sys.service.sys.SysAuthService;
import com.sys.service.sys.SysRoleAuthorityService;
import com.sys.service.sys.SysRoleService;

@Controller
@RequestMapping("/sysRole")
public class SysRoleAction {
	@Autowired
	private SysRoleService sysRoleService;
	
	@Autowired
	private SysRoleAuthorityService sysRoleAuthorityService;
	
	@Autowired
	private SysAuthService sysAuthService;
	
	@RequestMapping(value = "/show")
	public ModelAndView show() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("sys/role_list");
		return mv;
	}

	@RequestMapping(value = "/getSysRoleList", produces = { "application/json;charset=UTF-8" })
	@ResponseBody
	public ScriptPage getSysRoleList(SysRole sysRole, AjaxPage ajaxPage) {
		sysRole.copy(ajaxPage);
		List<SysRole> rows = sysRoleService.getSysRoleList(sysRole);
		int total = sysRoleService.getCount(sysRole);
		ScriptPage scriptPage = new ScriptPage();
		scriptPage.setRows(rows);
		scriptPage.setTotal(total);
		return scriptPage;
	}

	@RequestMapping("/updateSysRole")
	@ResponseBody
	public Data updateSysRole(SysRole sysRole, String sysRoleAuth) {
		Data data = new Data();
		/*** 获得要添加的权限 start ***/
		String authorityArray[] = sysRoleAuth.split(",");
		//list1 添加  ，list2删除
		List<String> list1 = new ArrayList<String>();
		for(String str:authorityArray){
			if(!"".equals(str))
				list1.add(str);
		}
		
		List<String> temp = new ArrayList<String>(list1);
		
		List<String> list2 = sysRoleAuthorityService.getAuthorityByRoleId(sysRole.getRoleId().intValue());

		temp.retainAll(list2);
		
		list1.removeAll(temp);
		list2.removeAll(temp);
		
		/*** 获得要添加的权限 end ***/
		if (sysRoleAuthorityService.updateSysRole(sysRole, list1,list2) > 0) {
			data.setCode(1);
		} else {
			data.setCode(0);
		}
		return data;
	}

	@RequestMapping("/addSysRole")
	@ResponseBody
	public Data addSysRole(SysRole sysRole, String sysRoleAuth) {
		Data data = new Data();
		if (sysRoleService.addSysRole(sysRole, sysRoleAuth) > 0) {
			data.setCode(1);
		} else {
			data.setCode(0);
		}
		return data;
	}

	@RequestMapping("/deleteRole")
	@ResponseBody
	public String deleteRole(BigInteger roleId) {
		if (sysRoleService.deleteRole(roleId) > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	/**
	 * 修改权限
	 * @param roleId
	 * @return
	 */
	@RequestMapping(value = "/getAuthByRoleId", produces = { "application/json;charset=UTF-8" })
	@ResponseBody
	public ScriptPage getAuthByRoleId(int roleId) {
		ScriptPage scriptPage = new ScriptPage();
		if(roleId==12||roleId==21) {
			roleId = -1;
		}
		List<SysAuth> sysAuthList = sysAuthService.getSysAuthByRoleId(roleId);
		scriptPage.setRows(sysAuthList);
		scriptPage.setTotal(sysAuthList.size());
		return scriptPage;
	}
}
