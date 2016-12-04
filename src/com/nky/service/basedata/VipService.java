package com.nky.service.basedata;

import org.springframework.stereotype.Service;

import com.nky.entity.basedata.VipEntity;
import com.sys.jfinal.JFinalDb;

/**
 * customer management.
 * @author Ken
 * @version 2016year8month26day Afternoon9:42:39
 */
@Service
public class VipService {

	public VipEntity getEntity() {
		VipEntity entity = new VipEntity();
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}
}