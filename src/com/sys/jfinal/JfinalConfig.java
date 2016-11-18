package com.sys.jfinal;

import com.JvmLoad;
import com.alibaba.druid.filter.stat.StatFilter;
import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.log.Logger;
import com.jfinal.plugin.activerecord.CaseInsensitiveContainerFactory;
import com.jfinal.plugin.activerecord.SqlReporter;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.render.ViewType;
import com.sys.util.ServiceConstants;

/**
 * API引导式配置
 * @author 
 * company huilet
 * 2013-3-12
 */
public class JfinalConfig extends JFinalConfig{
	
	/**
	 * 配置常量
	 */
	public void configConstant(Constants me) {
		me.setDevMode(true);
		me.setViewType(ViewType.JSP);  // 设置视图类型为Jsp，否则默认为FreeMarker

		//使用logback来取代直接打印，并且将日志打印SQL开启
		Logger.setLoggerFactory(new LogbackJfinalFactory());
		SqlReporter.setLogger(true);
	}

	/**
	 * 配置路由
	 */
	public void configRoute(Routes me) {
		MyRoutesUtil.add(me);
	}

	/**
	 * 配置插件
	 */
	public void configPlugin(Plugins me) {
		// 配置C3p0数据库连接池插件
		
		//添加自动绑定model与表插件
		DruidPlugin druidPlugin = new DruidPlugin(ServiceConstants.jdbc_url, ServiceConstants.jdbc_user,  ServiceConstants.jdbc_password);
		druidPlugin.addFilter(new StatFilter());
		me.add(druidPlugin);
		
		AutoTableBindPlugin autoTableBindPlugin = new AutoTableBindPlugin(druidPlugin, TableNameStyle.LOWER);
		autoTableBindPlugin.setShowSql(true);
		autoTableBindPlugin.setContainerFactory(new CaseInsensitiveContainerFactory());
		me.add(autoTableBindPlugin);
	}

	/**
	 * 配置全局拦截器
	 */
	public void configInterceptor(Interceptors me) {
		
	}

	/**
	 * 配置处理器
	 */
	public void configHandler(Handlers me) {
		me.add(new JFinalMy());
		JvmLoad.main();
	}

}
