package com.sys.dao.sys;

import java.util.List;

import com.sys.dao.BaseDao;
import com.sys.entity.sys.Treasurer;

public interface TreasurerDao extends BaseDao<Treasurer> {

	/**
	 * Query a single accounting information
	 * @param treasurerId
	 * @return
	 */
	public List<Treasurer> getTreaById(int treasurerId);

	/**
	 * Get a list of accounting
	 * @param condition WhenskipNo=-1time，Obtain all results set for the condition.；Otherwise, the result set of the requested page is returned
	 * @return
	 */
	public List<Treasurer> getTreaList(Treasurer condition);

	/**
	 * Revision of accounting information
	 * @param treasurer
	 * @return
	 */
	public int updateTrea(Treasurer treasurer);

	/**
	 * Add accounting
	 * @param treasurer
	 * @return
	 */
	public int addTrea(Treasurer treasurer);

	/**
	 * Delete accounting
	 * @param treasurerId
	 * @return
	 */
	public int delTrea(int treasurerId);
	
	/**
	 * Get quantity 
	 * @param treasurer
	 * @return
	 */
	public int getCount(Treasurer treasurer);
}