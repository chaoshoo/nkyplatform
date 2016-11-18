/*
 */
package com.sys.service.shiro;

import java.io.Serializable;

/**
 * 身份信息
 * 
 * @author lezu Team
 * @version 3.0
 */
public class Principal implements Serializable {

	/** ID */
	private int id;
	
	/** 统一编码*/
	private String logn_id;

	/** 用户名 */
	private String username;
	
	private String roleId;

	/**
	 * @param id
	 *            ID
	 * @param username
	 *            用户名
	 */
	public Principal(int id, String login_id, String username,String roleId) {
		this.id = id;
		this.logn_id = login_id;
		this.username = username;
		this.roleId = roleId;
	}
	
	public Principal(int id, String username) {
		this.id = id;
		this.username = username;
	}

	/**
	 * 获取ID
	 * 
	 * @return ID
	 */
	public int getId() {
		return id;
	}

	/**
	 * 设置ID
	 * 
	 * @param id
	 *            ID
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * 获取统一编码
	 * @return
	 */
	public String getLogn_id() {
		return logn_id;
	}

	/**
	 * 设置统一编码
	 * @param logn_id
	 */
	public void setLogn_id(String logn_id) {
		this.logn_id = logn_id;
	}

	/**
	 * 获取用户名
	 * 
	 * @return 用户名
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * 设置用户名
	 * 
	 * @param username
	 *            用户名
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	@Override
	public String toString() {
		return username;
	}

}