package com.nky.service.chronic;

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
import com.sys.util.StringUtil;

@Service
public class ChronicService {

	public ScriptPage getRegistrationList(Map<String, Object> param,
			int pageNo, int pageSize) {
		
//		String qrySql = "select *" +
//				",(select deptname from gh_dept_All where deptid=v.deptid) deptname " +
//				",(select hosname from gh_hospital_All where hosid=v.hosid) hosname " +
//				",(select  docname from gh_doctor_All where docid =v.docid)  docname  " +
//				" from vip_reg v where 1=1 ";

		String sql = "SELECT DISTINCT(m.`vip_code`) AS vip_code FROM `vip_exam_norm` t ,vip_exam m  where  1=1 and m.id in (select exam_id from (";
		
//		String text0 ="";
//		String text1= "";
//		String text2= "";
//		String text3= "";
//		String text4= "";
//		String text5= "";
		boolean timeFalg=false;
		List examNormList=new ArrayList();
		
		if(param.get("text")!=null && !"".equals(param.get("text").toString())){
			timeFalg=true;
			String examtemp=param.get("text").toString();
			String[] exam=examtemp.split("\\$");
			for(int i=0;i<exam.length;i++){
				String examStr=exam[i];
				String[] examSql=examStr.split("\\|");
				String examStatus="";
				if(examSql.length>2){
					examStatus=examSql[1]+","+examSql[2];
				}else{
					examStatus=examSql[1];
				}
				String sqltmp ="select DISTINCT exam_id from vip_exam_norm t where  (t.exam_norm ='"+examSql[0]+"'  AND t.exam_status in ("+examStatus+"))";
				examNormList.add(sqltmp);
			}
		}
		
		
		if(examNormList!=null&&examNormList.size()>0){
			String sqlCondition=param.get("cond").toString();
			for(int i=0;i<examNormList.size();i++){
				String sqlString=(String) examNormList.get(i);
				if(i==0){
					sql+=sqlString;
				}else{
					sql+=" UNION  all "+sqlString;
				}
			}
			if("or".equals(sqlCondition)){
				sql+=") TEMP )";
			}else{
				sql+=") TEMP GROUP BY exam_id HAVING COUNT(exam_id) = "+examNormList.size()+")";
			}
		}
//		if(!"".equals(text0) || !"".equals(text1)  || !"".equals(text2) || !"".equals(text3) || !"".equals(text4) || !"".equals(text5)){
//			sql+=")";
//			if(sql.contains("(or")){
//				sql=sql.replace("(or", "and (");
//			}
//		}
		if(param.get("beginTime")!=null && !"".equals(param.get("beginTime").toString())){
			sql +=" and m.exam_date >'"+param.get("beginTime").toString()+"' ";
			timeFalg=true;
		}
		if(param.get("end_time")!=null && !"".equals(param.get("end_time").toString())){
			sql +=" and m.exam_date <'"+param.get("end_time").toString()+"'  ";
			timeFalg=true;
		}
		String vip_code="";
		
		if((examNormList!=null&&examNormList.size()>0)||timeFalg){
			System.out.println(sql);
			List<Record> quesListRecs =Db.find(sql);
			if(quesListRecs.size() >0){
				for (int i = 0; i < quesListRecs.size(); i++) {
					if(!"".equals(quesListRecs.get(i).get("vip_code"))){
						if("".equals(vip_code)){
							vip_code="'"+quesListRecs.get(i).get("vip_code")+"' ";
						}else{
							vip_code=vip_code+",'"+quesListRecs.get(i).get("vip_code")+"'";
						}
//						vip_code=vip_code.substring(1,vip_code.length());
					}
					
					
				}
			}
//			System.out.println(vip_code.substring(1,vip_code.length()));
		}
//		{doctor=ewrew, GEQ-age=30, doctorc=rew, mobile=15972012168, LEQ-age=50, real_name=石先生, hospital=H1001, vip_code=V2169}
		boolean newadd=false;
		String addSql =   " select dv.vip_code from doctor_vip dv,doctor d where dv.doctor_code=d.code $$$ "; //and d.hospital_code=?
		if(param.get("hospital")!=null && !"".equals(param.get("hospital").toString())){
			addSql = addSql.replace("$$$", " and d.hospital_code='"+param.get("hospital").toString()+"' $$$");
			newadd=true;
		}
		if(param.get("doctorc")!=null && !"".equals(param.get("doctorc").toString())){
			addSql = addSql.replace("$$$", " and d.code='"+param.get("doctorc").toString()+"' $$$");
			newadd=true;
		}
		if(param.get("doctor")!=null && !"".equals(param.get("doctor").toString())){
			addSql = addSql.replace("$$$", " and d.name like '%"+param.get("doctor").toString()+"%' $$$");
			newadd=true;
		}
		if(newadd){
			if(vip_code!=null&&!"".equals(vip_code)){
				addSql = addSql.replace("$$$", " and dv.vip_code in ("+vip_code+") $$$");
			}else{
				if(timeFalg){//Doctor--Hospital role，Without limitation
					addSql = addSql.replace("$$$", " and dv.vip_code in ('') $$$");
				}
			}
			vip_code="";
		}
		addSql = addSql.replace("$$$", "");
		if(newadd){
			List<Record> quesListRecs =Db.find(addSql);
			if(quesListRecs.size() >0){
				for (int i = 0; i < quesListRecs.size(); i++) {
					if(!"".equals(quesListRecs.get(i).get("vip_code"))){
						if("".equals(vip_code)){
							vip_code="'"+quesListRecs.get(i).get("vip_code")+"'";
						}else{
							vip_code=vip_code+",'"+quesListRecs.get(i).get("vip_code")+"'";
						}
					}
				}
			}
		}
		
		String qrySql="";
		String qrySqlMore="select t.*,s.real_name,s.vip_code,s.card_code,s.mobile,(select max(exam_date) from vip_exam where vip_code=s.vip_code ) exam_date from t_vip_chronic t ,t_vip s WHERE t.vip_id = s.id ";
		String qrySqlSingle="select s.real_name,s.vip_code,s.card_code,s.mobile,(select max(exam_date) from vip_exam where vip_code=s.vip_code ) exam_date,(SELECT ischronic FROM t_vip_chronic where vip_id=s.id)  AS ischronic,(SELECT ill_type FROM t_vip_chronic where vip_id=s.id) AS ill_type from t_vip s WHERE 1=1 ";
		
		
		List<Object> paraList = new ArrayList<Object>();
		String conSql = "";		
		boolean orFlag=false;
		if(param.get("real_name")!=null && !"".equals(param.get("real_name").toString())){
			qrySql+= " AND s.real_name LIKE  '%"+param.get("real_name")+"%'";
			orFlag=true;
		}
		
		if(param.get("ischronic")!=null && !"".equals(param.get("ischronic").toString())&&"1".equals(param.get("ischronic").toString())){
			qrySql+= " AND t.ischronic =  '"+param.get("ischronic")+"'";
			orFlag=true;
		}
		if(param.get("ischronic")!=null && !"".equals(param.get("ischronic").toString())&&"0".equals(param.get("ischronic").toString())){
			qrySql+= " AND s.id not in (select vip_id from t_vip_chronic where ischronic = '1')";
			orFlag=true;
		}
		if(param.get("vip_code")!=null && !"".equals(param.get("vip_code").toString())){
			qrySql+= " AND s.vip_code =  '"+param.get("vip_code")+"'";
			orFlag=true;
		}
		if(param.get("mobile")!=null && !"".equals(param.get("mobile").toString())){
			qrySql+= " AND s.mobile =  '"+param.get("mobile")+"'";
			orFlag=true;
		}
		if(param.get("sex")!=null && !"".equals(param.get("sex").toString())){
			qrySql+= " AND s.sex =  '"+param.get("sex")+"'";
			orFlag=true;
		}
		if(param.get("GEQ-age")!=null && !"".equals(param.get("GEQ-age").toString())){
			qrySql+= " AND s.age >  ("+param.get("GEQ-age")+")";
			orFlag=true;
		}
		if(param.get("LEQ-age")!=null && !"".equals(param.get("LEQ-age").toString())){
			qrySql+= " AND s.age <  ("+param.get("LEQ-age")+")";
			orFlag=true;
		}
		if(param.get("ill_type")!=null && !"".equals(param.get("ill_type").toString())){
			qrySql+= " AND t.ill_type in  ("+param.get("ill_type")+")";
			orFlag=true;
		}
		if(param.get("chronic_type")!=null && !"".equals(param.get("chronic_type").toString())){
			qrySql+= " AND t.chronic_type in  ("+param.get("chronic_type")+")";
			orFlag=true;
		}
		if(vip_code!=null&&!"".equals(vip_code)){
			qrySql+=" and s.vip_code in("+vip_code+") ";
		}else if(timeFalg||newadd){//Query condition，howevervip_codeNo data
			qrySql+=" and s.vip_code in('') ";
		}
		
		if(qrySql.indexOf("t.")>-1){
			qrySql=qrySqlMore+qrySql;
		}else{
			qrySql=qrySqlSingle+qrySql;
		}
		
//		String qryCountSql =qrySql.replace("select t.*,s.real_name,s.vip_code,s.card_code,s.mobile", "select count(*) as total");
//		Record totalRec = Db.findFirst(qryCountSql,paraList.toArray());
//		int total = Integer.parseInt(totalRec.get("total").toString());
		
//		conSql+=" order by create_time desc ";
		List<Record> quesListRecTatol = Db.find(qrySql,paraList.toArray());		
		
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
		int total=0;
		if(quesListRecTatol!=null){total=quesListRecTatol.size();}
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