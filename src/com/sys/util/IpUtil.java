package com.sys.util;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class IpUtil {

	private static Logger logger = LoggerFactory.getLogger(IpUtil.class);

	public static String getIpAddress(HttpServletRequest request) {
		String ip = request.getHeader("X-Forwarded-For");
		if (!checkIp(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
			logger.debug("Proxy-Client-IP=>" + ip);
		}
		if (!checkIp(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
			logger.debug("WL-Proxy-Client-IP=>" + ip);
		}
		if (!checkIp(ip)) {
			ip = request.getRemoteAddr();
			logger.debug("request.getRemoteAddr()=>" + ip);
		}
		return ip;
	}

	private static boolean checkIp(String ip) {
		if (ip == null || ip.length() == 0 || "unkown".equalsIgnoreCase(ip) || ip.split(".").length != 4) {
			return false;
		}
		logger.debug("request.getHeader(X-Forwarded-For)=>" + ip);
		return true;
	}

}