package com.sys.dao.sys;

import java.math.BigInteger;

import com.sys.dao.BaseDao;
import com.sys.entity.sys.SysUserSession;

public interface SysUserSessionDao extends BaseDao<SysUserSession> {

	public int addUserSession(SysUserSession sysUserSession);

	public SysUserSession getSysUserSessionBySessionId(BigInteger sessionId);
	
	public int updateSysUserSessionBySessionId(SysUserSession sysUserSession);
	
}