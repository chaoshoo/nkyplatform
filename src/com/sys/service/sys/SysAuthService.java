package com.sys.service.sys;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sys.dao.sys.SysAuthDao;
import com.sys.entity.bo.ScriptPage;
import com.sys.entity.sys.SysAuth;

@Service
public class SysAuthService {

	@Autowired
	private SysAuthDao sysAuthMapper;

	/**
	 * 获取用户权限
	 * @param pid
	 * @return
	 */
	public List<SysAuth> getSysAuthByRoleId(int roleId) {
		try {
			if (roleId != -1) {
				return sysAuthMapper.getSysAuthByPid(roleId);
			} else {
				SysAuth condition = new SysAuth();
				return sysAuthMapper.getSysAuthList(condition);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 获取所有权限
	 * @return
	 */
	public ScriptPage getSysAuthList(SysAuth sysAuth) {
		try {
			List<SysAuth> row = sysAuthMapper.getSysAuthList(sysAuth);
			List<SysAuth> rows = getSysChildList(row);
			int total = sysAuthMapper.getCount(sysAuth);
			ScriptPage scriptPage = new ScriptPage();
			scriptPage.setRows(rows);
			scriptPage.setTotal(total);
			return scriptPage;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * 获取所有权限
	 * @return
	 */
	public ScriptPage getSysAuthListTree(SysAuth sysAuth) {
		try {
			List<SysAuth> row = sysAuthMapper.getSysAuthListTree(sysAuth);
			List<SysAuth> rows = getSysChildList(row);
			int total = sysAuthMapper.getCount(sysAuth);
			ScriptPage scriptPage = new ScriptPage();
			scriptPage.setRows(rows);
			scriptPage.setTotal(total);
			return scriptPage;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * 获取所有权限
	 * @return
	 */
	public List<SysAuth> getSysAuthList() {
		try {
			SysAuth sysAuth = new SysAuth();
			List<SysAuth> row = sysAuthMapper.getSysAuthListTree(sysAuth);
			
			return getSysChildList(row);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public List<SysAuth> getSysChildList(List<SysAuth> rows) {
		for (SysAuth auth: rows) {
			if("menu".equals(auth.getAuthType())) {
				List<SysAuth> child = sysAuthMapper.getSysAuthListTree(auth);
				auth.setChildren(getSysChildList(child));
			}
		}
		return rows;
	}

	/**
	 * 修改系统权限
	 * @param sysAuth
	 * @return
	 */
	public int updateSysAuth(SysAuth sysAuth) {
		try {
			sysAuth.setUpdatedTime(new Timestamp(System.currentTimeMillis()));
			return sysAuthMapper.updateSysAuth(sysAuth);
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	/**
	 * 添加系统权限
	 * @param sysAuth
	 * @return
	 */
	public int addSysAuth(SysAuth sysAuth) {
		try {
			sysAuth.setCreatedTime(new Timestamp(System.currentTimeMillis()));
			sysAuth.setUpdatedTime(new Timestamp(System.currentTimeMillis()));
			return sysAuthMapper.addSysAuth(sysAuth);
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	/**
	 * 逻辑删除系统权限
	 * @param authId
	 * @return
	 */
	public int deleteSysAuth(int authId) {
		try {
			
			return sysAuthMapper.delSysAuth(authId);
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}
		
	/**
	 * 查询数量
	 * @param sysAuth
	 * @return
	 */
	public int getCount(SysAuth sysAuth) {
		try {
			return sysAuthMapper.getCount(sysAuth);
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	public List<SysAuth> getLeftAuth(Integer roleId) {
		return sysAuthMapper.getLeftAuth(roleId);
	}
	
	public List<SysAuth> getLeftAuth(String roleId) {
		List<SysAuth> authList = new ArrayList<SysAuth>();
		List<SysAuth> list = sysAuthMapper.getLeftAuth1(roleId);
		for (SysAuth sysAuth: list) {
			if(sysAuth.getPid()==0) {
				List<SysAuth> children = new ArrayList<SysAuth>();
				for (SysAuth sysAuth1: list) {
					if(sysAuth.getAuthId().intValue() == sysAuth1.getPid().intValue()) {
						children.add(sysAuth1);
					}
				}
				sysAuth.setChildren(children);
				authList.add(sysAuth);
			}
		}
		return authList;
	}

	public List<SysAuth> getParentAuth() {
		return sysAuthMapper.getParentAuth();
	}
	
	public List<SysAuth> getParentAuthByRole(Integer roleId){
		return sysAuthMapper.getParentAuthByRole(roleId);
	}
}
