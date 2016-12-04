package com.sys.jfinal;

import com.jfinal.log.ILoggerFactory;
import com.jfinal.log.Logger;

/**
 * byjfinalLog adaptation.logger.
 * 
 * @author Ken
 * @version 2016year4month14day
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