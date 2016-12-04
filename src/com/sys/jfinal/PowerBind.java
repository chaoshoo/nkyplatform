package com.sys.jfinal;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 *  * Permission binding flag<br>
 * If the method is not annotated by default, it is required to verify the。
 * <br>Default is not verified
 * staycontrollerUse on
 * 
 * huilet 2013-3-20
 * @author yuanc
 */
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD,ElementType.TYPE})
public @interface PowerBind {
	/**Corresponding permission code*/
	String code() default "";
	/**Verification mark  true:Need verify*/
	boolean v() default false;
}