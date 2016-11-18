package com.nky.service.basedata;

import org.springframework.stereotype.Service;

import com.nky.entity.basedata.InspectKpiConfigEntity;
import com.sys.jfinal.JFinalDb;

/**
 * @see InspectKpiConfigEntity
 * @author Ken
 * @version 2016年9月1日
 */
@Service
public class InspectKpiConfigService {

	public InspectKpiConfigEntity getEntity() {
		InspectKpiConfigEntity entity = new InspectKpiConfigEntity();
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}
}
