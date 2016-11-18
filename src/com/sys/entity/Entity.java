package com.sys.entity;

import com.sys.entity.bo.AjaxPage;

public class Entity extends Pagin {

	public void copy(AjaxPage ajaxPage) {
		this.setPageSize(ajaxPage.getPageSize());
		this.setPageNo(ajaxPage.getPageNo());
	}
}
