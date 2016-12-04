package com.sys.singleton;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.drools.util.StringUtils;

import com.beust.jcommander.internal.Lists;
import com.beust.jcommander.internal.Maps;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.sys.entity.RedisTypeEnum;
import com.sys.service.RedisService;
import com.sys.util.SpringUtil;

/**
 * Drop down list dictionary--Singleton pattern
 * 
 * @author yc 2011-3-28
 * @Version CECTManegeServer
 */
public class DicSingleton {

	private static DicSingleton instance = null;

	private static RedisService redisService = (RedisService) SpringUtil.getBean("redisService");

	public static DicSingleton getInstance() {
		if (instance == null) {
			instance = new DicSingleton();
		}
		return instance;
	}

	private DicSingleton() {

		loadData(0);

	}

	/**
	 * Load data
	 */
	private void loadData(int flag) {
		if(redisService.exists(RedisTypeEnum.DIC.toId()+"_status") && flag ==0){
			//不做处理
		}else{
			setData();
		}

	}
	
	/**
	 * assignment
	 */
	public void setData(){
		setData(null);
	}
	public void setData(String dic_type){
		String sql = "select dic_type,dic_name,dic_value from dic where 1=1";
		if(dic_type != null){
			sql += " and dic_type='"+dic_type+"'";
		}
		List<Record>   list = Db.find(sql);
		for (Record r: list) {
			redisService.hSet(RedisTypeEnum.DIC.toId()+"_"+r.getStr("dic_type"), r.getStr("dic_name"),r.getStr("dic_value"));
		}
	}

	/**
	 * Reload
	 */
	public void reload() {

		loadData(1);
	}

	/**
	 * according totypeGets the drop - down list
	 * 
	 * @param type
	 * @return
	 */
	public List<Map<String,String>> getDic(String type) {
		String key = RedisTypeEnum.DIC.toId()+"_"+type;
		Map<String,String> map =  redisService.hMGetAll(key.getBytes());
		if(map == null|| map.isEmpty()){
			setData(type);
			map =  redisService.hMGetAll(key.getBytes());
			if(map == null){
				//还是为空 
				return  Lists.newArrayList();
			}
		}
		List<Map<String,String>> list = Lists.newArrayList();
		for (String k:map.keySet()) {
				HashMap m = new HashMap();
				m.put("dic_name", k);
				m.put("dic_value",map.get(k));
				list.add(m);
		}
		return list;
	}

	public Map<String,String> getDicMap(String type) {
		String key = RedisTypeEnum.DIC.toId()+"_"+type;
		Map<String,String> map =  redisService.hMGetAll(key.getBytes());
		if(map == null || map.isEmpty()){
			setData(type);
			map =  redisService.hMGetAll(key.getBytes());
			if(map == null){
				//还是为空 
				return  Maps.newHashMap();
			}
		}
		return map;
	}
	
	/**
	 * according todictype，pluskeyValue acquisitionvalue
	 * 
	 * @param dicType
	 *            type
	 * @param keyValue
	 *            Key
	 * @return huilet 2013-4-17
	 * @author yuanc
	 */
	public String getValueBykeyDic(String dicType,String keyValue){
		String value = redisService.hGet(RedisTypeEnum.DIC.toId()+"_"+dicType, keyValue);
		if(StringUtils.isEmpty(value)){
			//重新加载一次
			setData(dicType);
			value = redisService.hGet(RedisTypeEnum.DIC.toId()+"_"+dicType, keyValue);
		}
		return value;
	}
}