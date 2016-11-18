package com.sys.dao.sys;

import java.util.List;

import com.sys.dao.BaseDao;
import com.sys.entity.sys.SysAuth;

public interface SysAuthDao extends BaseDao<SysAuth> {

	/**
	 * 获得页面左侧菜单
	 * @param pid
	 * @return
	 */
	public List<SysAuth> getSysAuthByPid(int roleId);

	/**
	 * 获取权限列表
	 * @param condition 当skipNo=-1时，获取符合条件的全部结果集；否则返回请求页结果集
	 * @return
	 */
	public List<SysAuth> getSysAuthList(SysAuth condition);
	   
	/**
	 * 获取权限列表
	 * @param condition 当skipNo=-1时，获取符合条件的全部结果集；否则返回请求页结果集
	 * @return
	 */
	public List<SysAuth> getSysAuthListTree(SysAuth condition);

	/**
	 * 修改权限
	 * @param sysAuth
	 * @return
	 */
	public int updateSysAuth(SysAuth sysAuth);

	/**
	 * 添加权限
	 * @param sysAuth
	 * @return
	 */
	public int addSysAuth(SysAuth sysAuth);

	/**
	 * 获得数量 
	 * @param sysAuth
	 * @return
	 */
	public int getCount(SysAuth sysAuth);

	public List<SysAuth> getLeftAuth(Integer roleId);
	
	public List<SysAuth> getLeftAuth1(String roleId);

	public List<SysAuth> getParentAuth();
	
	public List<SysAuth> getParentAuthByRole(Integer roleId);
	
	/**
	 * 删除权限
	 * @param id
	 * @return
	 */
	public int delSysAuth(Integer id);
}
