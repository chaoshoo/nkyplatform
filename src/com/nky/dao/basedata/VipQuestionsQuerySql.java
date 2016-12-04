package com.nky.dao.basedata;

import com.sys.jfinal.JdbcSql;

/**
 * User consultation.
 * @author Ken
 * @version 2016year9month8day Afternoon1:37:38
 */
public class VipQuestionsQuerySql extends JdbcSql {

	static {
		//sqlid  全名要规范  类名+名字 jdbcSql.put("HospitalSql_selecttest", "select * from hospital  where 1=1 ${where}");
		jdbcSql.put("vipquestionsquery_list",
				"SELECT i.*,d.name from vip_questions i  left join doctor d on i.doctor_code = d.code  where 1=1 ${where}");
	}

}