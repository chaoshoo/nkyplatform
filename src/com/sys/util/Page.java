package com.sys.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Page extends PageMiniUi {

	public static final int DEFAULT_PAGE_SIZE = 20;

	private int pageSize = DEFAULT_PAGE_SIZE;
	private int pageNow=1;//from1start
	
	private int begin=0;
	private int end=0;
	
	private int pages;//The number of pages
	private int count;//Total number
	
	private Map<String,Object> atrrs=new HashMap<String,Object>();
	
	private String sortField;
	private String sortOrder;
	private String sort;
	
	public Page(){
		
	}
	public Page(int pageIndex,int pageSize){
		this.setPageIndex(pageIndex);
		this.setPageSize(pageSize);
	}
	public Page(int count,List<?> data){
		setCount(count);
		setData(data);
	}
	
	/**  
	 * Obtainsort
	 * @return sort sort  
	 */
	public String getSort() {
		return sort;
	}
	/** 
	 * Configsort 
	 * @param sort sort 
	 */
	public void setSort(String sort) {
		this.sort = sort;
	}

	
	public Map<String, Object> getAtrrs() {
		return atrrs;
	}
	public void setAtrrs(Map<String, Object> atrrs) {
		this.atrrs = atrrs;
	}
	public int getPageSize() {
		return pageSize;
	}
	public int getBegin() {
		return begin;
	}
	
	public int getEnd() {
		if(this.end==0){
			this.end=this.pageSize;
		}
		return end;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
		setCNT();
	}

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		setPageNow(pageIndex+1);
		this.pageIndex=pageIndex;
	}

	public int getPages() {
		return pages;
	}

	public void setPages(int pages) {
		this.pages = pages;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count=count;
		setTotal(count);
		setCNT();
	}

	public String getSortField() {
		return sortField;
	}

	public void setSortField(String sortField) {
		this.sortField = sortField;
	}

	public String getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}

	/**  
	 * ObtainpageNow
	 * @return pageNow pageNow  
	 */
	public int getPageNow() {
		return pageNow;
	}
	/** 
	 * ConfigpageNow 
	 * @param pageNow pageNow 
	 */
	public void setPageNow(int pageNow) {
		if(pageNow<=1){
			pageNow=1;
		}
		this.pageNow = pageNow;
		this.pageIndex=pageNow-1;
	}
	
	
	private void setCNT(){
		pageSize = pageSize<0?1:pageSize;
		pages=count%pageSize==0?count/pageSize:count/pageSize+1;
		if(getPageNow()<=1){
			setPageNow(1);
		}
		begin=pageIndex*pageSize;
		end=begin+pageSize;
	}
}