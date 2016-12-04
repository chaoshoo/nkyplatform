package com.nky.vo;

import java.util.List;

/**
 * Check large classes。asC01.
 * @author Ken
 * @version 2016year9month27day
 */
public class InspectCodeMeta implements Comparable<InspectCodeMeta> {

	private String code;
	private String name;

	private List<InspectDetailMeta> detail;

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

	public List<InspectDetailMeta> getDetail() {
		return detail;
	}

	public void setDetail(List<InspectDetailMeta> detail) {
		this.detail = detail;
	}

	@Override
	public int compareTo(InspectCodeMeta arg0) {
		return this.getCode().compareTo(arg0.getCode());
	}
}