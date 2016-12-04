package com.nky.service.basedata;

import org.springframework.stereotype.Service;

import com.nky.entity.basedata.MessageQueryEntity;
import com.sys.jfinal.JFinalDb;

/**
 * @see MessageQueryEntity
 * @author Ken
 * @version 2016year9month8day Afternoon2:07:17
 */
@Service
public class MessageQueryService {

	public MessageQueryEntity getEntity() {
		MessageQueryEntity entity = new MessageQueryEntity();
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}
}