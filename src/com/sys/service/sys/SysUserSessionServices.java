package com.sys.service.sys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sys.dao.sys.SysUserSessionDao;
import com.sys.entity.sys.SysUserSession;

@Service
public class SysUserSessionServices {
	
	@Autowired
	private SysUserSessionDao sysUserSessionDao;
	
	public int addUserSession(SysUserSession sysUserSession) {
		try {
			if(null==sysUserSessionDao.getSysUserSessionBySessionId(sysUserSession.getUserId())){
				return sysUserSessionDao.addUserSession(sysUserSession);
			}else{
				return sysUserSessionDao.updateSysUserSessionBySessionId(sysUserSession);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}
}