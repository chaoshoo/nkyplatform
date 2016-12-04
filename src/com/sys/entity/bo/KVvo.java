package com.sys.entity.bo;

/**
 * The key to.
 * @author Ken
 * @version 2016year10month12day
 */
public class KVvo {

	private String key;
	private String value;

	public KVvo() {
		super();
	}

	public KVvo(String key, String value) {
		super();
		this.key = key;
		this.value = value;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}