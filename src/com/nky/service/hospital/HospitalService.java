package com.nky.service.hospital;

import org.springframework.stereotype.Service;

import com.nky.entity.hospital.HospitalAdminEntity;
import com.sys.jfinal.JFinalDb;
import com.sys.util.MD5Util;

@Service
public class HospitalService {

	public HospitalAdminEntity getAdmin(String tel, String password) {
		HospitalAdminEntity entity = new HospitalAdminEntity();
		entity.setTel(tel);
		password = MD5Util.MD5(password, "utf-8");
		entity.setPwd(password.toLowerCase());
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}
}
