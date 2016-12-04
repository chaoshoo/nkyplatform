package com.sys.util;

import java.util.List;

class PageMiniUi{

	public static final int DEFAULT_PAGE_SIZE = 30;
	protected int pageSize = DEFAULT_PAGE_SIZE;
	protected int pageIndex=0;//from0start
	protected int total;
	protected List<?> data;
	
	/**  
	 * ObtainpageSize
	 * @return pageSize pageSize  
	 */
	public int getPageSize() {
		return pageSize;
	}
	/** 
	 * ConfigpageSize 
	 * @param pageSize pageSize 
	 */
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	/**  
	 * ObtainpageIndex
	 * @return pageIndex pageIndex  
	 */
	public int getPageIndex() {
		return pageIndex;
	}
	/** 
	 * ConfigpageIndex 
	 * @param pageIndex pageIndex 
	 */
	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}
	/**  
	 * Obtaintotal
	 * @return total total  
	 */
	public int getTotal() {
		return total;
	}
	/** 
	 * Configtotal 
	 * @param total total 
	 */
	public void setTotal(int total) {
		this.total = total;
	}
	/**  
	 * Obtaindata
	 * @return data data  
	 */
	public List<?> getData() {
		return data;
	}
	/** 
	 * Configdata 
	 * @param data data 
	 */
	public void setData(List<?> data) {
		this.data = data;
	}
	
}