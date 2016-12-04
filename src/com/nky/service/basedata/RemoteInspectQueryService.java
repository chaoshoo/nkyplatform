package com.nky.service.basedata;

import org.springframework.stereotype.Service;

import com.nky.entity.basedata.RemoteInspectQueryEntity;
import com.sys.jfinal.JFinalDb;

/**
 * @see RemoteInspectQueryEntity
 * @author Ken
 * @version 2016year9month7day
 */
@Service
public class RemoteInspectQueryService {

	public RemoteInspectQueryEntity getEntity() {
		RemoteInspectQueryEntity entity = new RemoteInspectQueryEntity();
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}
}