package com.sys.jfinal;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
/**
 *  modelIn Lei, Suo version Kan by Jiao〃PingㄨВ
 * 
 * huilet 2013-3-20
 * @author yuanc
 */
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface TableBind {
	/**Chenㄥbe sad*/
	String name() default "";
	/**Juan married Yang tin�*/
	String pk() default "id";
}