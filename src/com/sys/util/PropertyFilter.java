package com.sys.util;

import java.util.Date;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.util.Assert;

import com.google.common.collect.Lists;



public class PropertyFilter {
	public static final String OR_SEPARATOR = "_OR_";
	  public static final String FILTER_PREFIX = "filter";
	  private static final String regExp = "^\\w+_\\w+$";
	  private MatchType matchType = null;
	  private Object matchValue = null;

	  private Class<?> propertyClass = null;
	  private String[] propertyNames = null;

	  public PropertyFilter()
	  {
	  }

	  public PropertyFilter(String filterName, String value)
	  {
	    if (!StringUtil.regMatch(filterName, "^\\w+_\\w+$")) {
	      throw new IllegalArgumentException("filterName" + filterName + "Not prepared in accordance with the rules");
	    }

	    String firstPart = StringUtils.substringBefore(filterName, "_");
	    String matchTypeCode = StringUtils.substring(firstPart, 0, firstPart.length() - 1);
	    String propertyTypeCode = StringUtils.substring(firstPart, firstPart.length() - 1, firstPart.length());
	    try
	    {
	      this.matchType = ((MatchType)Enum.valueOf(MatchType.class, matchTypeCode));
	    } catch (RuntimeException e) {
	      throw new IllegalArgumentException("filterName" + filterName + "Not prepared in accordance with the rules,Can`t get attribute comparison type.", e);
	    }
	    try
	    {
	      this.propertyClass = ((PropertyType)Enum.valueOf(PropertyType.class, propertyTypeCode)).getValue();
	    } catch (RuntimeException e) {
	      throw new IllegalArgumentException("filterName" + filterName + "Not prepared in accordance with the rules,Property value type cannot be obtained.", e);
	    }

	    String propertyNameStr = StringUtils.substringAfter(filterName, "_");
	    Assert.isTrue(StringUtils.isNotBlank(propertyNameStr), "filterName" + filterName + "Not prepared in accordance with the rules,Property name cannot be obtained.");
	    this.propertyNames = StringUtils.splitByWholeSeparator(propertyNameStr, "_OR_");
	    try {
		    this.matchValue = StringUtil.convertStringToObject(value, this.propertyClass);
		} catch (Exception e) {
			e.printStackTrace();
		}
	  }

	  public static List<PropertyFilter> buildFromHttpRequest(HttpServletRequest request)
	  {
	    return buildFromHttpRequest(request, "filter");
	  }

	

	  public static List<PropertyFilter> buildFromHttpRequest(HttpServletRequest request, String filterPrefix)
	  {
	    List<PropertyFilter> filterList = Lists.newArrayList();

	    Map<String,Object> filterParamMap = getParametersStartingWith(request, filterPrefix + "_");

	    for (Entry<String,Object> entry : filterParamMap.entrySet()) {
	      String filterName = (String)entry.getKey();
	      String value = (String)entry.getValue();

	      if (StringUtils.isNotBlank(value)) {
	        PropertyFilter filter = new PropertyFilter(filterName, value);
	        filterList.add(filter);
	      }
	    }

	    return filterList;
	  }

	  public static List<PropertyFilter> buildOrderFromHttpRequest(HttpServletRequest request, String filterPrefix)
	  {
	    List<PropertyFilter> filterList = Lists.newArrayList();

	    Map<String,Object> filterParamMap = getParametersStartingWith(request, filterPrefix + "_");

	    for (Entry<String,Object> entry : filterParamMap.entrySet()) {
	      String filterName = (String)entry.getKey();
	      String value = (String)entry.getValue();

	      if (StringUtils.isNotBlank(value)) {
	        PropertyFilter filter = new PropertyFilter(filterName, value);
	        filterList.add(filter);
	      }
	    }

	    return filterList;
	  }
	  public static Map<String, Object> getParametersStartingWith(ServletRequest request, String prefix)
	  {
	    Assert.notNull(request, "Request must not be null");
	    Enumeration paramNames = request.getParameterNames();
	    Map params = new TreeMap();
	    if (prefix == null) {
	      prefix = "";
	    }
	    while ((paramNames != null) && (paramNames.hasMoreElements())) {
	      String paramName = (String)paramNames.nextElement();
	      if (("".equals(prefix)) || (paramName.startsWith(prefix))) {
	        String unprefixed = paramName.substring(prefix.length());
	        String[] values = request.getParameterValues(paramName);
	        if ((values != null) && (values.length != 0))
	        {
	          if (values.length > 1)
	            params.put(unprefixed, values);
	          else
	            params.put(unprefixed, values[0]);
	        }
	      }
	    }
	    return params;
	  }
	  public Class<?> getPropertyClass()
	  {
	    return this.propertyClass;
	  }

	  public MatchType getMatchType()
	  {
	    return this.matchType;
	  }

	  public Object getMatchValue()
	  {
	    return this.matchValue;
	  }

	  public String[] getPropertyNames()
	  {
	    return this.propertyNames;
	  }

	  public String getPropertyName()
	  {
	    Assert.isTrue(this.propertyNames.length == 1, "There are not only one property in this filter.");
	    return this.propertyNames[0];
	  }

	  public boolean hasMultiProperties()
	  {
	    return this.propertyNames.length > 1;
	  }

	  public static enum PropertyType
	  {
	    S(String.class), I(Integer.class), L(Long.class), N(Double.class), D(Date.class), B(Boolean.class);

	    private Class<?> clazz;

	    private PropertyType(Class<?> clazz) {
	      this.clazz = clazz;
	    }

	    public Class<?> getValue() {
	      return this.clazz;
	    }
	  }

	  public static enum MatchType
	  {
	    EQ, 
	    NE, 
	    LIKE, 
	    LIKES, 
	    LIKEE, 
	    LT, 
	    GT, 
	    LE, 
	    GE, 
	    ISNULL, 
	    ISNOTNULL;
	  }
}