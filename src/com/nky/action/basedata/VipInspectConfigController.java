package com.nky.action.basedata;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.inspect.InspectDic;
import com.nky.entity.inspect.InspectKpiConfig;
import com.nky.entity.inspect.Office;
import com.nky.service.InspectConfigData;
import com.nky.service.OfficeSingleton;
import com.sys.action.BaseAction;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.ScriptPage;
import com.sys.jfinal.JFinalDb;

/**
 * Use example：
1.Get all the test indexes C01: C02 . They include the following indicators and threshold
http://localhost:8080/nkyplatform/vipInspectConfig/getAllInspect.json
2.Get all the data of a test indicator code C01Below the threshold and index
http://localhost:8080/nkyplatform/vipInspectConfig/getInspect/C01.json
3.Get all the data of a test indicator code C01The following indicatorsSYS de threshold
http://localhost:8080/nkyplatform/vipInspectConfig/getInspectValues/C01/SYS.json
 * Test index interface.
 * @author Ken
 * @version 2016year8month22day
 */
@Controller
@RequestMapping(value = "/vipInspectConfig")
public class VipInspectConfigController  extends BaseAction {

	@RequestMapping(value = "/show")
	public String show(HttpServletRequest request) {
		return "basedata/inspectkpiconfiglist";
	}

	/**
	 * Get list
	 * @param area
	 * @return
	 */
	@RequestMapping(value = "/list")
	@ResponseBody
	public ScriptPage list(HttpServletRequest request, AjaxPage ajaxPage) {
		ScriptPage scriptPage = null;
		Map<String, Object> param = getParam(request);
		try {
			scriptPage = JFinalDb.findPageBySqlid(ajaxPage.getPageNo(), ajaxPage.getPageSize(), "inspectkpiconfig_list", param,
					" code asc ");
			//判断是否有子指标阀值
			if(scriptPage != null && scriptPage.getRows() != null && scriptPage.getRows().size()>0){
				List<Record> codeList = Db.find("select DISTINCT kip_code  from inspect_kpi_config_fz");
				Set<String> codeSet = new HashSet<String>();
				if(codeList != null && codeList.size()>0){
					for(Record rt : codeList){
						if(StringUtils.isNotEmpty(rt.getStr("KIP_CODE"))){
							codeSet.add(rt.getStr("KIP_CODE"));
						}
					}
				}
				if(codeSet.size()>0){
					List<Map<String,Object>> maps  = scriptPage.getRows();
					for(Map<String,Object> entity : maps){
						if(codeSet.contains(entity.get("CODE"))){
							entity.put("CHILD", true);
						}else{
							entity.put("CHILD", false);
						}
					}
				}
			}
		} catch (Exception e) {
			LOG.error("Query list failed.", e);
			scriptPage = new ScriptPage();
		}
		return scriptPage;
	}
	
	/**
	 * http://localhost:8080/nkyplatform/vipInspectConfig/officeall.json
	 * {"1001":{"code":"1001","name":"orthopaedics","pic":"/nkywx/img/icon_niaosuan.png","des":null,"description":null},"1003":{"code":"1003","name":"Urology Department","pic":null,"des":null,"description":null},"1002":{"code":"1002","name":"The chest figure","pic":null,"des":null,"description":null},"1004":{"code":"1004","name":"Cardiac section","pic":null,"des":null,"description":null}}
	 */
	@RequestMapping(value = "/officeall", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Office> officeall() {
		return OfficeSingleton.getInstance().getAll();
	}
	
	/**
	 * http://localhost:8080/nkyplatform/vipInspectConfig/office/1001.json
	 * {"code":"1001","name":"orthopaedics","pic":"/nkywx/img/icon_niaosuan.png","des":null,"description":null}
	 */
	@RequestMapping(value = "/office/{code}", method = RequestMethod.GET)
	@ResponseBody
	public Office office(@PathVariable("code") String code) {
		return OfficeSingleton.getInstance().getEntitybykey(code);
	}
	
	/**
	 * Get all the test indexes C01: C02 . Include the following indicators
	 * {
	"C01": {
	    "dicName": "C01",
	    "dicValue": "blood pressure",
	    "inspectMap": {
	        "PR": {
	            "code": "PR",
	            "name": "Pulse rate",
	            "isfz": null,
	            "unit": "bpm",
	            "inspectCode": "C01",
	            "des": null,
	            "kpiMax": null,
	            "kpiMin": null,
	            "kpiPic": null,
	            "fzSet": []
	        },
	        "SYS": {
	            "code": "SYS",
	            "name": "Systolic Blood Pressure",
	            "isfz": null,
	            "unit": "mmHg",
	            "inspectCode": "C01",
	            "des": null,
	            "kpiMax": "90",
	            "kpiMin": "180",
	            "kpiPic": null,
	            "fzSet": [
	                {
	                    "kipCode": "SYS",
	                    "sex": "0",
	                    "ageMin": 30,
	                    "ageMax": 50,
	                    "fzMax": 130,
	                    "fzMin": 150
	                },
	                {
	                    "kipCode": "SYS",
	                    "sex": "0",
	                    "ageMin": 10,
	                    "ageMax": 20,
	                    "fzMax": 120,
	                    "fzMin": 140
	                },
	                {
	                    "kipCode": "SYS",
	                    "sex": "0",
	                    "ageMin": 20,
	                    "ageMax": 30,
	                    "fzMax": 110,
	                    "fzMin": 130
	                }
	            ]
	        },
	        "DIA": {
	            "code": "DIA",
	            "name": "Diastolic Blood Pressure",
	            "isfz": null,
	            "unit": "mmHg",
	            "inspectCode": "C01",
	            "des": null,
	            "kpiMax": null,
	            "kpiMin": null,
	            "kpiPic": null,
	            "fzSet": []
	        }
	    }
	},
	"C02": {
	    "dicName": "C02",
	    "dicValue": "blood sugar",
	    "inspectMap": {
	        "GLU2": {
	            "code": "GLU2",
	            "name": "Postprandial blood glucose",
	            "isfz": null,
	            "unit": "mmol/L",
	            "inspectCode": "C02",
	            "des": null,
	            "kpiMax": null,
	            "kpiMin": null,
	            "kpiPic": null,
	            "fzSet": []
	        },
	        "GLU1": {
	            "code": "GLU1",
	            "name": "Pre-meal blood glucose",
	            "isfz": null,
	            "unit": "mmol/L",
	            "inspectCode": "C02",
	            "des": null,
	            "kpiMax": null,
	            "kpiMin": null,
	            "kpiPic": null,
	            "fzSet": []
	        },
	        "GLU0": {
	            "code": "GLU0",
	            "name": "Random blood glucose",
	            "isfz": null,
	            "unit": "mmol/L",
	            "inspectCode": "C02",
	            "des": null,
	            "kpiMax": null,
	            "kpiMin": null,
	            "kpiPic": null,
	            "fzSet": []
	        }
	    }
	}
	}
	 */
	@RequestMapping(value = "/getAllInspect", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, InspectDic> getAllInspect() {
		return InspectConfigData.getInstance().getAllInspect();
	}

	/**
	 * Get all the data of a test indicator code C01The following indicators
	 * {
	"dicName": "C01",
	"dicValue": "blood pressure",
	"inspectMap": {
	    "PR": {
	        "code": "PR",
	        "name": "Pulse rate",
	        "isfz": null,
	        "unit": "bpm",
	        "inspectCode": "C01",
	        "des": null,
	        "kpiMax": null,
	        "kpiMin": null,
	        "kpiPic": null,
	        "fzSet": []
	    },
	    "SYS": {
	        "code": "SYS",
	        "name": "Systolic Blood Pressure",
	        "isfz": null,
	        "unit": "mmHg",
	        "inspectCode": "C01",
	        "des": null,
	        "kpiMax": "90",
	        "kpiMin": "180",
	        "kpiPic": null,
	        "fzSet": [
	            {
	                "kipCode": "SYS",
	                "sex": "0",
	                "ageMin": 30,
	                "ageMax": 50,
	                "fzMax": 130,
	                "fzMin": 150
	            },
	            {
	                "kipCode": "SYS",
	                "sex": "0",
	                "ageMin": 10,
	                "ageMax": 20,
	                "fzMax": 120,
	                "fzMin": 140
	            },
	            {
	                "kipCode": "SYS",
	                "sex": "0",
	                "ageMin": 20,
	                "ageMax": 30,
	                "fzMax": 110,
	                "fzMin": 130
	            }
	        ]
	    },
	    "DIA": {
	        "code": "DIA",
	        "name": "Diastolic Blood Pressure",
	        "isfz": null,
	        "unit": "mmHg",
	        "inspectCode": "C01",
	        "des": null,
	        "kpiMax": null,
	        "kpiMin": null,
	        "kpiPic": null,
	        "fzSet": []
	    }
	}
	}
	 */
	@RequestMapping(value = "/getInspect/{code}", method = RequestMethod.GET)
	@ResponseBody
	public InspectDic getInspect(@PathVariable("code") String code) {
		return InspectConfigData.getInstance().getInspect(code);
	}

	/**
	 * Get all the data of a test indicator code C01The following indicators
	 * {
	"code": "SYS",
	"name": "Systolic Blood Pressure",
	"isfz": null,
	"unit": "mmHg",
	"inspectCode": "C01",
	"des": null,
	"kpiMax": "90",
	"kpiMin": "180",
	"kpiPic": null,
	"fzSet": [
	    {
	        "kipCode": "SYS",
	        "sex": "0",
	        "ageMin": 20,
	        "ageMax": 30,
	        "fzMax": 110,
	        "fzMin": 130
	    },
	    {
	        "kipCode": "SYS",
	        "sex": "0",
	        "ageMin": 10,
	        "ageMax": 20,
	        "fzMax": 120,
	        "fzMin": 140
	    },
	    {
	        "kipCode": "SYS",
	        "sex": "0",
	        "ageMin": 30,
	        "ageMax": 50,
	        "fzMax": 130,
	        "fzMin": 150
	    }
	]
	}
	 */
	@RequestMapping(value = "/getInspectValues/{inspectCode}/{kpiCode}", method = RequestMethod.GET)
	@ResponseBody
	public InspectKpiConfig getInspectValues(@PathVariable("inspectCode") String inspectCode,
			@PathVariable("kpiCode") String kpiCode) {
		return InspectConfigData.getInstance().getInspectValues(inspectCode, kpiCode);
	}

}