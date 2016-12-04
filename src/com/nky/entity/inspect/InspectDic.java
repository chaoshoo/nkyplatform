package com.nky.entity.inspect;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;

/**
 * dicDictionary table. inspect_code dic_type.
 * @author Ken
 * @version 2016year8month22day
 */
public class InspectDic {
	private String dicName;//C01
	private String dicValue;//blood pressure

	private Map<String, InspectKpiConfig> inspectMap = new HashMap<String,InspectKpiConfig>();

	public InspectDic() {

	}

	public String getDicName() {
		return dicName;
	}

	public void setDicName(String dicName) {
		this.dicName = dicName;
	}

	public String getDicValue() {
		return dicValue;
	}

	public void setDicValue(String dicValue) {
		this.dicValue = dicValue;
	}

	public Map<String, InspectKpiConfig> getInspectMap() {
		return inspectMap;
	}

	public void setInspectMap(Map<String, InspectKpiConfig> inspectMap) {
		this.inspectMap = inspectMap;
	}

	public String toString() {
		return ReflectionToStringBuilder.toString(this);
	}
}