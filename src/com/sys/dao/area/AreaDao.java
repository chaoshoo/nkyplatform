package com.sys.dao.area;

import java.util.List;

import com.sys.dao.BaseDao;
import com.sys.entity.area.Area;
/**
 * Three level regiondao
 * @author liuchang
 *
 */
public interface AreaDao extends BaseDao<Area>{

	/**
	 * Get list
	 * @return
	 */
	public List<Area> findRoots();
	
	/**
	 * Get list
	 * @return
	 */
	public List<Area> getList();
	
	/**
	 * Acquisition areabyId
	 * @return
	 */
	public Area findAreaById(int id);
	
	/**
	 * Get list
	 * @return
	 */
	public List<Area> getChildren(int id);
	
	/**
	 * modify
	 * @param area
	 * @return
	 */
	public int updateArea(Area area);
	
	/**
	 * Newly added
	 * @param area
	 * @return
	 */
	public int addArea(Area area);
	
	/**
	 * delete
	 * @param id
	 * @return
	 */
	public int delArea(Integer id);
}