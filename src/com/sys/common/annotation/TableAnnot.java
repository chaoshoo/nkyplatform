package com.sys.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
/**
 * Database annotation class
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface TableAnnot {
	/** Table name*/
	public String tableName();
	/** Primary key*/
	public String primaryKey() default "";

	/** Field annotation information*/
	@Target(ElementType.FIELD)
	@Retention(RetentionPolicy.RUNTIME)
	@interface column {
		/** Column name*/
		public String columnName();
		/** Column value，Generally used for primary key*/
		public String columnValue() default "";
		/** Default value*/
		public String defalut() default "";
		/**
		 * Whether to be the primary key
		 * true:Primary key
		 */
		public boolean isPrimary() default false;
	}
}