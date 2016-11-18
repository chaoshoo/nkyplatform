package com.sys.service.sys;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sys.dao.sys.SysUserDao;
import com.sys.entity.bo.ScriptPage;
import com.sys.entity.sys.SysUser;

@Service
public class SysUserService {

	@Autowired
	private SysUserDao sysUserDao;

	/**
	 * 获取用户信息
	 * @param userId
	 * @return
	 */
	public SysUser getSysUserById(int userId) {
		return sysUserDao.getSysUserById(userId);
	}

	/**
	 * 登录
	 * @param sysUser
	 * @return
	 */
	public SysUser getLoginInfo(SysUser sysUser) {
		try {
			sysUser.setUserMail(sysUser.getUserMail().trim());
			sysUser = sysUserDao.getLoginInfo(sysUser);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (sysUser == null) {
			sysUser = new SysUser();
			sysUser.setUserId(-1);
		}
		return sysUser;
	}

	/**
	 * 获取系统用户列表
	 * @param isEffective
	 * @return
	 */
	public ScriptPage getSysUserList(SysUser sysUser) {
		List<SysUser> rows = sysUserDao.getUserList(sysUser);
		int total = sysUserDao.getCount(sysUser);
		ScriptPage scriptPage = new ScriptPage();
		scriptPage.setRows(rows);
		scriptPage.setTotal(total);
		return scriptPage;
	}

	/**
	 * 修改用户
	 * @param user
	 * @return
	 */
	public int updateSysUser(SysUser user) {
		if (user.getUserMail() == null) {
			return sysUserDao.updateSysUser(user);
		} else {
			SysUser u = new SysUser();
			u.setUserMail(user.getUserMail());
			if (sysUserDao.getCountByUserMail(u) == 0) {
				user.setUpdatedTime(new Date());
				return sysUserDao.updateSysUser(user);
			} else {
				return -1;
			}
		}
	}

	/**
	 * 添加用户
	 * @param user
	 * @return
	 */
	public int addSysUser(SysUser user) {
		SysUser u = new SysUser();
		u.setUserMail(user.getUserMail());
		if (sysUserDao.getCountByUserMail(u) == 0) {
			user.setCreatedTime(new Date());
			user.setUpdatedTime(new Date());
			return sysUserDao.addSysUser(user);
		} else {
			return -1;
		}
	}

	public int getCount(SysUser user) {
		return sysUserDao.getCount(user);
	}

	public int delUser(BigInteger id) {
		try {
			return sysUserDao.delUser(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	public int initPwd(int id) {
		SysUser user = new SysUser();
		user.setUserId(id);
		user.setUserPwd("123456");
		return sysUserDao.updateSysUser(user);
	}
}
