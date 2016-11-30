package com.nky.dao.basedata;

import com.sys.jfinal.JdbcSql;

/**
 * 科室查询
 * @author Ken
 * @version 2016年8月25日
 */
public class OfficeSql extends JdbcSql {
	
	static {
		//sqlid  全名要规范  类名+名字 jdbcSql.put("HospitalSql_selecttest", "select * from hospital  where 1=1 ${where}");
		jdbcSql.put("office_list", "select id,code,name,pic,des,description,create_time from office where 1=1 ${where}");
	}
	
}