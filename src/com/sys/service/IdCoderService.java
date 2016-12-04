package com.sys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sys.dao.sys.SysUserDao;
import com.sys.singleton.SysId;

/**
 * Uniform codingID
 * @author lenovo
 *
 */
@Service
public class IdCoderService {
	@Autowired
	private SysUserDao sysUserDao;
	

	
	/**
	 * Get user unified coding
	 * @return
	 * @throws Exception 
	 */
	public String getVip() throws Exception {
		String id = "V";
		id+=SysId.getInstance().getId("SEQ_USER_ID");
		return id;
	}
	
	
	/**
	 * Acquisition system user code
	 * @return
	 * @throws Exception 
	 */
	public String getSys() throws Exception {
		String id = "S";
		id+=SysId.getInstance().getId("SEQ_SYS_ID");
		return id;
	}

	


	/**
	 * Get the supply and marketing business code
	 * @return
	 * @throws Exception 
	 */
	public String getSupplyClientCode() throws Exception {
		String id = "SC";
		id+=SysId.getInstance().getId("SEQ_SUPPLY_CLIENT_ID");
		return id;
	}
	
	/**
	 * Get the supply and marketing business code
	 * @return
	 * @throws Exception 
	 */
	public String getSupplyClientCodeApi() throws Exception {
		String id = "V";
		id+=SysId.getInstance().getId("SEQ_VIP_ID");
		return id;
	}
	
	/**
	 * Acquisition of the supply and marketing business members coding
	 * @return
	 * @throws Exception 
	 */
	public String getSupplyClientChildCode() throws Exception {
		String id = "SCC";
		id+=SysId.getInstance().getId("SEQ_SUPPLY_CLIENT_CHILD_ID");
		return id;
	}
	
	/**
	 * adoptID  pick up information
	 * @param id
	 * @throws Exception 
	 */
	public  Object  getInfoById(String id) throws Exception{
		if(id.startsWith("S")) {
			return sysUserDao.getSysUserBySysId(id);
		}
		return  null;
	}
	
	/**
	 * Obtain commodity codes
	 * @return
	 * @throws Exception 
	 */
	public String getProductCode()  {
		String code = "PD";
		try {
			code+=SysId.getInstance().getId("SEQ_PRODUCT");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return code;
	}
}