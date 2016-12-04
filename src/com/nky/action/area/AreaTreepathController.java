package com.nky.action.area;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sys.entity.area.Area;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;
import com.sys.service.area.AreaService;
import com.sys.singleton.AreaSingleton;

@Controller
@RequestMapping(value = "/areatree")
public class AreaTreepathController {

	@Autowired
	private AreaService areaService;
	
	@RequestMapping(value = "/show")
	public String show() {
		return "area/area_info";
	}
	
	/**
	 * Get list
	 * @param area
	 * @return
	 */
	@RequestMapping(value = "/getArea")
	@ResponseBody
	public ScriptPage areatree(Area area) {
		ScriptPage scriptPage = null;
		scriptPage = areaService.getAreaList(area);
		return scriptPage;
	}
	
	/**
	 * Newly added
	 * @param area
	 * @return
	 */
	@RequestMapping("/addArea")
	@ResponseBody
	public Data addArea(Area area) {
		Data data = new Data();
		if(area.getParent()!=null&&area.getParent()!=0) {
			Area parent = areaService.getAreaById(area.getParent());
			area.setFull_name(parent.getFull_name()+area.getName());
			area.setTree_path(parent.getTree_path()+parent.getId()+",");
		}else {
			area.setFull_name(area.getName());
			area.setTree_path(",");
			area.setParent(null);
		}
		int flag = areaService.addArea(area);
		if (flag > 0) {
			data.setCode(1);
		} else if (flag == -1) {
			data.setCode(-1);
		} else {
			data.setCode(0);
		}
		return data;
	}
	
	/**
	 * modify
	 * @param area
	 * @return
	 */
	@RequestMapping("/updateArea")
	@ResponseBody
	public Data updateArea(Area area) {
		if(area.getParent()==0) {
			area.setParent(null);
		}
		Area before = areaService.getAreaById(area.getId().intValue());
		area.setFull_name(before.getFull_name().replace(before.getName(), area.getName()));
		Data data = new Data();
		int flag = areaService.updateArea(area);
		if (flag > 0) {
			data.setCode(1);
		} else if (flag == -1) {
			data.setCode(-1);
		} else {
			data.setCode(0);
		}
		return data;
	}
	
	/**
	 * delete
	 * @param tId
	 * @return
	 */
	@RequestMapping("/delArea")
	@ResponseBody
	public Data delArea(@RequestParam("tId")String tId) {
		Data data = new Data();
		String[] ids = tId.split(",");
		int num = 0;
		for (String idd: ids) {
			int id = Integer.parseInt(idd);
			List<Area> list = areaService.getChildren(id);
			if(list==null || list.size()==0) {
				int n = areaService.delArea(id);
				num += n;
			}
		}
		if(num == ids.length) {
			data.setMsg("Deleted");
		}else if(num == 0){
			data.setMsg("Can not remove region with sub node");
		}else {
			data.setMsg("The area with the child node is not deleted");
		}
		return data;
	}
	
	/**
	 * Three level area query
	 * region
	 */
	@RequestMapping(value = "/area", method = RequestMethod.GET)
	public @ResponseBody
	Map<Long, String> area(String parentId) {
		Map<Long, String> options = new HashMap<Long, String>();
		try {
			
			List<Area> areas = new ArrayList<Area>();
			Area parent = AreaSingleton.getInstance().getArea(parentId);
			if (parent != null) {
				areas = AreaSingleton.getInstance().getChildren(parentId);
			} else if (parent == null && "0".equals(parentId)){
				areas = AreaSingleton.getInstance().getProvince();
			}
			
			for (Area area : areas) {
				options.put(area.getId(), area.getName());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		return options;
	}
	
	/**
	 * Three level area query
	 * region
	 */
	@RequestMapping(value = "/getTreepath", method = RequestMethod.GET)
	public @ResponseBody
	String getTreepath(String areaId) {
		return AreaSingleton.getInstance().getArea(areaId).getTree_path();
	}

}