package com.nky.service.basedata;

import org.springframework.stereotype.Service;

import com.nky.entity.basedata.VipInspectEcgEntity;
import com.sys.jfinal.JFinalDb;

/**
 * @see VipInspectEcgEntity
 * @author Ken
 * @version 2016year10month27day Afternoon9:15:09
 */
@Service
public class VipInspectEcgService {

	public VipInspectEcgEntity getEntity() {
		VipInspectEcgEntity entity = new VipInspectEcgEntity();
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}
}