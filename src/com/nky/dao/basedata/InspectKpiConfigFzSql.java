package com.nky.dao.basedata;

import com.sys.jfinal.JdbcSql;

/**
 * @see InspectKpiConfigFz
 * @author Ken
 * @version 2016年9月2日
 */
public class InspectKpiConfigFzSql extends JdbcSql {

	static {
		//sqlid  全名要规范  类名+名字 jdbcSql.put("HospitalSql_selecttest", "select * from hospital  where 1=1 ${where}");
		jdbcSql.put("inspectkpiconfigfz_list",
				"select id,kip_code,sex,age_min,age_max,fz_min,fz_max,create_time  from inspect_kpi_config_fz  where 1=1 ${where}");
	}

}
