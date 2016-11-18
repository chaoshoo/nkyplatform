package com.nky.vo;

/**
 * 消息对象,用于前台ajax传送数据.
 * @author Ken
 * @version 2016年9月2日
 */
public class MessageVo {

	private Integer msgType;
	private String title;
	private String content;
	private String cardCode;
	private Integer creator;
	private Integer recivergroupid;
	private Integer total ;
	//creator,msgtype,title,content,recivercardcode,recivergroupid
	

	public Integer getMsgType() {
		return msgType;
	}

	public void setMsgType(Integer msgType) {
		this.msgType = msgType;
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

	public String getCardCode() {
		return cardCode;
	}

	public void setCardCode(String cardCode) {
		this.cardCode = cardCode;
	}

	public Integer getCreator() {
		return creator;
	}

	public void setCreator(Integer creator) {
		this.creator = creator;
	}

	public Integer getRecivergroupid() {
		return recivergroupid;
	}

	public void setRecivergroupid(Integer recivergroupid) {
		this.recivergroupid = recivergroupid;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}
	
}
