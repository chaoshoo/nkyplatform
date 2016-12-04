package com.sys.entity.feedback;

import java.util.Date;

import com.sys.entity.Entity;

/**
 * Feedback
 * @author wjx
 *
 */
public class Feedback extends Entity{
	
	private Long id;
	
	private String feedback_type;//Opinion feedback type
	
	private String feedback_content;//Recommended content
	
	private String contact_way;//Contact ]
	
	private String is_handle;//Whether to deal with
	
	private String remark;//Remarks
	
	private Date create_time;//Created time
	
	private Date handle_time;//processing time
	
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