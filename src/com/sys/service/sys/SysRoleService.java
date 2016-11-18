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
	 * 查询
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
	 * 修改用户
	 * @param sysRole
	 * @return
	 */
	public int updateSysRole(SysRole sysRole, final List<SysRoleAuth> list) {
		try {
			sysRole.setUpdatedTime(new Date());
			if (sysRoleAuthDao.deleteRoleAuth(sysRole.getRoleId()) >= 0) {
				/** 新开一个线程 添加关联一股信息-->>角色与权限**/
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
	 * 添加系统角色
	 * @param sysRole
	 * @return
	 */
	public int addSysRole(SysRole sysRole, final String sysRoleAuth) {
		try {
			sysRole.setCreatedTime(new Date());
			sysRole.setUpdatedTime(new Date());
			if (sysRoleDao.addSysRole(sysRole) > 0) {
				/*** 获得要添加的权限 start ***/
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
				/*** 获得要添加的权限 end ***/
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
	 * 查询数量
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
	 * 删除 
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
