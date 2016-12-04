package com.nky.entity.doctor;

import java.util.Date;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;
@TableBind(name="doctor_vip_group")
public class DoctorVipGroupEntity extends JFinalEntity {
	private	String	name	;//	Group name
	private	String	doctor_code	;//	Doctor number
	private	Date	create_time	;//	Created time
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDoctor_code() {
		return doctor_code;
	}
	public void setDoctor_code(String doctor_code) {
		this.doctor_code = doctor_code;
	}
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}
	
}