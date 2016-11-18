package com.nky.service.basedata;

import org.springframework.stereotype.Service;

import com.nky.entity.basedata.InspectKpiConfigFzEntity;
import com.sys.jfinal.JFinalDb;

/**
 * @see InspectKpiConfigFzEntity
 * @author Ken
 * @version 2016年9月2日
 */
@Service
public class InspectKpiConfigFzService {

	public InspectKpiConfigFzEntity getEntity() {
		InspectKpiConfigFzEntity entity = new InspectKpiConfigFzEntity();
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}
}
