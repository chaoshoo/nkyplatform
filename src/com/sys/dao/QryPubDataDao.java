package com.sys.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sys.entity.auth.Dic;
import com.sys.util.BaseMapper;

public interface QryPubDataDao extends BaseMapper<Object, Integer>{
	public List<Dic> getDicList(@Param("dicType") String dicType);


}