package com.nky.service.basedata;

import org.springframework.stereotype.Service;

import com.nky.entity.basedata.VipEntity;
import com.sys.jfinal.JFinalDb;

/**
 * 客户管理.
 * @author Ken
 * @version 2016年8月26日 下午9:42:39
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
