package com.nky.entity.inspect;

import java.util.Date;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sys.util.DateUtil;

/**
 * vip_inspect_data，Check list.
 * @author Ken
 * @version 2016year8month24day
 */
public class VipInspectData {
	@JsonIgnore
	private Long id;
	@JsonIgnore
	private String cardCode;
	@JsonIgnore
	private String inspectCode;
	@JsonIgnore
	private String deviceSn;
	@JsonIgnore
	private Date createTime;
	@JsonIgnore
	private Date inspectTime;
	@JsonIgnore
	private Long inspectTimeLong;
	private String inspectTimeStr;
	private String pr;
	private String sys;
	private String dia;
	private String glu0;
	private String glu1;
	private String glu2;

	public VipInspectData() {

	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return this.id;
	}

	public void setCardCode(String cardCode) {
		this.cardCode = cardCode;
	}

	public String getCardCode() {
		return this.cardCode;
	}

	public void setInspectCode(String inspectCode) {
		this.inspectCode = inspectCode;
	}

	public String getInspectCode() {
		return this.inspectCode;
	}

	public void setDeviceSn(String deviceSn) {
		this.deviceSn = deviceSn;
	}

	public String getDeviceSn() {
		return this.deviceSn;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setInspectTime(Date inspectTime) {
		this.inspectTime = inspectTime;
	}

	public Date getInspectTime() {
		return this.inspectTime;
	}

	public void setPr(String pr) {
		this.pr = pr;
	}

	public String getPr() {
		return this.pr;
	}

	public void setSys(String sys) {
		this.sys = sys;
	}

	public String getSys() {
		return this.sys;
	}

	public void setDia(String dia) {
		this.dia = dia;
	}

	public String getDia() {
		return this.dia;
	}

	public void setGlu0(String glu0) {
		this.glu0 = glu0;
	}

	public String getGlu0() {
		return this.glu0;
	}

	public void setGlu1(String glu1) {
		this.glu1 = glu1;
	}

	public String getGlu1() {
		return this.glu1;
	}

	public void setGlu2(String glu2) {
		this.glu2 = glu2;
	}

	public String getGlu2() {
		return this.glu2;
	}

	public Long getInspectTimeLong() {
		return inspectTimeLong;
	}

	public void setInspectTimeLong(Long inspectTimeLong) {
		this.inspectTimeLong = inspectTimeLong;
		this.inspectTimeStr = DateUtil.dateForString(new Date(inspectTimeLong), "MM-dd HH:mm");
	}

	public String getInspectTimeStr() {
		return inspectTimeStr;
	}

	public void setInspectTimeStr(String inspectTimeStr) {
		this.inspectTimeStr = inspectTimeStr;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		boolean b = obj instanceof VipInspectData;
		if (b) {
			VipInspectData u = (VipInspectData) obj;
			if (this.inspectTimeLong == u.inspectTimeLong) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	@Override
	public int hashCode() {
		int result = 17;
		result = 31 * result + inspectTimeLong.intValue();
		return result;
	}

	@Override
	public String toString() {
		return ReflectionToStringBuilder.toString(this);
	}
}