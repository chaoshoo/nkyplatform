package com.sys.dao.sys;

import java.math.BigInteger;

import com.sys.dao.BaseDao;
import com.sys.entity.sys.SysRoleAuth;

public interface SysRoleAuthDao extends BaseDao<SysRoleAuth> {

	/**
	 * Add
	 * @param sysRoleAuth
	 * @return
	 */
	public int addRoleAuth(SysRoleAuth sysRoleAuth);

	/**
	 * delete
	 * @param roleId
	 * @return
	 */
	public int deleteRoleAuth(BigInteger roleId);
}