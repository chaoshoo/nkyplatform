package com.sys.jfinal;

import com.jfinal.log.ILoggerFactory;
import com.jfinal.log.Logger;

/**
 * 为jfinal的日志适配的logger.
 * 
 * @author Ken
 * @version 2016年4月14日
 */
public class LogbackJfinalFactory implements ILoggerFactory {

	@Override
	public Logger getLogger(Class<?> clazz) {
		return new LogbackJfinalLogger(clazz);
	}

	@Override
	public Logger getLogger(String name) {
		return new LogbackJfinalLogger(name);
	}

}
