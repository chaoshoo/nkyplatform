package com.nky.dao.basedata;

import com.sys.jfinal.JdbcSql;

/**
 * 用户咨询详情查询.
 * @author Ken
 * @version 2016年9月8日 下午1:38:29
 */
public class VipQuestionsLogQuerySql extends JdbcSql {

	static {
		//sqlid  全名要规范  类名+名字 jdbcSql.put("HospitalSql_selecttest", "select * from hospital  where 1=1 ${where}");
		jdbcSql.put("vipquestionslogquery_list", "select * from vip_questions_log where 1=1 ${where}");
	}

}
