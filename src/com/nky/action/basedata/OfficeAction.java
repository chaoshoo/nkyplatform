package com.nky.action.basedata;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.alibaba.fastjson.JSON;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.basedata.OfficeEntity;
import com.sys.action.BaseAction;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;
import com.sys.jfinal.JFinalDb;

/**
 * 科室.
 * @author Ken
 * @version 2016年8月25日
 */
@Controller
@RequestMapping(value = "/office")
public class OfficeAction extends BaseAction {

	@RequestMapping(value = "/show")
	public String show(HttpServletRequest request) {
		return "basedata/officelist";
	}

	/**
	 * 获取列表
	 * @param area
	 * @return
	 */
	@RequestMapping(value = "/list")
	@ResponseBody
	public ScriptPage list(HttpServletRequest request, AjaxPage ajaxPage) {
		ScriptPage scriptPage = null;
		Map<String, Object> param = getParam(request);
		try {
			scriptPage = JFinalDb.findPageBySqlid(ajaxPage.getPageNo(), ajaxPage.getPageSize(), "office_list", param,
					" name asc ");
		} catch (Exception e) {
			LOG.error("查询列表失败.",e);
			scriptPage = new ScriptPage();
		}
		return scriptPage;
	}

	@RequestMapping(value = "/save")
	@ResponseBody
	public Data save(HttpServletRequest request, OfficeEntity entity) {
		Data d = new Data();
		try {
			if(null == entity || StringUtils.isEmpty(entity.getCode()) || !isKsCode(entity.getCode())){
				d.setCode(0);
				d.setMsg("添加失败，编码不合法！");
				return d;
			}
			if(StringUtils.isEmpty(entity.getName()) || !isKsName(entity.getName())){
				d.setCode(0);
				d.setMsg("添加失败，名字不合法！");
				return d;
			}
			
			Record record = Db.findFirst("select id from office where name=? or code = ?", entity.getName(),entity.getCode());
			if (record != null) {
				d.setCode(0);
				d.setMsg("添加失败，编码或名字已经使用过！");
				return d;
			} else {
//				entity.setCode(SysId.getNextHospitalCode());
				if(entity.getDes() != null){
					entity.setDes(entity.getDes().trim());
				}
				entity.setCreate_time(new Date());
				boolean flag = JFinalDb.save(entity);
				if (flag) {
					d.setCode(1);
					return d;
				}
			}
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		d.setCode(0);
		d.setMsg("保存失败，请联系系统管理员");
		return d;
	}

	@RequestMapping(value = "/update")
	@ResponseBody
	public Data update(HttpServletRequest request, OfficeEntity entity) {
		Data d = new Data();
		try {
			if(null == entity || null == entity.getId()){
				d.setCode(0);
				d.setMsg("修改失败，请求非法！");
				return d;
			}
			if( StringUtils.isEmpty(entity.getCode()) || !isKsCode(entity.getCode())){
				d.setCode(0);
				d.setMsg("修改失败，编码不合法！");
				return d;
			}
			if(StringUtils.isEmpty(entity.getName()) || !isKsName(entity.getName())){
				d.setCode(0);
				d.setMsg("修改失败，名字不合法！");
				return d;
			}
			
			Record record = Db.findFirst("select code,name,create_time from office where id = ?", entity.getId());
			if(record == null){
				d.setCode(0);
				d.setMsg("修改失败，请求非法！");
				return d;
			}
			String code = record.getStr("CODE");
			String name = record.getStr("NAME");
			Timestamp createTime = record.getTimestamp("CREATE_TIME");
			if(!code.equals(entity.getCode())){
				//check code unique
				Record checkRecord = Db.findFirst("select id from office where  code = ?",  entity.getCode());
				if (checkRecord != null) {
					d.setCode(0);
					d.setMsg("修改失败，编码已经使用过！");
					return d;
				} 
			}
			if(!name.equals(entity.getName())){
				//check code unique
				Record checkRecord = Db.findFirst("select id from office where  name = ?",  entity.getName());
				if (checkRecord != null) {
					d.setCode(0);
					d.setMsg("修改失败，名字已经使用过！");
					return d;
				} 
			}
			entity.setCreate_time(new Date(createTime.getTime()));
			boolean flag = JFinalDb.update(entity);
			if (flag) {
				d.setCode(1);
				return d;
			}
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		d.setCode(1);
		d.setMsg("更新失败，请联系系统管理员");
		return d;
	}

    @RequestMapping(value = "/del", method = RequestMethod.POST, produces = {"application/json"})
    @ResponseStatus(HttpStatus.OK)
//	@RequestMapping(value = "/del") 
	@ResponseBody
	public Data del(HttpServletRequest request,String code) {
		Data d = new Data();
//		String code = request.getParameter("code");
		if (!StringUtils.isEmpty(code)) {
			Number num = Db.queryNumber("select count(1) as num from doctor where office_code=?", code);
			if (num.longValue() > 0) {
				d.setCode(0);
				d.setMsg("医生已经使用了科室，删除失败");
			} else {
				int x = Db.update("delete from office where code=?", code);
				if (x > 0) {
					d.setCode(1);
				} else {
					d.setCode(0);
					d.setMsg("删除失败");
				}
			}
		} else {
			d.setCode(0);
			d.setMsg("医院编码为空");
		}
		return d;
	}

	/**科室编码规则*/
	private static Pattern PATTERN_KSCODE = Pattern.compile("^[0-9A-Za-z]{2,10}$");
	/**科室名字规则*/
	private static Pattern PATTERN_KSNAME = Pattern.compile("^[0-9A-Za-z\\u4E00-\\u9FA5]{2,10}$");

	/**
	 * 检查输入的科室编码code是否合法.
	 * @return 合法true.
	 */
	public static boolean isKsCode(String ksCode) {
		Matcher matcher = PATTERN_KSCODE.matcher(ksCode);
		return matcher.matches();
	}
	
	/**
	 * 检查输入的科室名字是否合法.
	 * @return 合法true.
	 */
	public static boolean isKsName(String ksName) {
		Matcher matcher = PATTERN_KSNAME.matcher(ksName);
		return matcher.matches();
	}
	
	/**
	 * 获取科室的列表.
	 */
	@RequestMapping(value = "/getItem")
	@ResponseBody
	public String save(HttpServletRequest request) {
		List<Record> list = Db.find("select code,name  from office order by name asc ");
		List<Map<String, Object>> li = JFinalDb.changeList(list);
		return JSON.toJSONString(li);
	}

}
