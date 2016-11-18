package com.sys.entity.sys;

import java.math.BigInteger;
import java.util.Date;

import com.sys.entity.Entity;

public class SysUserSession extends Entity {

	private String sessionId;
	private BigInteger userId;
	private String lastLoginIp;
	private Date lastLoginTime;

	SysUserSession() {

	}

	public SysUserSession(String sessionId, BigInteger userId, String lastLoginIp, Date lastLoginTime) {
		this.sessionId = sessionId;
		this.userId = userId;
		this.lastLoginIp = lastLoginIp;
		this.lastLoginTime = lastLoginTime;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public BigInteger getUserId() {
		return userId;
	}

	public void setUserId(BigInteger userId) {
		this.userId = userId;
	}

	public String getLastLoginIp() {
		return lastLoginIp;
	}

	public void setLastLoginIp(String lastLoginIp) {
		this.lastLoginIp = lastLoginIp;
	}

	public Date getLastLoginTime() {
		return lastLoginTime;
	}

	public void setLastLoginTime(Date lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

}
