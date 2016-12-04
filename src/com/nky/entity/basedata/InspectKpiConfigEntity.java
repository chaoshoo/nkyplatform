package com.nky.entity.basedata;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;
import com.sys.util.Reflections;

/**
 * Inspection index.
 * @author Ken
 * @version 2016year9month1day
 */
@TableBind(name = "inspect_kpi_config")
public class InspectKpiConfigEntity extends JFinalEntity {

	private static final long serialVersionUID = 6687411898304394916L;
	private String code;
	private String name;
	private Integer isfz;
	private String unit;
	private String inspect_code;
	private String inspectName;
	private String des;
	private String kpi_max;
	private String kpi_min;
	private String kpi_pic;

	private boolean child = false;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getIsfz() {
		return isfz;
	}

	public void setIsfz(Integer isfz) {
		this.isfz = isfz;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getInspect_code() {
		return inspect_code;
	}

	public void setInspect_code(String inspect_code) {
		this.inspect_code = inspect_code;
	}

	public String getInspectName() {
		return inspectName;
	}

	public void setInspectName(String inspectName) {
		this.inspectName = inspectName;
	}

	public String getDes() {
		return des;
	}

	public void setDes(String des) {
		this.des = des;
	}

	public String getKpi_max() {
		return kpi_max;
	}

	public void setKpi_max(String kpi_max) {
		this.kpi_max = kpi_max;
	}

	public String getKpi_min() {
		return kpi_min;
	}

	public void setKpi_min(String kpi_min) {
		this.kpi_min = kpi_min;
	}

	public String getKpi_pic() {
		return kpi_pic;
	}

	public void setKpi_pic(String kpi_pic) {
		this.kpi_pic = kpi_pic;
	}

	public boolean isChild() {
		return child;
	}

	public void setChild(boolean child) {
		this.child = child;
	}

	public String toString() {
		return ReflectionToStringBuilder.toString(this);
	}

	public String tableName() throws Exception {
		return Reflections.getAnnotationTableBind(getClass());
	}
}