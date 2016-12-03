package com.nky.action.device;

import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.IAtom;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.device.DeviceEntity;
import com.sys.action.BaseAction;
import com.sys.entity.LoginEntity;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;
import com.sys.jfinal.JFinalDb;
import com.sys.singleton.DicSingleton;
import com.sys.util.DateUtil;
import com.sys.util.UUIDs;

@Controller
@RequestMapping(value = "/device")
public class DeviceController extends BaseAction {

	@RequestMapping(value = "/show")
	public String show(HttpServletRequest request) {
		LoginEntity loginEntity = getSession();
		String type = loginEntity.getType();
		request.setAttribute("type", type);
		return "device/devicelist";
	}

	@RequestMapping(value = "/list")
	@ResponseBody
	public String getQuestionList(HttpServletRequest request, AjaxPage ajaxPage) {
		Map<String, Object> param = getParam(request);
		String sql = "select * from device where 1=1 ${where}";
		ScriptPage scriptPage = null;
		try {
			scriptPage = JFinalDb.findPage(ajaxPage.getPageNo(), ajaxPage.getPageSize(), sql, param, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
		Map<String, String> device_type = DicSingleton.getInstance().getDicMap("device_type");
		if (scriptPage == null) {
			scriptPage = new ScriptPage();
			scriptPage.setTotal(0);
		} else if (!scriptPage.getRows().isEmpty()) {
			for (int i = 0; i < scriptPage.getRows().size(); i++ ) {
				Map<String, Object> m = (Map<String, Object>) scriptPage.getRows().get(i);
				m.put("DEVICE_TYPESTR", device_type.get(m.get("DEVICE_TYPE")));
			}
		}
		return JSON.toJSONString(scriptPage);
	}

	@RequestMapping(value = "/add")
	public String add(HttpServletRequest request) {
		DeviceEntity device = new DeviceEntity();
		request.setAttribute("add", 0);
		request.setAttribute("device", device);
		return "device/deviceform";
	}

	@RequestMapping(value = "/edit")
	public String edit(HttpServletRequest request, Long id) {
		DeviceEntity entity = new DeviceEntity();
		request.setAttribute("add", 1);
		entity.setId(id);
		try {
			entity = JFinalDb.findFirst(entity);
			if (entity == null) {
				return add(request);
			}
			if (entity.getCreate_time() != null) {
				request.setAttribute("create_timestr", DateUtil.dateForStr(entity.getCreate_time(), "yyyy-MM-dd HH:mm:ss"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			return add(request);
		}
		request.setAttribute("device", entity);
		return "device/deviceform";
	}

	@RequestMapping(value = "/doctor")
	@ResponseBody
	public String doctor(HttpServletRequest request, AjaxPage ajaxPage) {
		ScriptPage scriptPage = null;
		try {
			Map<String, Object> param = getParam(request);
			String sql = "";
			Integer id = Integer.valueOf(param.get("EQ-id").toString());
			Object doctor = param.get("LIKE-doctor");
			if (param.get("EQ-status").equals("1")) {
				//已关联
				sql = "select d.id,d.name,h.name as hospitalname,'已关联' as status from device_doctor dd,doctor d ,hospital h where dd.doctorid = d.id  and d.hospital_code=h.code and dd.deviceid = "
				      + id;
			} else {
				sql = "select d.id,d.name,h.name as hospitalname,'未关联' as status  from doctor d ,hospital h where d.hospital_code=h.code and d.id not in (select doctorid from device_doctor where deviceid = "
				      + id + ")";
			}
			if (doctor != null && StringUtils.isNotEmpty(doctor.toString())) {
				sql += " and d.name like '%" + doctor.toString() + "%'";
			}
			scriptPage = JFinalDb.findPage(ajaxPage.getPageNo(), ajaxPage.getPageSize(), sql, new HashMap<String, Object>(), null);
		} catch (Exception e) {
			scriptPage = null;
			LOG.error("查询Docter和设备的关联关系失败.", e);
		}
		if (scriptPage == null) {
			scriptPage = new ScriptPage();
			scriptPage.setTotal(0);
		}
		return JSON.toJSONString(scriptPage);
	}

	@RequestMapping(value = "/docbind")
	@ResponseBody
	public Data docbind(HttpServletRequest request, Long doctorId, Long deviceId) {
		Data d = new Data();//doctorId+"&deviceId
		Record checkRecord = Db.findFirst("select deviceid from device_doctor where deviceid=? and doctorid = ? limit 1", deviceId, doctorId);
		if (null == checkRecord || null == checkRecord.getLong("deviceid")) {
			int x = Db.update("insert into device_doctor(deviceid,doctorid,create_time) values(?,?,now())", deviceId, doctorId);
			d.setCode(x);
			return d;
		} else {
			d.setCode(1);
			return d;
		}
	}

	@RequestMapping(value = "/docunbind")
	@ResponseBody
	public Data docunbind(HttpServletRequest request, Long doctorId, Long deviceId) {
		Data d = new Data();//doctorId+"&deviceId
		Record checkRecord = Db.findFirst("select deviceid from device_doctor where deviceid=? and doctorid = ? limit 1", deviceId, doctorId);
		if (null == checkRecord || null == checkRecord.getLong("deviceid")) {
			d.setCode(1);
			return d;
		} else {
			int x = Db.update("delete from  device_doctor where deviceid = ? and doctorid = ?", deviceId, doctorId);
			d.setCode(x);
			return d;
		}
	}

	@RequestMapping(value = "/save")
	@ResponseBody
	public Data save(HttpServletRequest request, DeviceEntity entity) {
		Data d = new Data();
		String product_timestr = request.getParameter("product_timestr");
		if (!StringUtils.isEmpty(product_timestr)) {
			entity.setProduct_time(DateUtil.strForDate(product_timestr, "yyyy-MM-dd"));
		}
		String deliver_timestr = request.getParameter("deliver_timestr");
		if (!StringUtils.isEmpty(deliver_timestr)) {
			entity.setDeliver_time(DateUtil.strForDate(deliver_timestr, "yyyy-MM-dd HH:mm:ss"));
		}
		Record record = Db.findFirst("select * from device where sn=?", entity.getSn());
		if (record != null && StringUtils.isEmpty(entity.getDevice_id())) {
			d.setCode(0);
			d.setMsg("此SN号已经存在，保存失败");
			return d;
		} else if (record != null && !record.getStr("device_id").equals(entity.getDevice_id())) {
			d.setCode(0);
			d.setMsg("此SN号已经存在，修改失败");
			return d;
		}
		try {
			boolean flag = false;
			if (entity.getId() == null) {
				entity.setCreate_time(new Date());
				entity.setDevice_id(UUIDs.getShortRandomUUID());
				flag = JFinalDb.save(entity);
			} else {
				flag = JFinalDb.update(entity);
			}

			if (flag) {
				d.setCode(1);
				return d;
			}
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		d.setCode(0);
		d.setMsg("保存失败，请联系系统管理员");
		return d;
	}

	@RequestMapping(value = "/del")
	@ResponseBody
	public Data del(HttpServletRequest request, final Long id) {
		Data d = new Data();//删除设备的同时，删除设备和医生的关联关系.
		boolean flag = Db.tx(new IAtom() {
			
			public boolean run()
		        throws SQLException {
				int x = Db.update("delete from device where id=?", id);
				int y = Db.update("delete from  device_doctor where deviceid = ? ", id);
				return y >= 0 && x == 1;
			}
		});
		if (flag) {
			d.setCode(1);
		} else {
			d.setCode(0);
		}
		return d;
	}
}
