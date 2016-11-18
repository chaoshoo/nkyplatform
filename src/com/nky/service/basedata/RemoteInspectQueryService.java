package com.nky.service.basedata;

import org.springframework.stereotype.Service;

import com.nky.entity.basedata.RemoteInspectQueryEntity;
import com.sys.jfinal.JFinalDb;

/**
 * @see RemoteInspectQueryEntity
 * @author Ken
 * @version 2016年9月7日
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
