package com.sys.dao.area;

import java.util.List;

import com.sys.dao.BaseDao;
import com.sys.entity.area.Area;
/**
 * 三级区域dao
 * @author liuchang
 *
 */
public interface AreaDao extends BaseDao<Area>{

	/**
	 * 获取列表
	 * @return
	 */
	public List<Area> findRoots();
	
	/**
	 * 获取列表
	 * @return
	 */
	public List<Area> getList();
	
	/**
	 * 获取区域byId
	 * @return
	 */
	public Area findAreaById(int id);
	
	/**
	 * 获取列表
	 * @return
	 */
	public List<Area> getChildren(int id);
	
	/**
	 * 修改
	 * @param area
	 * @return
	 */
	public int updateArea(Area area);
	
	/**
	 * 新增
	 * @param area
	 * @return
	 */
	public int addArea(Area area);
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	public int delArea(Integer id);
}
