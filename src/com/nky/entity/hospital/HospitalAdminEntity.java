package com.nky.entity.hospital;

import java.util.Date;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;

@TableBind(name="hospital_admin")
public class HospitalAdminEntity extends JFinalEntity{
	private	String	hospital_code	;//	医院编号
	private	String	tel	;//	管理员手机号
	private	String	pwd	;//	管理员密码
	private	Integer	isvalid	;//	是否有效,1有效，0无效
	private	Date	create_time	;//	创建时间
	private String username;
	public String getHospital_code() {
		return hospital_code;
	}
	public void setHospital_code(String hospital_code) {
		this.hospital_code = hospital_code;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public Integer getIsvalid() {
		return isvalid;
	}
	public void setIsvalid(Integer isvalid) {
		this.isvalid = isvalid;
	}
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
}
