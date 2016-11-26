package com.nky.service.basedata;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.exam.VipExam;
import com.nky.entity.exam.VipExamNorm;
import com.nky.entity.exam.VipExamPic;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;
import com.sys.jfinal.JFinalDb;
import com.sys.util.RecordUtil;

@Service
public class VipMediRecService {
	
	
	
	public Data addVipExam(VipExam vipExam)
	{
		Data data = new Data();
		try
		{
			JFinalDb.save(vipExam);
		} catch (Exception e)
		{
			data.setCode(0);
			e.printStackTrace();
		}
		data.setMsg(vipExam.getId().toString());
		return data;
	}

	public Data updateVipExam(VipExam vipExam)
	{
		Data data = new Data();
		try
		{
			JFinalDb.update(vipExam);
		} catch (Exception e)
		{
			data.setCode(0);
			e.printStackTrace();
		}
		
		return data;
	}

	public Data addVipExamPic(VipExamPic vipExampic) {
		Data data = new Data();
		try
		{
			JFinalDb.save(vipExampic);
		} catch (Exception e)
		{
			data.setCode(0);
			e.printStackTrace();
		}
		data.setMsg(vipExampic.getId().toString());
		return data;
	}

	public Data addExamNormData(VipExamNorm vipExamNorm) {
		Data data = new Data();
		try
		{
			JFinalDb.save(vipExamNorm);
		} catch (Exception e)
		{
			data.setCode(0);
			e.printStackTrace();
		}
		data.setMsg(vipExamNorm.getId().toString());
		return data;
	}

	public Data delVipExamNorm(Long id) {
		Data data = new Data();
		try
		{
			JFinalDb.deleteById("vip_exam_norm", id);
		} catch (Exception e)
		{
			data.setCode(0);
			e.printStackTrace();
		}
		
		return data;
	}

	public Data delVipExamPic(Long id) {
		Data data = new Data();
		try
		{
			JFinalDb.deleteById("vip_exam_pic",id);
		} catch (Exception e)
		{
			data.setCode(0);
			e.printStackTrace();
		}
		
		return data;
	}

	public ScriptPage getExamList(VipExam vipExam, AjaxPage ajaxPage) {
		
		int pageNo = ajaxPage.getPageNo();
		int pageSize = ajaxPage.getPageSize();
		
		String qrySql = "select *   from vip_exam where vip_code = ?  limit ?, ?";
		List<Object> paraList = new ArrayList<Object>();
		paraList.add(vipExam.getVip_code());
		paraList.add((pageNo-1)*pageSize);
		paraList.add(pageSize);
		
		List<Record> visitListRec = Db.find(qrySql,paraList.toArray());
		
		
		String qryCountSql = "select count(*) total  from vip_exam where  vip_code = ? " ;
		Record totalRec = Db.findFirst(qryCountSql,vipExam.getVip_code());
		int total = Integer.parseInt(totalRec.get("total").toString());
		
		ScriptPage scriptPage = new ScriptPage();
		scriptPage.setRows(RecordUtil.getJsonObjByjfinalList(visitListRec));
		scriptPage.setTotal(total);
		return scriptPage;
	}

	public Data delVipExam(Long id) {
		
		Data data = new Data();
		try
		{
			JFinalDb.deleteById("vip_exam", id);
			JFinalDb.update("delete from vip_exam_norm where exam_id ="+id);
			JFinalDb.update("delete from vip_exam_pic where exam_id ="+id);
		} catch (Exception e)
		{
			data.setCode(0);
			e.printStackTrace();
		}
		
		return data;
	}

}