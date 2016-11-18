package com.sys.entity.feedback;

import java.util.Date;

import com.sys.entity.Entity;

/**
 * 意见反馈
 * @author wjx
 *
 */
public class Feedback extends Entity{
	
	private Long id;
	
	private String feedback_type;//意见反馈类型
	
	private String feedback_content;//建议内容
	
	private String contact_way;//联系方式
	
	private String is_handle;//是否处理
	
	private String remark;//备注
	
	private Date create_time;//创建时间
	
	private Date handle_time;//处理时间
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFeedback_type() {
		return feedback_type;
	}

	public void setFeedback_type(String feedback_type) {
		this.feedback_type = feedback_type;
	}

	public String getFeedback_content() {
		return feedback_content;
	}

	public void setFeedback_content(String feedback_content) {
		this.feedback_content = feedback_content;
	}

	public String getContact_way() {
		return contact_way;
	}

	public void setContact_way(String contact_way) {
		this.contact_way = contact_way;
	}

	public String getIs_handle() {
		return is_handle;
	}

	public void setIs_handle(String is_handle) {
		this.is_handle = is_handle;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Date getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public Date getHandle_time() {
		return handle_time;
	}

	public void setHandle_time(Date handle_time) {
		this.handle_time = handle_time;
	}
    
}
