package com.nky.entity.visit;

import java.util.Date;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;

@TableBind(name="doctor_visit")
public class VisitEntity extends JFinalEntity{
	
	private	String	doctor_code	;
	private	int	visit_user	;
	private String begin_time;
	private String end_time;
	private Date create_time;
	private String content;
	

	public String getDoctor_code()
	{
		return doctor_code;
	}
	public void setDoctor_code(String doctor_code)
	{
		this.doctor_code = doctor_code;
	}
	public int getVisit_user()
	{
		return visit_user;
	}
	public void setVisit_user(int visit_user)
	{
		this.visit_user = visit_user;
	}
	public String getBegin_time()
	{
		return begin_time;
	}
	public void setBegin_time(String begin_time)
	{
		this.begin_time = begin_time;
	}
	public String getEnd_time()
	{
		return end_time;
	}
	public void setEnd_time(String end_time)
	{
		this.end_time = end_time;
	}
	public String getContent()
	{
		return content;
	}
	public void setContent(String content)
	{
		this.content = content;
	}
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}
	
}
