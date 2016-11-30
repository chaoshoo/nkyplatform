package com.nky.entity.exam;

import java.util.Date;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;

@SuppressWarnings("serial")
@TableBind(name="vip_exam")
public class VipExam extends JFinalEntity{
	
	private String vip_code ;
	private String exam_hos;
	private String exam_date;
	private String exam_desc;
	private String exam_sumup;
	private String exam_state;
	
	public String getVip_code() {
		return vip_code;
	}
	public void setVip_code(String vip_code) {
		this.vip_code = vip_code;
	}
	public String getExam_hos() {
		return exam_hos;
	}
	public void setExam_hos(String exam_hos) {
		this.exam_hos = exam_hos;
	}
	public String getExam_date() {
		return exam_date;
	}
	public void setExam_date(String exam_date) {
		this.exam_date = exam_date;
	}
	public String getExam_desc() {
		return exam_desc;
	}
	public void setExam_desc(String exam_desc) {
		this.exam_desc = exam_desc;
	}
	public String getExam_sumup() {
		return exam_sumup;
	}
	public void setExam_sumup(String exam_sumup) {
		this.exam_sumup = exam_sumup;
	}
	public String getExam_state() {
		return exam_state;
	}
	public void setExam_state(String exam_state) {
		this.exam_state = exam_state;
	}
	

}