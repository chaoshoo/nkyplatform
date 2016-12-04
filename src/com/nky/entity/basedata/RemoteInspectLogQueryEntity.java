package com.nky.entity.basedata;

import java.util.Date;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;

import com.sys.jfinal.JFinalEntity;

/**
 * remote_inspect_logRemote consultation detailed dialogue.
 * @author Ken
 * @version 2016year9month8day Afternoon1:06:16
 */
public class RemoteInspectLogQueryEntity extends JFinalEntity {

	private static final long serialVersionUID = 1L;
	private String des;
	private String vip_or_doctor;
	private String remote_inspect_code;
	private Date create_time;

	public RemoteInspectLogQueryEntity() {

	}

	public void setDes(String des) {
		this.des = des;
	}

	public String getDes() {
		return this.des;
	}

	public void setVipOrDoctor(String vip_or_doctor) {
		this.vip_or_doctor = vip_or_doctor;
	}

	public String getVipOrDoctor() {
		return this.vip_or_doctor;
	}

	public void setRemoteInspectCode(String remote_inspect_code) {
		this.remote_inspect_code = remote_inspect_code;
	}

	public String getRemoteInspectCode() {
		return this.remote_inspect_code;
	}

	public void setCreateTime(Date create_time) {
		this.create_time = create_time;
	}

	public Date getCreateTime() {
		return this.create_time;
	}

	@Override
	public String toString() {
		return ReflectionToStringBuilder.toString(this);
	}
}