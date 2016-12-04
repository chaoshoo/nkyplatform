package com.nky.service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.inspect.Office;

/**
 * Department single case.
 * @author Ken
 * @version 2016year8month24day
 */
public class OfficeSingleton {

//	private static final Logger LOG = LoggerFactory.getLogger(OfficeSingleton.class);

	private static OfficeSingleton instance = null;

	//科室	 
	private static ConcurrentHashMap<String, Office> OFFICE_MAP = new ConcurrentHashMap<String, Office>();

	private static Boolean LOCK = new Boolean(true);

	/**
	 * Obtain a single case.
	 */
	public static OfficeSingleton getInstance() {
		if (instance == null) {
			instance = new OfficeSingleton();
		}
		return instance;
	}

	/**
	 * Get all department.
	 */
	public Map<String, Office> getAll() {
		return OFFICE_MAP;
	}

	/**
	 * Get a department.
	 */
	public Office getEntitybykey(String code) {
		return OFFICE_MAP.get(code);
	}

	private OfficeSingleton() {
		loadData();
	}

	/**
	 * Load data
	 */
	private void loadData() {
		synchronized (LOCK) {
			List<Record> list = Db.find("select CODE,NAME,PIC,DES,DESCRIPTION from office order by code asc ");
			for (Record r : list) {
				Office tmp = new Office();
				tmp.setCode(r.getStr("CODE"));
				tmp.setName(r.getStr("NAME"));
				tmp.setPic(r.getStr("PIC"));
				tmp.setDes(r.getStr("DES"));
				tmp.setDescription(r.getStr("DESCRIPTION"));
				OFFICE_MAP.put(r.getStr("CODE"), tmp);
			}
		}
	}

	/**
	 * Reload
	 */
	public void reload() {
		loadData();
	}

}