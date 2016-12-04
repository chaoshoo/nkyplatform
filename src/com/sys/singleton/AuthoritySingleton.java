package com.sys.singleton;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.sys.entity.RedisTypeEnum;
import com.sys.entity.area.Area;
import com.sys.entity.sys.SysAuth;
import com.sys.service.RedisService;
import com.sys.service.sys.SysAuthService;
import com.sys.util.JsonUtil;
import com.sys.util.SpringUtil;

/**
 * Jurisdiction-Singleton pattern
 * @author liuchang
 *
 */
public class AuthoritySingleton {
	
	private static RedisService redisService = (RedisService) SpringUtil.getBean("redisService");
	
	private static AuthoritySingleton instance = null;
	
	public static AuthoritySingleton getInstance() {
		if (instance == null) {
			instance = new AuthoritySingleton();
		}
		return instance;
	}

	private AuthoritySingleton() {
		
		loadData(0);
		
	}
	
	/**
	 * Load data
	 */
	private void loadData(int flag) {
//		if(flag ==0 && redisService.exists(RedisTypeEnum.SYSAUTH.toId())){
//			Object obj = redisService.get(RedisTypeEnum.SYSAUTH.toId());
//			if(obj == null || obj.toString().length() < 10){
//				setData();
//			}
//		}else{
//			setData();
//		}
		setData();
		
	}
	
	private void setData() {
		try {
			
			
			String  sql = "	SELECT auth_id AS authId,auth_name AS authName,auth_action AS authAction,pid,is_effective AS isEffective,authority,auth_type AS authType FROM  sys_auth where pid = 0  ORDER BY auth_Seq  desc  ";
			
			List<Record>   list = Db.find(sql);
			
			JSONArray a = new JSONArray();
			for(Record  r :  list){
				String authid = r.get("authId")+"";
				JSONObject  o = JsonUtil.getJsonObjByMap(JsonUtil.getMapByJfinalRecord(r));
				String sqlc  = "SELECT auth_id AS authId,auth_name AS authName,auth_action AS authAction,pid,is_effective AS isEffective,authority,auth_type AS authType FROM  sys_auth where pid = '"+authid+"'  ORDER BY auth_Seq  desc "; 
				List<Record>   clist = Db.find(sqlc);
				o.put("CHILD", JsonUtil.getJsonObjByjfinalList(clist).toString());
				a.add(o);
			}
			redisService.set(RedisTypeEnum.SYSAUTH.toId(),  a.toString(),0);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Get permission
	 * @param id
	 * @return
	 */
	public List<SysAuth> getSysAuthList() {
		List<SysAuth> list = new ArrayList<SysAuth>();
		try {
			
			String json = redisService.get(RedisTypeEnum.SYSAUTH.toId());
			
			JSONArray   a  =  JSONArray.fromObject(json);

			for ( int i = 0 ; i<a.size(); i++){
				JSONObject o = a.getJSONObject(i);
				SysAuth sysAuth  =new  SysAuth();
				
				sysAuth.setAuthAction(o.getString("AUTHACTION"));
				sysAuth.setAuthName(o.getString("AUTHNAME"));
				sysAuth.setAuthority(o.getString("AUTHORITY"));
				JSONArray childarray = o.getJSONArray("CHILD");
				List<SysAuth> childrenlist = new ArrayList<SysAuth>();
				for ( int j = 0 ; j<childarray.size(); j++){
					JSONObject c = childarray.getJSONObject(j);
					SysAuth sysAuthc  =new  SysAuth();
					
					sysAuthc.setAuthAction(c.getString("AUTHACTION"));
					sysAuthc.setAuthName(c.getString("AUTHNAME"));
					sysAuthc.setAuthority(c.getString("AUTHORITY"));
					
					childrenlist.add(sysAuthc);
					
				}
				
				sysAuth.setChildren(childrenlist);
				
				
				list.add(sysAuth);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return  list;
	}
	
	/**
	 * Reload
	 */
	public void reload() {
		loadData(1);
	}
	
}