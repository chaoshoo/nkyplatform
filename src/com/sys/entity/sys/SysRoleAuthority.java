package com.sys.entity.sys;

import java.math.BigInteger;

import com.sys.entity.Entity;

public class SysRoleAuthority extends Entity{
	private BigInteger roleAuthorityId;
	private BigInteger roleId;
	private String roleAuthority;
	public BigInteger getRoleAuthorityId() {
		return roleAuthorityId;
	}
	public void setRoleAuthorityId(BigInteger roleAuthorityId) {
		this.roleAuthorityId = roleAuthorityId;
	}
	public BigInteger getRoleId() {
		return roleId;
	}
	public void setRoleId(BigInteger roleId) {
		this.roleId = roleId;
	}
	public String getRoleAuthority() {
		return roleAuthority;
	}
	public void setRoleAuthority(String roleAuthority) {
		this.roleAuthority = roleAuthority;
	}
	
}
