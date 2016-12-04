package com.sys.dao.company;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sys.entity.company.Department;
import com.sys.util.BaseMapper;

public interface DepartmentDao   extends BaseMapper<Department, Integer>{
	
	/**
	 * Query the hospital information list
	 * @param condition WhenskipNo=-1time，Obtain all results set for the condition.；Otherwise, the result set of the requested page is returned
	 * @return
	 */
	public List<Department> getDepartmentList(Department condition);
	
	/**
	 * Query number
	 * @param hospital
	 * @return
	 */
	public int getCount(Department department);
	
	public int getTidSeq();
	public int deleteById(@Param("id") String id);
	public int deleteByTId(@Param("tId") String tId);
	
	public List<Department> departmentList(Department department);
	
	public Department findByDepartId(@Param("id") String departmentId);
	
	public Department findDepartmentCode(String departmentCode);

	public int checkDeptName(@Param("name") String name, @Param("pId") Integer pId, @Param("id") String id);
}