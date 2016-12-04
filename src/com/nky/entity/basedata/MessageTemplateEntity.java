package com.nky.entity.basedata;

import java.util.Date;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;
import com.sys.util.Reflections;

/**
 * message Template.
 * @author Ken
 * @version 2016year9month8day Afternoon9:39:58
 */
@TableBind(name = "message_template")
public class MessageTemplateEntity extends JFinalEntity {
	
	private static final long serialVersionUID = 1L;
	private Integer msg_type;
	private Long creator;
	private String title;
	private String content;
	private String creator_type;
	private Date create_time;

	public MessageTemplateEntity() {

	}

	public void setMsgType(Integer msg_type) {
		this.msg_type = msg_type;
	}

	public Integer getMsgType() {
		return this.msg_type;
	}

	public void setCreator(Long creator) {
		this.creator = creator;
	}

	public Long getCreator() {
		return this.creator;
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

	public Integer getMsg_type() {
		return msg_type;
	}

	public void setMsg_type(Integer msg_type) {
		this.msg_type = msg_type;
	}

	public String getCreator_type() {
		return creator_type;
	}

	public void setCreator_type(String creator_type) {
		this.creator_type = creator_type;
	}

	public Date getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public void setCreateTime(Date create_time) {
		this.create_time = create_time;
	}

	public Date getCreateTime() {
		return this.create_time;
	}

	public String tableName() throws Exception {
		return Reflections.getAnnotationTableBind(getClass());
	}
	
	@Override
	public String toString() {
		return ReflectionToStringBuilder.toString(this);
	}
}