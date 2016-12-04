package com.nky.vo;

/**
 * Check list of details，Such as pulse rate，Diastolic Blood Pressure.
 * @author Ken
 * @version 2016year9month27day
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