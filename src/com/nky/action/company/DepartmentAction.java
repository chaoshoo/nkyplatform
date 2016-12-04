package com.nky.action.company;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.ScriptPage;
import com.sys.entity.company.Department;
import com.sys.service.company.DepartmentServiceImpl;
import com.sys.util.TimeUtil;
import com.sys.util.UUIDs;

@Controller
@RequestMapping("/departmentInfo")
public class DepartmentAction {

	@Autowired
	private DepartmentServiceImpl departmentService;

	@RequestMapping(value = "/show")
	public String show(ModelMap map, AjaxPage ajaxPage) {
		ScriptPage scriptPage = null;
		try {
			Department department = new Department();
			department.copy(ajaxPage);
			scriptPage = departmentService.getDepartmentList(department);
			List depLst = scriptPage.getRows();
			map.addAttribute("departMentLst", depLst);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "company/department_info";
	}

	/**
	 * Get all the organizational structure tree
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getAllDepartmentToTree", produces = { "application/json;charset=UTF-8" })
	@ResponseBody
	public ScriptPage getAllDepartmentToTree() {
		ScriptPage scriptPage = new ScriptPage();
		Department department = new Department();
		scriptPage = departmentService.getDepartmentList(department);
		return scriptPage;
	}

	@RequestMapping(value = "/getList")
	@ResponseBody
	public ScriptPage getDepartmentList(AjaxPage ajaxPage) {
		ScriptPage scriptPage = null;
		try {
			Department department = new Department();
			department.copy(ajaxPage);
			scriptPage = departmentService.getDepartmentList(department);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return scriptPage;
	}

	@RequestMapping("/findById")
	public String aa(@RequestParam("id") String id, ModelMap map) throws Exception {
		Department department = departmentService.findByDepartId(id);
		String createDate = TimeUtil.getDateStr(department.getCreateTime());
		// DicSingleton.getInstance().reloadData();
		// List list = DicSingleton.getInstance().getDic("ksmc");
		// map.addAttribute("list", list);
		map.addAttribute("createDate", createDate);
		map.addAttribute("info", department);
		return "company/department_list";
	}

	@RequestMapping(value = "/findDepartMentBytId", produces = { "application/json;charset=UTF-8" })
	@ResponseBody
	public Department findDepartMentBytId(Department department, ModelMap map) throws Exception {
		Department retDepartment = new Department();
		List<Department> depList = departmentService.departmentList(department);
		if (depList != null && depList.size() > 0) {
			retDepartment = depList.get(0);
		}
		return retDepartment;
	}

	@RequestMapping("/delDepartment")
	@ResponseBody
	public Data delDepartment(@RequestParam("tId") String tId) throws Exception {
		int code = -1;
		Data data = new Data();
		int i = departmentService.deleteByTId(tId);
		if (i > 0) {
			code = 1;
		}
		data.setCode(code);
		return data;
	}

	@RequestMapping("/addDepartment")
	@ResponseBody
	public Data addDepartment(Department department, HttpServletRequest req) throws Exception {
		Data data = new Data();
		department.setId(UUIDs.getRandomUUID());
		department.setCreateTime(new Date());
		department.setEditTime(new Date());
		String name = department.getName();
		Integer pId = department.getpId();
		int i = departmentService.checkDeptName(name, pId, null);
		if (i > 0) {
			data.setCode(2);
		} else {
			int flag = departmentService.insert(department);
			if (flag > 0) {
				data.setCode(1);
			} else if (flag == -1) {
				data.setCode(-1);
			} else {
				data.setCode(0);
			}
		}
		return data;
	}

	@RequestMapping("/updateDepartment")
	@ResponseBody
	public Data updateDepartment(Department department, HttpServletRequest req)
			throws Exception {
		Data data = new Data();
		// String hospitalId = req.getParameter("hospitalId");
		// Hospital hospital = hospitalService.findById(hospitalId);
		// department.setHoptialName(hospital.getHospitalName());
		String id = department.getId();
		Integer pId = department.getpId();
		String name = department.getName();
		int i = departmentService.checkDeptName(name, pId, id);
		if (i > 0) {
			data.setCode(2);
		} else {
			int flag = departmentService.updateByPrimaryKeySelective(department);
			if (flag > 0) {
				data.setCode(1);
			} else if (flag == -1) {
				data.setCode(-1);
			} else {
				data.setCode(0);
			}
		}
		return data;
	}
}