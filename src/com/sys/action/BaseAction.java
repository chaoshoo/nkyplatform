package com.sys.action;

import java.lang.reflect.Field;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.drools.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.ModelMap;
import org.springframework.web.servlet.ModelAndView;

import com.beust.jcommander.internal.Maps;
import com.jfinal.plugin.activerecord.Record;
import com.sys.entity.LoginEntity;
import com.sys.entity.bo.LoginAttribute;
import com.sys.jfinal.JFinalEntity;
import com.sys.util.Reflections;

/**
 * Basicsaction Write some common methods
 * @author shiwc
 * @date 2016year2month5day
 */
public class BaseAction {
	
	protected Logger LOG = LoggerFactory.getLogger(getClass());

	// 用户id
	protected String userId;

	// 操作人(统一登录编码)
	protected String inspection_operator;


	protected LoginEntity getSession(HttpServletRequest request) {
		LoginEntity loginEntity = null;
		try {
			Subject currentUser = SecurityUtils.getSubject();
			LOG.debug("Subject --->" + currentUser.toString());
			LOG.debug("Subject --->" + currentUser.getSession().getAttribute("currentUser").toString());
			loginEntity = (LoginEntity) currentUser.getSession().getAttribute(LoginAttribute.ATTRIBUTE_USER);
		} catch (Exception e) {
			loginEntity = (LoginEntity) request.getSession().getAttribute(LoginAttribute.ATTRIBUTE_USER);
		}
		return loginEntity;
	}

	protected LoginEntity getSession() {
		Subject currentUser = SecurityUtils.getSubject();
		LoginEntity loginEntity = (LoginEntity) currentUser.getSession().getAttribute(LoginAttribute.ATTRIBUTE_USER);
		return loginEntity;
	}

	protected Map<String, String> alertMessage(String alertMessage, boolean success) {
		Map<String, String> result = Maps.newHashMap();
		result.put("msg", alertMessage);
		if (success)
			result.put("success", "1");
		else {
			result.put("success", "0");
		}
		return result;
	}

	protected ModelAndView errorMsg(ModelMap modelMap, String errorMsg) {
		modelMap.put("errMsg", errorMsg);
		// 配置错误页面 暂时写死
		return new ModelAndView("error", modelMap);
	}
	
	protected Map<String,Object> getParam(HttpServletRequest request){
		Map<String,Object> map = Maps.newHashMap();
		Map<String,String[]> params = request.getParameterMap();
		for (String key : params.keySet()) {
			if(key.startsWith("FIT-") && params.get(key) != null){
				//页面查询过滤参数name需要以FIT-开头
				//查询条件参数暂不考虑数组
				//参数值类型暂不做转换  因为mysql 可以自动转
				String value = params.get(key)[0];
				if(!StringUtils.isEmpty(value)){
					map.put(key.substring(4), params.get(key)[0]);
				}
			}
		}
		return map;
	}

	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getInspection_operator() {
		return inspection_operator;
	}
	public void setInspection_operator(String inspection_operator) {
		this.inspection_operator = inspection_operator;
	}
	
	public void setEntity(Object obj,HttpServletRequest request){
		Class<?> cls = obj.getClass();
		Field[] fields = cls.getDeclaredFields();
		for (int i = 0; i < fields.length; i++) {
			try {
				Reflections.setFieldValue(obj, fields[i].getName(), request.getParameter(fields[i].getName().toLowerCase()));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}