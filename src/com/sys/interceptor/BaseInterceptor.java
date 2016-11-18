package com.sys.interceptor;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * Title：拦截器基类
 * Description：
 * Mar 17, 2014
 */
public class BaseInterceptor extends HandlerInterceptorAdapter {

	/**
	 * 输出信息
	 * @param response
	 * @param output 信息
	 * @throws IOException
	 */
	protected void print(HttpServletResponse response, String output) throws IOException {
		PrintWriter print = response.getWriter();
		print.write(output);
		print.flush();
		print.close();
	}

}
