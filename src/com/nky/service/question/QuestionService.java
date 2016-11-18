package com.nky.service.question;

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
public class QuestionService {

	public ScriptPage getQuestionList(Map<String, Object> param, int pageNo, int pageSize)
	{	
		String qrySql = "select a.* ,b.real_name vip_name,c.name doctor_name ,d.name office_name , e.name hospital_name "
				+ " from vip_questions a,t_vip b ,doctor c ,office d , hospital e "
				+ " where a.vip_code=b.vip_code and a.doctor_code = c.code "
				+ " and c.hospital_code = e.code and c.office_code = d.code ";	
		
		List<Object> paraList = new ArrayList<Object>();
		String conSql = "";		
		
		
		if(param.get("doctor_code")!=null && !"".equals(param.get("doctor_code").toString()))
		{
			conSql+= " and a.doctor_code = ? ";
			paraList.add(param.get("doctor_code"));
		}
		if(param.get("status")!=null && !"".equals(param.get("status").toString()))
		{
			if("1".equals(param.get("status").toString())){
				conSql+= " and a.status = '1' ";
			}else{
				conSql+= " and (a.status <> '1' or a.status is null ) ";
			}
		}
		if(param.get("mobile")!=null && !"".equals(param.get("mobile").toString()))
		{
			conSql+= " and b.mobile = ? ";
			paraList.add(param.get("mobile"));
		}
		if(param.get("papers_num")!=null && !"".equals(param.get("papers_num").toString()))
		{
			conSql+= " and b.papers_num = ? ";
			paraList.add(param.get("papers_num"));
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
			conSql+= " and a.create_time > ? ";
			paraList.add(param.get("begintime"));
		}
		
		if(param.get("endtime")!=null && !"".equals(param.get("endtime").toString()))
		{
			conSql+= " and a.create_time < ? ";
			paraList.add(param.get("endtime"));
		}
		
				
		String qryCountSql = "select count(*) total  "
				+ " from vip_questions a,t_vip b ,doctor c ,office d , hospital e "
				+ " where a.vip_code=b.vip_code and a.doctor_code = c.code "
				+ " and c.hospital_code = e.code and c.office_code = d.code "+conSql;
		Record totalRec = Db.findFirst(qryCountSql,paraList.toArray());
		int total = Integer.parseInt(totalRec.get("total").toString());
		
		conSql+=" order by create_time desc ";
		
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

	public ScriptPage getDetailList(Map<String, Object> param, int pageNo, int pageSize)
	{
		Object quesId = param.get("questionId");
		String qrySql = "select a.*,b.vip_code,b.doctor_code,c.real_name vip_name ,d.name doctor_name  "
				+ "from vip_questions_log a,vip_questions b,t_vip c ,doctor d "
				+ " where a.vip_questions_id=b.id and b.vip_code=c.vip_code  and b.doctor_code = d.code "
				+ " and a.vip_questions_id ="+quesId;
		List<Object> paraList = new ArrayList<Object>();
		String conSql = " ";		
				
		String qryCountSql = "select count(*) total from vip_questions_log where vip_questions_id ="+quesId+conSql;
		Record totalRec = Db.findFirst(qryCountSql,paraList.toArray());
		int total = Integer.parseInt(totalRec.get("total").toString());
		
		conSql+=" order by create_time ";
		
		if(pageNo>0)
		{
			conSql+=" limit ?,? ";
			paraList.add((pageNo-1)*pageSize);
			paraList.add(pageSize);
		}
		qrySql = qrySql+conSql;		
		
		List<Record> quesDetailListRec = Db.find(qrySql,paraList.toArray());	
		if(quesDetailListRec!=null && quesDetailListRec.size()>0)
		{
			for(Record rec :quesDetailListRec)
			{
				String answerCode = rec.getStr("answer_code");
				String vipCode = rec.getStr("vip_code");
				String doctorCode = rec.getStr("doctor_code");
				if(answerCode.equals(vipCode))
				{
					rec = rec.set("answer_name", rec.get("vip_name"));
				}
				if(answerCode.equals(doctorCode))
				{
					rec = rec.set("answer_name", rec.get("doctor_name"));
				}
			}
		}		
		
		ScriptPage scriptPage = new ScriptPage();
		scriptPage.setRows(RecordUtil.getJsonObjByjfinalList(quesDetailListRec));
		scriptPage.setTotal(total);
		return scriptPage;
	}

	public Data addQuesLog(VipQuestionLog ques)
	{
		Data data = new Data();
		try
		{
			JFinalDb.save(ques);
			Db.update("update vip_questions set status='1' , last_reply_time=now()  where id = ? "
					,new Object[]{ques.getVip_questions_id()});
			
		} catch (Exception e)
		{
			data.setCode(0);
			e.printStackTrace();
		}
		return data;
	}

}
