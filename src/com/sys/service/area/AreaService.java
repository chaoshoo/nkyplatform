package com.sys.service.area;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sys.dao.area.AreaDao;
import com.sys.entity.area.Area;
import com.sys.entity.bo.ScriptPage;

/**
 * 区域
 * @author liuchang
 *
 */
@Service
public class AreaService{

	@Autowired
	private AreaDao areaDao;

	/**
	 * 获取区域列表
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
	 * 获取子集
	 * @return
	 */
	public List<Area> getChildren(int id){
		return areaDao.getChildren(id);
	}
	
	/**
	 * 获取区域信息
	 * @param id
	 * @return
	 */
	public Area getAreaById(int id) {
		return areaDao.findAreaById(id);
	}
	
	/**
	 * 修改区域信息
	 * @param area
	 * @return
	 */
	public int updateArea(Area area) {

		return areaDao.updateArea(area);
	}

	/**
	 * 添加区域信息
	 * @param area
	 * @return
	 */
	public int addArea(Area area) {
		return areaDao.addArea(area);
	}

	/**
	 * 删除
	 * @param id
	 * @return
	 */
	public int delArea(Integer id) {
		return areaDao.delArea(id);
	}
}