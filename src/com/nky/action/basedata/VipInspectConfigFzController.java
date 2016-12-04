package com.nky.action.basedata;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.basedata.InspectKpiConfigFzEntity;
import com.nky.entity.basedata.OfficeEntity;
import com.sys.action.BaseAction;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;
import com.sys.jfinal.JFinalDb;

/**
 * Auxiliary list of detection indexes.
 * @author Ken
 * @version 2016year9month2day
 */
@Controller
@RequestMapping(value = "/vipInspectConfigFz")
public class VipInspectConfigFzController extends BaseAction {

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
			scriptPage = JFinalDb.findPageBySqlid(ajaxPage.getPageNo(), ajaxPage.getPageSize(),
					"inspectkpiconfigfz_list", param, " sex asc,age_min asc ");
		} catch (Exception e) {
			LOG.error("Query list failed.", e);
			scriptPage = new ScriptPage();
		}
		return scriptPage;
	}

	@RequestMapping(value = "/save")
	@ResponseBody
	public Data save(HttpServletRequest request, InspectKpiConfigFzEntity entity) {
		Data d = new Data();
		try {
			/*if(null == entity || StringUtils.isEmpty(entity.getKip_code()) || !isKsCode(entity.getKip_code())){
				d.setCode(0);
				d.setMsg("Add failed，Code is not valid！");
				return d;
			}
			if(StringUtils.isEmpty(entity.getName()) || !isKsName(entity.getName())){
				d.setCode(0);
				d.setMsg("Add failed，The name is not valid！");
				return d;
			}*/
		
			Record record = Db.findFirst("select id from inspect_kpi_config_fz where kip_code = ? and sex=? and age_min=? and age_max=? and fz_min=? and fz_max=?", entity.getKip_code(),entity.getSex(),entity.getAge_min(),entity.getAge_max(),entity.getFz_min(),entity.getFz_max());
			if (record != null) {
				d.setCode(0);
				d.setMsg("Add failed，This threshold has been used.！");
				return d;
			} else {
//				entity.setCode(SysId.getNextHospitalCode());
				/*if(entity.getDes() != null){
					entity.setDes(entity.getDes().trim());
				}*/
				
				/*Integer age_min=entity.getAge_min();
				Integer age_max=entity.getAge_max();
				String agemin=String.valueOf(age_min);
				String agemax=String.valueOf(age_max);
				if(!isKsNum(agemin) || !isKsNum(agemax)){
					d.setCode(0);
					d.setMsg("Maximum age or minimum age is not legal");
				}*/
				
				/*if(age_max<age_min){
				    d.setCode(0);
				    d.setMsg("The maximum age can not be smaller than the minimum age");
				    return d;
				}   */ 		
				entity.setCreate_time(new Date());
				boolean flag = JFinalDb.save(entity);
				if (flag) {
					d.setCode(1);
					d.setMsg("Added!");
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
	  
	@RequestMapping(value = "/update")
	@ResponseBody
	public Data update(HttpServletRequest request, InspectKpiConfigFzEntity entity) {
		Data d = new Data();
		try {
			if(null == entity || null == entity.getId()){
				d.setCode(0);
				d.setMsg("Change failed，Invalid request！");
				return d;
			}
			/*if( StringUtils.isEmpty(entity.getKip_code()) || !isKsCode(entity.getKip_code())){
				d.setCode(0);
				d.setMsg("Change failed，Code is not valid！");
				return d;
			}*/
			/*if(StringUtils.isEmpty(entity.getName()) || !isKsName(entity.getName())){
				d.setCode(0);
				d.setMsg("Change failed，The name is not valid！");
				return d;
			}*/

			Record record = Db.findFirst("select * from inspect_kpi_config_fz where id = ?", entity.getId());
			if(record == null){
				d.setCode(0);
				d.setMsg("Change failed，Invalid request！");
				return d;
			}
//			Integer age_min=entity.getAge_min();
//			Integer age_max=entity.getAge_max();
//			String agemin=String.valueOf(age_min);
//			String agemax=String.valueOf(age_max);
			/*if(age_max<age_min){
			    d.setCode(0);
			    d.setMsg("The maximum age can not be smaller than the minimum age");
			    return d;
			}*/
			/*if(!isKsNum(agemin) || !isKsNum(agemax)){
				d.setCode(0);
				d.setMsg("Maximum age or minimum age is not legal");
			}*/
			
//			String code = record.getStr("CODE");
			String kip_code=record.getStr("KIP_CODE");
//			String name = record.getStr("NAME");
			String sex=record.getStr("SEX");
			Integer age_min1=record.getInt("AGE_MIN");
			Integer age_max1=record.getInt("AGE_MAX");
			String fz_min=record.getStr("FZ_MIN");
			String fz_max=record.getStr("FZ_MAX");
			entity.setCreate_time(new Date());
			//Timestamp createTime = record.getTimestamp("CREATE_TIME");
			/*request.setAttribute("InspectKpiConfigFz", entity);
			String check = request.getParameter("check");
			if (check != null && check.equals("true")) {
				request.setAttribute("check", 1);
			} else {
				request.setAttribute("check", 0);
			}*/
			if(age_max1!=entity.getAge_max()&&age_min1!=entity.getAge_min()&&!kip_code.equals(entity.getKip_code())&&!sex.equals(entity.getSex())&&!fz_min.equals(entity.getFz_min())&&!fz_max.equals(entity.getFz_max())){
				//check code unique
				Record checkRecord = Db.findFirst("select id from inspect_kpi_config_fz where  kip_code = ? and sex=? and age_min=? and age_max=? and fz_min=? and fz_max=?",  entity.getKip_code(),entity.getSex(),entity.getAge_min(),entity.getAge_max(),entity.getFz_min(),entity.getFz_max());
				if (checkRecord != null) {
					d.setCode(0);
					d.setMsg("Change failed，This threshold has been used.！");
					return d;
				} 
			}
			/*if(!name.equals(entity.getName())){
				//check code unique
				Record checkRecord = Db.findFirst("select id from office where  name = ?",  entity.getName());				if (checkRecord != null) {
					d.setCode(0);
					d.setMsg("Change failed，The name has been used.！");
					return d;
				} 
			}*/
//			entity.setCreate_time(new Date(createTime.getTime()));
			boolean flag = JFinalDb.update(entity);
			if (flag) {
				d.setCode(1);
				d.setMsg("Updated!");
				return d;
			}
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		d.setCode(1);
		d.setMsg("Update failed，Please contact system administrator");
		return d;
	}
	/*public static boolean isKsCode(String ksCode) {
		Matcher matcher = PATTERN_KSCODE.matcher(ksCode);
		return matcher.matches();
	}*/
	
	 @RequestMapping(value = "/del")
	    @ResponseStatus(HttpStatus.OK)
//		@RequestMapping(value = "/del") 
		@ResponseBody
		public Data del(HttpServletRequest request,Integer id) {
			Data d = new Data();
//			String code = request.getParameter("code");
			if (null != id) {
//				Number num = Db.queryNumber("select count(1) as num from doctor where office_code=?", code);
//				if (num.longValue() > 0) {
//					d.setCode(0);
//					d.setMsg("医生已经使用了科室，删除失败");
//				} else {
					int x = Db.update("delete from inspect_kpi_config_fz where id=?", id);
					if (x > 0) {
						d.setCode(1);
					} else {
						d.setCode(0);
						d.setMsg("Delete failed");
					}
//				}
			} else {
				d.setCode(0);
				d.setMsg("Threshold primary key is empty");
			}
			return d;
		}
}
