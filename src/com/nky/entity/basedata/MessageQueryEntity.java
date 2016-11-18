package com.nky.entity.basedata;

import java.util.Date;

import com.sys.jfinal.JFinalEntity;
import com.sys.util.Reflections;

/**
 * message消息查询，用于客户管理处的查询.
 * @author Ken
 * @version 2016年9月8日 下午2:05:20
 */
public class MessageQueryEntity extends JFinalEntity {

	private static final long serialVersionUID = -1131303624247580748L;
	private Integer msg_type;
	private Long creator;
	private String title;
	private String content;
	private Integer isvalid;
	private Date create_time;
	private Date send_time;

	public MessageQueryEntity() {

	}

	public void setMsg_type(Integer msg_type) {
		this.msg_type = msg_type;
	}

	public Integer getMsg_type() {
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

	public void setIsvalid(Integer isvalid) {
		this.isvalid = isvalid;
	}

	public Integer getIsvalid() {
		return this.isvalid;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public Date getCreate_time() {
		return this.create_time;
	}

	public Date getSend_time() {
		return send_time;
	}

	public void setSend_time(Date send_time) {
		this.send_time = send_time;
	}

	public String tableName() throws Exception {
		return Reflections.getAnnotationTableBind(getClass());
	}
}
