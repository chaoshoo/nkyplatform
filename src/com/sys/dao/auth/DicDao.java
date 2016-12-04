package com.sys.dao.auth;

import java.util.List;

import com.sys.entity.auth.Dic;

public interface DicDao {
	/**
	 * According to the type of accessdic
	 * @param dicType
	 * @return
	 */
	public List<Dic> getDic(String dicType);
	/**
	 * Get alldic
	 * @return
	 */
	public List<Dic> getDicList(Integer id);
	public int addDic(Dic dic);
	public int delDic(Integer id);
	public int delDicByType(Integer id);
}