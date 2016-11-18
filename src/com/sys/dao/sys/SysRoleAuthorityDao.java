package com.sys.dao.sys;

import java.util.List;

import com.sys.dao.BaseDao;
import com.sys.entity.sys.SysRoleAuthority;

public interface SysRoleAuthorityDao extends BaseDao<SysRoleAuthority>{
	/**
	 *	根据角色id获取角色对应权限
	 * @param roleId
	 * @return
	 */
	public List<String> getAuthorityByRoleId(int roleId);
	
	/**
	 *	根据角色id获取角色对应权限
	 * @param roleId
	 * @return
	 */
	public List<String> getAuthorityByRoleIds(String[] roleId);
	
	/**
	 * 添加
	 * @param sysRoleAuth
	 * @return
	 */
	public int addRoleAuthority(SysRoleAuthority sysRoleAuth);

	/**
	 * 删除
	 * @param authorityId
	 * @return
	 */
	public int deleteRoleAuthority(SysRoleAuthority sysRoleAuth); 
}
