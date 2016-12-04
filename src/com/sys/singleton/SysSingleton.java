package com.sys.singleton;

import java.util.HashMap;
import java.util.List;

import net.sf.json.JSONObject;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.sys.entity.RedisTypeEnum;
import com.sys.service.RedisService;
import com.sys.util.JsonUtil;
import com.sys.util.SpringUtil;




/**
 * system parameter
 * 
 * @author yc 2011-3-28
 * @Version CECTManegeServer
 */
public class SysSingleton {

	private static SysSingleton instance = null;

	private static RedisService redisService = (RedisService) SpringUtil.getBean("redisService");

	public static SysSingleton getInstance() {
		if (instance == null) {
			instance = new SysSingleton();
		}
		return instance;
	}

	private SysSingleton() {

		loadData(0);

	}

	/**
	 * Load data
	 */
	private void loadData(int flag) {
		if(redisService.exists(RedisTypeEnum.SYS.toId()) && flag ==0){
			Object obj = redisService.get(RedisTypeEnum.SYS.toId());
			if("".equals(obj)){
				setData();
			}
		}else{
			setData();
		}

	}
	
	/**
	 * assignment
	 */
	public void setData(){
		String sql = "SELECT * FROM   t_sys_parameter ";
		
		List<Record>   list = Db.find(sql);
		HashMap  map  = new HashMap();
		for(Record  r : list){
			map.put(r.get("code")+"", r.get("default_value")+"");
			
		}
		redisService.set(RedisTypeEnum.SYS.toId(), JsonUtil.getJsonObjByMap(map).toString(),0);
	}
	

	/**
	 * Reload
	 */
	public void reload() {

		loadData(1);
	}

	
	/**
	 * according toCode Obtain value
	 * 
	 * @param SYSType
	 *            type
	 * @param keyValue
	 *            Key
	 * @return huilet 2013-4-17
	 * @author yuanc
	 */
	public String getValueByCode(String code){
		String  sys = redisService.get(RedisTypeEnum.SYS.toId());
		JSONObject o = JSONObject.fromObject(sys);
		HashMap  map =  JsonUtil.getMapByJsonObject(o);
		
		return map.get(code)+"";
	}
}