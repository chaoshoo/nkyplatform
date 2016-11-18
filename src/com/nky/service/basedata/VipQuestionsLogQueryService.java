package com.nky.service.basedata;

import org.springframework.stereotype.Service;

import com.nky.entity.basedata.VipQuestionsLogQueryEntity;
import com.sys.jfinal.JFinalDb;

/**
 * @see VipQuestionsLogQueryEntity
 * @author Ken
 * @version 2016年9月8日 下午1:39:22
 */
@Service
public class VipQuestionsLogQueryService {

	public VipQuestionsLogQueryEntity getEntity() {
		VipQuestionsLogQueryEntity entity = new VipQuestionsLogQueryEntity();
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}
}
