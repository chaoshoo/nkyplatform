package com.nky.service.basedata;

import org.springframework.stereotype.Service;

import com.nky.entity.basedata.VipMbEntity;
import com.sys.jfinal.JFinalDb;

/**
 * Customer slow disease.
 * @author Ken
 * @version 2016year10month11day Afternoon11:11:14
 */
@Service
public class VipMbService {

	public VipMbEntity getEntity() {
		VipMbEntity entity = new VipMbEntity();
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}
}