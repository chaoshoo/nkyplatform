package com.nky.vo;

/**
 * 检查详情的列表，如脉率，舒张压.
 * @author Ken
 * @version 2016年9月27日
 */
public class InspectDetailMeta {

	private String code;
	private String name;
	private String dateTime;
	private String value;
	private String unit;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

}
