package com.sys.service.impl;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.collect.Lists;
import com.sys.service.BaseService;
import com.sys.util.BaseMapper;
import com.sys.util.Page;

public abstract class BaseServiceImpl<T, PK extends Serializable> implements BaseService<T, PK> {
	private static Logger logger = LoggerFactory.getLogger(BaseServiceImpl.class);
	protected BaseMapper<T, PK> mapper;
	
	@Override
	public int countByExample(Object example)throws Exception {
		return mapper.countByExample(example);
	}

	@Override
	public int deleteByExample(Object example)throws Exception {
		return mapper.deleteByExample(example);
	}


	@Override
	public int deleteByPrimaryKey(PK pk)throws Exception {
		return mapper.deleteByPrimaryKey(pk);
	}
	
	@Override
	public int insert(T record)throws Exception {
		return mapper.insert(record);
	}

	@Override
	public int insertSelective(T record)throws Exception {
		return mapper.insertSelective(record);
	}

	@Override
	public List<T> selectByExample(Object example)throws Exception {
		return mapper.selectByExample(example);
	}

	@Override
	public T selectByPrimaryKey(PK pk)throws Exception {
		return mapper.selectByPrimaryKey(pk);
	}

	@Override
	public int updateByExampleSelective(T record, Object example)throws Exception {
		return mapper.updateByExampleSelective(record, example);
	}

	@Override
	public int updateByExample(T record, Object example)throws Exception {
		return mapper.updateByExample(record, example);
	}

	@Override
	public int updateByPrimaryKeySelective(T record)throws Exception {
		return mapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKey(T record)throws Exception {
		return mapper.updateByPrimaryKey(record);
	}
	
	@Override
	public Page pageByExample(Object example)throws Exception {
		if(example == null){
			return new Page(0, Lists.newArrayListWithExpectedSize(0));
		}else{
			Page page = null;
			try{
				Class<?> clazz = example.getClass(); 
				Method m1 = clazz.getDeclaredMethod("getPage");
				page = (Page) m1.invoke(example);
			}catch (Exception e) {
				logger.error(e.getMessage());
			}
			if(page==null){
				return new Page(mapper.countByExample(example), mapper.selectByExample(example));
			}else{
				return getPageByExample(example, page);
			}
		}
	}

	
	
	@Override
	public Page pageByExampleWithBlobs(Object example) throws Exception {
		if(example == null){
			return new Page(0, Lists.newArrayListWithExpectedSize(0));
		}else{
			Page page = null;
			try{
				Class<?> clazz = example.getClass(); 
				Method m1 = clazz.getDeclaredMethod("getPage");
				page = (Page) m1.invoke(example);
			}catch (Exception e) {
				logger.error(e.getMessage());
			}
			if(page==null){
				return new Page(mapper.countByExample(example), mapper.selectByExampleWithBLOBs(example));
			}else{
				page.setCount(mapper.countByExample(example));
				page.setData(mapper.selectByExampleWithBLOBs(example));
				return page;
			}
		}
	}

	@Override
	public Page getPageByExample(Object example,Page page)throws Exception {
		if(example != null){
			page.setCount(mapper.countByExample(example));
			page.setData(mapper.selectByExample(example)) ;
			return page;
		}else{
			return null;
		}
	}
}