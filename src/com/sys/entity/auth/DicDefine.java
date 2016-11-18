package com.sys.entity.auth;

import java.io.Serializable;
import java.util.Date;

import com.sys.entity.Entity;

public class DicDefine extends Entity implements Serializable{
	private Integer id;
	private String dicType;
	private String dicTypeName;
	private String sysFlag;
	private String dicRemark;
	private Date dateTime;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getDicType() {
		return dicType;
	}
	public void setDicType(String dicType) {
		this.dicType = dicType;
	}
	public String getDicTypeName() {
		return dicTypeName;
	}
	public void setDicTypeName(String dicTypeName) {
		this.dicTypeName = dicTypeName;
	}
	public String getSysFlag() {
		return sysFlag;
	}
	public void setSysFlag(String sysFlag) {
		this.sysFlag = sysFlag;
	}
	public String getDicRemark() {
		return dicRemark;
	}
	public void setDicRemark(String dicRemark) {
		this.dicRemark = dicRemark;
	}
	public Date getDateTime() {
		return dateTime;
	}
	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}
}
