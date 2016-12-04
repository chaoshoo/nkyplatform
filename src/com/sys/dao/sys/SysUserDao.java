package com.sys.dao.sys;

import java.math.BigInteger;
import java.util.List;

import com.sys.dao.BaseDao;
import com.sys.entity.sys.SysUser;

public interface SysUserDao extends BaseDao<SysUser> {

	/**
	 * Query user information list
	 * @param condition WhenskipNo=-1time，Obtain all results set for the condition.；Otherwise, the result set of the requested page is returned
	 * @return
	 */
	public List<SysUser> getUserList(SysUser condition);

	/**
	 * adoptIdGet system user information
	 * @param sysUser
	 * @return
	 */
	public SysUser getSysUserById(int userId);
	
	/**
	 * adoptsys_idGet system user information
	 * @param sysUser
	 * @return
	 */
	public SysUser getSysUserBySysId(String sys_id);

	/**
	 * Sign in
	 * @param sysUser
	 * @return
	 */
	public SysUser getLoginInfo(SysUser sysUser);

	/**
	 * Save system user information
	 * @param sysUser
	 * @return
	 */
	public int addSysUser(SysUser sysUser);

	/**
	 * Update user information
	 * @param sysUser
	 * @return
	 */
	public int updateSysUser(SysUser sysUser);

	/**
	 * Query number
	 * @param sysUser
	 * @return
	 */
	public int getCount(SysUser sysUser);
	
	/**
	 * According to the number of account names
	 * @param sysUser
	 * @return
	 */
	public int getCountByUserMail(SysUser sysUser);
	
	/**
	 * Delete account
	 * @param userMail
	 * @return
	 */
	public int delUser(BigInteger id);

}