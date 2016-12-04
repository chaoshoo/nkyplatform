package com.sys.entity;

import com.nky.entity.doctor.DoctorEntity;
import com.nky.entity.hospital.HospitalAdminEntity;
import com.sys.entity.sys.SysUser;

public class LoginEntity {
	/**
	 * id
	 */
	int id;

	/**
	 * Login uniform code
	 */
	String codeId;

	/**
	 * Login type
	 */
	String type;

	String name;

	String roles;
	String create_time;
	//  0 无效  1 表示有效  -1 表示禁用
	String isvalid;

	public String getCreate_time() {
		return create_time;
	}

	public void setCreate_time(String create_time) {
		this.create_time = create_time;
	}

	SysUser sysUser;

	DoctorEntity doctor;

	HospitalAdminEntity hospital;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCodeId() {
		return codeId;
	}

	public void setCodeId(String codeId) {
		this.codeId = codeId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public SysUser getSysUser() {
		return sysUser;
	}

	public void setSysUser(SysUser sysUser) {
		this.sysUser = sysUser;
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	public DoctorEntity getDoctor() {
		return doctor;
	}

	public void setDoctor(DoctorEntity doctor) {
		this.doctor = doctor;
	}

	public HospitalAdminEntity getHospital() {
		return hospital;
	}

	public void setHospital(HospitalAdminEntity hospital) {
		this.hospital = hospital;
	}

	public String getIsvalid() {
		return isvalid;
	}

	public void setIsvalid(String isvalid) {
		this.isvalid = isvalid;
	}

	public Object sessionUser() {
		if (this.type == null) {
			return null;
		} else if (this.type.equals("S")) {
			return this.sysUser;
		} else if (this.type.equals("H")) {
			return this.hospital;
		} else if (this.type.equals("D")) {
			return this.doctor;
		}
		return null;
	}

}