package com.sys.entity.bo;

import com.sys.entity.Pagin;

public class AjaxPage extends Pagin {

	/**
	 * jQuery Ajax页码 
	 */
	private int page = 1;
	/**
	 * jQuery Ajax页面大小
	 */
	private int rows = 10;

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
		this.setPageNo(page);
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
		this.setPageSize(rows);
	}

}
