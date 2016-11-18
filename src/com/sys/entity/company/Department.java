package com.sys.entity.company;

import java.util.Date;

import com.sys.entity.Entity;

public class Department extends Entity{

	private String id;

	private Date createTime;

	private Date editTime;

	private String code;

	private String name;

	private Integer status;

	private Integer isDelete;

	private String description;
	private Integer tId;
	private Integer pId;



	public Integer gettId() {
		return tId;
	}

	public void settId(Integer tId) {
		this.tId = tId;
	}

	public Integer getpId() {
		return pId;
	}

	public void setpId(Integer pId) {
		this.pId = pId;
	}

	private String remark;

	public String getId() {

		return id;
	}

	public void setId(String id) {

		this.id = id;
	}

	public Date getCreateTime() {

		return createTime;
	}

	public void setCreateTime(Date createTime) {

		this.createTime = createTime;
	}

	public Date getEditTime() {

		return editTime;
	}

	public void setEditTime(Date editTime) {

		this.editTime = editTime;
	}


	public String getName() {

		return name;
	}

	public void setName(String name) {

		this.name = name;
	}

	public String getCode() {

		return code;
	}

	public void setCode(String code) {

		this.code = code;
	}

	public Integer getStatus() {

		return status;
	}

	public void setStatus(Integer status) {

		this.status = status;
	}

	public Integer getIsDelete() {

		return isDelete;
	}

	public void setIsDelete(Integer isDelete) {

		this.isDelete = isDelete;
	}


	public String getDescription() {

		return description;
	}

	public void setDescription(String description) {

		this.description = description;
	}

	public String getRemark() {

		return remark;
	}

	public void setRemark(String remark) {

		this.remark = remark;
	}


}