package com.sys.entity.url;

import java.util.Date;

import com.sys.entity.Entity;

/**
 * 系统图片URL配置管理
 * @author
 *
 */
public class UrlPic extends Entity{
	
	private Long id;
	
	private String title;
	
	private String option_id;
	
	private String url;
	
	private String url_pic_type;
	
	private String sort;
	
	private Date create_time;
	
	private String url_link;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getOption_id() {
		return option_id;
	}

	public void setOption_id(String option_id) {
		this.option_id = option_id;
	}
	
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUrl_pic_type() {
		return url_pic_type;
	}

	public void setUrl_pic_type(String url_pic_type) {
		this.url_pic_type = url_pic_type;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public Date getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public String getUrl_link() {
		return url_link;
	}

	public void setUrl_link(String url_link) {
		this.url_link = url_link;
	}

}
