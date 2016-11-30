package com.sys.service;

import java.io.Serializable;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sys.util.Page;

public interface BaseService<T, PK extends Serializable> {

	int countByExample(Object example) throws Exception;

	int deleteByExample(Object example) throws Exception;

	int deleteByPrimaryKey(PK pk) throws Exception;

	int insert(T record) throws Exception;

	int insertSelective(T record) throws Exception;

	List<T> selectByExample(Object example) throws Exception;

	T selectByPrimaryKey(PK pk) throws Exception;

	int updateByExampleSelective(@Param("record") T record, @Param("example") Object example)
			throws Exception;

	int updateByExample(@Param("record") T record, @Param("example") Object example)
			throws Exception;

	int updateByPrimaryKeySelective(T record) throws Exception;

	int updateByPrimaryKey(T record) throws Exception;

	Page pageByExample(Object example) throws Exception;

	Page pageByExampleWithBlobs(Object example) throws Exception;

	Page getPageByExample(Object example, Page page) throws Exception;
}