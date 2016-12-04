package com.sys.service.area;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sys.dao.area.AreaDao;
import com.sys.entity.area.Area;
import com.sys.entity.bo.ScriptPage;

/**
 * region
 * @author liuchang
 *
 */
@Service
public class AreaService{

	@Autowired
	private AreaDao areaDao;

	/**
	 * Get area list
	 * @param area
	 * @return
	 */
	public ScriptPage getAreaList(Area area) {
		List<Area> rows = areaDao.getList(area);
		ScriptPage scriptPage = new ScriptPage();
		scriptPage.setRows(rows);
		return scriptPage;
	}

	/**
	 * Get subset
	 * @return
	 */
	public List<Area> getChildren(int id){
		return areaDao.getChildren(id);
	}
	
	/**
	 * Get area information
	 * @param id
	 * @return
	 */
	public Area getAreaById(int id) {
		return areaDao.findAreaById(id);
	}
	
	/**
	 * Modify area information
	 * @param area
	 * @return
	 */
	public int updateArea(Area area) {

		return areaDao.updateArea(area);
	}

	/**
	 * Add area information
	 * @param area
	 * @return
	 */
	public int addArea(Area area) {
		return areaDao.addArea(area);
	}

	/**
	 * delete
	 * @param id
	 * @return
	 */
	public int delArea(Integer id) {
		return areaDao.delArea(id);
	}
}