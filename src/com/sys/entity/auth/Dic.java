package com.sys.entity.auth;

public class Dic {
	private Integer id;
	private String dicType;
	private String dicName;
	private String dicValue;
	private String dicRemark;
	private String belongName;
	private String sysFlag;
	private String dicRemark1;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getDicRemark() {
		return dicRemark;
	}
	public void setDicRemark(String dicRemark) {
		this.dicRemark = dicRemark;
	}
	public String getBelongName() {
		return belongName;
	}
	public void setBelongName(String belongName) {
		this.belongName = belongName;
	}
	public String getSysFlag() {
		return sysFlag;
	}
	public void setSysFlag(String sysFlag) {
		this.sysFlag = sysFlag;
	}
	public String getDicRemark1() {
		return dicRemark1;
	}
	public void setDicRemark1(String dicRemark1) {
		this.dicRemark1 = dicRemark1;
	}
	public String getDicType() {
		return dicType;
	}
	public void setDicType(String dicType) {
		this.dicType = dicType;
	}
	public String getDicName() {
		return dicName;
	}
	public void setDicName(String dicName) {
		this.dicName = dicName;
	}
	public String getDicValue() {
		return dicValue;
	}
	public void setDicValue(String dicValue) {
		this.dicValue = dicValue;
	}
	
}
