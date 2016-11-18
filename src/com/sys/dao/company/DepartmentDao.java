package com.sys.dao.company;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sys.entity.company.Department;
import com.sys.util.BaseMapper;

public interface DepartmentDao   extends BaseMapper<Department, Integer>{
	
	/**
	 * 查询医院科室信息列表
	 * @param condition 当skipNo=-1时，获取符合条件的全部结果集；否则返回请求页结果集
	 * @return
	 */
	public List<Department> getDepartmentList(Department condition);
	
	/**
	 * 查询数量
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