package com.nky.dao.basedata;

import com.sys.jfinal.JdbcSql;

/**
 * customer management.
 * @author Ken
 * @version 2016year8month26day Afternoon9:38:59
 */
public class VipSql extends JdbcSql {

	public static final String VIP_FILES = "select  id,vip_code,card_code,login_account,mobile,login_password,heard_img_url,isvalid,papers_type,papers_num,nick_name,real_name,account_mail,weight,height,sex,area,address,birthday, "
			+ "  age,post_code,phone,ill_history,gm,qq,wxopenid,android_tv_token_id,android_tv_channel_id,modify_time datetime,create_time from t_vip  where 1=1 ";

	static {
		//sqlid  全名要规范  类名+名字 jdbcSql.put("HospitalSql_selecttest", "select * from hospital  where 1=1 ${where}");
		jdbcSql.put("vipc06_list", "select sg,vc,bld,ph,ubg,nit,leu,bil,pro,ket,glu,INSPECT_TIME,ID from vip_inspect_data where 1=1 ${where}");
		jdbcSql.put("vip_list", "select  " + VIP_FILES + " from t_vip  where 1=1 ${where}");
		jdbcSql.put("vip_list_byhospitalcode", VIP_FILES + " ${where} and vip_code in "
				+ "(select dv.vip_code from doctor_vip dv,doctor d where dv.doctor_code=d.code and d.hospital_code=?)");
		jdbcSql.put("vip_list_bydoctorcode",VIP_FILES + " ${where} and vip_code in (select vip_code from doctor_vip where doctor_code=?)"); 
		jdbcSql.put("vip_list_full", VIP_FILES + " ${where} ");
		
		jdbcSql.put("vip_mb", "select  id,ischronic,chronic_type,vip_id,yb_type,ill_name,ill_type,inspect_time,ill_med from t_vip_chronic where vip_id = ? ");
		
	}

}