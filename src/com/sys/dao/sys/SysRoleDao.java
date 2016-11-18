package com.sys.dao.sys;

import java.math.BigInteger;
import java.util.List;

import com.sys.dao.BaseDao;
import com.sys.entity.sys.SysRole;

public interface SysRoleDao extends BaseDao<SysRole> {

	/**
	 * 查找所有的角色
	 * @param condition 当skipNo=-1时，获取符合条件的全部结果集；否则返回请求页结果集
	 * @return
	 */
	public List<SysRole> getSysRoleList(SysRole condition);
	
	/**
	 * 查找所有有效角色的id和name
	 * @param condition 当skipNo=-1时，获取符合条件的全部结果集；否则返回请求页结果集
	 * @return
	 */
	public List<SysRole> getAllSysRoleList();

	/**
	 * 修改系统角色
	 * @param sysRole
	 * @return
	 */
	public int updateSysRole(SysRole sysRole);

	/**
	 * 添加系统角色
	 * @param sysRole
	 * @return
	 */
	public int addSysRole(SysRole sysRole);

	/**
	 * 查询数量
	 * @param sysRole
	 * @return
	 */
	public int getCount(SysRole sysRole);

	/**
	 * 删除
	 * @param roleId
	 * @return
	 */
	public int deleteRole(BigInteger roleId);
}
