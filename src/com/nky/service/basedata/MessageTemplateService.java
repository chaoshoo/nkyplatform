package com.nky.service.basedata;

import org.springframework.stereotype.Service;

import com.nky.entity.basedata.MessageTemplateEntity;
import com.sys.jfinal.JFinalDb;

/**
 * @see MessageTemplateEntity
 * @author Ken
 * @version 2016年9月8日 下午9:41:57
 */
@Service
public class MessageTemplateService {

	public MessageTemplateEntity getEntity() {
		MessageTemplateEntity entity = new MessageTemplateEntity();
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}
}
