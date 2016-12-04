package com.sys.common.reflect;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;

import com.sys.common.annotation.TableAnnot;
import com.sys.common.vo.TableVo;

/**
 * By object reflection class,And the parameterssetIn class
 */
public class ReflectUtil {

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Object setToJavaBean(Object object, HashMap param) {
		if (param == null || param.size() == 0) {
			return object;
		}

		Class classType = object.getClass();
		Object t = null;
		try {
			t = classType.getConstructor(new Class[] {}).newInstance(new Object[] {});
			Field[] filed = classType.getDeclaredFields();
			for (int i = 0; i < filed.length; i++) {
				String filedName = filed[i].getName();
				if (filedName == null) {
					continue;
				}
				String type = filed[i].getType().getSimpleName();

				String setMethodName = "set"
						+ filedName.substring(0, 1).toUpperCase()
						+ filedName.substring(1);

				String getMethodName = "get"
						+ filedName.substring(0, 1).toUpperCase()
						+ filedName.substring(1);

				Method getMethod = classType.getMethod(getMethodName,new Class[] {});
				Method setMethod = classType.getMethod(setMethodName,new Class[] { filed[i].getType() });
				Object value = null;
				if (param.containsKey(filedName)) {
					value = param.get(filedName);
				} else if (param.containsKey(filedName.toLowerCase())) {
					value = param.get(filedName.toLowerCase());
				}

				value = value == null ? getMethod.invoke(object,new Object[] {}) : converDataForType(value, type);
				setMethod.invoke(t, new Object[] { value });
			}

		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		}
		return t;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Object mapForTableVo(HashMap param, Object object) {
		if (param == null || param.size() == 0) {
			return object;
		}

		Class classType = object.getClass();
		Object t = null;

		try {
			// 创建一个新实例
			t = classType.getConstructor(new Class[] {}).newInstance(new Object[] {});
			Field[] filed = classType.getDeclaredFields();
			for (int i = 0; i < filed.length; i++) {
				String filedName = filed[i].getName();
				// 获取字段是否允许反射
				ReflectAnnotUtil anno = filed[i].getAnnotation(ReflectAnnotUtil.class);
				if ((anno != null && !anno.isReflect()) || filedName == null) {
					continue;
				}

				String type = filed[i].getType().toString();
				String setMethodName = "set"
						+ filedName.substring(0, 1).toUpperCase()
						+ filedName.substring(1);

				String getMethodName = "get"
						+ filedName.substring(0, 1).toUpperCase()
						+ filedName.substring(1);

				Method getMethod = classType.getMethod(getMethodName,new Class[] {});

				Method setMethod = classType.getMethod(setMethodName,new Class[] { filed[i].getType() });

				// 获取列表
				TableAnnot.column colu = filed[i].getAnnotation(TableAnnot.column.class);

				// 判断是否有表字段注解
				if (colu != null && colu.columnName() != null) {
					filedName = colu.columnName();
				}
				Object value = param.get(filedName.toLowerCase()) == null ? getMethod.invoke(object, new Object[] {}): converDataForType(param.get(filedName.toLowerCase()),type);
				setMethod.invoke(t, new Object[] { value });
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return t;
	}

	/**
	 * Reflect the results toHashMap
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public HashMap<String, Object> reflectForMap(Object object) {
		Class classType = object.getClass();
		HashMap<String, Object> map = new HashMap<String, Object>();
		TableAnnot table = (TableAnnot) classType.getAnnotation(TableAnnot.class);
		// 表名
		String tableName = "";
		String primaryKey = "";
		if (table != null) {
			primaryKey = table.primaryKey();
			tableName = table.tableName();
			map.put("table", tableName);
			map.put("primary", primaryKey);
		}
		try {
			Field[] filed = classType.getDeclaredFields();
			for (int i = 0; i < filed.length; i++) {
				String filedName = filed[i].getName();
				// 获取字段是否允许反射
				ReflectAnnotUtil anno = filed[i].getAnnotation(ReflectAnnotUtil.class);
				if ((anno != null && !anno.isReflect()) || filedName == null) {
					continue;
				}

				String getMethodName = "get"
						+ filedName.substring(0, 1).toUpperCase()
						+ filedName.substring(1);

				Method getMethod = classType.getMethod(getMethodName,new Class[] {});

				Object value = getMethod.invoke(object);
				// 获取列表
				TableAnnot.column colu = filed[i].getAnnotation(TableAnnot.column.class);
				// 判断是否有表字段注解
				if (colu != null && colu.columnName() != null) {

					filedName = colu.columnName();
					value = value == null || "".equals(value) ? colu.defalut(): value;
					if (colu.isPrimary() && (value == null || "".equals(value) || "0" .equals(value.toString()))) {
						value = colu.defalut();
					}
					Object obj = new TableVo(filedName, String.valueOf(value),colu.isPrimary(), tableName);
					map.put(filedName, obj);
				} else {
					map.put(filedName, value);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}

	public Object converDataForType(Object data, String type) {
		Object converData = null;
		if ("int".equals(type) || "Integer".equals(type)) {
			converData = Integer.parseInt(String.valueOf(data));
		}

		if (type.indexOf("String") != -1) {
			converData = data != null || !"".equals(data) ? String.valueOf(data) : "";
		}

		if (type.indexOf("boolean") != -1) {
			converData = data != null || !"".equals(data) ? Boolean.valueOf(String.valueOf(data)) : false;
		}
		return converData;
	}
}