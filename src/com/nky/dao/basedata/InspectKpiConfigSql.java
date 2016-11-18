package com.nky.dao.basedata;

import com.sys.jfinal.JdbcSql;

/**
 * @see InspectKpiConfig
 * @author Ken
 * @version 2016年9月1日
 */
public class InspectKpiConfigSql extends JdbcSql {

	static {
		//sqlid  全名要规范  类名+名字 jdbcSql.put("HospitalSql_selecttest", "select * from hospital  where 1=1 ${where}");
		jdbcSql.put("inspectkpiconfig_list",
				"select id,code,name,isfz,unit,inspect_code,des,kpi_max,kpi_min,kpi_pic from inspect_kpi_config where 1=1 ${where}");
	}

}
