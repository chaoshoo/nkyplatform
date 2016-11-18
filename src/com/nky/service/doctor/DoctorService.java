package com.nky.service.doctor;

import org.springframework.stereotype.Service;

import com.nky.entity.doctor.DoctorEntity;
import com.sys.jfinal.JFinalDb;
import com.sys.util.MD5Util;

@Service
public class DoctorService {
	
	public DoctorEntity getDoctor(String mobile, String password) {
		password = MD5Util.MD5(password, "utf-8");
		DoctorEntity entity = new DoctorEntity();
		entity.setTel(mobile);
		entity.setPassword(password.toLowerCase());
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}

}
