package com.sys.entity.sys;

import java.util.Date;

import com.alibaba.fastjson.JSONObject;
import com.sys.entity.Entity;

public class SysUser extends Entity {

	// `sys_user_id` bigint(64) NOT NULL AUTO_INCREMENT,
	private Integer userId;

	// `user_name` varchar(45) DEFAULT NULL COMMENT '用户名',
	private String userName;

	// `user_pwd` varchar(65) DEFAULT NULL COMMENT '密码',
	private String userPwd;

	// `user_mail` varchar(45) DEFAULT NULL COMMENT '账号（邮箱）',
	private String userMail;

	// `role_id` bigint(64) DEFAULT NULL COMMENT '角色id',
	private String roleId;

	// `created_time` datetime DEFAULT NULL COMMENT '创建时间',
	private Date createdTime;

	// `created_by` bigint(64) DEFAULT '0' COMMENT '创建人id',
	private String createdBy;

	// `updated_time` datetime DEFAULT NULL COMMENT '更新时间',
	private Date updatedTime;

	// `updated_by` bigint(64) DEFAULT '0' COMMENT '更新人id',
	private String updatedBy;

	// `is_effective` bigint(1) DEFAULT '1' COMMENT '0:无效 1：有效',
	private Integer isEffective;

	private String partnerId; // Merchant number

	private String partnerName; // Merchant name

	private String departmentId; // departmentid
	
	/**
	 * Department name
	 */
	private String group_name;
	
	/**
	 * post
	 */
	private String sys_job;
	
	/**
	 * In service state
	 */
	private String sys_state;
	
	/**
	 * System user code
	 */
	private String sys_id;
	
	/**
	 * Remarks
	 */
	private String remark;

	public String toString() {
		return JSONObject.toJSON(this).toString();
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPwd() {
		return userPwd;
	}

	public void setUserPwd(String userPwd) {
		this.userPwd = userPwd;
	}

	public String getUserMail() {
		return userMail;
	}

	public void setUserMail(String userMail) {
		this.userMail = userMail;
	}

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getUpdatedTime() {
		return updatedTime;
	}

	public void setUpdatedTime(Date updatedTime) {
		this.updatedTime = updatedTime;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Integer getIsEffective() {
		return isEffective;
	}

	public void setIsEffective(Integer isEffective) {
		this.isEffective = isEffective;
	}

	public String getPartnerId() {
		return partnerId;
	}

	public void setPartnerId(String partnerId) {
		this.partnerId = partnerId;
	}

	public String getPartnerName() {
		return partnerName;
	}

	public void setPartnerName(String partnerName) {
		this.partnerName = partnerName;
	}

	public String getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public String getGroup_name() {
		return group_name;
	}

	public void setGroup_name(String group_name) {
		this.group_name = group_name;
	}

	public String getSys_job() {
		return sys_job;
	}

	public void setSys_job(String sys_job) {
		this.sys_job = sys_job;
	}

	public String getSys_state() {
		return sys_state;
	}

	public void setSys_state(String sys_state) {
		this.sys_state = sys_state;
	}

	public String getSys_id() {
		return sys_id;
	}

	public void setSys_id(String sys_id) {
		this.sys_id = sys_id;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}