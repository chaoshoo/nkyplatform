package com.sys.action;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sys.entity.auth.Dic;
import com.sys.service.QryPubDataServiceImpl;

@Controller
@RequestMapping(value = "/pubData")
public class QryPubDataController {
	@Autowired
	private QryPubDataServiceImpl qryPubDataServiceImpl;
	
	/**
	 * Gets a list of fields
	 */
	@RequestMapping(value = "/getDicList")
	@ResponseBody
	public List<Dic> getDicList(String dicType) {
		List<Dic> sList = new ArrayList<Dic>();
		try {
			dicType = URLDecoder.decode(dicType, "utf-8");
			sList = qryPubDataServiceImpl.getDicList(dicType);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sList;
	}
	
	/**
	 * Get area list
	 */
//	@RequestMapping(value = "/getAddressList")
//	@ResponseBody
//	public List<Address> getAddressList(String treePath) {
//		List<Address> sList = new ArrayList<Address>();
//		try {
//			treePath = URLDecoder.decode(treePath, "utf-8");
//			sList = qryPubDataServiceImpl.getAddressByTreePath(treePath);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return sList;
//	}

}