package com.sys.service.auth;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sys.dao.auth.DicDao;
import com.sys.entity.auth.Dic;

@Service
public class DicService {
	@Autowired
	DicDao dicMapper;
	/**
	 * 获取下拉列表
	 * @param dicType
	 * @return
	 */
	public List<Dic> getDic(String dicType){
		List<Dic> list=dicMapper.getDic(dicType);
		return list;
	}
	/**
	 * 获取所有的dic
	 * @return
	 */
	public List<Dic> getDicList(Integer id){
		List<Dic> list=dicMapper.getDicList(id);
		return list;
	}
	/**
	 * 添加字典属性
	 * @param sysAuth
	 * @return
	 */
	public int addDic(Dic sysAuth) {
		try {
			return dicMapper.addDic(sysAuth);
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}
	public int delDic(Integer id) {
		try {
			return dicMapper.delDic(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
}
