package com.sys.common.reflect;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ReflectAnnotUtil {
	/**
	 * 是否对其进行反射
	 */
	public boolean isReflect() default true;
}
