package com.nky.service.basedata;

import org.springframework.stereotype.Service;

import com.nky.entity.basedata.VipQuestionsQueryEntity;
import com.sys.jfinal.JFinalDb;

/**
 * @see VipQuestionsQueryEntity
 * @author Ken
 * @version 2016年9月8日 下午1:39:22
 */
@Service
public class VipQuestionsQueryService {

	public VipQuestionsQueryEntity getEntity() {
		VipQuestionsQueryEntity entity = new VipQuestionsQueryEntity();
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}
}
