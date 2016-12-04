package com.nky.action.basedata;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.garea.common.util.ecg.ImageExporter;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.IAtom;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.basedata.MessageTemplateEntity;
import com.nky.entity.basedata.VipEntity;
import com.nky.entity.basedata.VipMbEntity;
import com.nky.vo.AreaVo;
import com.nky.vo.DocGroupVo;
import com.nky.vo.InspectCodeMeta;
import com.nky.vo.InspectDetailMeta;
import com.nky.vo.MessageVo;
import com.sys.action.BaseAction;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.DataObj;
import com.sys.entity.bo.KVvo;
import com.sys.entity.bo.ScriptPage;
import com.sys.jfinal.JFinalDb;
import com.sys.service.IdCoderService;
import com.sys.singleton.DicSingleton;
import com.sys.util.DateUtil;
import com.sys.util.MD5Util;

/**
 * customer management.
 * @author Ken
 * @version 2016year8month26day Afternoon9:37:35
 */
@Controller
@RequestMapping(value = "/vip")
public class VipAction extends BaseAction {

	@Autowired
	private IdCoderService idCoderService;
	
	@RequestMapping(value = "/show")
	public String show(HttpServletRequest request) {
		request.setAttribute("role", getSession().getRoles());
		List<Record> hospitalList = Db.find("select code,name from hospital order by code asc ");
		List<Object[]> hospitals = new ArrayList<Object[]>();
		if(hospitalList != null && hospitalList.size()>0){
			for(Record r : hospitalList){
				hospitals.add( new Object[]{r.getStr("CODE"),r.getStr("NAME")});
			}
		}
		request.setAttribute("hospitals", hospitals);
		
		//如果是医生,查询对应的群组.
		String role = getSession().getRoles();
		List<DocGroupVo> dgList = new ArrayList<DocGroupVo>();
		if(role.equals("3") ){
			String docCode  = getSession().getDoctor().getCode();
			List<Record> docCodeRecords = Db.find("select id,name from doctor_vip_group  where doctor_code = ? ",docCode);
			if(docCodeRecords != null && docCodeRecords.size()>0){
				for(Record r : docCodeRecords){
					DocGroupVo dg = new DocGroupVo();
					dg.setId(r.getLong("ID"));
					dg.setName(r.getStr("NAME"));
					dgList.add(dg);
				}
			}
		}
		request.setAttribute("dgList", dgList);
		List<KVvo> illTypes = new ArrayList<KVvo>();
		List<Record> illTypeList = Db.find("select DIC_NAME,DIC_VALUE from dic where DIC_TYPE = ? ","ill_type");
		if(illTypeList != null && illTypeList.size()>0){
			for(Record r : illTypeList){
				KVvo kv = new KVvo(r.getStr("DIC_NAME"),r.getStr("DIC_VALUE"));
				illTypes.add(kv);
			}
		}
		request.setAttribute("illTypes", illTypes);

		List<KVvo> mbTypes = new ArrayList<KVvo>();
		List<Record> mbtypeList = Db.find("select DIC_NAME,DIC_VALUE from dic where DIC_TYPE =? ","mbtype");
		if(mbtypeList != null && mbtypeList.size()>0){
			for(Record r : mbtypeList){
				KVvo kv = new KVvo(r.getStr("DIC_NAME"),r.getStr("DIC_VALUE"));
				mbTypes.add(kv);
			}
		}
		request.setAttribute("mbTypes", mbTypes);//illTypes  mbTypes
		
		return "basedata/viplist";
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
		if(null != param){
			if(null != param.get("LEQ-age")){
				try{
					Integer.valueOf(param.get("LEQ-age").toString());
				}catch(NumberFormatException e){
					param.remove("LEQ-age");
				}
			}
			if(null != param.get("GEQ-age")){
				try{
					Integer.valueOf(param.get("GEQ-age").toString());
				}catch(NumberFormatException e){
					param.remove("GEQ-age");
				}
			}
		}
		
		String role = getSession().getRoles();
		String hospital = ""; //Hospitalcode,This can be exactly matched {IN-groupId=6,7}
		if(null != param.get("EQ-hospital")){
			hospital = param.get("EQ-hospital").toString();
			param.remove("EQ-hospital");
		}
		if(role.equals("2") ){
			hospital = getSession().getHospital().getHospital_code();
		}
		
		Integer group = null; //Hospitalcode,This can be exactly matched 
		if(null != param.get("EQ-group")){
			try{
				group = Integer.valueOf(param.get("EQ-group").toString());
			}catch(Exception e){
				group = null;
			}
			param.remove("EQ-group");
		}
		
		String doctor = "";//Doctor name,This can be fuzzy matching 
		if(null != param.get("LIKE-doctor")){
			doctor = param.get("LIKE-doctor").toString();
			param.remove("LIKE-doctor");
		}
		String doctorc = "";//Doctor name,This can be fuzzy matching 
		if(null != param.get("LIKE-doctorc")){
			doctorc = param.get("LIKE-doctorc").toString();
			param.remove("LIKE-doctorc");
		}
		if(role.equals("3") ){
			doctorc = getSession().getDoctor().getCode();
			doctor = "";
		}
		String groupSq = "";
		if(null != param.get("IN-groupId")){
			groupSq = "and vip_code in (select vip_code from doctor_vip where group_id in ("+param.get("IN-groupId").toString()+") ) ";//;
			param.remove("IN-groupId");
		}
		
		boolean needAdd = false;
		List<Object> varParams = new ArrayList<Object>();
		String addSql = groupSq+ " and vip_code in (select dv.vip_code from doctor_vip dv,doctor d where dv.doctor_code=d.code $$$ )"; //and d.hospital_code=?
		if(StringUtils.isNotEmpty(hospital)){
			addSql = addSql.replace("$$$", " and d.hospital_code=? $$$");
			varParams.add(hospital);
			needAdd = true;
		}
		if(StringUtils.isNotEmpty(doctorc)){
			addSql = addSql.replace("$$$", " and d.code=? $$$");
			varParams.add(doctorc);  //group 
			needAdd = true;
		}
		if(StringUtils.isNotEmpty(doctor)){
			addSql = addSql.replace("$$$", " and d.name like ? $$$");
			varParams.add("%"+doctor+"%");
			needAdd = true;
		}
		if(null != group ){
			addSql = addSql.replace("$$$", " and d.code in (select doctor_code  from doctor_vip  where group_id = ?) $$$");
			varParams.add(group);
			needAdd = true;
		} 
		
		addSql = addSql.replace("$$$", "");
		
		if(!needAdd){
			addSql = "";
			varParams = null;
		}

		try {
			if(varParams == null || varParams.size()<1){
				scriptPage = JFinalDb.findPageBySqlIdAddedSql(ajaxPage.getPageNo(), ajaxPage.getPageSize(), "vip_list_full",addSql, param," vip_code asc ");
			}else if(varParams.size() ==1 ){
				scriptPage = JFinalDb.findPageBySqlIdAddedSql(ajaxPage.getPageNo(), ajaxPage.getPageSize(), "vip_list_full",addSql, param," vip_code asc ",varParams.get(0));
			}else if(varParams.size() ==2 ){
				scriptPage = JFinalDb.findPageBySqlIdAddedSql(ajaxPage.getPageNo(), ajaxPage.getPageSize(), "vip_list_full",addSql, param," vip_code asc ",varParams.get(0),varParams.get(1));
			}else if(varParams.size() ==3 ){
				scriptPage = JFinalDb.findPageBySqlIdAddedSql(ajaxPage.getPageNo(), ajaxPage.getPageSize(), "vip_list_full",addSql, param," vip_code asc ",varParams.get(0),varParams.get(1),varParams.get(2));
			}
		} catch (Exception e) {
			LOG.error("Query list failed.", e);
			scriptPage = new ScriptPage();
		}
		
		
	/*	if(role.equals("2")){
			//表示医院
			try {
				scriptPage = JFinalDb.findPageBySqlid(ajaxPage.getPageNo(), ajaxPage.getPageSize(), "vip_list_byhospitalcode", param,
						" vip_code asc ",hospital);
			} catch (Exception e) {
				LOG.error("Query list failed.", e);
				scriptPage = new ScriptPage();
			}
		}else if(role.equals("3")){
			//表示医生
			try {
				scriptPage = JFinalDb.findPageBySqlid(ajaxPage.getPageNo(), ajaxPage.getPageSize(), "vip_list_bydoctorcode", param,
						" vip_code asc ",doctorc);
			} catch (Exception e) {
				LOG.error("Query list failed.", e);
				scriptPage = new ScriptPage();
			}
		}else{
			//系统管理
			try {
				scriptPage = JFinalDb.findPageBySqlid(ajaxPage.getPageNo(), ajaxPage.getPageSize(), "vip_list", param,
						" vip_code asc ");
			} catch (Exception e) {
				LOG.error("Query list failed.", e);
				scriptPage = new ScriptPage();
			}
		}*/
		return scriptPage;
	}
	
	/**
	 * Get list
	 * @param area
	 * @return
	 */
	@RequestMapping(value = "/listc06")
	@ResponseBody
	public ScriptPage listc06(HttpServletRequest request, AjaxPage ajaxPage) {
		ScriptPage scriptPage = null;
		Map<String, Object> param = getParam(request);
		////select sg,vc,bld,ph,ubg,nit,leu,bil,pro,ket,glu from vip_inspect_data 
		//where card_code = ? and inspect_code = ? order by inspect_time desc
//		param.put("EQ-card_code","");
//		param.put("EQ-inspect_code","C06"); 
		  
		try {
			scriptPage = JFinalDb.findPageBySqlid(ajaxPage.getPageNo(), ajaxPage.getPageSize(), "vipc06_list", param," inspect_time desc ");
		} catch (Exception e) {
			LOG.error("Query list failed.", e);
			scriptPage = new ScriptPage();
		}
		
		return scriptPage;
	}

    @RequestMapping (value = "/message", method = RequestMethod.POST, produces = {"application/json"})
    @ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public Data message(HttpServletRequest request,final MessageVo message) {
		Data d = new Data();
		final Set<Long> reciverIds = new HashSet<Long>();

		if(StringUtils.isEmpty(message.getCardCode())){
			AjaxPage ajaxPage = new AjaxPage();
			ajaxPage.setPageSize(message.getTotal());
			ScriptPage sp = list(request,  ajaxPage); 
			if(sp != null && sp.getRows() != null){
				for(Object ve : sp.getRows()){
					Map tmp = (Map)ve;
					reciverIds.add(Long.valueOf(""+tmp.get(("ID"))));
					LOG.debug("The message should be sent to the result set.:{},{}",tmp.get("VIP_CODE"),tmp.get("REAL_NAME"));
				}
			}
		}
		
		String role = getSession().getRoles();
		final Integer creatorId = getSession().getId();
		
		if (message != null && (StringUtils.isNotEmpty(message.getCardCode()) || !reciverIds.isEmpty()) 
				&& null != message.getMsgType() && !StringUtils.isEmpty(message.getTitle()) 
				&& !StringUtils.isEmpty(message.getContent()) && StringUtils.isNotEmpty(role) && null != creatorId
				) {
//			Record channeIdRecord = Db.findFirst("select android_tv_channel_id from t_vip   where card_code = ?", message.getCardCode());
//			String channeId = channeIdRecord.getStr("ANDROID_TV_CHANNEL_ID");
//			try {
//				message.setTitle(URLEncoder.encode(message.getTitle(), "utf-8"));//new String(message.getTitle().getBytes(), "ISO-8859-1"));
//				message.setContent(URLEncoder.encode(message.getContent(), "utf-8"));//new String(message.getTitle().getBytes(), "ISO-8859-1"));
//			} catch (UnsupportedEncodingException e) {
//				e.printStackTrace();
//			}
			
			boolean flag = Db.tx(new IAtom() {
				public boolean run() throws SQLException {
//					Set<Long> reciverIds = new HashSet<Long>();
					if(StringUtils.isNotEmpty(message.getCardCode())){
						Record pushMetaRecord = Db.findFirst("select id from t_vip   where card_code = ?", message.getCardCode());
						Long recive = pushMetaRecord.getLong("ID");//android_tv_token_id
						reciverIds.add(recive);
					}/*else if(! reciverIds.isEmpty()){
						List<Record> pushMetaRecords = Db.find("select id from t_vip   where vip_code in (select vip_code from doctor_vip where group_id = ?)", message.getRecivergroupid());
						if(null != pushMetaRecords && pushMetaRecords.size()>0){
							for(Record r : pushMetaRecords){
								reciverIds.add(r.getLong("ID"));  
							}
						}
					}//Also consider，Query list
*/					
					if(reciverIds.size()<1){
						LOG.error("No receiver，Failed to write message table");
						return false;
					}
					
					Date createTime = new Date();
					Record messageDb = new Record().set("msg_type",message.getMsgType()).set("creator", creatorId)
							.set("title", message.getTitle()).set("content", message.getContent())
							.set("isvalid", 1).set("create_time", createTime);
					boolean flag = Db.save("message", "id", messageDb);
					LOG.debug("Push message write data sheetmessageResult ：{}",flag);
					Long messageId = messageDb.getLong("id");
					if(!flag || messageId == null){
						LOG.error("Failed to write message table");
						return false;
					}
					
					Set<Long> reciveredIds = new HashSet<Long>();
					for(Long rid : reciverIds){
						Record rr = new Record().set("msg_type",message.getMsgType()).set("message_id", messageId).set("reciver", rid).set("create_time", createTime);
						boolean cFlag = Db.save("message_center", "id", rr);
						LOG.debug("Push message write data sheetmessage_centerResult ：{}",cFlag);
						if(cFlag){
							reciveredIds.add(rid);//Push success has to write to the database on the success of
						}
					}

					return reciverIds.size() == reciveredIds.size() ;
				}
			});
			
			if(flag){
				d.setCode(1); 
			}else{
				d.setCode(0);
				d.setMsg("Push message failed。");
			}
			
//			//creator,creatorrole,msgtype,title,content,recivercardcode,recivergroupid
//			String url = ServiceConstants.b2c_url+"/mobile/interface.do?content={%27type%27:%27pushmessage%27}";
//			//headers.setContentType(Media.valueOf("application/json;UTF-8"));
//			LOG.debug("提醒Api发送消息：{}",url);
//			String returnMsg = HttpClient.PushForHttp(url);
//			LOG.debug("提醒Api发送消息结果：{}",returnMsg);
//			//http://localhost:8080/nkyapi/mobile/interface.do?content={%27type%27:%27pushmessage%27,%27title%27:%27abc%27,%27content%27:%27def%27,%27channeid%27:%27channeid%27}
//			if(StringUtils.isNotEmpty(returnMsg)){
//				if(returnMsg.contains(":true,")){
//					d.setCode(1); 
//				}else{
//					d.setCode(0);
//					d.setMsg("推送消息失败。");
//				}
//			}else{
//				d.setCode(0); 
//				d.setMsg("推送消息失败，请检查消息服务状态。");
//			}
		} else {
			d.setCode(0);
			d.setMsg("Push message failed，Incomplete data。");
		}
		return d;
	}
    
    @RequestMapping(value = "/messagetmp", method = RequestMethod.POST, produces = {"application/json"})
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Data messagetmp(HttpServletRequest request) {
    	Data d = new Data();
    	try{
    		List<Record> msgTmpRecords = Db.find(
    				"select * from message_template where creator = ? and creator_type = ? order by create_time desc  ",
    				Long.valueOf(getSession().getId()), getSession().getRoles());
    		List<MessageTemplateEntity> mteList = new ArrayList<MessageTemplateEntity>();
    		if(msgTmpRecords != null && msgTmpRecords.size()>0){
    			for(Record r : msgTmpRecords){
    				//msg_type,title,content
    				MessageTemplateEntity mte = new MessageTemplateEntity();
    				mte.setContent(r.getStr("CONTENT"));
    				mte.setId(r.getLong("ID"));
    				mte.setTitle(r.getStr("TITLE"));
    				mte.setMsg_type(r.getInt("MSG_TYPE"));
    				mteList.add(mte);
    			}
    		}
    		d.setCategories(mteList);
    		d.setCode(1);
    	}catch(Exception e){
    		d.setCode(0);
    		d.setMsg("Incomplete data");
    	}
    	return d;
    }
    
    /**
     * Query owned group list，And the doctor's group list.
     * @param request
     * @return
     */
    @RequestMapping(value = "/tags/{vipCode}", method = RequestMethod.POST, produces = {"application/json"})
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Data tags(HttpServletRequest request,@PathVariable("vipCode")String vipCode) {
    	Data d = new Data();
    	try{
    		String role = getSession().getRoles();
    		List<DocGroupVo> dgList = new ArrayList<DocGroupVo>();
    		if(role.equals("3") ){
    			String docCode  = getSession().getDoctor().getCode();
    			List<Record> docCodeRecords = Db.find("select id,name from doctor_vip_group  where doctor_code = ? ",docCode);
    			if(docCodeRecords != null && docCodeRecords.size()>0){
    				for(Record r : docCodeRecords){
    					DocGroupVo dg = new DocGroupVo();
    					dg.setId(r.getLong("ID"));
    					dg.setName(r.getStr("NAME"));
    					dgList.add(dg);
    				}
    			}
    			if(dgList != null && dgList.size()>0 && StringUtils.isNotEmpty(vipCode) && !vipCode.equals("@all")){
    				//查询这个用户和医生的绑定关系
        			List<Record> docVipRecords = Db.find("select group_id from doctor_vip where doctor_code = ? and vip_code = ? and group_id is not null ",docCode,vipCode);
        			if(docVipRecords != null && docVipRecords.size()>0){
        				for(Record r : docVipRecords){
        					Long groupId = r.getLong("GROUP_ID");
        					if(groupId == null ){
        						continue;
        					}
        					for(DocGroupVo v : dgList){
        						if(v.getId()  == groupId.longValue()){
        							v.setGroup(true);
        						}
        					}
        				}
        			}
    			}
    		}
    		 
    		d.setCategories(dgList); //group true This customer has been identified by the doctor as a group of people.
    		d.setCode(1);
    	}catch(Exception e){
    		LOG.error("Query tag data failed",e);
    		d.setCode(0);
    		d.setMsg("Incomplete data");
    	}
    	return d;
    }
    
    @RequestMapping(value = "/inspectlatest/{cardCode}", method = RequestMethod.POST, produces = {"application/json"})
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Data inspectlatest(HttpServletRequest request,@PathVariable("cardCode")String cardCode) {
    	Data d = new Data();
    	try{
    		List<Map<String,String>> dics = DicSingleton.getInstance().getDic("inspect_code");//Query all indicators
        	if(dics == null || dics.size()<1){
        		d.setCode(0);
        		d.setMsg("Query exception");
        	}else  if (StringUtils.isEmpty(cardCode)) {
        		d.setCode(0);
        		d.setMsg("Incomplete data");
            }else{ 	
            	List<InspectCodeMeta> metas = new ArrayList<InspectCodeMeta>();
            	
        		Map<String,String> dicCodeName = new HashMap<String,String>();//Indicators and indicators of the name
        		Map<String,String> detailCodeUnit = new HashMap<String,String>();//Specific indicators and indicators of the unit
        		Map<String,List<InspectDetailMeta>> detailMap = new HashMap<String,List<InspectDetailMeta>>();//Specific indicators and indicators of the unit
            	for(Map<String,String> map : dics){
            		dicCodeName.put(map.get("dic_name"), map.get("dic_value"));
            	}
            	List<Record> unitList = Db.find("select code,unit from inspect_kpi_config");
            	if(unitList != null && unitList.size()>0){
            		for(Record rt : unitList){
            			detailCodeUnit.put(rt.getStr("CODE"), rt.getStr("UNIT"));
            		}
            	}
            	
            	//按检测代码合并相同的信息提示
//            	Map<String,String> dicCodeValue = new HashMap<String,String>();//键值及描述
        		List<Record> list = Db.find("select id,inspect_code,kpi_code,inspect_name,inspect_time,inspect_value,inspect_is_normal from vip_inspect_latest where card_code = ?", cardCode);
        		if(list != null && list.size()>0){
        			for(Record rt : list){
        				String inspectCode = rt.getStr("inspect_code");
        				InspectDetailMeta detail = new InspectDetailMeta();
        				detail.setCode(rt.getStr("kpi_code"));
        				detail.setUnit(detailCodeUnit.get(rt.getStr("kpi_code")));
        				detail.setDateTime(DateUtil.dateForStr(rt.getTimestamp("inspect_time"),"yyyy-MM-dd HH:mm"));
        				detail.setName(rt.getStr("inspect_name"));
        				detail.setValue(rt.getStr("inspect_value")); 
        				List<InspectDetailMeta> lists = detailMap.get(inspectCode);
        				if(lists == null){
        					lists = new ArrayList<InspectDetailMeta>();
        				}
        				lists.add(detail);
    					detailMap.put(inspectCode, lists);
        			}
        		} 
        		//Map<String,List<InspectDetailMeta>> detailMap
        		for(Map.Entry<String, List<InspectDetailMeta>> entity : detailMap.entrySet()){
                	InspectCodeMeta codeMeta = new InspectCodeMeta();
                	codeMeta.setCode(entity.getKey());
                	codeMeta.setDetail(entity.getValue());
                	codeMeta.setName(dicCodeName.get(entity.getKey()));
                	metas.add(codeMeta);
        		}
        		Collections.sort(metas);
        		d.setCode(1);
        		d.setCategories(metas);
        	}
    	}catch(Exception e){
    		LOG.error("Failed to check the latest inspection results",e);
    		d.setCode(0);
    		d.setMsg("Query exception");
    	}
    	 
    	return d;
    }

    @RequestMapping(value = "/updateStatus/{id}/{status}", method = RequestMethod.POST, produces = {"application/json"})
    @ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public Data updateStatus(HttpServletRequest request,@PathVariable("id")Integer id,@PathVariable("status")String status) {
		Data d = new Data();
		try{
			if(null != id && null != status){
				int x = Db.update("update t_vip set isvalid = ? where id = ? ", status,id);
				if (x > 0) {
					d.setCode(1);
					return d;
				}
			}
			d.setCode(0);
			d.setMsg("Update failed");
		}catch(Exception e){
			LOG.error("Failure to update customer status",e);
			d.setCode(0);
			d.setMsg("Update exception");
		}
		return d;
	}
    
    @RequestMapping(value = "/deltag/{gid}/{vipCode}", method = RequestMethod.POST, produces = {"application/json"})
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Data deltag(HttpServletRequest request,@PathVariable("gid")Long gid,@PathVariable("vipCode")String vipCode) {
    	Data d = new Data();
    	try{
    		if(null != gid && StringUtils.isNotEmpty(vipCode)){
    			String docCode  = getSession().getDoctor().getCode();
    			int x = Db.update("delete from  doctor_vip where group_id = ? and vip_code = ? and doctor_code = ? ", gid,vipCode,docCode);
    			if (x > 0) {
    				d.setCode(1);
    				return d;
    			}
    		}
    		d.setCode(0);
    		d.setMsg("Delete failed");
    	}catch(Exception e){
    		LOG.error("Delete exception",e);
    		d.setCode(0);
    		d.setMsg("Delete exception");
    	}
    	return d;
    }
    
    @RequestMapping(value = "/addtag/{gid}/{vipCode}", method = RequestMethod.POST, produces = {"application/json"})
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Data addtag(HttpServletRequest request,@PathVariable("gid")String gid,@PathVariable("vipCode")String vipCode) {
    	Data d = new Data();
    	try{
			String docCode  = getSession().getDoctor().getCode();
    		if(StringUtils.isEmpty(gid) || !gid.startsWith("tags")){
        		d.setCode(0);
        		d.setMsg("Set up group failed,Incomplete data");
        		return d;
    		}
    		gid = gid.replace("tags", "");
    		//先清理群组.再创建群组
    		int x = Db.update("delete from  doctor_vip where vip_code = ? and doctor_code = ? and group_id is not null", vipCode,docCode);
    		if (x >= 0) {
	    		if(StringUtils.isEmpty(gid) || gid.equals(",")){
    				d.setCode(1);
    				return d;
	    		}else{
	    			String gids [] = gid.split(",");
	    			for(String tid :gids){
	    				try{
	    					if(StringUtils.isEmpty(tid)){
	    						continue;
	    					}
	    					Long idL = Long.valueOf(tid);
	    					 Db.update("insert into doctor_vip(group_id,vip_code,doctor_code) values(?,?,?)", idL,vipCode,docCode);
	    				}catch(NumberFormatException e){
	    					LOG.error("Analytical data groupidabnormal",e);
	    				}
	    			}
	    			d.setCode(1);
    				return d;
	    		}
			}  
    		d.setCode(0);
    		d.setMsg("Set up group failed");
    	}catch(Exception e){
    		LOG.error("Set up group exception",e);
    		d.setCode(0);
    		d.setMsg("Set up group exception");
    	}
    	return d;
    }
    
	@RequestMapping(value = "/getmb/{vipId}")
	@ResponseBody
	public DataObj getmb(HttpServletRequest request,@PathVariable("vipId")Long vipId) {
		DataObj d = new DataObj();
		try {
			if(null == vipId){
				d.setCode(0);
				d.setMsg("Process failed，Invalid request！");
				return d;
			} 
			Record r = Db.findFirst("select * from t_vip_chronic where vip_id = ?", vipId);
			if(r == null){
				d.setCode(0);
				d.setMsg("Process failed，Invalid request！");
				return d;
			}
			VipMbEntity obj = new VipMbEntity();
			obj.setChronic_type(r.getStr("CHRONIC_TYPE"));
			obj.setIll_med(r.getStr("ILL_MED"));
			obj.setIll_name(r.getStr("ILL_NAME"));
			obj.setIll_type(r.getStr("ILL_TYPE"));
			obj.setInspect_time(r.getTimestamp("INSPECT_TIME"));
			obj.setInspect_timeStr(DateUtil.dateForString(r.getTimestamp("INSPECT_TIME"), "yyyy-MM-dd"));
			obj.setIschronic(r.getInt("ISCHRONIC"));
			obj.setYb_type(r.getStr("YB_TYPE"));
			obj.setVip_id(r.getLong("VIP_ID"));
			d.setObj(obj); 
			
			d.setCode(1);
			d.setMsg("Process failed，Please contact system administrator");
			return d;
		}catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		d.setCode(0);
		d.setMsg("Process failed，Please contact system administrator");
		return d;
	}
    
	@RequestMapping(value = "/updatemb")
	@ResponseBody
	public Data updatemb(HttpServletRequest request, VipMbEntity entity) {
		Data d = new Data();
		try {
			if(null == entity || null == entity.getVip_id() || StringUtils.isEmpty(entity.getYb_type()) || null == entity.getIschronic()){
				d.setCode(0);
				d.setMsg("Process failed，Invalid request！");
				return d;
			} 
			int x = 0;
			Record record = Db.findFirst("select id from t_vip_chronic where vip_id = ?", entity.getVip_id());
			if(record == null){
				//这里要进行添加
				x = Db.update(" insert into t_vip_chronic(ischronic,vip_id,yb_type,ill_name,ill_type,inspect_time,ill_med,chronic_type) values(?,?,?,?,?,?,?,?)"
						,entity.getIschronic(),entity.getVip_id(),entity.getYb_type(),entity.getIll_name(),entity.getIll_type(),entity.getInspect_time(),entity.getIll_med(),entity.getChronic_type());
			}else{
				x = Db.update("update t_vip_chronic set  ischronic=?,yb_type=?,ill_name=?,ill_type=?,inspect_time=?,ill_med=?,chronic_type=? where vip_id = ? "
						,entity.getIschronic(),entity.getYb_type(),entity.getIll_name(),entity.getIll_type(),entity.getInspect_time(),entity.getIll_med(),entity.getChronic_type(),entity.getVip_id());
			}
			if (x>0) {
				d.setCode(1);
				return d;
			}
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		d.setCode(1);
		d.setMsg("Process failed，Please contact system administrator");
		return d;
	}
	
	@RequestMapping(value = "/update")
	@ResponseBody
	public Data update(HttpServletRequest request, VipEntity entity) {
		Data d = new Data();
		try {
			if(null == entity || null == entity.getId()){
				d.setCode(0);
				d.setMsg("Change failed，Invalid request！");
				return d;
			} 
			
			if(StringUtils.isEmpty(entity.getVip_code())){
				d.setCode(0);
				d.setMsg("Change failed，Customer code cannot be empty！");
				return d; 
			} 
			
			if(StringUtils.isEmpty(entity.getCard_code())){
				d.setCode(0);
				d.setMsg("Change failed，Card number can not be empty！");
				return d; 
			}
			
			if(StringUtils.isEmpty(entity.getPapers_num())){
				d.setCode(0);
				d.setMsg("Change failed，Id number can not be empty！");
				return d; 
			}
			
			if(StringUtils.isEmpty(entity.getMobile())){
				d.setCode(0);
				d.setMsg("Change failed，Cell phone number can not be empty！");
				return d; 
			}
			
			if(StringUtils.isEmpty(entity.getLogin_account())){
				d.setCode(0);
				d.setMsg("Change failed，Account cannot be empty！");
				return d; 
			}
			
			Record record = Db.findFirst("select id from t_vip where id = ?", entity.getId());
			if(record == null){
				d.setCode(0);
				d.setMsg("Change failed，Invalid request！");
				return d;
			}

			
			List<Record> recordCheck = Db.find("select id from t_vip where id != ? and  vip_code=? ",new Object[]{entity.getId(),entity.getVip_code()});
			if(recordCheck != null && recordCheck.size()>=1){
				d.setCode(0);
				d.setMsg("Change failed，Customer code"+entity.getVip_code()+"Existing！");
				return d;
			}

			recordCheck = Db.find("select id from t_vip where id != ? and  card_code=? ",new Object[]{entity.getId(),entity.getCard_code()});
			if(recordCheck != null && recordCheck.size()>=1){
				d.setCode(0);
				d.setMsg("Change failed，Credit Card Number"+entity.getCard_code()+"Existing！");
				return d;
			}

			recordCheck = Db.find("select id from t_vip where id != ? and  papers_num=? ",new Object[]{entity.getId(),entity.getPapers_num()});
			if(recordCheck != null && recordCheck.size()>=1){
				d.setCode(0);
				d.setMsg("Change failed，Id Number"+entity.getPapers_num()+"Existing！");
				return d;
			}

			recordCheck = Db.find("select id from t_vip where id !=  ? and  mobile=? ",new Object[]{entity.getId(),entity.getMobile()});
			if(recordCheck != null && recordCheck.size()>=1){
				d.setCode(0);
				d.setMsg("Change failed，Phone number"+entity.getMobile()+"Existing！");
				return d;
			}

			recordCheck = Db.find("select id from t_vip where id != ? and  login_account=? ",new Object[]{entity.getId(),entity.getLogin_account()});
			if(recordCheck != null && recordCheck.size()>=1){
				d.setCode(0);
				d.setMsg("Change failed，Login account"+entity.getLogin_account()+"Existing！");
				return d;
			} 
			
			//VIP_CODE，CARD_CODE，PAPERS_NUM，MOBILE，login_account的唯一性要检查,要重复了，数据就更乱了。
			int x = Db.update("update t_vip set VIP_CODE=?,CARD_CODE=?,PAPERS_NUM=?,MOBILE=?,login_account=?"
					+ ",nick_name=?,real_name=?,birthday=?,age=?"
					+ ",weight = ?,height=?,account_mail=?,sex=?,area=?,address=?,post_code=?,phone=?,ill_history=?,gm=?,qq=?,modify_time=now() where id = ? "
					,entity.getVip_code(),entity.getCard_code(),entity.getPapers_num(),entity.getMobile(),entity.getLogin_account()
					,entity.getNick_name(),entity.getReal_name(),entity.getBirthday(),entity.getAge()
					,entity.getWeight(),entity.getHeight(),entity.getAccount_mail(),entity.getSex(),entity.getArea(),entity.getAddress(),entity.getPost_code()
					,entity.getPhone(),entity.getIll_history(),entity.getGm(),entity.getQq(),entity.getId());
			if (x>0) {
				d.setCode(1);
				return d;
			}
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		d.setCode(1);
		d.setMsg("Update failed，Please contact system administrator");
		return d;
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST, produces = {"application/json","text/html;charset=utf-8"})
	@ResponseBody
	public Data save(HttpServletRequest request, VipEntity entity) {
		Data d = new Data();
		try {
			if(null == entity || StringUtils.isEmpty(entity.getPapers_num())){
				return new Data(0,"New failed，Incomplete data！");
			} 
			if(StringUtils.isEmpty(entity.getLogin_account()) || !isName(entity.getLogin_account())){
				return new Data(0,"New failed，Customer login account is invalid！");
			}
			if(StringUtils.isEmpty(entity.getNick_name()) || !isName(entity.getNick_name())){
				return new Data(0,"New failed，Customer membership nickname data is not valid！");
			}
			if(StringUtils.isEmpty(entity.getReal_name()) || !isName(entity.getReal_name())){
				return new Data(0,"New failed，Customer real name is invalid！");
			}
			if(StringUtils.isEmpty(entity.getMobile()) || !isPhone(entity.getMobile())){
				return new Data(0,"New failed，Customer phone number is invalid！");
			}
			
			if(DateUtil.getDateFromStr2(entity.getBirthday()) == null){
				return new Data(0,"New failed，Customer`s birthday is invalid！");
			}
			
			if(StringUtils.isNotEmpty(entity.getWeight())){
				try{
					if(Double.valueOf(entity.getWeight()) <10){
						return new Data(0,"New failed，Client weight data is not legal！");
					}
				}catch(NumberFormatException e){
					return new Data(0,"New failed，Client weight data is not legal！");
				}
			}
			
			if(StringUtils.isNotEmpty(entity.getHeight())){
				try{
					if(Double.valueOf(entity.getHeight()) <=10){
						return new Data(0,"New failed，Customer height data is invalid！");
					}
				}catch(NumberFormatException e){
					return new Data(0,"New failed，Customer height data is invalid！");
				}
			}
			
			try{
				Integer.valueOf(entity.getAge());
			}catch(NumberFormatException e){
				return new Data(0,"New failed，Customer age is invalid！");
			}
			
			//只有医生有权限为他添加
			String role = getSession().getRoles();
			if(!role.equals("3") ){
				return new Data(0,"New failed，Only doctors can add customers！");
			}
			Record rec  = Db.findFirst("select * from t_vip where (card_code=? or papers_num=? or mobile=? ) and isvalid = '1' ",
								new Object[]{entity.getPapers_num(),entity.getPapers_num(),entity.getMobile()});
			if(rec != null) {
				return new Data(0,"The user has already been registered.！");
			}

			String vip_id =  idCoderService.getSupplyClientCodeApi();
			
			Db.update("insert into t_vip (vip_code,card_code,login_account,mobile,login_password,heard_img_url,isvalid,"+
								" papers_num,nick_name,real_name,account_mail,weight,height,sex,area,address,birthday,post_code,phone,"+
								" ill_history,gm,qq,modify_time,create_time,age) "+
								" values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW(),?)",
			new Object[]{vip_id,entity.getPapers_num(),entity.getLogin_account(),entity.getMobile(),MD5Util.MD5("123456","UTF-8").toLowerCase(),"",entity.getIsvalid(),
					entity.getPapers_num(),entity.getNick_name(),entity.getReal_name(),entity.getAccount_mail(),entity.getWeight(),entity.getHeight(),
					entity.getSex(),entity.getArea(),entity.getAddress(),entity.getBirthday(),entity.getPost_code(),entity.getPhone(),
					entity.getIll_history(),entity.getGm(),entity.getQq(),entity.getAge()});
			
			//医生添加时绑定好关系
			String docCode  = getSession().getDoctor().getCode();
			Record r = Db.findFirst("select * from doctor_vip where vip_code = ? and doctor_code = ? ",new Object[]{vip_id,docCode});
			if(r==null){
				Db.update("insert into doctor_vip (vip_code,doctor_code,create_time) values(?,?,NOW())", new Object[]{vip_id,docCode});
			}
			
			return new Data(1,"New success");
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
		d.setCode(1);
		d.setMsg("New failed");
		return d;
	}

	/**Coding rule*/
	private static Pattern PATTERN_CODE = Pattern.compile("^[0-9A-Za-z]{2,30}$");
	/**Name rule*/
	private static Pattern PATTERN_NAME = Pattern.compile("^[0-9A-Za-z\\u4E00-\\u9FA5]{2,30}$");

	/**
	 * Check input codingcodeWhether legal.
	 * @return legitimatetrue.
	 */
	public static boolean isCode(String ksCode) {
		Matcher matcher = PATTERN_CODE.matcher(ksCode);
		return matcher.matches();
	}
	  
	/**phonerule*/
	private static Pattern PHONE_NAME = Pattern.compile("^[1]([0-9]{10})$");
	
	/**
	 * Check input codingPhoneWhether legal.
	 * @return legitimatetrue.
	 */
	public static boolean isPhone(String phone) {
		Matcher matcher = PHONE_NAME.matcher(phone);
		return matcher.matches();
	}
	
	/**
	 * Check the name of the input is valid.
	 * @return legitimatetrue.
	 */
	public static boolean isName(String ksName) {
		Matcher matcher = PATTERN_NAME.matcher(ksName);
		return matcher.matches();
	}
	
    @RequestMapping(value = "/area", method = RequestMethod.POST, produces = {"application/json"})
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Data area(HttpServletRequest request) {
    	Data d = new Data();
    	try{
    		List<Record> msgTmpRecords = Db.find("select id,full_name from t_area ");
    		List<AreaVo> mteList = new ArrayList<AreaVo>();
    		if(msgTmpRecords != null && msgTmpRecords.size()>0){
    			for(Record r : msgTmpRecords){
    				AreaVo mte = new AreaVo();
    				mte.setId(r.getInt("ID"));
    				mte.setName(r.getStr("FULL_NAME"));
    				mteList.add(mte);
    			}
    		}
    		d.setCategories(mteList);
    		d.setCode(1);
    	}catch(Exception e){
    		d.setCode(0);
    		d.setMsg("Incomplete data");
    	}
    	return d;
    }

    @RequestMapping(value = "/del", method = RequestMethod.POST, produces = {"application/json"})
    @ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public Data del(HttpServletRequest request,final Long id) {
		Data d = new Data();
		if (null != id ) {
			Record rec  = Db.findFirst("select vip_code,card_code from t_vip where id = ?", new Object[]{id});
			final String vipCode = rec.getStr("VIP_CODE");//android_tv_token_id
			final String cardCode = rec.getStr("CARD_CODE");//android_tv_token_id
			if(StringUtils.isEmpty(vipCode) || StringUtils.isEmpty(cardCode)){
				d.setCode(0);
				d.setMsg("Incomplete data");
			}
			boolean flag = Db.tx(new IAtom() {
				public boolean run() throws SQLException {
					int deleteVip = Db.update("delete from t_vip where id = ?", id);//Client table deletion
					int deleteDoctorVip = Db.update("delete from doctor_vip where vip_code = ?", vipCode);//Doctor client relationship table deletion
					int deleteDoctorVipMsg = Db.update("delete from doctor_vip_msg where vip_code = ?", vipCode);//Doctor client relationship table deletion
					int deleteVipUser = Db.update("delete from doctor_visit where visit_user = ?", id); 
					int deleteMsg = Db.update("delete from message_center where reciver = ?", id); 
					int deleteRemoteInspect = Db.update("delete from remote_inspect where vip_code = ?", vipCode); 
//					int deleteRemoteInspect = Db.update("delete from remote_inspect_log where vip_or_doctor = ?)", vipCode); 
					int deleteRemoteInspectScore = Db.update("delete from remote_inspect_score where vip_code = ?", vipCode); 
					int deleteAddress = Db.update("delete from t_vip_address where vip_code = ?", vipCode); 
					int deleteChronic = Db.update("delete from t_vip_chronic where vip_id = ?", id); 
					int deleteLog = Db.update("delete from t_vip_log where vip_code = ?", vipCode); 
					int deleteExam = Db.update("delete from vip_exam where vip_code = ?", vipCode); 
					int deleteFamily = Db.update("delete from vip_family where vip_code = ?", vipCode); 
					int deleteInspect = Db.update("delete from vip_inspect_data where card_code = ?", cardCode); 
					int deleteInspectEcg = Db.update("delete from vip_inspect_data_ecg where card_code = ?", cardCode); 
					int deleteInspectLatest = Db.update("delete from vip_inspect_latest where card_code = ?", cardCode); 
					int deleteQ = Db.update("delete from vip_questions where vip_code = ?", vipCode); 
					int deleteReg = Db.update("delete from vip_reg where vip_code = ?", vipCode); 
					return deleteVip == 1  && deleteDoctorVip>=0 && deleteDoctorVipMsg>=0 && deleteVipUser>=0 && deleteMsg>=0 && deleteRemoteInspect>=0
							&& deleteRemoteInspectScore>=0 && deleteAddress>= 0 &&deleteChronic>=0 && deleteLog>=0 && deleteExam>=0 && deleteFamily>=0
							&& deleteInspect >= 0 && deleteInspectEcg>= 0 && deleteInspectLatest>= 0 && deleteQ>=0 && deleteReg>=0;
				}
			}); 
				
			if (flag) {
				d.setCode(1);
			} else {
				d.setCode(0);
				d.setMsg("Delete failed");
			}
		} else {
			d.setCode(0);
			d.setMsg("Incomplete data");
		}
		return d;
	}
    
    @RequestMapping(value = "/createEcg/{id}")
    public String createEcg(HttpServletRequest request,@PathVariable("id")  Long id) {
    	Data d = new Data();
    	try{
    		if (null != id ) {
        		Record rec  = Db.findFirst("SELECT inspect_time,analyzeResultStr,data,card_code FROM vip_inspect_data_ecg where  id = ?", new Object[]{id});
        		final String data = rec.getStr("DATA");//android_tv_token_id
        		final String card_code = rec.getStr("CARD_CODE");//android_tv_token_id
        		request.setAttribute("card_code", card_code); 
        		Record vip  = Db.findFirst("SELECT mobile,real_name,nick_name from t_vip where card_code = ? limit 1", new Object[]{card_code});
        		if(null != vip){
        			String mobile = vip.getStr("MOBILE");
        			if(StringUtils.isNotEmpty(mobile)){
                		request.setAttribute("mobile", mobile); 
        			}else{
                		request.setAttribute("mobile", ""); 
        			}
        			String real_name = vip.getStr("REAL_NAME");
        			String nick_name = vip.getStr("NICK_NAME");
        			if(StringUtils.isNotEmpty(real_name)){
                		request.setAttribute("real_name", real_name); 
        			}else if(StringUtils.isNotEmpty(nick_name)){
                		request.setAttribute("real_name", nick_name); 
        			}else{
                		request.setAttribute("real_name", ""); 
        			}
        		}        		
        		request.setAttribute("analyzeResultStr", rec.getStr("ANALYZERESULTSTR"));//illTypes  mbTypes
        		request.setAttribute("inspect_time", DateUtil.dateForStr(rec.getTimestamp("INSPECT_TIME"),"yyyy-MM-dd HH:mm") );//illTypes  mbTypes
        		String uid = UUID.randomUUID().toString();
    			String root = request.getSession().getServletContext().getRealPath("");
    			String pathPrefix = "/temp/ecg/"+uid+"/";
    			String rootPath = root+pathPrefix;
    			File destFolder = new File(root+pathPrefix);  
    			if(!destFolder.exists()){
        			destFolder.mkdirs();
        		}
    			if(!destFolder.exists()){
        			d.setCode(0);
        			d.setMsg("Failed to generate ECG");
        		}
    			List<String> allPic = new ArrayList<String>();
    			/* dataTo passBase64Encoded data  If the original data is taken，NonBase64Encoded data，Please replace the function
    			 * Please refer to the interface documentation to confirm whether the acquired ECG data isBase64Encoded data */
    			Map<String, byte[]> imgs = new ImageExporter().export(data);
    			int i = 1;
    			for (Map.Entry<String, byte[]> entry : imgs.entrySet()) {
    				//			printLead(entry.getKey());
    				/*  Save data to file，To facilitate inspection */
    				try {
    					String fileName = rootPath + i + "-" + entry.getKey() + ".jpg";
    					String xdPath = pathPrefix+ i + "-" + entry.getKey() + ".jpg";
    					FileOutputStream fos = new FileOutputStream(fileName);
    					i++;
    					fos.write(entry.getValue());
    					fos.flush();
    					fos.close();
    					allPic.add(xdPath);
    				} catch (FileNotFoundException e) {
    					LOG.error("Failure to export ECG images.",e);
    				} catch (IOException e) {
    					LOG.error("Failure to export ECG images.",e);
    				}

    			}
    			d.setCode(1);
    			d.setCategories(allPic);
        	} else {
        		d.setCode(0);
        		d.setMsg("Incomplete data");
        	}
    	}catch(Exception e){
			LOG.error("Failure to export ECG images.",e);
    	}
		request.setAttribute("msg", d.getMsg());//illTypes  mbTypes
		request.setAttribute("d", d);//illTypes  mbTypes
		return "basedata/vipecg";
    }

    
}