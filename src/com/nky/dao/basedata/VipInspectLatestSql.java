package com.nky.dao.basedata;

import com.sys.jfinal.JdbcSql;

/**
 * @see VipInspectLatest
 * @author Ken
 * @version 2016year9month2day
 */
public class VipInspectLatestSql extends JdbcSql {

	static {
		//sqlid  全名要规范  类名+名字 jdbcSql.put("HospitalSql_selecttest", "select * from hospital  where 1=1 ${where}");
		jdbcSql.put("vipinspectlatest_list",
				"select id,inspect_code,kpi_code,inspect_name,inspect_time,inspect_value,inspect_is_normal from vip_inspect_latest where 1=1 ${where}");
	}

}