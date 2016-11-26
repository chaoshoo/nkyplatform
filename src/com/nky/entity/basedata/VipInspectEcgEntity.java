package com.nky.entity.basedata;

import java.util.Date;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;

import com.sys.jfinal.JFinalEntity;

//select id,inspect_time,analyzeResultStr from vip_inspect_data_ecg  where card_code = ?
public class VipInspectEcgEntity extends JFinalEntity {

	private static final long serialVersionUID = 1L;
	private String analyzeResultStr;
	private Date inspect_time;

	public String getAnalyzeResultStr() {
		return analyzeResultStr;
	}

	public void setAnalyzeResultStr(String analyzeResultStr) {
		this.analyzeResultStr = analyzeResultStr;
	}

	public Date getInspect_time() {
		return inspect_time;
	}

	public void setInspect_time(Date inspect_time) {
		this.inspect_time = inspect_time;
	}

	@Override
	public String toString() {
		return ReflectionToStringBuilder.toString(this);
	}
}