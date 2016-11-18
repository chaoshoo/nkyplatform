package com.sys.dao.sys;

import java.util.List;

import com.sys.dao.BaseDao;
import com.sys.entity.sys.Treasurer;

public interface TreasurerDao extends BaseDao<Treasurer> {

	/**
	 * 查询单个会计信息
	 * @param treasurerId
	 * @return
	 */
	public List<Treasurer> getTreaById(int treasurerId);

	/**
	 * 获取会计列表
	 * @param condition 当skipNo=-1时，获取符合条件的全部结果集；否则返回请求页结果集
	 * @return
	 */
	public List<Treasurer> getTreaList(Treasurer condition);

	/**
	 * 修改会计信息
	 * @param treasurer
	 * @return
	 */
	public int updateTrea(Treasurer treasurer);

	/**
	 * 添加会计
	 * @param treasurer
	 * @return
	 */
	public int addTrea(Treasurer treasurer);

	/**
	 * 删除会计
	 * @param treasurerId
	 * @return
	 */
	public int delTrea(int treasurerId);
	
	/**
	 * 获得数量 
	 * @param treasurer
	 * @return
	 */
	public int getCount(Treasurer treasurer);
}
