package com.nky.dao.hospital;

import com.sys.jfinal.JdbcSql;

public class HospitalSql extends JdbcSql{
	static{
		//sqlid  全名要规范  类名+名字
		//jdbcSql.put("HospitalSql_selecttest", "select * from hospital");
		jdbcSql.put("HosPital_list", "select h.id,h.code,h.name,h.lever,h.create_time,a.full_name as areaname " 
				+ " from hospital h left join t_area a  on h.area=a.id where 1=1 ${where}");
	}
}