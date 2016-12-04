package com.nky.entity.inspect;

import java.math.BigDecimal;
import java.util.Date;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * inspect_kpi_config_fzTest data index.
 * @author Ken
 * @version 2016year8month22day
 */
public class InspectKpiConfigFz {
	@JsonIgnore
	private Integer id;
	private String kipCode;
	private String sex;
	private Integer ageMin;
	private Integer ageMax;
	private BigDecimal fzMax;
	private BigDecimal fzMin;
	@JsonIgnore
	private Date createTime;

	public InspectKpiConfigFz() {

	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getId() {
		return this.id;
	}

	public void setKipCode(String kipCode) {
		this.kipCode = kipCode;
	}

	public String getKipCode() {
		return this.kipCode;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getSex() {
		return this.sex;
	}

	public void setAgeMin(Integer ageMin) {
		this.ageMin = ageMin;
	}

	public Integer getAgeMin() {
		return this.ageMin;
	}

	public void setAgeMax(Integer ageMax) {
		this.ageMax = ageMax;
	}

	public Integer getAgeMax() {
		return this.ageMax;
	}

	public void setFzMax(BigDecimal fzMax) {
		this.fzMax = fzMax;
	}

	public BigDecimal getFzMax() {
		return this.fzMax;
	}

	public void setFzMin(BigDecimal fzMin) {
		this.fzMin = fzMin;
	}

	public BigDecimal getFzMin() {
		return this.fzMin;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getCreateTime() {
		return this.createTime;
	}
	
	public String toString() {
		return ReflectionToStringBuilder.toString(this);
	}
}