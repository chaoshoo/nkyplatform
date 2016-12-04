package com.nky.dao.basedata;

import com.sys.jfinal.JdbcSql;

/**
 * Remote consultation detailed list query.
 * @author Ken
 * @version 2016year9month8day
 */
public class RemoteInspectLogQuerySql extends JdbcSql {

	static {
		//sqlid  全名要规范  类名+名字 jdbcSql.put("HospitalSql_selecttest", "select * from hospital  where 1=1 ${where}");
		jdbcSql.put("remoteinspectlog_list", "select * from remote_inspect_log where 1=1 ${where}"); 
	}

}