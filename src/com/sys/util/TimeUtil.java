package com.sys.util;

import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/** <p>
 * File: TimeLimit.java
 * </p>
 * 
 * <p>
 * Title:
 * </p>
 * 
 * <p>
 * Description:
 * </p>
 * 
 * <p>
 * Copyright: Copyright (c) 2011
 * </p>
 * 
 * @author iwill cheng : 2011-2-9
 * @version */
public class TimeUtil {

	private String timeStart;

	private String timeEnd;

	/** timeStart 取得。
	 * 
	 * @return timeStart */
	public String getTimeStart() {

		return timeStart;
	}

	/** timeStart 設定。
	 * 
	 * @param timeStart 設定 */
	public void setTimeStart(String timeStart) {

		this.timeStart = timeStart;
	}

	/** timeEnd 取得。
	 * 
	 * @return timeEnd */
	public String getTimeEnd() {

		return timeEnd;
	}

	/** timeEnd 設定。
	 * 
	 * @param timeEnd 設定 */
	public void setTimeEnd(String timeEnd) {

		this.timeEnd = timeEnd;
	}

	public TimeUtil() {

		super();
		// TODO 自動生成 构造函数
	}

	public TimeUtil(String timeStart, String timeEnd) {

		super();
		this.timeStart = timeStart;
		this.timeEnd = timeEnd;
	}

	public static TimeUtil getThisYearStartEnd() {

		Calendar calendar = Calendar.getInstance();
		String year = Integer.toString(calendar.get(Calendar.YEAR));
		return new TimeUtil(year + "-01-01 00:00:00", year + "-01-01 23:59:59");
	}

	public static TimeUtil getLastYearStartEnd() {

		Calendar calendar = Calendar.getInstance();
		String year = Integer.toString(calendar.get(Calendar.YEAR) - 1);
		return new TimeUtil(year + "-01-01 00:00:00", year + "-01-01 23:59:59");
	}

	public static TimeUtil getTodayStartEnd() {

		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd ");

		return new TimeUtil(df.format(date) + "00:00:00", df.format(date) + "23:59:59");
	}

	/** 取今天开始时间。
	 * 
	 * @return */
	public static String getTodayStart() {

		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd ");
		String time = df.format(date) + "00:00:00";

		return time;
	}

	/** 取今天结束时间。
	 * 
	 * @return */
	public static String getTodayEnd() {

		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd ");
		String time = df.format(date) + "23:59:59";

		return time;
	}

	public static String getThisYear() {

		Calendar calendar = Calendar.getInstance();
		return Integer.toString(calendar.get(Calendar.YEAR));
	}

	/** 得到本月的第一天
	 * 
	 * @return */
	public static String getMonthFirstDay() {

		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		return df.format(calendar.getTime());
	}

	/** 得到本月的最后一天
	 * 
	 * @return */
	public static String getMonthLastDay() {

		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		return df.format(calendar.getTime());
	}

	/** 取YYYY-MM-dd日期开始时间。
	 * 
	 * @return */
	public static String getDatetimeStart(String date) {

		String time = date + " 00:00:00";

		return time;
	}

	/** 取YYYY-MM-dd日期结束时间。
	 * 
	 * @return */
	public static String getDatetimeEnd(String date) {

		String time = date + " 23:59:59";
		return time;
	}

	public static Date getStringToDate(String date) {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		try {
			return sdf.parse(getDatetimeStart(date));
		} catch (ParseException e) {
			// TODO 自动生成 catch 代码块
			e.printStackTrace();
			return null;
		}
	}

	public static String getDateTime() {

		String strCurrentDateTime = "";
		Date currentDateTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		strCurrentDateTime = formatter.format(currentDateTime);
		return strCurrentDateTime;
	}

	public static String getYMD() {

		String strYMD = "";
		Date currentDateTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		strYMD = formatter.format(currentDateTime);
		return strYMD;
	}

	static public String getDateStr(Date date) {

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		return format.format(date);
	}

	static public String getYear(Date date) {

		SimpleDateFormat format = new SimpleDateFormat("yyyy");
		return format.format(date);
	}

	static public String getDateStrZhCn(Date date) {

		SimpleDateFormat format = new SimpleDateFormat("yyyy年MM月dd日");
		return format.format(date);
	}

	public static String getDateStr(Date date, String pattern) {

		SimpleDateFormat format = new SimpleDateFormat(pattern);
		if (date == null) {
			return "";
		}
		return format.format(date);
	}

	public static Date parseData(String dataVal, String formatVal) {

		SimpleDateFormat formatter = new SimpleDateFormat(formatVal);
		ParsePosition pos = new ParsePosition(0);
		java.util.Date cDate = formatter.parse(dataVal, pos);
		return cDate;
	}

	/** Parses text in 'YYYY-MM-DD' format to produce a date.
	 * 
	 * @param s the text
	 * @return Date
	 * @throws ParseException */
	static public Date parseDate(String s) {

		if (s == null || "".equals(s)) {
			return null;
		}
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		try {
			return format.parse(s);
		} catch (ParseException e) {

		}
		return null;
	}

	public static String getYMDFromStr(String dateStr) throws ParseException {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		long timeStart = sdf.parse(dateStr).getTime();
		String strYMD = "";
		Date currentDateTime = new Date(timeStart);
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		strYMD = formatter.format(currentDateTime);
		return strYMD;
	}

	public static String getYMDHMS() {

		String strYMDHMS = "";
		Date currentDateTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		strYMDHMS = formatter.format(currentDateTime);
		return strYMDHMS;
	}

	public static String getYMDHMSS() {

		String strYMDHMSS = "";
		Date currentDateTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		strYMDHMSS = formatter.format(currentDateTime);
		return strYMDHMSS;
	}

	public static void main(String[] args) {

		// System.out.println(getThisYear());

	}
}
