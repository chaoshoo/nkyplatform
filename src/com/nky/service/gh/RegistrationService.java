package com.nky.service.gh;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.question.VipQuestionLog;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;
import com.sys.jfinal.JFinalDb;
import com.sys.util.RecordUtil;

@Service
public class RegistrationService {

	public ScriptPage getRegistrationList(Map<String, Object> param, int pageNo, int pageSize)
	{	
		String qrySql = "select *" +
				",(select deptname from gh_dept_All where deptid=v.deptid) deptname " +
				",(select hosname from gh_hospital_All where hosid=v.hosid) hosname " +
				",(select  docname from gh_doctor_All where docid =v.docid)  docname  " +
				" from vip_reg v where 1=1 ";	
		
		List<Object> paraList = new ArrayList<Object>();
		String conSql = "";		
		
		
		if(param.get("doctorname")!=null && !"".equals(param.get("doctorname").toString()))
		{
			conSql+= " and docid in (select docid from gh_doctor_All where docname like '%"+param.get("doctorname")+"%')";
		}
		
		if(param.get("departmentname")!=null && !"".equals(param.get("departmentname").toString()))
		{
			conSql+= " and deptid in (select deptid from gh_dept_All where deptname like '%"+param.get("departmentname")+"%')";
		}
		
		if(param.get("hospitalname")!=null && !"".equals(param.get("hospitalname").toString()))
		{
			conSql+= " and hosid in (select hosid from gh_hospital_All where hosname like '%"+param.get("hospitalname")+"%' ) ";
		}
		
		if(param.get("vipname")!=null && !"".equals(param.get("vipname").toString()))
		{
			conSql+= " and patientname  like '%"+param.get("vipname")+"%'";
		}
		
		if(param.get("begintime")!=null && !"".equals(param.get("begintime").toString()))
		{
			conSql+= " and create_time > ? ";
			paraList.add(param.get("begintime"));
		}
		
		if(param.get("endtime")!=null && !"".equals(param.get("endtime").toString()))
		{
			conSql+= " and create_time < ? ";
			paraList.add(param.get("endtime"));
		}
		
				
		String qryCountSql = "select count(*) total  "
				+ " from vip_reg v where 1=1 "+conSql;
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

}
