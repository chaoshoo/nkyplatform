package com.nky.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.inspect.InspectDic;
import com.nky.entity.inspect.InspectKpiConfig;
import com.nky.entity.inspect.InspectKpiConfigFz;

/**
 * Inspection index interface.
 * @author Ken
 * @version 2016year8month22day
 */
public class InspectConfigData {

	private static final Logger LOG = LoggerFactory.getLogger(InspectConfigData.class);

	private static InspectConfigData instance = null;

	//C01 	血压		 
	private static ConcurrentHashMap<String, InspectDic> INSPECT_CODE_NAME_MAP = new ConcurrentHashMap<String, InspectDic>();

	private static Boolean LOCK = new Boolean(true);

	//我通过C01 可以知道他下面  有那些指标  
	//然后传入指标 可以知道指标熟悉及阈值范围
	
	/**
	 * Obtain a single case.
	 */
	public static InspectConfigData getInstance() {
		if (instance == null) {
			instance = new InspectConfigData();
		}
		return instance;
	}

	/**
	 * Get all the test indexes C01: C02 . Include the following indicators
	 */
	public Map<String, InspectDic> getAllInspect(){
		return INSPECT_CODE_NAME_MAP;
	}

	/**
	 * Get all the data of a test indicator code C01The following indicators
	 */
	public InspectDic getInspect(String code){
		return INSPECT_CODE_NAME_MAP.get(code);
	}

	/**
	 * Get all of the test indexes C01 The list below the threshold index
	 */
	public InspectKpiConfig getInspectValues(String inspectCode,String kpiCode){
		return INSPECT_CODE_NAME_MAP.get(inspectCode).getInspectMap().get(kpiCode);
	}
	
	private InspectConfigData() {
		loadData();
	}

	/**
	 * Load data
	 */
	private void loadData() {
		synchronized (LOCK) {
			List<Record> list = Db.find("select DIC_NAME,DIC_VALUE from dic where DIC_TYPE = 'inspect_code'");
			for (Record r : list) {
				InspectDic dic = new InspectDic();
				dic.setDicName(r.getStr("DIC_NAME"));
				dic.setDicValue(r.getStr("DIC_VALUE"));
				INSPECT_CODE_NAME_MAP.put(dic.getDicName(), dic);
			}
			Map<String, String> KPI_INSPEC_CODE = new HashMap<String, String>();//Reverse relationships between code and metrics in a record configuration
			List<Record> configList = Db
					.find("SELECT CODE,NAME,UNIT,INSPECT_CODE,KPI_MAX,KPI_MIN,KPI_PIC FROM inspect_kpi_config ");
			for (Record r : configList) {
				String inspectCode = r.getStr("INSPECT_CODE");
				InspectDic dic = INSPECT_CODE_NAME_MAP.get(inspectCode);
				if (dic == null) {
					LOG.warn(inspectCode + "No configuration to dictionary tableDIC，Ignore...");
					continue;
				}
				InspectKpiConfig kpi = new InspectKpiConfig();
				kpi.setCode(r.getStr("CODE"));
				kpi.setName(r.getStr("NAME"));
				kpi.setUnit(r.getStr("UNIT"));
				kpi.setKpiMax(r.getStr("KPI_MAX"));
				kpi.setKpiMin(r.getStr("KPI_MIN"));
				kpi.setKpiPic(r.getStr("KPI_PIC"));
				kpi.setInspectCode(r.getStr("INSPECT_CODE"));
				KPI_INSPEC_CODE.put(kpi.getCode(), inspectCode);// 
				dic.getInspectMap().put(kpi.getCode(), kpi);
				LOG.debug("Add configuration:" + kpi);
			}
			//select KIP_CODE,SEX,AGE_MIN,AGE_MAX,FZ_MAX,FZ_MIN from inspect_kpi_config_fz 
			List<Record> configChildList = Db.find("select * from inspect_kpi_config_fz ");
			for (Record r : configChildList) {
				String configCode = r.getStr("KIP_CODE");
				String inspectCode = KPI_INSPEC_CODE.get(configCode);
				InspectDic dic = INSPECT_CODE_NAME_MAP.get(inspectCode);
				if (dic == null) {
					LOG.warn(inspectCode + "No configuration to dictionary tableDIC，Ignore..." + configCode);
					continue;
				}

				InspectKpiConfigFz fz = new InspectKpiConfigFz();
				fz.setAgeMax(r.getInt("AGE_MAX"));
				fz.setAgeMin(r.getInt("AGE_MIN"));
				fz.setSex(r.getStr("SEX"));
				fz.setFzMax(r.getBigDecimal("FZ_MAX"));
				fz.setFzMin(r.getBigDecimal("FZ_MIN"));
				fz.setKipCode(r.getStr("KIP_CODE"));
				InspectKpiConfig config = dic.getInspectMap().get(configCode); 
				config.getFzSet().add(fz);
				LOG.debug("Add configuration assistance:" + fz);
			}
		}
	}

	/**
	 * Reload
	 */
	public void reload() {
		loadData();
	}

}