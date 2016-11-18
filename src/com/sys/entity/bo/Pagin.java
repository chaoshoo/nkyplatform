package com.sys.entity.bo;

public class Pagin {

	/**
	 * 页码
	 */
	protected int pageNo = 1;
	/**
	 * 每页记录条数
	 */
	protected int pageSize = 10;
	/**
	 * 记录总条数
	 */
	protected int recCount = -1;
	/**
	 * 记录总页数
	 */
	protected int pageCount;
	/**
	 * 跳过查询的行数；
	 * 当skipNo=-1时，查询全部记录;
	 * 默认值为-1
	 */
	protected int skipNo = -1;

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
		skipNo = (this.pageNo - 1) * pageSize;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getRecCount() {
		return recCount;
	}

	public void setRecCount(int recCount) {
		this.recCount = recCount;
		if (this.recCount % pageSize == 0)
			pageCount = this.recCount / pageSize;
		else
			pageCount = this.recCount / pageSize + 1;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public int getSkipNo() {
		return skipNo;
	}

}
