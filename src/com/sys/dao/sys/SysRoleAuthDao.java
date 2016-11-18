package com.sys.dao.sys;

import java.math.BigInteger;

import com.sys.dao.BaseDao;
import com.sys.entity.sys.SysRoleAuth;

public interface SysRoleAuthDao extends BaseDao<SysRoleAuth> {

	/**
	 * 添加
	 * @param sysRoleAuth
	 * @return
	 */
	public int addRoleAuth(SysRoleAuth sysRoleAuth);

	/**
	 * 删除
	 * @param roleId
	 * @return
	 */
	public int deleteRoleAuth(BigInteger roleId);
}
