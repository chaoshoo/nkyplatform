package com.sys.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.plugin.activerecord.Record;


public class RecordUtil {
	
	
	public static Map<String , String> getMapByJfinalRecord(Record rc){
		
		Map<String , String> map = new HashMap<String , String>();
		String[] names = rc.getcolumnNames();
		for (String name :names) {
			String  v = "";
			if(rc.get(name) != null){
				try {
					//针对时间进行处理
					if(rc.get(name) instanceof Date){
						v = DateUtil.dateForString(rc.getTimestamp(name), "yyyy-MM-dd HH:mm:ss");
					}else{
						v = rc.get(name).toString();
					}
				} catch (Exception e) {
					//e.printStackTrace();
					v = rc.get(name)+"";
				}
			}
			if("".equals(v)|| "<null>".equals(v)){
				v = "";
			}
			map.put(name.toLowerCase(), v);
		}
		
		return map;
	}
	
	
	public static List<Map<String,String>> getJsonObjByjfinalList(List<Record> rec) {
		
		List<Map<String,String>> list =  new ArrayList<Map<String,String>>();
		for(Record r: rec){
			list.add(getMapByJfinalRecord(r));
		}
		return list;
	}

}