/*
 */
package com.sys.service.shiro;

import java.io.Serializable;

/**
 * Identity information
 * 
 * @author lezu Team
 * @version 3.0
 */
public class Principal implements Serializable {

	/** ID */
	private int id;
	
	/** Uniform coding*/
	private String logn_id;

	/** User name */
	private String username;
	
	private String roleId;

	/**
	 * @param id
	 *            ID
	 * @param username
	 *            User name
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
	 * ObtainID
	 * 
	 * @return ID
	 */
	public int getId() {
		return id;
	}

	/**
	 * ConfigID
	 * 
	 * @param id
	 *            ID
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * Get uniform coding
	 * @return
	 */
	public String getLogn_id() {
		return logn_id;
	}

	/**
	 * Set uniform coding
	 * @param logn_id
	 */
	public void setLogn_id(String logn_id) {
		this.logn_id = logn_id;
	}

	/**
	 * Get user name
	 * 
	 * @return User name
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * Username
	 * 
	 * @param username
	 *            User name
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