package com.nky.dao.basedata;

import com.sys.jfinal.JdbcSql;

/**
 * 消息模板管理.
 * @author Ken
 * @version 2016年9月8日 下午9:41:15
 */
public class MessageTemplateSql extends JdbcSql {

	static {
		//sqlid  全名要规范  类名+名字 jdbcSql.put("HospitalSql_selecttest", "select * from hospital  where 1=1 ${where}");
		jdbcSql.put("message_template_list",
				"select * from message_template where 1=1 ${where}");
	}

}
