package com.nky.dao.basedata;

import com.sys.jfinal.JdbcSql;

/**
 * Message template management.
 * @author Ken
 * @version 2016year9month8day Afternoon9:41:15
 */
public class MessageTemplateSql extends JdbcSql {

	static {
		//sqlid  全名要规范  类名+名字 jdbcSql.put("HospitalSql_selecttest", "select * from hospital  where 1=1 ${where}");
		jdbcSql.put("message_template_list",
				"select * from message_template where 1=1 ${where}");
	}

}