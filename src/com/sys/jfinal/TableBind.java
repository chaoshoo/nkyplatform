package com.sys.jfinal;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
/**
 *  model缁戝畾鏁版嵁搴撹〃娉ㄨВ
 * 
 * huilet 2013-3-20
 * @author yuanc
 */
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface TableBind {
	/**琛ㄥ悕*/
	String name() default "";
	/**涓婚敭鍚�*/
	String pk() default "id";
}