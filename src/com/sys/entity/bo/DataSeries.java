package com.sys.entity.bo;

import java.util.List;

public class DataSeries {
	
	private String name;
	
	private List<Object> data;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Object> getData() {
		return data;
	}
	public void setData(List<Object> data) {
		this.data = data;
	}
	
}