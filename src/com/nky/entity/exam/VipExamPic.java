package com.nky.entity.exam;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;

@SuppressWarnings("serial")
@TableBind(name="vip_exam_pic")
public class VipExamPic extends JFinalEntity{

	private Long exam_id ;
	private String exam_pic_name;
	private String exam_pic_url;
	private String exam_pic_state;
	
	public Long getExam_id() {
		return exam_id;
	}
	public void setExam_id(Long exam_id) {
		this.exam_id = exam_id;
	}
	public String getExam_pic_name() {
		return exam_pic_name;
	}
	public void setExam_pic_name(String exam_pic_name) {
		this.exam_pic_name = exam_pic_name;
	}
	public String getExam_pic_url() {
		return exam_pic_url;
	}
	public void setExam_pic_url(String exam_pic_url) {
		this.exam_pic_url = exam_pic_url;
	}
	public String getExam_pic_state() {
		return exam_pic_state;
	}
	public void setExam_pic_state(String exam_pic_state) {
		this.exam_pic_state = exam_pic_state;
	}
	
	
	
}
