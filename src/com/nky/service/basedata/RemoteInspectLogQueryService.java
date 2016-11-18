package com.nky.service.basedata;

import org.springframework.stereotype.Service;

import com.nky.entity.basedata.RemoteInspectLogQueryEntity;
import com.nky.entity.basedata.RemoteInspectQueryEntity;
import com.sys.jfinal.JFinalDb;

/**
 * @see RemoteInspectQueryEntity
 * @author Ken
 * @version 2016年9月7日
 */
@Service
public class RemoteInspectLogQueryService {

	public RemoteInspectLogQueryEntity getEntity() {
		RemoteInspectLogQueryEntity entity = new RemoteInspectLogQueryEntity();
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}
}
