package com.sys.interceptor;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.sys.entity.bo.LoginAttribute;

public class LoginInterceptor implements HandlerInterceptor {

	//	private Logger LOG = LoggerFactory.getLogger(LoginInterceptor.class);

	private static final String URL_LOGIN = "/login.html";

	//	private static final String URL_UPLOAD = "/upload/";

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		String path = request.getServletPath();
		if (path.lastIndexOf(".json") > -1) {
			return true;
		}
		if (path.lastIndexOf("forget.html") > -1) {
			return true;
		}
		if (path.lastIndexOf(URL_LOGIN) > -1) {
			return true;
		}
	
		if (isLogin(request)) {
			return true;
		}
		PrintWriter pw = response.getWriter();
		pw.write("<script>window.parent.location.href='" + request.getContextPath() + URL_LOGIN + "'</script>");
		pw.flush();
		return false;

	}

	private boolean isLogin(HttpServletRequest request) {
		Object currentUser = request.getSession().getAttribute(LoginAttribute.ATTRIBUTE_USER);
		if (currentUser != null) {//User information is stored tosessionin
			return true;
			//			ServletContext application = request.getSession().getServletContext();
			//			Object sessionIds = application.getAttribute(PayConstants.ATTRIBUTE_SESSIONID_MAP);
			//			if (sessionIds == null) {//存储sessionId的Map未创建
			//				LOG.debug("### sessionIdMap is null ###");
			//				return true;
			//			}
			//			Map<String, String> sessionIdMap = (Map<String, String>) sessionIds;
			//			String sessionId = request.getSession().getId();
			//			for (String key : sessionIdMap.keySet()) {
			//				if (sessionId.equals(key)) {
			//					LOG.debug("### sessionId in sessionIdMap ###");
			//					return true;//当前sessionId已存储至Map中
			//				}
			//			}
			//			LOG.debug("### sessionId not in sessionIdMap ###");
		}
		return false;
	}

	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {

	}

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {

	}
}