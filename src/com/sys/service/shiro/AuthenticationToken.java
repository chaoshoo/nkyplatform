/*
 * Copyright 2005-2013 lezu.net. All rights reserved.
 * Support: http://www.lezu.net
 * License: http://www.lezu.net/license
 */
package com.sys.service.shiro;

import org.apache.shiro.authc.UsernamePasswordToken;

/**
 * Login token
 * 
 * @author lezu Team
 * @version 3.0
 */
public class AuthenticationToken extends UsernamePasswordToken {

	private static final long serialVersionUID = 5898441540965086534L;

	/** Verification Code */
	private String kaptcha;
	
	
	private String type;

	/**
	 * @param username
	 *            User name
	 * @param password
	 *            Password
	 * @param captchaId
	 *            Verification CodeID
	 * @param kaptcha
	 *            Verification Code
	 * @param rememberMe
	 *            Remember me
	 * @param host
	 *            IP
	 */
	public AuthenticationToken(String username, String password, String kaptcha, boolean rememberMe, String host,String type) {
		super(username, password, rememberMe, host);
		this.kaptcha = kaptcha;
		this.type = type;
	}


	public String getKaptcha() {
		return kaptcha;
	}

	public void setKaptcha(String kaptcha) {
		this.kaptcha = kaptcha;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}
	
	
	

}