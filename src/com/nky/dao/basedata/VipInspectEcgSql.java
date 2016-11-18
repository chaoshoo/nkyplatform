package com.nky.dao.basedata;

import com.sys.jfinal.JdbcSql;

/**
 * ecg列表数据
 * @author Ken
 * @version 2016年10月27日 下午9:14:35
 */
public class VipInspectEcgSql extends JdbcSql {

	static {
		//sqlid  全名要规范  类名+名字 jdbcSql.put("HospitalSql_selecttest", "select * from hospital  where 1=1 ${where}");
		jdbcSql.put("vipinspectecg_list",
				"select id,inspect_time,analyzeResultStr from vip_inspect_data_ecg where 1=1 ${where}");
	}

}
