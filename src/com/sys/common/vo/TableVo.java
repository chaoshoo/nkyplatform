package com.sys.common.vo;

public class TableVo {
	// 字段名称
	private String column;

	// 字段值
	private String value;

	// 是否为主键
	private boolean isPrimkey;

	// 表名
	private String tableName;

	public TableVo() {
	}

	public TableVo(String column, String value, boolean isPrimary,String tableName) {
		this.column = column;
		this.value = value;
		this.isPrimkey = isPrimary;
		this.tableName = tableName;
	}

	public String getColumn() {
		return column;
	}

	public void setColumn(String column) {
		this.column = column;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public boolean isPrimkey() {
		return isPrimkey;
	}

	public void setPrimkey(boolean isPrimkey) {
		this.isPrimkey = isPrimkey;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

}