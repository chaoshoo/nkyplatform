package com.sys.dao.parameter;

import java.math.BigInteger;
import java.util.List;

import com.sys.dao.BaseDao;
import com.sys.entity.parameter.SysParameter;

public interface SysParameterDao extends BaseDao<SysParameter> {

	/**
	 * 获取列表
	 * @param SysParameter 
	 * @return
	 */
	public List<SysParameter> getSysParameterList(SysParameter sysParameter);

	/**
	 * 保存
	 * @param sysParameter
	 * @return
	 */
	public int addSysParameter(SysParameter sysParameter);

	/**
	 * 更新
	 * @param sysParameter
	 * @return
	 */
	public int updateSysParameter(SysParameter sysParameter);

	/**
	 * 查询数量
	 * @param sysParameter
	 * @return
	 */
	public int getCount(SysParameter sysParameter);
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	public int delSysParameter(BigInteger id);

}
