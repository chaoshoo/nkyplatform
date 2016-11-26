package com.nky.entity.question;

import java.util.Date;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;

@TableBind(name="vip_questions_log")
public class VipQuestionLog extends JFinalEntity{
	
	private	int	vip_questions_id;
	private String answer_code;
	private String answer_content;	
	private Date create_time;
	public int getVip_questions_id()
	{
		return vip_questions_id;
	}
	public void setVip_questions_id(int vip_questions_id)
	{
		this.vip_questions_id = vip_questions_id;
	}
	public String getAnswer_code()
	{
		return answer_code;
	}
	public void setAnswer_code(String answer_code)
	{
		this.answer_code = answer_code;
	}
	public String getAnswer_content()
	{
		return answer_content;
	}
	public void setAnswer_content(String answer_content)
	{
		this.answer_content = answer_content;
	}
	public Date getCreate_time()
	{
		return create_time;
	}
	public void setCreate_time(Date create_time)
	{
		this.create_time = create_time;
	}	
	

}