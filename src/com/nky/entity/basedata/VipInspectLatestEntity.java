package com.nky.entity.basedata;

import java.util.Date;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;
import com.sys.util.Reflections;

/**
 * 客户最新检查数据.
 * select id,inspect_code,kpi_code,inspect_name,inspect_time,inspect_value,inspect_is_normal from vip_inspect_latest where card_code = '420222198101010001' 
 * @author Ken
 * @version 2016年9月2日
 */
@TableBind(name = "vip_inspect_latest")
public class VipInspectLatestEntity extends JFinalEntity {

	private static final long serialVersionUID = -6656380548369057434L;
	private String inspect_code;
	private String kpi_code;
	private String inspect_name;
	private Date inspect_time;
	private String inspect_value;
	private String card_code;
	private Date create_time;
	private String inspect_is_normal;

	public VipInspectLatestEntity() {

	}

	public void setInspect_code(String inspect_code) {
		this.inspect_code = inspect_code;
	}

	public String getInspect_code() {
		return this.inspect_code;
	}

	public void setKpi_code(String kpi_code) {
		this.kpi_code = kpi_code;
	}

	public String getKpi_code() {
		return this.kpi_code;
	}

	public void setInspect_name(String inspect_name) {
		this.inspect_name = inspect_name;
	}

	public String getInspect_name() {
		return this.inspect_name;
	}

	public void setInspect_time(Date inspect_time) {
		this.inspect_time = inspect_time;
	}

	public Date getInspect_time() {
		return this.inspect_time;
	}

	public void setInspect_value(String inspect_value) {
		this.inspect_value = inspect_value;
	}

	public String getInspect_value() {
		return this.inspect_value;
	}

	public void setCard_code(String card_code) {
		this.card_code = card_code;
	}

	public String getCard_code() {
		return this.card_code;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public Date getCreate_time() {
		return this.create_time;
	}

	public void setInspect_is_normal(String inspect_is_normal) {
		this.inspect_is_normal = inspect_is_normal;
	}

	public String getInspect_is_normal() {
		return this.inspect_is_normal;
	}

	@Override
	public String toString() {
		return ReflectionToStringBuilder.toString(this);
	}

	public String tableName() throws Exception {
		return Reflections.getAnnotationTableBind(getClass());
	}
}
