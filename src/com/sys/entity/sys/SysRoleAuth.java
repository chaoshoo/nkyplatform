package com.sys.entity.sys;

import java.math.BigInteger;

import com.sys.entity.Entity;

public class SysRoleAuth extends Entity {

	private BigInteger roleAuth;
	private BigInteger authId;
	private BigInteger roleId;

	public BigInteger getRoleAuth() {
		return roleAuth;
	}

	public void setRoleAuth(BigInteger roleAuth) {
		this.roleAuth = roleAuth;
	}

	public BigInteger getAuthId() {
		return authId;
	}

	public void setAuthId(BigInteger authId) {
		this.authId = authId;
	}

	public BigInteger getRoleId() {
		return roleId;
	}

	public void setRoleId(BigInteger roleId) {
		this.roleId = roleId;
	}

}
