package com.nky.entity.basedata;

import java.util.Date;

//message_center
public class MessageCenter {
	private Long id;
	private Integer msg_type;
	private Long message_id;
	private Long reciver;
	private Date create_time;
	private Date send_time;

	public MessageCenter() {

	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return this.id;
	}

	public void setMsg_type(Integer msg_type) {
		this.msg_type = msg_type;
	}

	public Integer getMsg_type() {
		return this.msg_type;
	}

	public void setMessage_id(Long message_id) {
		this.message_id = message_id;
	}

	public Long getMessage_id() {
		return this.message_id;
	}

	public void setReciver(Long reciver) {
		this.reciver = reciver;
	}

	public Long getReciver() {
		return this.reciver;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public Date getCreate_time() {
		return this.create_time;
	}

	public void setSend_time(Date send_time) {
		this.send_time = send_time;
	}

	public Date getSend_time() {
		return this.send_time;
	}
}
