package com.sys.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Repository;

import com.sys.singleton.AreaSingleton;
import com.sys.singleton.AuthoritySingleton;
import com.sys.singleton.DicSingleton;

/**   
 * @Description Spring应用监听器,用于Spring启动完成后执行特定初始化方法
 * @author shiwencai   
 * @date 2015年11月4日 上午9:01:46
 */

@Repository
public class SpringApplicationListener implements ApplicationListener<ContextRefreshedEvent> {
	
	private Logger logger = LoggerFactory.getLogger(getClass());

	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		if ( event.getApplicationContext (). getParent() == null){
			logger.info("初始化begin--->...");
			init();
		}
		
	}
	
	private void init(){
		//初始化
//		DicSingleton.getInstance();
//		AuthoritySingleton.getInstance();
//		AreaSingleton.getInstance();
	}

	
}
