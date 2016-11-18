package com.sys.dao.auth;

import java.util.List;

import com.sys.dao.BaseDao;
import com.sys.entity.auth.Dic;
import com.sys.entity.auth.DicDefine;

public interface DicDefineDao extends BaseDao<DicDefine>{
	public List<DicDefine> getDicDefineList(DicDefine condition);
	public int getCount(DicDefine condition);
	public int getDicCount(DicDefine condition);
	//删除字典定义
	public int delDicDefine(Integer id);
	//添加定义
	public int addDicDefine(DicDefine condition);
	//查看属性
	public List<Dic> findDicById(Integer id);
	//修改字典定义
	public int updateDicDefine(DicDefine condition);

}
