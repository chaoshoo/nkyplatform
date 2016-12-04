package com.nky.action.doctor;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.doctor.DoctorEntity;
import com.nky.entity.inspect.Office;
import com.nky.service.OfficeSingleton;
import com.sys.action.BaseAction;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;
import com.sys.jfinal.JFinalDb;
import com.sys.singleton.DicSingleton;
import com.sys.singleton.SysId;
import com.sys.util.DateUtil;
import com.sys.util.MD5Util;


@Controller
@RequestMapping(value = "/doctor")
public class DoctorAction extends BaseAction {
	@RequestMapping(value = "/show")
	public String show(HttpServletRequest request) {
		//		Map<String,String> sex = DicSingleton.getInstance().getDicMap("sex");
		//		request.setAttribute("sex", JSON.toJSONString(sex));
		System.out.println(getSession().getRoles());
		request.setAttribute("role",getSession().getRoles());
		return "doctor/doctorlist";
	}

	/**
	 * Get list
	 * @param area
	 * @return
	 */
	@RequestMapping(value = "/list")
	@ResponseBody
	public ScriptPage list(HttpServletRequest request, AjaxPage ajaxPage) {
		ScriptPage scriptPage = null;
		Map<String, Object> param = getParam(request);
		try {
			String role = getSession().getRoles();
			if(role.equals("2")){
				//表示医院
				param.put("d.hospital_code", getSession().getHospital().getHospital_code());
			}
			scriptPage = JFinalDb.findPageBySqlid(ajaxPage.getPageNo(), ajaxPage.getPageSize(), "Doctor_list", param,
					"id desc");
		} catch (Exception e) {
			e.printStackTrace();
			scriptPage = new ScriptPage();
		}
		//需要对数据做下处理
		Map<String, String> sexdic = DicSingleton.getInstance().getDicMap("gender");
		Map<String, String> doctor_status = DicSingleton.getInstance().getDicMap("doctor_status");
		Map<String, String> doctor_title = DicSingleton.getInstance().getDicMap("doctor_title");
		Map<String, Office> office = OfficeSingleton.getInstance().getAll();
		for (Object obj : scriptPage.getRows()) {
			Map<String, Object> map = (Map<String, Object>) obj;
			map.put("sexstr", sexdic.get(map.get("SEX") + ""));
			if (office.get(map.get("OFFICE_CODE") + "") == null) {
				map.put("officename", "");
			} else {
				map.put("officename", office.get(map.get("OFFICE_CODE") + "").getName());
			}
			map.put("isvalidstr", doctor_status.get(map.get("ISVALID") + ""));
			map.put("titlestr", doctor_title.get(map.get("TITLE") + ""));
		}
		return scriptPage;
	}

	@RequestMapping(value = "/add")
	public String add(HttpServletRequest request) {
		DoctorEntity doctor = new DoctorEntity();
//		doctor.setId(-1L);
		request.setAttribute("add", 0);
		request.setAttribute("check", 0);
		request.setAttribute("region", request.getParameter("region"));
		//判断医院角色
		if(getSession()!=null){
			String role = getSession().getRoles();
			request.setAttribute("role",  role);
			if(role != null && role.equals("2")){
				//表示医院
				doctor.setHospital_code(getSession().getHospital().getHospital_code());
				Record record = Db.findFirst("select * from hospital where code=?",doctor.getHospital_code());
				if(record != null){
					request.setAttribute("hospitalname", record.get("name"));
				}
			}
		}
		request.setAttribute("doctor", doctor);
		if(request.getParameter("region") != null && "true".equals(request.getParameter("region"))){
			return "doctor/doctorregion";
		}
		return "doctor/doctorform";
	}

	@RequestMapping(value = "/edit")
	public String edit(HttpServletRequest request, Long id) {
		DoctorEntity entity = new DoctorEntity();
		entity.setId(id);
		try {
			entity = JFinalDb.findFirst(entity);
			if (entity == null) {
				return add(request);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return add(request);
		}
		//判断医院角色
		String role = getSession().getRoles();
		request.setAttribute("role",  role);
		request.setAttribute("doctor", entity);
		//查询医院名称
		Record r = Db.findFirst("select * from hospital where code=?",entity.getHospital_code());
		if(r != null){
			request.setAttribute("hospitalname", r.get("name")+"");
		}else{
			request.setAttribute("hospitalname", "");
		}
		request.setAttribute("add", 1);
		String check = request.getParameter("check");
		if (check != null && check.equals("true")) {
			request.setAttribute("check", 1);
		} else {
			request.setAttribute("check", 0);
		}
		return "doctor/doctorform";
	}

	@RequestMapping(value = "/save")
	@ResponseBody
	public Data save(HttpServletRequest request,DoctorEntity entity ) {
		Data d = new Data();
//		DoctorEntity entity = new DoctorEntity();
//		setEntity(entity, request);
		String birthdaystr = request.getParameter("birthdaystr");
		if(!StringUtils.isEmpty(birthdaystr)){
			entity.setBirthday(DateUtil.strForDate(birthdaystr, "yyyy-MM-DD"));
		}
		Record record = Db.findFirst("select * from doctor where tel=?",entity.getTel());
		if(record != null && StringUtils.isEmpty(entity.getCode())){
			d.setCode(0);
			d.setMsg("Phone numbers have been used by other doctors.，Please check your phone number.");
			return d;
		}else if(record != null && !record.getStr("code").equals(entity.getCode())){
			d.setCode(0);
			d.setMsg("Phone numbers have been used by other doctors.，Please check your phone number.");
			return d;
		}
		try {
			boolean flag = false;
			entity.setIsvalid(1);
			if(entity.getId()==null ){
				entity.setCreate_time(new Date());
				entity.setCode(SysId.getNextDoctorCode());
				//初始密码123456
				entity.setPassword(MD5Util.MD5("123456", "utf-8").toLowerCase());
				String region = request.getParameter("region");
				if(region != null && "true".equals(region)){
					entity.setIsvalid(0);
				}
				flag = JFinalDb.save(entity);
			}else{
				entity.setUpdate_time(new Date());
				flag = JFinalDb.update(entity);
				//修改个人信息时要更新session
				if(flag && getSession().getDoctor() != null && getSession().getDoctor().getCode().equals(entity.getCode())){
					getSession().setDoctor(entity);
				}
			}
			
			if (flag) {
				d.setCode(1);
				return d;
			}
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		d.setCode(0);
		d.setMsg("Save failed，Please contact system administrator");
		return d;
	}

	@RequestMapping(value = "/opertor")
	@ResponseBody
	public Data opertor(HttpServletRequest request, Long id, String isvalid) {
		Data d = new Data();
		if (id != null && !StringUtils.isEmpty(isvalid)) {
			String update = "update doctor set isvalid=? ";
			if(!StringUtils.isEmpty(request.getParameter("check_desc"))){
				update += ",check_desc='"+request.getParameter("check_desc")+"'";
			}
			int x = Db.update(update+" where id=?", isvalid, id);
			if (x > 0) {
				d.setCode(1);
				return d;
			} else {
				d.setCode(0);
				d.setMsg("operation failed");
			}
		} else {
			d.setCode(0);
			d.setMsg("Into the background value is empty");
		}
		return d;
	}
}