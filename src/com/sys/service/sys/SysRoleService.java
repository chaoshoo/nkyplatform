package com.sys.service.sys;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sys.dao.sys.SysRoleAuthDao;
import com.sys.dao.sys.SysRoleAuthorityDao;
import com.sys.dao.sys.SysRoleDao;
import com.sys.entity.sys.SysRole;
import com.sys.entity.sys.SysRoleAuth;
import com.sys.entity.sys.SysRoleAuthority;

@Service
public class SysRoleService {

	@Autowired
	private SysRoleDao sysRoleDao;
	@Autowired
	private SysRoleAuthDao sysRoleAuthDao;
	
	@Autowired
	private SysRoleAuthorityDao sysRoleAuthorityMapper;

	/**
	 * query
	 * @param sysRole
	 * @return
	 */
	public List<SysRole> getSysRoleList(SysRole sysRole) {
		try {
			return sysRoleDao.getSysRoleList(sysRole);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * Modify user
	 * @param sysRole
	 * @return
	 */
	public int updateSysRole(SysRole sysRole, final List<SysRoleAuth> list) {
		try {
			sysRole.setUpdatedTime(new Date());
			if (sysRoleAuthDao.deleteRoleAuth(sysRole.getRoleId()) >= 0) {
				/** Open a new thread Add a link to a message-->>Roles and permissions**/
				Thread thread = new Thread(new Runnable() {
					public void run() {
						for (SysRoleAuth roleAuth : list) {
							sysRoleAuthDao.addRoleAuth(roleAuth);
						}
					}
				});
				thread.start();
			}
			return sysRoleDao.updateSysRole(sysRole);
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	/**
	 * Add system role
	 * @param sysRole
	 * @return
	 */
	public int addSysRole(SysRole sysRole, final String sysRoleAuth) {
		try {
			sysRole.setCreatedTime(new Date());
			sysRole.setUpdatedTime(new Date());
			if (sysRoleDao.addSysRole(sysRole) > 0) {
				/*** Get the permission to add start ***/
				String authorityArray[] = sysRoleAuth.split(",");
				final List<SysRoleAuthority> roleAuthlist = new ArrayList<SysRoleAuthority>();
				for (int authIdIndex = 0; authIdIndex < authorityArray.length; authIdIndex++) {
					SysRoleAuthority ra = new SysRoleAuthority();
					ra.setRoleId(sysRole.getRoleId());
					ra.setRoleAuthority(authorityArray[authIdIndex]);
					roleAuthlist.add(ra);
				}
				for (SysRoleAuthority roleAuth : roleAuthlist) {
					sysRoleAuthorityMapper.addRoleAuthority(roleAuth);
				}
				/*** Get the permission to add end ***/
			} else {
				System.out.println("权限设置失败!!!");
			}
			return Integer.parseInt(sysRole.getRoleId().toString());
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	/**
	 * Query number
	 * @param sysRole
	 * @return
	 */
	public int getCount(SysRole sysRole) {
		try {
			return sysRoleDao.getCount(sysRole);
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	/**
	 * delete 
	 * @param roleId
	 * @return
	 */
	public int deleteRole(BigInteger roleId) {
		try {
			sysRoleAuthDao.deleteRoleAuth(roleId);
			return sysRoleDao.deleteRole(roleId);
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}
}