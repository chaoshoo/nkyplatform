package com.sys.action;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.beust.jcommander.internal.Maps;
import com.sys.dao.sys.SysUserDao;
import com.sys.entity.LoginEntity;
import com.sys.entity.bo.LoginAttribute;
import com.sys.jfinal.JFinalDb;
import com.sys.util.FileUtil;
import com.sys.util.MD5Util;

@Controller
@RequestMapping("/changepwd")
public class ChangePwdAction {
	@Autowired
	private SysUserDao sysUserDao;

	@RequestMapping(value = "/changePwd")
	public String changePwd(HttpServletRequest req) {
		return "sys/changePwd";
	}

	@RequestMapping(value = "/doChangePwd")
	@ResponseBody
	public  String doChangePwd(HttpServletRequest req) {
		Map<String,String> map = Maps.newHashMap();
		LoginEntity user = (LoginEntity) req.getSession().getAttribute(LoginAttribute.ATTRIBUTE_USER);
		String old = req.getParameter("old");
		String new1 = req.getParameter("new1");
		String sysType = user.getCodeId().substring(0, 1);
		if ("S".equals(sysType)) {
			String pwd = user.getSysUser().getUserPwd();
			String oldMd5 = FileUtil.getMD5String(old);
			if (pwd.equals(oldMd5)) {
				user.getSysUser().setUserPwd(new1);
			} else {
				map.put("code", "1");
				map.put("msg",  "原密码错误");
				return JSON.toJSONString(map);
			}
			sysUserDao.updateSysUser(user.getSysUser());
			map.put("code", "0");
			map.put("msg",  "密码修改成功！");
			return JSON.toJSONString(map);
		} else if("H".equals(sysType)) {
			String pwd = user.getHospital().getPwd().toLowerCase();
			String oldMd5 = MD5Util.MD5(old, "utf-8").toLowerCase();
			if (!pwd.equals(oldMd5)) {
				map.put("code", "1");
				map.put("msg",  "原密码错误");
				return JSON.toJSONString(map);
			}
			try {
				user.getHospital().setPwd(MD5Util.MD5(new1, "utf-8").toLowerCase());
				JFinalDb.update(user.getHospital());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				user.getHospital().setPwd(pwd);
				e.printStackTrace();
				map.put("code", "1");
				map.put("msg",  "密码修改失败！");
				return JSON.toJSONString(map);
			}
			map.put("code", "0");
			map.put("msg",  "密码修改成功！");
			return JSON.toJSONString(map);
		}else if("D".equals(sysType)) {
			String pwd = user.getDoctor().getPassword().toLowerCase();
			String oldMd5 = MD5Util.MD5(old, "utf-8").toLowerCase();
			if (!pwd.equals(oldMd5)) {
				map.put("code", "1");
				map.put("msg",  "原密码错误");
				return JSON.toJSONString(map);
			}
			try {
				user.getDoctor().setPassword(MD5Util.MD5(new1, "utf-8").toLowerCase());
				JFinalDb.update(user.getDoctor());				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				user.getDoctor().setPassword(pwd);
				e.printStackTrace();
				map.put("code", "1");
				map.put("msg",  "密码修改失败！");
				return JSON.toJSONString(map);
			}
			map.put("code", "0");
			map.put("msg",  "密码修改成功！");
			return JSON.toJSONString(map);
		}
		map.put("code", "1");
		map.put("msg",  "密码修改失败！");
		return JSON.toJSONString(map);
	}
}
