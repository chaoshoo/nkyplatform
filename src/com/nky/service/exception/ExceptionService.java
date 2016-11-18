package com.nky.service.exception;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.sys.entity.bo.ScriptPage;
import com.sys.util.RecordUtil;

@Service
public class ExceptionService {

	public ScriptPage getRegistrationList(Map<String, Object> param,
			int pageNo, int pageSize) {
		
//		String qrySql = "select *" +
//				",(select deptname from gh_dept_All where deptid=v.deptid) deptname " +
//				",(select hosname from gh_hospital_All where hosid=v.hosid) hosname " +
//				",(select  docname from gh_doctor_All where docid =v.docid)  docname  " +
//				" from vip_reg v where 1=1 ";
		
		String qrySql="SELECT m.*,s.deal_time,s.deal_state,s.deal_doctor,s.deal_result,s.data_id  " +
				"FROM (SELECT t.*,k.real_name FROM vip_inspect_data t ,t_vip k WHERE  t.card_code = k.card_code " ;
				
		
		
		List<Object> paraList = new ArrayList<Object>();
		String conSql = "";		
		
		
		if(param.get("real_name")!=null && !"".equals(param.get("real_name").toString())){
			qrySql+= " AND k.real_name LIKE  '%"+param.get("real_name")+"%'";
		}
		
		if(param.get("inspect_code")!=null && !"".equals(param.get("inspect_code").toString())){
			qrySql+= " AND t.inspect_code =  '"+param.get("inspect_code")+"'";
		}
		if(param.get("card_code")!=null && !"".equals(param.get("card_code").toString())){
			qrySql+= " AND t.card_code =  '"+param.get("card_code")+"'";
		}
		qrySql += " AND  t.inspect_is_normal IN ('1','-1')) m left join  vip_exception_deal_t s  on m.id =s.data_id  ";
//		
//		if(param.get("departmentname")!=null && !"".equals(param.get("departmentname").toString()))
//		{
//			conSql+= " and deptid in (select deptid from gh_dept_All where deptname like '%"+param.get("departmentname")+"%')";
//		}
//		
//		if(param.get("hospitalname")!=null && !"".equals(param.get("hospitalname").toString()))
//		{
//			conSql+= " and hosid in (select hosid from gh_hospital_All where hosname like '%"+param.get("hospitalname")+"%' ) ";
//		}
//		
//		if(param.get("vipname")!=null && !"".equals(param.get("vipname").toString()))
//		{
//			conSql+= " and patientname  like '%"+param.get("vipname")+"%'";
//		}
//		
//		if(param.get("begintime")!=null && !"".equals(param.get("begintime").toString()))
//		{
//			conSql+= " and create_time > ? ";
//			paraList.add(param.get("begintime"));
//		}
//		
//		if(param.get("endtime")!=null && !"".equals(param.get("endtime").toString()))
//		{
//			conSql+= " and create_time < ? ";
//			paraList.add(param.get("endtime"));
//		}
		
				
		String qryCountSql =qrySql.replace("SELECT m.*,s.deal_time,s.deal_state,s.deal_doctor,s.deal_result,s.data_id", "SELECT count(*) as total");
		Record totalRec = Db.findFirst(qryCountSql,paraList.toArray());
		int total = Integer.parseInt(totalRec.get("total").toString());
		
//		conSql+=" order by create_time desc ";
		
		if(pageNo>0)
		{
			conSql+=" limit ?,? ";
			paraList.add((pageNo-1)*pageSize);
			paraList.add(pageSize);
		}
		qrySql = qrySql+conSql;		
		
		List<Record> quesListRec = Db.find(qrySql,paraList.toArray());		
		
		ScriptPage scriptPage = new ScriptPage();
		scriptPage.setRows(RecordUtil.getJsonObjByjfinalList(quesListRec));
		scriptPage.setTotal(total);
		return scriptPage;
		
	}

	public int updateDealResult(String id, String dealResult,String dataid,String name) throws UnsupportedEncodingException {
		String sql ="";
		dealResult = URLDecoder.decode(dealResult, "utf-8");
		if("".equals(dataid) || dataid == null){
			sql =" INSERT INTO vip_exception_deal_t (data_id,deal_time,deal_state,deal_doctor,deal_result) VALUE (" +
					" '"+id+"' ,NOW(),0,'"+name+"','"+dealResult+"')";
		}
		else {
			sql =" UPDATE vip_exception_deal_t SET deal_result = '"+dealResult+"' ,deal_time = NOW() WHERE data_id = '"+id+"' ";
		}
		
		int i =Db.update(sql);
		return i;
	}

}
