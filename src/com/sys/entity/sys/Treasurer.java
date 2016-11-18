package com.sys.entity.sys;

import java.io.Serializable;
import java.util.Date;

import com.sys.entity.Entity;

public class Treasurer extends Entity implements Serializable {

	/**会计id*/
	private Integer treasurerId;
	/**会计名字*/
	private String treasurerName;
	/**会计类型*/
	private String treasurerType;
	/**会计头像*/
	private String treasurerPhoto;
	/**会计描述*/
	private String treasurerDesc;
	/**创建时间*/
	private Date createDate;
	public Integer getTreasurerId() {
		return treasurerId;
	}
	public void setTreasurerId(Integer treasurerId) {
		this.treasurerId = treasurerId;
	}
	public String getTreasurerName() {
		return treasurerName;
	}
	public void setTreasurerName(String treasurerName) {
		this.treasurerName = treasurerName;
	}
	public String getTreasurerType() {
		return treasurerType;
	}
	public void setTreasurerType(String treasurerType) {
		this.treasurerType = treasurerType;
	}
	public String getTreasurerPhoto() {
		return treasurerPhoto;
	}
	public void setTreasurerPhoto(String treasurerPhoto) {
		this.treasurerPhoto = treasurerPhoto;
	}
	public String getTreasurerDesc() {
		return treasurerDesc;
	}
	public void setTreasurerDesc(String treasurerDesc) {
		this.treasurerDesc = treasurerDesc;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	
	
	
	

	
}
