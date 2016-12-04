package com.nky.entity.basedata;

import java.util.Date;

import com.sys.jfinal.JFinalEntity;

/**
 * Customer consultation topicsvip_questions_log.
 * @author Ken
 * @version 2016year9month8day Afternoon1:35:44
 */
public class VipQuestionsLogQueryEntity extends JFinalEntity {
	
	private static final long serialVersionUID = 1L;
	private String answer_code;
	private Date create_time;
	private Long vip_questions_id;
	private String answer_content;

	public VipQuestionsLogQueryEntity() {

	}
 
	public void setAnswerCode(String answer_code) {
		this.answer_code = answer_code;
	}

	public String getAnswerCode() {
		return this.answer_code;
	}

	public void setCreateTime(Date create_time) {
		this.create_time = create_time;
	}

	public Date getCreateTime() {
		return this.create_time;
	}

	public void setVipQuestionsId(Long vip_questions_id) {
		this.vip_questions_id = vip_questions_id;
	}

	public Long getVipQuestionsId() {
		return this.vip_questions_id;
	}

	public void setAnswerContent(String answer_content) {
		this.answer_content = answer_content;
	}

	public String getAnswerContent() {
		return this.answer_content;
	}
}