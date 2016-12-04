
package com.sys.interceptor;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.sys.service.shiro.AuthenticationToken;
import com.sys.service.shiro.RSAService;
import com.sys.service.sys.SysAuthService;

/**
 * shiro
 * @author nky
 *
 */
public class AuthenticationFilter extends FormAuthenticationFilter {
	@Autowired
	RSAService rsaService;
	
	@Autowired
	SysAuthService sysAuthService;

	/** default"Encryption password"Parameter name */
	private static final String DEFAULT_EN_PASSWORD_PARAM = "password";

	/** default"Verification Code"Parameter name */
	private static final String DEFAULT_KAPTCHA_PARAM = "kaptcha";

	/** "Encryption password"Parameter name */
	private String enPasswordParam = DEFAULT_EN_PASSWORD_PARAM;

	/** "Verification Code"Parameter name */
	private String kaptcha = DEFAULT_KAPTCHA_PARAM;
	
	@Override
	protected org.apache.shiro.authc.AuthenticationToken createToken(ServletRequest servletRequest, ServletResponse servletResponse) {
		String username = getUsername(servletRequest);
		String password = getPassword(servletRequest);
		String kaptcha = getKaptcha(servletRequest);
		boolean rememberMe = isRememberMe(servletRequest);
		String host = getHost(servletRequest);
		String type = servletRequest.getParameter("type");
		return new AuthenticationToken(username, password, kaptcha, rememberMe, host,type);
	}

	@Override
	protected boolean onAccessDenied(ServletRequest servletRequest, ServletResponse servletResponse) throws Exception {
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;
		String requestType = request.getHeader("X-Requested-With");
		if (requestType != null && requestType.equalsIgnoreCase("XMLHttpRequest")) {
			response.addHeader("loginStatus", "accessDenied");
			response.sendError(HttpServletResponse.SC_FORBIDDEN);
			return false;
		}
		return super.onAccessDenied(request, response);
	}

	@Override
	protected boolean onLoginSuccess(org.apache.shiro.authc.AuthenticationToken token, Subject subject, ServletRequest servletRequest, ServletResponse servletResponse) throws Exception {
		Session session = subject.getSession();
		Map<Object, Object> attributes = new HashMap<Object, Object>();
		Collection<Object> keys = session.getAttributeKeys();
		for (Object key : keys) {
			attributes.put(key, session.getAttribute(key));
		}
		session.stop();
		session = subject.getSession();
		for (Entry<Object, Object> entry : attributes.entrySet()) {
			session.setAttribute(entry.getKey(), entry.getValue());
		}
		
		HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
        
		String url = this.getSuccessUrl();
		httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + url);	//Page Jump
		return false;
	}

	@Override
	protected String getPassword(ServletRequest servletRequest) {
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		String password = request.getParameter(DEFAULT_EN_PASSWORD_PARAM);
//		rsaService.removePrivateKey(request);
		//String password = "";
		return password;
	}
	
	/**
	 * Override login address
	 */
//	@Override
//	protected void redirectToLogin(ServletRequest request,ServletResponse response) throws IOException {
//		String loginUrl = getLoginUrl();
//		String type = request.getParameter("type");
//		if(type != null && type.equals("doctor")){
//			loginUrl = "/d/login.html";
//		}else if(type != null && type.equals("hospital")){
//			loginUrl = "/h/login.html";
//		}
//		WebUtils.issueRedirect(request, response, loginUrl);
//	}

	/**
	 * Get verification code
	 * 
	 * @param servletRequest
	 *            ServletRequest
	 * @return Verification Code
	 */
	protected String getKaptcha(ServletRequest servletRequest) {
		return WebUtils.getCleanParam(servletRequest, kaptcha);
	}

	/**
	 * Obtain"Encryption password"Parameter name
	 * 
	 * @return "Encryption password"Parameter name
	 */
	public String getEnPasswordParam() {
		return enPasswordParam;
	}

	/**
	 * Config"Encryption password"Parameter name
	 * 
	 * @param enPasswordParam
	 *            "Encryption password"Parameter name
	 */
	public void setEnPasswordParam(String enPasswordParam) {
		this.enPasswordParam = enPasswordParam;
	}

	public String getKaptcha() {
		return kaptcha;
	}

	public void setKaptcha(String kaptcha) {
		this.kaptcha = kaptcha;
	}

}