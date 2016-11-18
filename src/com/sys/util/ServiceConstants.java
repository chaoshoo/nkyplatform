package com.sys.util;

import java.util.ResourceBundle;

/**
 * 服务常量
 * 
 * 
 */
public class ServiceConstants {

	private static ResourceBundle jdbc = ResourceBundle.getBundle("jdbc");

	public static String jdbc_driver = jdbc.getString("jdbc.driver");
	public static String jdbc_url = jdbc.getString("jdbc.url");
	public static String jdbc_user = jdbc.getString("jdbc.user");
	public static String jdbc_password = jdbc.getString("jdbc.password");

	public static String www = jdbc.getString("pic");


	public static String upload_type = jdbc.getString("upload_type");

	public static String b2c_url = jdbc.getString("b2c_url");
	
	public static int defaultPageSize = 10;

}
