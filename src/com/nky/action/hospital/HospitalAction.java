package com.nky.action.hospital;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.drools.util.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.hospital.HospitalAdminEntity;
import com.nky.entity.hospital.HospitalEntity;
import com.sys.action.BaseAction;
import com.sys.entity.LoginEntity;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;
import com.sys.jfinal.JFinalDb;
import com.sys.singleton.DicSingleton;
import com.sys.singleton.SysId;
import com.sys.util.MD5Util;

@Controller
@RequestMapping(value = "/hospital")
public class HospitalAction extends BaseAction {

	@RequestMapping(value = "/show")
	public String show(HttpServletRequest request) {
		Map<String, String> lever = DicSingleton.getInstance().getDicMap("hospatil_lever");
		request.setAttribute("lever", JSON.toJSONString(lever));
		return "hospital/hospitallist";
	}

	@RequestMapping(value = "/select")
	public String select(HttpServletRequest request) {
		Map<String, String> lever = DicSingleton.getInstance().getDicMap("hospatil_lever");
		request.setAttribute("lever", JSON.toJSONString(lever));
		return "hospital/hospitalselect";
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
			scriptPage = JFinalDb.findPageBySqlid(ajaxPage.getPageNo(), ajaxPage.getPageSize(), "HosPital_list", param,
					" id desc");
		} catch (Exception e) {
			e.printStackTrace();
			scriptPage = new ScriptPage();
		}
		return scriptPage;
	}

	@RequestMapping(value = "/add")
	public String add(HttpServletRequest request) {
		HospitalEntity hospital = new HospitalEntity();
		request.setAttribute("hospital", hospital);
		request.setAttribute("add", 0);
		return "hospital/hospitalform";
	}

	@RequestMapping(value = "/edit")
	public String edit(HttpServletRequest request, Long id) {
		HospitalEntity entity = new HospitalEntity();
		String role = getSession().getRoles();
		if (role != null && "2".equals(role)) {
			//表示医院  用session的id
			entity.setId(Long.parseLong(getSession().getId() + ""));
		} else {
			entity.setId(id);
		}
		try {
			entity = JFinalDb.findFirst(entity);
			if (entity == null) {
				return add(request);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return add(request);
		}
		request.setAttribute("hospital", entity);
		request.setAttribute("add", 1);
		return "hospital/hospitalform";
	}

	@RequestMapping(value = "/info")
	public String info(HttpServletRequest request,Long id) {
		HospitalEntity entity = new HospitalEntity();
		LoginEntity login = getSession();
		String hospital_code = "";
		if(login.getType().equals("D")){
			hospital_code = login.getDoctor().getHospital_code();
		}else if(login.getType().equals("H")){
			hospital_code = login.getHospital().getHospital_code();
		}
		entity.setCode(hospital_code);
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		request.setAttribute("hospital", entity);
		request.setAttribute("add", 1);
		return "hospital/hospitalinfo";
	}
	@RequestMapping(value = "/save")
	@ResponseBody
	public Data save(HttpServletRequest request, HospitalEntity entity) {
		Data d = new Data();
		try {
			Record record = Db.findFirst("select * from hospital where name=?", entity.getName());
			if (record != null && StringUtils.isEmpty(entity.getCode())) {
				d.setCode(0);
				d.setMsg("Hospital name already exists，Hospital name already exist");
				return d;
			} else if (record != null && !record.getStr("code").equals(entity.getCode())) {
				d.setCode(0);
				d.setMsg("Hospital name already exists，Please input hospital name again");
				return d;
			} else {
				boolean flag = false;
				if (entity.getId() == null) {
					entity.setCreate_time(new Date());
					entity.setCode(SysId.getNextHospitalCode());
					flag = JFinalDb.save(entity);
				} else {
					flag = JFinalDb.update(entity);
				}
				if (flag) {
					d.setCode(1);
					return d;
				}
			}
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		d.setCode(0);
		d.setMsg("Save failed，Please contact system administrator");
		return d;
	}

	@RequestMapping(value = "/del")
	@ResponseBody
	public Data del(HttpServletRequest request, String hospital_code) {
		Data d = new Data();
		if (!StringUtils.isEmpty(hospital_code)) {
			Number num = Db.queryNumber("select count(1) as num from doctor where hospital_code=?", hospital_code);
			if (num.longValue() > 0) {
				d.setCode(0);
				d.setMsg("The hospital is bound to the doctor can not be removed");
			} else {
				int x = Db.update("delete from hospital where code=?", hospital_code);
				if (x > 0) {
					d.setCode(1);
				} else {
					d.setCode(0);
					d.setMsg("Delete failed");
				}
			}
		} else {
			d.setCode(0);
			d.setMsg("Hospital code is empty");
		}
		return d;
	}

	@RequestMapping(value = "/adduser")
	public String adduser(HttpServletRequest request) {
		String hospital_code = request.getParameter("hospital_code");
		request.setAttribute("hospital_code", hospital_code);
		return "hospital/hospitaluser";
	}

	@RequestMapping(value = "/edituser")
	public String edituser(HttpServletRequest request, HospitalAdminEntity entity) {
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "";
		}
		request.setAttribute("user", entity);
		return "hospital/hospitalusereditform";
	}

	/**
	 * Get list
	 * @param area
	 * @return
	 */
	@RequestMapping(value = "/listuser")
	@ResponseBody
	public ScriptPage listuser(HttpServletRequest request, AjaxPage ajaxPage) {
		ScriptPage scriptPage = null;
		String hospital_code = request.getParameter("hospital_code");
		String sql = "select * from hospital_admin where hospital_code='" + hospital_code + "'";
		try {
			scriptPage = JFinalDb.findPage(ajaxPage.getPageNo(), ajaxPage.getPageSize(), sql,
					new HashMap<String, Object>(), " id desc");
		} catch (Exception e) {
			e.printStackTrace();
			scriptPage = new ScriptPage();
		}
		return scriptPage;
	}

	@RequestMapping(value = "/saveuser")
	@ResponseBody
	public Data saveuser(HttpServletRequest request, HospitalAdminEntity entity) {
		Data d = new Data();
		try {
			Record record = Db.findFirst("select * from hospital_admin where tel=?", entity.getTel());
			if (record != null && entity.getId() == null) {
				d.setCode(0);
				d.setMsg("Phone number already exists，Can no longer add the same phone number!");
				return d;
			} else if (record != null && !record.getLong("id").equals(entity.getId())) {
				d.setCode(0);
				d.setMsg("Phone number already exists，Can no longer add the same phone number!");
				return d;
			} else {
				boolean flag = false;
				if (entity.getId() == null) {
					entity.setCreate_time(new Date());
					entity.setPwd(MD5Util.MD5("123456", "utf-8").toLowerCase());
					entity.setIsvalid(1);
					flag = JFinalDb.save(entity);
				} else {
					flag = JFinalDb.update(entity);
				}
				if (flag) {
					d.setCode(1);
					return d;
				}
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
			String update = "update hospital_admin set isvalid=? where id=? ";
			int x = Db.update(update, isvalid, id);
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

	@RequestMapping(value = "/resetpwd")
	@ResponseBody
	public Data resetpwd(HttpServletRequest request, Long id, String pwd) {
		Data d = new Data();
		if (id != null) {
			if (StringUtils.isEmpty(pwd)) {
				pwd = "123456";
			}
			String update = "update hospital_admin set pwd=? where id=? ";
			int x = Db.update(update, MD5Util.MD5(pwd, "utf-8").toLowerCase(), id);
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