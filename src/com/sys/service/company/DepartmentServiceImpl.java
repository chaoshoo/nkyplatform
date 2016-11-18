package com.sys.service.company;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sys.dao.company.DepartmentDao;
import com.sys.entity.bo.ScriptPage;
import com.sys.entity.company.Department;
import com.sys.service.impl.BaseServiceImpl;

@Service
@Transactional(rollbackFor = Exception.class)
public class DepartmentServiceImpl extends BaseServiceImpl<Department, Integer>{

	@Autowired
	private DepartmentDao departmentMapper;
	
	@Autowired
	public void setMapper(DepartmentDao mapper) {
		super.mapper = mapper;
	}

	public ScriptPage getDepartmentList(Department department) {

		List<Department> rows = departmentMapper.getDepartmentList(department);
		int total = departmentMapper.getCount(department);
		ScriptPage scriptPage = new ScriptPage();
		scriptPage.setRows(rows);
		scriptPage.setTotal(total);
		return scriptPage;
	}

	public int getCount(Department department) {

		return departmentMapper.getCount(department);
	}
	public int getTidSeq() {
		return departmentMapper.getTidSeq();
	}

	public List<Department> departmentList(Department department) {

		List<Department> list = departmentMapper.getDepartmentList(department);
		return list;
	}

	public int deleteById(String departmentId) {

		int retInt = departmentMapper.deleteById(departmentId);
		return retInt;
	}
	public int deleteByTId(String tid) {
		
		int retInt = departmentMapper.deleteByTId(tid);
		return retInt;
	}
	public Department findByDepartId(String departmentId) {
		
		Department department = departmentMapper.findByDepartId(departmentId);
		return department;
	}

	public int checkDeptName(String name, Integer pId, String id) {
		return departmentMapper.checkDeptName(name, pId, id);
	}

	
}