package com.sys.entity.bo;

import java.util.List;

@SuppressWarnings("rawtypes")
public class Data {
	public final static Integer  SUCCESS = 1;
	public final static Integer  ERROR = 0;
	/**
	 * 操作代码 1:成功 ,0:失败
	 */
	private Integer code=1;

	/**
	 * categories X轴信息
	 */
	private List categories;
	
	private List<DataSeries> series;

	private String msg;
	
	public Data() {}
	
	public Data(Integer code, String msg) {
		super();
		this.code = code;
		this.msg = msg;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public List getCategories() {
		return categories;
	}

	public void setCategories(List categories) {
		this.categories = categories;
	}

	public List<DataSeries> getSeries() {
		return series;
	}

	public void setSeries(List<DataSeries> series) {
		this.series = series;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

}
