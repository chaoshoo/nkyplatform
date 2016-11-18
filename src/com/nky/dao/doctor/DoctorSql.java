package com.nky.dao.doctor;

import com.sys.jfinal.JdbcSql;

public class DoctorSql extends JdbcSql{
	static{
		//sqlid  全名要规范  类名+名字
		//jdbcSql.put("HospitalSql_selecttest", "select * from hospital");
		jdbcSql.put("Doctor_list", "select d.*, h.name as hospitalname from doctor d ,hospital h "
				+ " where d.hospital_code=h.code  ${where}" );
	}
}
