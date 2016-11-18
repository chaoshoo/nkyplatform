package com.sys.dao;

import java.util.List;

public interface BaseDao<T> {

	public int save(T t);

	public int delete(T t);

	public T get(T t);

	public List<T> getList(T t);

	public int update(T t);

	public int count(T t);

	public List<T> getPagin(T t);
}