package com.sys.dao.sys;

import java.util.List;

import com.sys.dao.BaseDao;
import com.sys.entity.sys.SysRoleAuthority;

public interface SysRoleAuthorityDao extends BaseDao<SysRoleAuthority>{
	/**
	 *	Based roleidAccess to role correspondence
	 * @param roleId
	 * @return
	 */
	public List<String> getAuthorityByRoleId(int roleId);
	
	/**
	 *	Based roleidAccess to role correspondence
	 * @param roleId
	 * @return
	 */
	public List<String> getAuthorityByRoleIds(String[] roleId);
	
	/**
	 * Add
	 * @param sysRoleAuth
	 * @return
	 */
	public int addRoleAuthority(SysRoleAuthority sysRoleAuth);

	/**
	 * delete
	 * @param authorityId
	 * @return
	 */
	public int deleteRoleAuthority(SysRoleAuthority sysRoleAuth); 
}