package com.nky.service.basedata;

import org.springframework.stereotype.Service;

import com.nky.entity.basedata.OfficeEntity;
import com.sys.jfinal.JFinalDb;

/**
 * @see OfficeEntity
 * @author Ken
 * @version 2016年8月25日
 */
@Service
public class OfficeService {

	public OfficeEntity getEntity() {
		OfficeEntity entity = new OfficeEntity();
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}
}
