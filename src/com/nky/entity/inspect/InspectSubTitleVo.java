package com.nky.entity.inspect;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;

/**
 * key object.
 * @author Ken
 * @version 2016year9month7day
 */
public class InspectSubTitleVo {

	private String code;
	private String name;
	private String title;
	private String info;
	private String unit;
	private boolean checked = false;

	public InspectSubTitleVo() {
		super();
	}

	public InspectSubTitleVo(String code, String name, String title, String unit) {
		super();
		this.code = code;
		this.name = name;
		this.title = title;
		this.unit = unit;
	}

	public InspectSubTitleVo(String code, String name, String title, String unit, String info) {
		super();
		this.code = code;
		this.name = name;
		this.title = title;
		this.info = info;
		this.unit = unit;
	}

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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	@Override
	public String toString() {
		return ReflectionToStringBuilder.toString(this);
	}

}