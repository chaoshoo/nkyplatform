package com.sys.service.sys;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sys.dao.sys.SysRoleAuthorityDao;
import com.sys.dao.sys.SysRoleDao;
import com.sys.entity.sys.SysRole;
import com.sys.entity.sys.SysRoleAuthority;

@Service
public class SysRoleAuthorityService {
	@Autowired
	private SysRoleAuthorityDao sysRoleAuthorityMapper;
	@Autowired
	private SysRoleDao sysRoleDao;
	
	public List<String> getAuthorityByRoleId(int roleId){
		try{
				return sysRoleAuthorityMapper.getAuthorityByRoleId(roleId);
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
	public List<String> getAuthorityByRoleId(String roleId){
		try{
			if(roleId==null) {
				return new ArrayList<String>();
			}
			String[] roles = roleId.split(",");
			return sysRoleAuthorityMapper.getAuthorityByRoleIds(roles);
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
	
	
	/**
	 * 添加
	 * @return
	 */
	public int addSysAuth(SysRoleAuthority sysRoleAuth) {
		try {
			
			return sysRoleAuthorityMapper.addRoleAuthority(sysRoleAuth);
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}
	
	/**
	 * 修改用户
	 * @param sysRole
	 * @return
	 */
	public int updateSysRole(final SysRole sysRole,  List<String> add, List<String> del) {
		try {
			 int len =0 ;	
			SysRoleAuthority sysRoleAuth = new SysRoleAuthority();
			sysRoleAuth.setRoleId(sysRole.getRoleId());
			
			for (String str : add) {
				sysRoleAuth.setRoleAuthority(str);
				len+=sysRoleAuthorityMapper.addRoleAuthority(sysRoleAuth);
			}
			for (String str : del) {
				sysRoleAuth.setRoleAuthority(str);
				len+=sysRoleAuthorityMapper.deleteRoleAuthority(sysRoleAuth);
			}
			len+=sysRoleDao.updateSysRole(sysRole);
			
			return len;
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}
}
