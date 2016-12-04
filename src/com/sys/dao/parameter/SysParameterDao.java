package com.sys.dao.parameter;

import java.math.BigInteger;
import java.util.List;

import com.sys.dao.BaseDao;
import com.sys.entity.parameter.SysParameter;

public interface SysParameterDao extends BaseDao<SysParameter> {

	/**
	 * Get list
	 * @param SysParameter 
	 * @return
	 */
	public List<SysParameter> getSysParameterList(SysParameter sysParameter);

	/**
	 * Save
	 * @param sysParameter
	 * @return
	 */
	public int addSysParameter(SysParameter sysParameter);

	/**
	 * Update
	 * @param sysParameter
	 * @return
	 */
	public int updateSysParameter(SysParameter sysParameter);

	/**
	 * Query number
	 * @param sysParameter
	 * @return
	 */
	public int getCount(SysParameter sysParameter);
	
	/**
	 * delete
	 * @param id
	 * @return
	 */
	public int delSysParameter(BigInteger id);

}