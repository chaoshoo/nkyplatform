package com.sys.dao.sys;

import java.util.List;

import com.sys.dao.BaseDao;
import com.sys.entity.sys.SysAuth;

public interface SysAuthDao extends BaseDao<SysAuth> {

	/**
	 * Get the left menu on the page
	 * @param pid
	 * @return
	 */
	public List<SysAuth> getSysAuthByPid(int roleId);

	/**
	 * Access list
	 * @param condition WhenskipNo=-1time，Obtain all results set for the condition.；Otherwise, the result set of the requested page is returned
	 * @return
	 */
	public List<SysAuth> getSysAuthList(SysAuth condition);
	   
	/**
	 * Access list
	 * @param condition WhenskipNo=-1time，Obtain all results set for the condition.；Otherwise, the result set of the requested page is returned
	 * @return
	 */
	public List<SysAuth> getSysAuthListTree(SysAuth condition);

	/**
	 * Modify permissions
	 * @param sysAuth
	 * @return
	 */
	public int updateSysAuth(SysAuth sysAuth);

	/**
	 * add permission
	 * @param sysAuth
	 * @return
	 */
	public int addSysAuth(SysAuth sysAuth);

	/**
	 * Get quantity 
	 * @param sysAuth
	 * @return
	 */
	public int getCount(SysAuth sysAuth);

	public List<SysAuth> getLeftAuth(Integer roleId);
	
	public List<SysAuth> getLeftAuth1(String roleId);

	public List<SysAuth> getParentAuth();
	
	public List<SysAuth> getParentAuthByRole(Integer roleId);
	
	/**
	 * Delete authority
	 * @param id
	 * @return
	 */
	public int delSysAuth(Integer id);
}