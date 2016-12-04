package com.sys.dao.sys;

import java.math.BigInteger;
import java.util.List;

import com.sys.dao.BaseDao;
import com.sys.entity.sys.SysRole;

public interface SysRoleDao extends BaseDao<SysRole> {

	/**
	 * Find all the characters
	 * @param condition WhenskipNo=-1time，Obtain all results set for the condition.；Otherwise, the result set of the requested page is returned
	 * @return
	 */
	public List<SysRole> getSysRoleList(SysRole condition);
	
	/**
	 * Finding all valid charactersidandname
	 * @param condition WhenskipNo=-1time，Obtain all results set for the condition.；Otherwise, the result set of the requested page is returned
	 * @return
	 */
	public List<SysRole> getAllSysRoleList();

	/**
	 * Modify system role
	 * @param sysRole
	 * @return
	 */
	public int updateSysRole(SysRole sysRole);

	/**
	 * Add system role
	 * @param sysRole
	 * @return
	 */
	public int addSysRole(SysRole sysRole);

	/**
	 * Query number
	 * @param sysRole
	 * @return
	 */
	public int getCount(SysRole sysRole);

	/**
	 * delete
	 * @param roleId
	 * @return
	 */
	public int deleteRole(BigInteger roleId);
}