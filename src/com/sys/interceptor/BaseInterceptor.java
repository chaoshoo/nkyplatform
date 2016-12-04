package com.sys.interceptor;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * Title：Interceptor base
 * Description：
 * Mar 17, 2014
 */
public class BaseInterceptor extends HandlerInterceptorAdapter {

	/**
	 * Output information
	 * @param response
	 * @param output information
	 * @throws IOException
	 */
	protected void print(HttpServletResponse response, String output) throws IOException {
		PrintWriter print = response.getWriter();
		print.write(output);
		print.flush();
		print.close();
	}

}