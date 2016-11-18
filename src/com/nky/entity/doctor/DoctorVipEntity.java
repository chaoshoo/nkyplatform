package com.nky.entity.doctor;

import java.util.Date;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;
@TableBind(name="doctor_vip")
public class DoctorVipEntity extends JFinalEntity {
	private	String	doctor_code	;//	医生编号
	private	String	vip_code	;//	会员编号
	private	Long	group_id	;//	医生会员组
	private	Date	create_time	;//	创建时间
	public String getDoctor_code() {
		return doctor_code;
	}
	public void setDoctor_code(String doctor_code) {
		this.doctor_code = doctor_code;
	}
	public String getVip_code() {
		return vip_code;
	}
	public void setVip_code(String vip_code) {
		this.vip_code = vip_code;
	}
	public Long getGroup_id() {
		return group_id;
	}
	public void setGroup_id(Long group_id) {
		this.group_id = group_id;
	}
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}
	
}
