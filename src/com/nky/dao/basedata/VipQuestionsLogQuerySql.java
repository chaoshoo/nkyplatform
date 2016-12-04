package com.nky.dao.basedata;

import com.sys.jfinal.JdbcSql;

/**
 * User Advisory details.
 * @author Ken
 * @version 2016year9month8day Afternoon1:38:29
 */
public class VipQuestionsLogQuerySql extends JdbcSql {

	static {
		//sqlid  全名要规范  类名+名字 jdbcSql.put("HospitalSql_selecttest", "select * from hospital  where 1=1 ${where}");
		jdbcSql.put("vipquestionslogquery_list", "select * from vip_questions_log where 1=1 ${where}");
	}

}