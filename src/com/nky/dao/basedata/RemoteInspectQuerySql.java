package com.nky.dao.basedata;

import com.sys.jfinal.JdbcSql;

/**
 * Remote consultation.
 * @author Ken
 * @version 2016year9month7day
 */
public class RemoteInspectQuerySql extends JdbcSql {

	static {
		//sqlid  全名要规范  类名+名字 jdbcSql.put("HospitalSql_selecttest", "select * from hospital  where 1=1 ${where}");
		jdbcSql.put("remoteinspect_list", "SELECT i.id,i.code,i.vip_code,i.doctor_code,d.name,i.order_time,i.affirm_time,i.isZd,i.isDeal,i.zd_begin_time,i.zd_end_Time,i.create_time from remote_inspect i"
				+ " left join doctor d on i.doctor_code = d.code  where 1=1 ${where}"); 
	}

}