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
 * 下拉列表字典--单例模式
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
	 * 加载数据
	 */
	private void loadData(int flag) {
		if(redisService.exists(RedisTypeEnum.DIC.toId()+"_status") && flag ==0){
			//不做处理
		}else{
			setData();
		}

	}
	
	/**
	 * 赋值
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
	 * 重新加载
	 */
	public void reload() {

		loadData(1);
	}

	/**
	 * 根据type获取下拉列表
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
	 * 根据dic类型，加key值获取value
	 * 
	 * @param dicType
	 *            类型
	 * @param keyValue
	 *            键值
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
