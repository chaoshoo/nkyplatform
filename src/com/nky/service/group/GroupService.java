package com.nky.service.group;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.group.GroupEntity;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;
import com.sys.jfinal.JFinalDb;
import com.sys.util.RecordUtil;

@Service
public class GroupService {
	
	

	public ScriptPage getGroupList(Map<String,Object> param,int pageNo,int pageSize)
	{
		
		String qrySql = " select a.* ,c.name doctor_name ,d.name office_name , e.name hospital_name "
				+ " from doctor_vip_group a,doctor c ,office d , hospital e "
				+ " where a.doctor_code =c.code and c.hospital_code = e.code and c.office_code = d.code ";
		List<Object> paraList = new ArrayList<Object>();
		String conSql = "";		
		
		if(param.get("doctor_code")!=null && !"".equals(param.get("doctor_code").toString()))
		{
			conSql+= " and a.doctor_code = ? ";
			paraList.add(param.get("doctor_code"));
		}
		
		if(param.get("groupName")!=null && !"".equals(param.get("groupName").toString()))
		{
			conSql+= " and a.name like '%"+param.get("groupName")+"%'";
		}
		
		if(param.get("doctorname")!=null && !"".equals(param.get("doctorname").toString()))
		{
			conSql+= " and c.name like '%"+param.get("doctorname")+"%'";
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
		
		if(param.get("begintime")!=null && !"".equals(param.get("begintime").toString()))
		{
			conSql+= " and a.create_time > ? ";
			paraList.add(param.get("begintime"));
		}
		
		if(param.get("endtime")!=null && !"".equals(param.get("endtime").toString()))
		{
			conSql+= " and a.create_tim < ? ";
			paraList.add(param.get("endtime"));
		}
		
		String qryCountSql = "select count(*) total from doctor_vip_group a,doctor c ,office d , hospital e "
						+ " where a.doctor_code =c.code and c.hospital_code = e.code and c.office_code = d.code " +conSql;
		Record totalRec = Db.findFirst(qryCountSql,paraList.toArray());
		int total = Integer.parseInt(totalRec.get("total").toString());
		
		conSql+=" order by a.create_time desc ";
		
		if(pageNo>0)
		{
			conSql+=" limit ?,? ";
			paraList.add((pageNo-1)*pageSize);
			paraList.add(pageSize);
		}
		qrySql = qrySql+conSql;
		
		
		List<Record> groupListRec = Db.find(qrySql,paraList.toArray());
		
		
		ScriptPage scriptPage = new ScriptPage();
		scriptPage.setRows(RecordUtil.getJsonObjByjfinalList(groupListRec));
		scriptPage.setTotal(total);
		return scriptPage;
	}

	public Data addGroup(GroupEntity group)
	{
		Data data = new Data();
		try
		{
			JFinalDb.save(group);
		} catch (Exception e)
		{
			data.setCode(0);
			e.printStackTrace();
		}
		return data;
	}

	public Data updateGroup(GroupEntity group)
	{
		Data data = new Data();
		try
		{
			JFinalDb.update(group);
		} catch (Exception e)
		{
			data.setCode(0);
			e.printStackTrace();
		}
		return data;
	}

}