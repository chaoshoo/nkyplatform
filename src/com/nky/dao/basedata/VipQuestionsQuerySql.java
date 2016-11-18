package com.nky.dao.basedata;

import com.sys.jfinal.JdbcSql;

/**
 * 用户咨询查询.
 * @author Ken
 * @version 2016年9月8日 下午1:37:38
 */
public class VipQuestionsQuerySql extends JdbcSql {

	static {
		//sqlid  全名要规范  类名+名字 jdbcSql.put("HospitalSql_selecttest", "select * from hospital  where 1=1 ${where}");
		jdbcSql.put("vipquestionsquery_list",
				"SELECT i.*,d.name from vip_questions i  left join doctor d on i.doctor_code = d.code  where 1=1 ${where}");
	}

}
