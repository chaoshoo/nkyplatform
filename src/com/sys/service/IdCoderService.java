package com.sys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sys.dao.sys.SysUserDao;
import com.sys.singleton.SysId;

/**
 * 统一编码ID
 * @author lenovo
 *
 */
@Service
public class IdCoderService {
	@Autowired
	private SysUserDao sysUserDao;
	

	
	/**
	 * 获取用户统一编码
	 * @return
	 * @throws Exception 
	 */
	public String getVip() throws Exception {
		String id = "V";
		id+=SysId.getInstance().getId("SEQ_USER_ID");
		return id;
	}
	
	
	/**
	 * 获取系统用户编码
	 * @return
	 * @throws Exception 
	 */
	public String getSys() throws Exception {
		String id = "S";
		id+=SysId.getInstance().getId("SEQ_SYS_ID");
		return id;
	}

	


	/**
	 * 获取供销商编码
	 * @return
	 * @throws Exception 
	 */
	public String getSupplyClientCode() throws Exception {
		String id = "SC";
		id+=SysId.getInstance().getId("SEQ_SUPPLY_CLIENT_ID");
		return id;
	}
	
	/**
	 * 获取供销商编码
	 * @return
	 * @throws Exception 
	 */
	public String getSupplyClientCodeApi() throws Exception {
		String id = "V";
		id+=SysId.getInstance().getId("SEQ_VIP_ID");
		return id;
	}
	
	/**
	 * 获取供销商成员编码
	 * @return
	 * @throws Exception 
	 */
	public String getSupplyClientChildCode() throws Exception {
		String id = "SCC";
		id+=SysId.getInstance().getId("SEQ_SUPPLY_CLIENT_CHILD_ID");
		return id;
	}
	
	/**
	 * 通过ID  获取信息
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
	 * 获取商品编码
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
