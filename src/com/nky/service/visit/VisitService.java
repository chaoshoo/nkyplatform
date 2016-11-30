package com.nky.service.visit;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
 
import org.springframework.stereotype.Service;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.visit.VisitEntity;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;
import com.sys.jfinal.JFinalDb;
import com.sys.util.RecordUtil;

@Service
public class VisitService {
	
	

	public ScriptPage getVisitList(Map<String,Object> param,int pageNo,int pageSize)
	{
		
		String qrySql = "select a.* ,b.real_name vip_name,a.id visitId ,c.name doctor_name ,d.name office_name , e.name hospital_name "
				+ " from doctor_visit a,t_vip b ,doctor c ,office d , hospital e "
				+ " where a.visit_user=b.id and a.doctor_code = c.code "
				+ " and c.hospital_code = e.code and c.office_code = d.code ";		
		
		List<Object> paraList = new ArrayList<Object>();
		String conSql = "";		
		
		if(param.get("doctor_code")!=null && !"".equals(param.get("doctor_code").toString()))
		{
			conSql+= " and a.doctor_code = ? ";
			paraList.add(param.get("doctor_code"));
		}
		
		if(param.get("doctorname")!=null && !"".equals(param.get("doctorname").toString()))
		{
			conSql+= " and c.name  like '%"+param.get("doctorname")+"%'";
		}
		
		if(param.get("hospitalcode")!=null && !"".equals(param.get("hospitalcode").toString()))
		{
			conSql+= " and c.hospital_code = ? ";
			paraList.add(param.get("hospitalcode"));
		}
		
		if(param.get("officecode")!=null && !"".equals(param.get("officecode").toString()))
		{
			conSql+= " and c.office_code = ? ";
			paraList.add(param.get("officecode"));
		}
		
		if(param.get("vipname")!=null && !"".equals(param.get("vipname").toString()))
		{
			conSql+= " and b.real_name  like '%"+param.get("vipname")+"%'";
		}
		
		if(param.get("begintime")!=null && !"".equals(param.get("begintime").toString()))
		{
			conSql+= " and a.begin_time > ? ";
			paraList.add(param.get("begintime"));
		}
		
		if(param.get("endtime")!=null && !"".equals(param.get("endtime").toString()))
		{
			conSql+= " and a.end_time < ? ";
			paraList.add(param.get("endtime"));
		}
		
		String qryCountSql = "select count(*) total "
				+ " from doctor_visit a,t_vip b ,doctor c ,office d , hospital e "
				+ " where a.visit_user=b.id and a.doctor_code = c.code "
				+ " and c.hospital_code = e.code and c.office_code = d.code " +conSql;
		Record totalRec = Db.findFirst(qryCountSql,paraList.toArray());
		int total = Integer.parseInt(totalRec.get("total").toString());
		
		conSql+=" order by begin_time desc ";
		
		if(pageNo>0)
		{
			conSql+=" limit ?,? ";
			paraList.add((pageNo-1)*pageSize);
			paraList.add(pageSize);
		}
		qrySql = qrySql+conSql;
		
		
		List<Record> visitListRec = Db.find(qrySql,paraList.toArray());
		
		
		ScriptPage scriptPage = new ScriptPage();
		scriptPage.setRows(RecordUtil.getJsonObjByjfinalList(visitListRec));
		scriptPage.setTotal(total);
		return scriptPage;
	}

	public Data addVisit(VisitEntity visit)
	{
		Data data = new Data();
		try
		{
			JFinalDb.save(visit);
		} catch (Exception e)
		{
			data.setCode(0);
			e.printStackTrace();
		}
		return data;
	}

	public Data updateVisit(VisitEntity visit)
	{
		Data data = new Data();
		try
		{
			JFinalDb.update(visit);
		} catch (Exception e)
		{
			data.setCode(0);
			e.printStackTrace();
		}
		return data;
	}

	public ScriptPage getVipList(Map<String, Object> param, int pageNo, int pageSize)
	{
		String qrySql = " select * from t_vip  where isvalid = '1' ";
		List<Object> paraList = new ArrayList<Object>();
		String conSql = "";		
		
		if(param.get("username")!=null && !"".equals(param.get("username").toString()))
		{
			conSql+= " and real_name like '%"+param.get("username")+"%' ";
		}
		
		if(param.get("cardcode")!=null && !"".equals(param.get("cardcode").toString()))
		{
			conSql+= " and card_code = ? ";
			paraList.add(param.get("cardcode"));
		}		
		
		if(param.get("mobile")!=null && !"".equals(param.get("mobile").toString()))
		{
			conSql+= " and mobile = ? ";
			paraList.add(param.get("mobile"));
		}
		
		
		String qryCountSql = "select count(*) total from t_vip  where isvalid = '1' "+conSql;
		Record totalRec = Db.findFirst(qryCountSql,paraList.toArray());
		int total = Integer.parseInt(totalRec.get("total").toString());
		
		if(pageNo>0)
		{
			conSql+=" limit ?,? ";
			paraList.add((pageNo-1)*pageSize);
			paraList.add(pageSize);
		}
		qrySql = qrySql+conSql;
		
		
		List<Record> vipListRec = Db.find(qrySql,paraList.toArray());
		
		
		ScriptPage scriptPage = new ScriptPage();
		scriptPage.setRows(RecordUtil.getJsonObjByjfinalList(vipListRec));
		scriptPage.setTotal(total);
		return scriptPage;
	}

}