package com.nky.entity.exam;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;

@SuppressWarnings("serial")
@TableBind(name="vip_exam_norm")
public class VipExamNorm extends JFinalEntity{
	
	private Long exam_id ;
	private String exam_norm;
	private String exam_status;
	private String exam_value;
	private String exam_norm_state;
	public Long getExam_id() {
		return exam_id;
	}
	public void setExam_id(Long exam_id) {
		this.exam_id = exam_id;
	}
	public String getExam_norm() {
		return exam_norm;
	}
	public void setExam_norm(String exam_norm) {
		this.exam_norm = exam_norm;
	}
	public String getExam_status() {
		return exam_status;
	}
	public void setExam_status(String exam_status) {
		this.exam_status = exam_status;
	}
	public String getExam_value() {
		return exam_value;
	}
	public void setExam_value(String exam_value) {
		this.exam_value = exam_value;
	}
	public String getExam_norm_state() {
		return exam_norm_state;
	}
	public void setExam_norm_state(String exam_norm_state) {
		this.exam_norm_state = exam_norm_state;
	}
	
	

}
