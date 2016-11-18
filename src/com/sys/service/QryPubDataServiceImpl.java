package com.sys.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sys.dao.QryPubDataDao;
import com.sys.entity.auth.Dic;
import com.sys.service.impl.BaseServiceImpl;

@Service
@Transactional(rollbackFor = Exception.class)
public class QryPubDataServiceImpl extends BaseServiceImpl<Object, Integer> {
	@Autowired
	private QryPubDataDao qryPubDataDao;
	
	public List<Dic> getDicList(String dicType) {
		return qryPubDataDao.getDicList(dicType);
	}

//	public List<Address> getAddressByTreePath(String treePath) {
//		return qryPubDataDao.getAddressByTreePath(treePath);
//	}

}
