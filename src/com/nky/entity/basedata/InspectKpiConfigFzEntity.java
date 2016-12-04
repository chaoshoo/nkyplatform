package com.nky.entity.basedata;

import java.math.BigDecimal;
import java.util.Date;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;
import com.sys.util.Reflections;

/**
 * inspect_kpi_config_fz Detection index.
 * @author Ken
 * @version 2016year9month2day
 */
@TableBind(name = "inspect_kpi_config_fz")
public class InspectKpiConfigFzEntity extends JFinalEntity {

	private static final long serialVersionUID = -8261330782806496683L;
	private String kip_code;
	private String sex;
	private Integer age_min;
	private Integer age_max;
	private BigDecimal fz_max;
	private BigDecimal fz_min;
	private Date create_time;

	public InspectKpiConfigFzEntity() {

	}

	public void setKip_code(String kip_code) {
		this.kip_code = kip_code;
	}

	public String getKip_code() {
		return this.kip_code;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getSex() {
		return this.sex;
	}

	public void setAge_min(Integer age_min) {
		this.age_min = age_min;
	}

	public Integer getAge_min() {
		return this.age_min;
	}

	public void setAge_max(Integer age_max) {
		this.age_max = age_max;
	}

	public Integer getAge_max() {
		return this.age_max;
	}

	public void setFz_max(BigDecimal fz_max) {
		this.fz_max = fz_max;
	}

	public BigDecimal getFz_max() {
		return this.fz_max;
	}

	public void setFz_min(BigDecimal fz_min) {
		this.fz_min = fz_min;
	}

	public BigDecimal getFz_min() {
		return this.fz_min;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public Date getCreate_time() {
		return this.create_time;
	}

	public String toString() {
		return ReflectionToStringBuilder.toString(this);
	}

	public String tableName() throws Exception {
		return Reflections.getAnnotationTableBind(getClass());
	}
}