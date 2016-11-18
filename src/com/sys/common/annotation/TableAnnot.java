package com.sys.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
/**
 * 数据库注解类
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface TableAnnot {
	/** 表名*/
	public String tableName();
	/** 主键*/
	public String primaryKey() default "";

	/** 字段注解信息*/
	@Target(ElementType.FIELD)
	@Retention(RetentionPolicy.RUNTIME)
	@interface column {
		/** 列名*/
		public String columnName();
		/** 列的值，一般用于主键*/
		public String columnValue() default "";
		/** 默认值*/
		public String defalut() default "";
		/**
		 * 是否为主键
		 * true:主键
		 */
		public boolean isPrimary() default false;
	}
}
