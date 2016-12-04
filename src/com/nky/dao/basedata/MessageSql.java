package com.nky.dao.basedata;

import com.sys.jfinal.JdbcSql;

/**
 * Message management.
 * @author Ken
 * @version 2016year8month30day
 */
public class MessageSql extends JdbcSql {

	static {
		//sqlid  全名要规范  类名+名字 jdbcSql.put("HospitalSql_selecttest", "select * from hospital  where 1=1 ${where}");
		jdbcSql.put("message_list",
				"select id,msg_type,creator,title,content,isvalid,create_time from message where 1=1 ${where}");
	}

}