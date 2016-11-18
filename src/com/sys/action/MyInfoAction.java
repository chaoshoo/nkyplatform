package com.sys.action;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.sys.entity.LoginEntity;
import com.sys.entity.bo.Data;
import com.sys.util.DateUtil;

@Controller
@RequestMapping("/myinfo")
public class MyInfoAction extends BaseAction  {

	@RequestMapping(value = "/info")
	public String changePwd(HttpServletRequest request) throws ParseException {
		LoginEntity login = getSession();
		if (login.getType().equals("H")) {
			String hospitalcode = login.getHospital().getHospital_code();
			Record record = Db.findFirst("select * from hospital where code=?",hospitalcode);
			if(record != null){
				request.setAttribute("hospital_name", record.get("name"));
			}
			request.setAttribute("hospitaladmin", login.getHospital());
			request.setAttribute("createtimestr", DateUtil.dateForString(login.getHospital().getCreate_time(), "yyyy-MM-dd HH:mm:ss"));
			return "hospital/hospitaluserinfo";
		}else if(login.getType().equals("D")){
			String hospitalcode = login.getDoctor().getHospital_code();
			Record record = Db.findFirst("select * from hospital where code=?",hospitalcode);
			if(record != null){
				request.setAttribute("hospitalname", record.get("name"));
			}
			Record recordDoc = Db.findFirst("select * from doctor where code=?",login.getDoctor().getCode());
			String createdate="";
			if(recordDoc != null){
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
				login.getDoctor().setCreate_time(recordDoc.getTimestamp("create_time"));
				login.getDoctor().setBirthday(recordDoc.getDate("birthday"));
//				String tt=recordDoc.getDate("birthday").toString();
//				request.setAttribute("birthday", tt);
				
			}
			request.setAttribute("doctor", login.getDoctor());
			request.setAttribute("createtimestr", createdate);
			request.setAttribute("ismy", "true");
			return "doctor/doctorinfo";
		}else{
			request.setAttribute("user", login.getSysUser());
			request.setAttribute("createtimestr", DateUtil.dateForString(login.getSysUser().getCreatedTime(), "yyyy-MM-dd HH:mm:ss"));
			return "sys/myinfo";
		}
		
	}

}