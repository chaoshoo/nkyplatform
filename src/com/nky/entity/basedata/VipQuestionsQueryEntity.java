package com.nky.entity.basedata;

import java.util.Date;

import com.sys.jfinal.JFinalEntity;

/**
 * Customer consultation theme vip_questions.
 * @author Ken
 * @version 2016year9month8day Afternoon1:35:30
 */
public class VipQuestionsQueryEntity extends JFinalEntity {

	private static final long serialVersionUID = 1L;
	private String vip_code;
	private String doctor_code;
	private String name;
	private String title;
	private String content;
	private String attachement;
	private Date create_time;
	private String status;

	public VipQuestionsQueryEntity() {

	}

	public String getVip_code() {
		return vip_code;
	}

	public void setVip_code(String vip_code) {
		this.vip_code = vip_code;
	}

	public String getDoctor_code() {
		return doctor_code;
	}

	public void setDoctor_code(String doctor_code) {
		this.doctor_code = doctor_code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public void setVipCode(String vip_code) {
		this.vip_code = vip_code;
	}

	public String getVipCode() {
		return this.vip_code;
	}

	public void setDoctorCode(String doctor_code) {
		this.doctor_code = doctor_code;
	}

	public String getDoctorCode() {
		return this.doctor_code;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTitle() {
		return this.title;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getContent() {
		return this.content;
	}

	public void setAttachement(String attachement) {
		this.attachement = attachement;
	}

	public String getAttachement() {
		return this.attachement;
	}

	public void setCreateTime(Date create_time) {
		this.create_time = create_time;
	}

	public Date getCreateTime() {
		return this.create_time;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}