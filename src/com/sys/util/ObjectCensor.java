package com.sys.util;

import java.util.List;
import java.util.Map;
import java.util.Collection;

/**
 * Such asobjectCheck class，inspectobjectWhether to empty，The mode of this kind of mode is no upper limit model
 */
public class ObjectCensor {
	private ObjectCensor() {
	}

	/**
	 * inspectobjectWhether asnull
	 * 
	 * @param Object
	 *            obj - Need to check0bject
	 * @return boolean -true(0bjectIs empty) -false(objectNot empty)
	 */
	public static boolean checkObjectIsNull(Object obj) {
		if (obj == null) {
			return true;
		} else {
			if (obj instanceof String) {
				return checkStringIsNull((String) obj);
			} else if (obj instanceof Map) {
				return checkMapIsNull((Map) obj);
			} else if (obj instanceof Collection) {
				return checkCollectionIsNull((Collection) obj);
			} else if (obj instanceof Object[]) {
				return checkArrayIsNull((Object[]) obj);
			} else {
				return false;
			}
		}
	}

	/**
	 * Check whether the string is""
	 * 
	 * @param String
	 *            str - String to check
	 * @return boolean -true(String as"") -false(String not"")
	 */
	private static boolean checkStringIsNull(String str) {
		if ("".equals(str)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * inspectMapThesizeWhether as0
	 * 
	 * @param Map
	 *            map - Map
	 * @return boolean -true(MapThesizeby0) -false(MapThesizeNot for0)
	 */
	private static boolean checkMapIsNull(Map map) {
		if (map.size() > 0) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * inspectCollectionThesizeWhether as0
	 * 
	 * @param Collection
	 *            collection - Need to checkCollection
	 * @return boolean -true(CollectionThesizeby0) -false(CollectionThesizeNot for0)
	 */
	private static boolean checkCollectionIsNull(Collection collection) {
		if (collection.size() > 0) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * Check arraylengthWhether as0，Check whether the data in the array is allnull
	 * 
	 * @param Object
	 *            [] obj - Need to check0bject
	 * @return boolean -true(0bject[]Is empty) -false(object[]Not empty)
	 */
	private static boolean checkArrayIsNull(Object[] obj) {
		if (obj.length == 0) {
			return true;
		} else {
			for (int i = 0; i < obj.length; i++) {
				if (obj[i] != null) {
					return false;
				}
			}

			return true;
		}
	}

	public static boolean isStrRegular(String... str) {
		for (int i = 0, n = str.length; i < n; i++) {
			if (str[i] == null || "".equals(str[i])) {
				return false;
			}
		}
		return true;
	}

	/**
	 * @author : tiankang
	 * @param list
	 *            : To checkListaggregate
	 * @return inspectListWhether the collection is empty or not
	 */
	public static boolean checkListIsNull(List list) {
		if (list != null && list.size() != 0) {
			return true;
		} else {
			return false;
		}
	}
}
