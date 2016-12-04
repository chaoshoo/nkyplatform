package com.sys.entity;

public class Pagin {

	/**
	 * Page number
	 */
	protected int pageNo = 1;
	/**
	 * PageSize
	 */
	protected int pageSize = 10;
	/**
	 * Record the total number of
	 */
	protected int recCount = -1;
	/**
	 * Record the total number of pages
	 */
	protected int pageCount;
	/**
	 * Number of rows to skip；
	 * WhenskipNo=-1time，Query all records;
	 * Default value is-1
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