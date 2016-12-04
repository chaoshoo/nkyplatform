package com.nky.entity.basedata;

import java.util.Date;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;

import com.sys.jfinal.JFinalEntity;

/**
 * Remote consultation table.
 * @author Ken
 * @version 2016year9month7day
 */
public class RemoteInspectQueryEntity extends JFinalEntity {

	private static final long serialVersionUID = 1265392322207384782L;
	private String code;
	private String vip_code;
	private String doctor_code;
	private String name;
	private String hospital_code;
	private Date order_time;
	private Date affirm_time;
	private Integer isZd;
	private Integer isDeal;
	private Date zd_begin_time;
	private Date zd_end_Time;
	private Date create_time;

	public RemoteInspectQueryEntity() {

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getCode() {
		return this.code;
	}

	public void setVip_code(String vip_code) {
		this.vip_code = vip_code;
	}

	public String getVip_code() {
		return this.vip_code;
	}

	public void setDoctor_code(String doctor_code) {
		this.doctor_code = doctor_code;
	}

	public String getDoctor_code() {
		return this.doctor_code;
	}

	public void setHospital_code(String hospital_code) {
		this.hospital_code = hospital_code;
	}

	public String getHospital_code() {
		return this.hospital_code;
	}

	public void setOrder_time(Date order_time) {
		this.order_time = order_time;
	}

	public Date getOrder_time() {
		return this.order_time;
	}

	public void setAffirm_time(Date affirm_time) {
		this.affirm_time = affirm_time;
	}

	public Date getAffirm_time() {
		return this.affirm_time;
	}

	public void setIsZd(Integer isZd) {
		this.isZd = isZd;
	}

	public Integer getIsZd() {
		return this.isZd;
	}

	public void setIsDeal(Integer isDeal) {
		this.isDeal = isDeal;
	}

	public Integer getIsDeal() {
		return this.isDeal;
	}

	public void setZd_begin_time(Date zd_begin_time) {
		this.zd_begin_time = zd_begin_time;
	}

	public Date getZd_begin_time() {
		return this.zd_begin_time;
	}

	public void setZd_end_Time(Date zd_end_Time) {
		this.zd_end_Time = zd_end_Time;
	}

	public Date getZd_end_Time() {
		return this.zd_end_Time;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public Date getCreate_time() {
		return this.create_time;
	}

	@Override
	public String toString() {
		return ReflectionToStringBuilder.toString(this);
	}
}