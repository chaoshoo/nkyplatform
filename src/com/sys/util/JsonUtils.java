package com.sys.util;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;
import net.sf.json.util.JSONUtils;

/**
 * @author wm
 * 
 */
public class JsonUtils {

	public static Object toBean(String jsonStr, Class beanClass) throws Exception {
		try {
			jsonStr = StringUtil.filterEnter(jsonStr);
			JSONObject jsonPerson = JSONObject.fromObject(jsonStr);
			JSONUtils.getMorpherRegistry().registerMorpher(
					new DateMorpher(new String[] { "yyyy-MM-dd",
							"yyyy-MM-dd HH:mm:ss" }));
			return JSONObject.toBean(jsonPerson, beanClass);

		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("jsonStr:" + jsonStr + " conver to " + beanClass);
		}
	}

	public static JSONArray fromArray(List list) {
		JsonConfig config = getJsonConfig();
		return JSONArray.fromObject(list, config);
	}

	public static JSONArray fromArrayTimestamp(List list) {
		JsonConfig config = getJsonConfig();
		return JSONArray.fromObject(list, config);
	}

	public static JSONObject fromObject(Object obj) {
		JsonConfig config = getJsonConfig();
		return JSONObject.fromObject(obj, config);
	}

	public static JSONObject fromObjectTimestamp(Object obj) {
		JsonConfig config = getJsonConfig();
		return JSONObject.fromObject(obj, config);
	}

	public static JsonConfig getJsonConfig(final String format) {
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setExcludes(new String[] { "handler" });
		jsonConfig.registerJsonValueProcessor(Timestamp.class,
				new JsonValueProcessor() {
					public Object processArrayValue(Object arg0, JsonConfig arg1) {
						return null;
					}

					public Object processObjectValue(String key, Object value,
							JsonConfig jsonConfig) {
						if (value == null)
							return "";
						if (value instanceof java.sql.Timestamp) {
							String str = new SimpleDateFormat(format)
									.format((Timestamp) value);
							return str;
						}
						return value.toString();
					}
				});
		jsonConfig.registerJsonValueProcessor(java.sql.Date.class,
				new JsonValueProcessor() {
					public Object processArrayValue(Object arg0, JsonConfig arg1) {
						return null;
					}

					public Object processObjectValue(String key, Object value,
							JsonConfig jsonConfig) {
						if (value == null)
							return "";
						if (value instanceof java.sql.Date) {
							String str = new SimpleDateFormat(format)
									.format((Date) value);
							return str;
						}
						return value.toString();
					}
				});
		jsonConfig.registerJsonValueProcessor(java.util.Date.class,
				new JsonValueProcessor() {
					public Object processArrayValue(Object arg0, JsonConfig arg1) {
						return null;
					}

					public Object processObjectValue(String key, Object value,
							JsonConfig jsonConfig) {
						if (value == null)
							return "";
						if (value instanceof java.util.Date) {
							String str = new SimpleDateFormat(format)
									.format((Date) value);
							return str;
						}
						return value.toString();
					}
				});
		return jsonConfig;
	}

	public static JsonConfig getJsonConfig() {
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setExcludes(new String[] { "handler" });
		jsonConfig.registerJsonValueProcessor(Timestamp.class,
				new JsonValueProcessor() {
					public Object processArrayValue(Object arg0, JsonConfig arg1) {
						return null;
					}

					public Object processObjectValue(String key, Object value,
							JsonConfig jsonConfig) {
						if (value == null)
							return "";
						if (value instanceof java.sql.Timestamp) {
							String str = new SimpleDateFormat(
									"yyyy-MM-dd HH:mm:ss")
									.format((Timestamp) value);
							return str;
						}
						return value.toString();
					}
				});
		jsonConfig.registerJsonValueProcessor(java.sql.Date.class,
				new JsonValueProcessor() {
					public Object processArrayValue(Object arg0, JsonConfig arg1) {
						return null;
					}

					public Object processObjectValue(String key, Object value,
							JsonConfig jsonConfig) {
						if (value == null)
							return "";
						if (value instanceof java.sql.Date) {
							String str = new SimpleDateFormat("yyyy-MM-dd")
									.format((Date) value);
							return str;
						}
						return value.toString();
					}
				});
		jsonConfig.registerJsonValueProcessor(java.util.Date.class,
				new JsonValueProcessor() {
					public Object processArrayValue(Object arg0, JsonConfig arg1) {
						return null;
					}

					public Object processObjectValue(String key, Object value,
							JsonConfig jsonConfig) {
						if (value == null)
							return "";
						if (value instanceof java.util.Date) {
							String str = new SimpleDateFormat("yyyy-MM-dd")
									.format((Date) value);
							return str;
						}
						return value.toString();
					}
				});
		return jsonConfig;
	}
}
