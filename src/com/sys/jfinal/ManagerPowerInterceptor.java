package com.sys.jfinal;

import java.util.List;


import com.jfinal.aop.Interceptor;
import com.jfinal.core.ActionInvocation;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
/**
 * User management background login status and authorization interceptor
 * 
 * huilet 2013-3-20
 * @author yuanc
 */
public class ManagerPowerInterceptor implements Interceptor {

	public void intercept(ActionInvocation ai) {
		Controller ctrl=ai.getController();
		ctrl.setAttr("root",ctrl.getRequest().getContextPath());
//		ctrl.setAttr("StaticCfg", new StaticCfg());
//		String user_token=ctrl.getCookie("user_token");
//		Record po=(Record)MemcacheTool.mcc.get(user_token);
//		if(po==null){
//			/*String ckey=ai.getControllerKey();
//			if(ckey.contains("webadmin")){
//				ctrl.redirect(ctrl.getRequest().getContextPath()+"/webadmin");
//			}else*/
//			ctrl.renderText("{\"statusCode\":301,\"message\":\"登录超时，请重新登录！\"}");
//		}else{
			/*boolean v=true;
			String code=null;
			PowerBind p=ai.getController().getClass().getAnnotation(PowerBind.class);
			if(p!=null){
				v=p.v();
				code=p.code();
			}
			p=ai.getMethod().getAnnotation(PowerBind.class);
			if(p!=null){
				v=p.v();
				code=p.code();
			}
			boolean f=false;
			if(v==true){
				//菜单权限判断
				List<Record> menus=(List<Record>)MemcacheTool.mcc.get("menu"+sid);
				if(menus!=null&&menus.isEmpty()==false){
					if(checkPower(menus,ai.getActionKey(),code)){//Link or security code matching
						ctrl.setAttr("powersafecodelist",MemcacheTool.mcc.get("powersafecodelist"+sid));
						ai.invoke();//Be careful Be sure to perform this method
					}else{
						f=true;
					}
				}else{
					f=true;
				}
			}
			if(f)
			ctrl.renderText("{\"statusCode\":300,\"message\":\"<font color='red'><B>You do not have this operating authority！Do not unauthorized operation！<br>Please re login to get the most new permissions settings！</B></font>\"}");
			*/
			ai.invoke();//Be careful Be sure to perform this method
	}
	private boolean checkPower(List<Record> menus,String url,String safecode){
		for(Record m:menus){
			String u=m.getStr("url");
			String mcode=m.getStr("safecode");
			if((u!=null&&url.contains(u))||(mcode!=null&&mcode.equals(safecode))){
				return true;
			}
		}
		return false;
	}
}