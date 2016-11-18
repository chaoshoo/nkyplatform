package com.sys.entity.question;

import java.util.Date;

import com.sys.entity.Entity;

/**
 * 常见问题
 * @author wjx
 *
 */
public class Question extends Entity{
	
	private Long id;
	
	private String quest_group;//问题分组
	
	private String quest_gname;//问题分组名称
	
	private String title;//问题标题
	
	private String content;//问题内容
	
	private String orders;//显示顺序
	
	private String quest_type;//类型  标记是否是热门问题
	
	private Date create_time;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getQuest_group() {
		return quest_group;
	}

	public void setQuest_group(String quest_group) {
		this.quest_group = quest_group;
	}

	public String getQuest_gname() {
		return quest_gname;
	}

	public void setQuest_gname(String quest_gname) {
		this.quest_gname = quest_gname;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getOrders() {
		return orders;
	}

	public void setOrders(String orders) {
		this.orders = orders;
	}

	public String getQuest_type() {
		return quest_type;
	}

	public void setQuest_type(String quest_type) {
		this.quest_type = quest_type;
	}

	public Date getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

}
