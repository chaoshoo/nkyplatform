package com.sys.entity.sys;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

import com.sys.entity.Entity;

public class SysAuth extends Entity implements Serializable{

	/**
	 * 权限id
	 */
	private Integer authId;
	
	/**
	 * 权限名字
	 */
	private String authName;
	
	/**
	 * 访问路径
	 */
	private String authAction;
	
	/**
	 * 展示顺序
	 */
	private Integer authSeq;
	
	/**
	 * 父级编号
	 */
	private Integer pid;
	
	/**
	 * 创建时间
	 */
	private Timestamp createdTime;
	
	/**
	 * 修改时间
	 */
	private Timestamp updatedTime;
	
	/**
	 * 有效状态
	 */
	private Integer isEffective;

	/** 权限编码 */
	private String authority;
	
	/** 权限类型 */
	private String authType;

	/**
	 * 子集
	 */
	private List<SysAuth> children;

	public List<SysAuth> getChildren() {
		return children;
	}

	public void setChildren(List<SysAuth> children) {
		this.children = children;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	public String getAuthType() {
		return authType;
	}

	public void setAuthType(String authType) {
		this.authType = authType;
	}

	public String toString() {
		return authId + ":" + authName + ":" + pid;
	}

	public Integer getAuthId() {
		return authId;
	}

	public void setAuthId(Integer authId) {
		this.authId = authId;
	}

	public String getAuthName() {
		return authName;
	}

	public void setAuthName(String authName) {
		this.authName = authName;
	}

	public String getAuthAction() {
		return authAction;
	}

	public void setAuthAction(String authAction) {
		this.authAction = authAction;
	}

	public Integer getAuthSeq() {
		return authSeq;
	}

	public void setAuthSeq(Integer authSeq) {
		this.authSeq = authSeq;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public Timestamp getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Timestamp createdTime) {
		this.createdTime = createdTime;
	}

	public Timestamp getUpdatedTime() {
		return updatedTime;
	}

	public void setUpdatedTime(Timestamp updatedTime) {
		this.updatedTime = updatedTime;
	}

	public Integer getIsEffective() {
		return isEffective;
	}

	public void setIsEffective(Integer isEffective) {
		this.isEffective = isEffective;
	}
}
