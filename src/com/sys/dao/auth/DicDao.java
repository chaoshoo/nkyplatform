package com.sys.dao.auth;

import java.util.List;

import com.sys.entity.auth.Dic;

public interface DicDao {
	/**
	 * 根据类型获取dic
	 * @param dicType
	 * @return
	 */
	public List<Dic> getDic(String dicType);
	/**
	 * 获取所有的dic
	 * @return
	 */
	public List<Dic> getDicList(Integer id);
	public int addDic(Dic dic);
	public int delDic(Integer id);
	public int delDicByType(Integer id);
}
