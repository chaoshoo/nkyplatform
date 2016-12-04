package com.sys.util;

import java.lang.reflect.Method;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConversionException;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.Converter;

/**
 * Time tools.
 */
public class DateUtil extends DateSupport {

	public static String nowDateForStr(String format) {
		Date date = new Date();
		return dateForString(date, format);
	}

	public static String dateForStr(Date date, String format) {
		if(null == date){
			return "";
		}
		return dateForString(date, format);
	}
	
	public static String dateForStr(Timestamp date, String format) {
		if(date != null){
			return dateForString(new Date(date.getTime()), format);
		}
		return "";
	}

	/**
	 * Based formatyyyy-MM-dd,Gets the current date
	 * 
	 * @author tangshengyu
	 * @version falvm
	 * @date Dec 9, 2009
	 * @return String
	 */
	public static String nowDateForStrYMD() {
		return nowDateForStr("yyyy-MM-dd");
	}

	public static String nowDateForStrYMDHMS() {
		return nowDateForStr("yyyy-MM-dd HH:mm:ss");

	}

	/**
	 * Get the last day of the current month based on the current date
	 * 
	 * @return
	 * @author tangshengyu
	 * @version panyu
	 * @date Jul 16, 2010
	 * @return String
	 */
	public static String dateForMonthLastDayYMD(String strDate) {
		int lastDay = getDateMonthLastDay(strDate);
		Date d = strForDate(strDate, "yyyy-MM-dd");
		d.setDate(lastDay);
		return dateForString(d, "yyyy-MM-dd");
	}
	
	public static Date getDateFromStr(String strDate) {
		SimpleDateFormat sdf = new SimpleDateFormat("E MMM dd HH:mm:ss z yyyy",Locale.US);
		Date d=null;
		try {
			d = sdf.parse(strDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return d;
	}
	
	public static Date getDateTimeFromStr(String strDate) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date d=null;
		try {
			d = sdf.parse(strDate);
		} catch (ParseException e) { 
		}
		return d;
	}
	
	public static Date getDateFromStr2(String strDate) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date d=null;
		try {
			d = sdf.parse(strDate);
		} catch (ParseException e) { 
		}
		return d;
	}

	public static void main(String args[]) {
		Date d = new Date();
		Date da = DateUtil.strForDate("2016-09-09 11:11:11", "yyyy-MM-dd hh:mm:ss");
		DateUtil.dateForString(da, "yyyyMMddHHmmss");
		System.out.println(DateUtil.nowDateForStr("HH:mm:ss"));
		System.out.println(DateUtil.dateForString(strForDate("17:38:23", "HH:mm:ss"), "HH:mm:ss"));
	}

	/**
	 * Take current year
	 * 
	 * @return
	 */
	public static String getYMDHMSS() {
		return nowDateForStr("yyyyMMddHHmmss");
	}

	/**
	 * Take the specified time
	 * 
	 * @param from
	 *            Start from today. A few days ago.，Just after a few days
	 * @param format
	 *            Format type
	 *            
	 *            For example, take the previous daygetDate(-1, "YYYY_MM_DD")
	 *            One day after taking getDate(1, "YYYY_MM_DD");
	 * @return
	 */
	public static String getDate(int from, String format) {
		Calendar c = Calendar.getInstance();
		c.add(Calendar.DATE, from);
		SimpleDateFormat dateFormat = new SimpleDateFormat(format);
		String day = dateFormat.format(c.getTime());
		return day;
	}

	/**
	 * Get the current morning0Point of time
	 * @return
	 */
	public static Date getCurrentZeroPoint() {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		c.set(Calendar.MILLISECOND, 0);
		return c.getTime();
	}

	public static void transMap2Bean(Map<String, Object> map, Object obj) {
		//ConvertUtils.register(new DateLocaleConverter(), Date.class);
		ConvertUtils.register(new Converter() {

			@SuppressWarnings("rawtypes")
			@Override
			public Object convert(Class arg0, Object arg1) {
				//	        System.out.println("注册字符串转换为date类型转换器");  
				if (arg1 == null) {
					return null;
				}
				if (!(arg1 instanceof String)) {
					throw new ConversionException("Only support string conversion !");
				}
				String str = (String) arg1;
				if (str.trim().equals("")) {
					return null;
				}

				SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

				try {
					return sd.parse(str);
				} catch (ParseException e) {
					throw new RuntimeException(e);
				}

			}

		}, java.util.Date.class);
		if (map == null || obj == null) {
			return;
		}
		try {
			String key = null;
			Object value = null;
			Map newMap = new HashMap();
			for (Map.Entry<String, Object> entry : map.entrySet()) {
				key = entry.getKey();
				value = entry.getValue();
				newMap.put(key.toLowerCase().replace("_", ""), value);
			}
			BeanUtils.populate(obj, newMap);
		} catch (Exception e) {
			System.out.println("Map<String,Object>转化Bean异常：" + e);
		}
	}

	public static void populate2(Object obj, Map<String, Object> map) {
		Class clazz = obj.getClass();

		Map<String, Method> mapValue = new HashMap<String, Method>();

		Method[] methods = clazz.getDeclaredMethods();

		String methodName = null;
		for (Method method : methods) {
			methodName = method.getName();
			if (methodName.startsWith("set")) {
				mapValue.put(methodName.substring(3).toLowerCase(), method);
			}
		}

		try {
			String key = null;
			for (Map.Entry<String, Object> entry : map.entrySet()) {
				key = entry.getKey();
				if (mapValue.containsKey(key)) {
					mapValue.get(key).invoke(obj, entry.getValue());
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * Number of days between calculation
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static Long getDaysBetween(Date startDate, Date endDate) {
		Calendar fromCalendar = Calendar.getInstance();
		fromCalendar.setTime(startDate);
		fromCalendar.set(Calendar.HOUR_OF_DAY, 0);
		fromCalendar.set(Calendar.MINUTE, 0);
		fromCalendar.set(Calendar.SECOND, 0);
		fromCalendar.set(Calendar.MILLISECOND, 0);

		Calendar toCalendar = Calendar.getInstance();
		toCalendar.setTime(endDate);
		toCalendar.set(Calendar.HOUR_OF_DAY, 0);
		toCalendar.set(Calendar.MINUTE, 0);
		toCalendar.set(Calendar.SECOND, 0);
		toCalendar.set(Calendar.MILLISECOND, 0);

		return (toCalendar.getTime().getTime() - fromCalendar.getTime().getTime()) / (1000 * 60 * 60 * 24);
	}

    /**Date format :yyyy-MM-dd HH:mm:ss*/
    public static final String DF_YMDHMS = "yyyy-MM-dd HH:mm:ss";
    
    /**
     * Get date time string，Conversion format（yyyy-MM-dd HH:mm:ss）
     *//*
    public static String formatDateTime(Date date) {
        return formatDate(date, DF_YMDHMS);
    } */
}