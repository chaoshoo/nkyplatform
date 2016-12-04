package com.sys.entity.parameter;

import java.util.Date;

import com.alibaba.fastjson.JSONObject;
import com.sys.entity.Entity;

public class SysParameter extends Entity {

	private Integer id;  //Primary key
	
	private String code;  //Code

	private String name;  //Name

	private String defaultValue;   //Default value
	
	private Integer soft;  //Sort number
	
	private String description;   //Explain
	
	private Integer isEffective;  //Whether to open
	
	private Date createTime;  //Modification time
	

	public String toString(){
		return JSONObject.toJSON(this).toString();
	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}
	

	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDefaultValue() {
		return defaultValue;
	}


	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}


	public String getCode() {
		return code;
	}


	public void setCode(String code) {
		this.code = code;
	}


	public Integer getSoft() {
		return soft;
	}


	public void setSoft(Integer soft) {
		this.soft = soft;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}
	

	public Integer getIsEffective() {
		return isEffective;
	}


	public void setIsEffective(Integer isEffective) {
		this.isEffective = isEffective;
	}


	public Date getCreateTime() {
		return createTime;
	}


	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	

}