package com.sys.singleton;

import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.sys.entity.RedisTypeEnum;
import com.sys.service.RedisService;
import com.sys.util.JsonUtil;
import com.sys.util.SpringUtil;



/**
 * 部门单例
 * @author Administrator
 *
 */
public class DepartmentSingleton {

	private static DepartmentSingleton instance = null;

	private static RedisService redisService = (RedisService) SpringUtil.getBean("redisService");

	public static DepartmentSingleton getInstance() {
		if (instance == null) {
			instance = new DepartmentSingleton();
		}
		return instance;
	}
	
	public static DepartmentSingleton getInstance1() {
		instance = new DepartmentSingleton();
		return instance;
	}

	private DepartmentSingleton() {

		loadData(0);

	}

	/**
	 * 加载数据
	 */
	private void loadData(int flag) {
		if(flag ==0 && redisService.exists(RedisTypeEnum.DEPARTMENT.toId())){
			Object obj = redisService.get(RedisTypeEnum.DEPARTMENT.toId());
			if("".equals(obj)){
				//对象的结构发生改变，重新加载
				setData();
			}
		}else{
			//数据发生改变，重新加载
			setData();
		}
		
	}
	
	/**
	 * 赋值
	 */
	public void setData(){
		String sql = "select *  from  t_department ";
		List<Record> list = Db.find(sql);
		redisService.set(RedisTypeEnum.DEPARTMENT.toId(), JsonUtil.getJsonObjByjfinalList(list).toString(),0);
	}

	/**
	 * 重新加载
	 */
	public void reloadData() {
		loadData(1);
	}
	
	/**
	 * 获取部门list
	 * 
	 * @return
	 */
	public List getList() {
		String  _dic =  (String)redisService.get(RedisTypeEnum.DEPARTMENT.toId());
		JSONArray dia_array = JSONArray.fromObject(_dic);
		
		return JsonUtil.getListByJsonArray(dia_array);
	}
	
	/**
	 * 通过id获取部门名称
	 * 
	 * @param id 部门id
	 * @return
	 */
	public String getDepartmentById(String id) {
		String  _dic =  (String)redisService.get(RedisTypeEnum.DEPARTMENT.toId());
		JSONArray dia_array = JSONArray.fromObject(_dic);
		
		for(int i = 0; i<dia_array.size(); i++) {
			JSONObject  o   = (JSONObject)dia_array.get(i);
			String ID = (String)o.get("ID");
			if(id!=null&&id.equals(ID)) {
				return (String)o.get("NAME");
			}
		}
		return null;
	}
	
}