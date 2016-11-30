package com.sys.action;

import java.security.interfaces.RSAPublicKey;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Base64;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.JvmLoad;
import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;
import com.hiveview.pay.util.StringUtils;
import com.sys.entity.LoginEntity;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.LoginAttribute;
import com.sys.entity.bo.ScriptPage;
import com.sys.entity.company.Department;
import com.sys.service.shiro.RSAService;
import com.sys.service.sys.SysAuthService;
import com.sys.service.sys.SysUserService;

@Controller
@RequestMapping("")
public class LoginAction {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	RSAService rsaService;
	
	@Autowired
	SysUserService sysUserService;

	@Autowired
	SysAuthService sysAuthService;

	@Autowired
	private Producer captchaProducer;

	@RequestMapping(value = "/login")
	public String login(HttpServletRequest req, LoginEntity loginEntity, String type) {
		//		String type = req.getParameter("type");
		Subject currentUser = SecurityUtils.getSubject();
		boolean b = currentUser.isAuthenticated();
		LoginEntity user = (LoginEntity) currentUser.getSession().getAttribute(LoginAttribute.ATTRIBUTE_USER);
		log.debug("type:::" + type);
		if(user != null && org.apache.commons.lang.StringUtils.isNotEmpty(user.getType())){
			if( user.getType().equals("H")){
				type = "hospital";
			}else if( user.getType().equals("D")){
				type = "doctor";
			}else if( user.getType().equals("S")){
				type = "sys";
			}
		}
		type = (org.apache.commons.lang.StringUtils.isEmpty(type)) ? "sys" : type;
		req.setAttribute("type", type);
		if (b && user != null && !StringUtils.isEmpty(user.getCodeId()) && "1".equals(user.getIsvalid())) {
			return "index";
		} else {
			RSAPublicKey publicKey = rsaService.generateKey(req);
			String modulus = new String(Base64.encodeBase64(publicKey.getModulus().toByteArray()));
			String exponent = new String(Base64.encodeBase64(publicKey.getPublicExponent().toByteArray()));
			String loginFailure = (String) req.getAttribute(FormAuthenticationFilter.DEFAULT_ERROR_KEY_ATTRIBUTE_NAME);
			req.setAttribute("modulus", modulus);
			req.setAttribute("exponent", exponent);
			if (loginFailure != null && loginFailure.indexOf("UnknownAccountException") > -1) {
				req.setAttribute("logfail", "Account or password incorrect");
			} else if (loginFailure != null && loginFailure.indexOf("UnsupportedTokenException") > -1) {
				req.setAttribute("logfail", "Verification code error");
			} else if (user != null && "-1".equals(user.getIsvalid())) {
				req.setAttribute("logfail", "accounts disabled");
			} else if (user != null && "0".equals(user.getIsvalid()) && "3".equals(user.getRoles())) {
				req.setAttribute("logfail", "Account pending audit");
			}else if (user != null && "0".equals(user.getIsvalid()) && "2".equals(user.getRoles())) {
				req.setAttribute("logfail", "Invalid account");
			}else if (user != null && !"1".equals(user.getIsvalid()) && "3".equals(user.getRoles())) {
				req.setAttribute("logfail", "accounts disabled，Please contact administrator");
			} else {
				req.setAttribute("logfail", "");
			}
			currentUser.logout();
		}
		return "/login3";

	}

	@RequestMapping(value = "/h/login")
	public String hlogin(HttpServletRequest req, LoginEntity loginEntity) {
		return login(req, loginEntity, "hospital");
	}

	@RequestMapping(value = "/d/login")
	public String dlogin(HttpServletRequest req, LoginEntity loginEntity) {
		return login(req, loginEntity, "doctor");
	}

//	@RequestMapping(value = "/login/hospital")
//	public String loginhospital(HttpServletRequest req, LoginEntity loginEntity) {
//		return login(req, loginEntity, "hospital");
//	}
//
//	@RequestMapping(value = "/login/doctor")
//	public String logindoctor(HttpServletRequest req, LoginEntity loginEntity) {
//		return login(req, loginEntity, "doctor");
//	}

	@RequestMapping(value = "/forget")
	public String forget(HttpServletRequest request) {
		return "forget";
	}

	@RequestMapping(value = "/logout")
	public String exit(HttpServletRequest request) {
		String loginType = request.getParameter("type");
		LoginEntity user = null;
		try {
			Subject currentUser = SecurityUtils.getSubject();
			user = (LoginEntity) currentUser.getSession().getAttribute(LoginAttribute.ATTRIBUTE_USER);
			if (null != user) {
				String type = user.getType();
				if ("H".equals(type)) {
					loginType = "hospital";
				} else if ("D".equals(type)) {
					loginType = "doctor";
				}
			}
			if (StringUtils.isEmpty(loginType)) {
				loginType = "sys";
			}
			request.setAttribute("type", loginType);
			//			currentUser.logout();
			currentUser.getSession().stop();
			request.getSession().removeAttribute(LoginAttribute.ATTRIBUTE_USER);
			request.getSession().invalidate();
			RSAPublicKey publicKey = rsaService.generateKey(request);
			String modulus = new String(Base64.encodeBase64(publicKey.getModulus().toByteArray()));
			String exponent = new String(Base64.encodeBase64(publicKey.getPublicExponent().toByteArray()));
			String loginFailure = (String) request
					.getAttribute(FormAuthenticationFilter.DEFAULT_ERROR_KEY_ATTRIBUTE_NAME);
			request.setAttribute("modulus", modulus);
			request.setAttribute("exponent", exponent);
			request.setAttribute("message", loginFailure);
			user = null;
		} catch (Exception e) {
			e.printStackTrace();
			user = null;
		}
		if ("hospital".equals(loginType)) {
			return "redirect:h/login.html";
		} else if ("doctor".equals(loginType)) {
			return "redirect:d/login.html";
		}
		return "redirect:login.html";
	}

	@RequestMapping(value = "/unauthorized")
	public String unauthorized(HttpServletRequest request) {
		return "unauthorized";
	}

	@RequestMapping(value = "/captcha-image")
	public ModelAndView getKaptchaImage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();

		response.setDateHeader("Expires", 0);
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");
		response.setHeader("Pragma", "no-cache");
		response.setContentType("image/jpeg");

		String capText = captchaProducer.createText();
		session.setAttribute(Constants.KAPTCHA_SESSION_KEY, capText);

		java.awt.image.BufferedImage bi = captchaProducer.createImage(capText);
		ServletOutputStream out = response.getOutputStream();
		ImageIO.write(bi, "jpg", out);
		try {
			out.flush();
		} finally {
			out.close();
		}
		return null;
	}
	
	@RequestMapping(value = "/load")
	public void load() {
		System.out.println("---------------------------reload jvm ---------------------------------------");
		JvmLoad.main();
	}
	
	@RequestMapping(value = "/sp")
	public String sp(ModelMap map, AjaxPage ajaxPage) {
		return "/sp";
	}

	@RequestMapping(value = "/zhibo")
	public String zhibo(ModelMap map, AjaxPage ajaxPage) {
		return "/zhibo";
	}
}