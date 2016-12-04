package com.nky.action.inspect;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.testng.collections.Lists;
import org.testng.collections.Maps;
import org.testng.collections.Sets;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.inspect.InspectSubTitleVo;
import com.nky.entity.inspect.VipInspectChartVo;
import com.sys.singleton.DicSingleton;
import com.sys.util.DateUtil;

import net.sf.json.JSONArray;

@Controller
@RequestMapping(value = "/vipInspectData")
public class VipInspectDataController {

	private static final Logger LOG = LoggerFactory.getLogger(VipInspectDataController.class);
	
	private static Map<String,String[]> CHART_UNIT_NAME_MAP = new HashMap<String,String[]>();
	static {
		CHART_UNIT_NAME_MAP.put("C1", new String[]{"Blood pressure gauge history","Mm Hg","Systolic Blood Pressure/Diastolic Blood Pressure","mmHg"});
		CHART_UNIT_NAME_MAP.put("C2", new String[]{"Pulse rate history","Stroke/branch","Pulse rate","bpm"});
		CHART_UNIT_NAME_MAP.put("C3", new String[]{"Blood glucose history","Mmol/rise","blood sugar","mmol/L"});
		CHART_UNIT_NAME_MAP.put("C4", new String[]{"History of systolic blood pressure","Mm Hg","Systolic Blood Pressure","mmHg"});
		CHART_UNIT_NAME_MAP.put("C5", new String[]{"Diastolic blood pressure history","Mm Hg","Diastolic Blood Pressure","mmHg"});
		CHART_UNIT_NAME_MAP.put("C6", new String[]{"Random blood glucose history","Mmol/rise","blood sugar","mmol/L"});
		CHART_UNIT_NAME_MAP.put("C7", new String[]{"Pre-meal blood glucose history","Mmol/rise","blood sugar","mmol/L"});
		CHART_UNIT_NAME_MAP.put("C8", new String[]{"Postprandial blood glucose history","Mmol/rise","blood sugar","mmol/L"});
		CHART_UNIT_NAME_MAP.put("SYS", new String[]{"History of systolic blood pressure","Mm Hg","Systolic Blood Pressure","mmHg"});
		CHART_UNIT_NAME_MAP.put("DIA", new String[]{"Diastolic blood pressure history","Mm Hg","Diastolic Blood Pressure","mmHg"});
		
		//上面的都会被弃用,2016.9.7
		CHART_UNIT_NAME_MAP.put("SYS-DIA", new String[]{"Blood pressure history","Mm Hg","Systolic Blood Pressure/Diastolic Blood Pressure","mmHg"});
		CHART_UNIT_NAME_MAP.put("PR", new String[]{"Pulse rate history","Stroke/branch","Pulse rate","bpm"});
		CHART_UNIT_NAME_MAP.put("GLU0", new String[]{"Random blood glucose history","Mmol/rise","Random blood glucose","mmol/L"});
		CHART_UNIT_NAME_MAP.put("GLU1", new String[]{"Pre-meal blood glucose history","Mmol/rise","Pre-meal blood glucose","mmol/L"});
		CHART_UNIT_NAME_MAP.put("GLU2", new String[]{"Postprandial blood glucose history","Mmol/rise","Postprandial blood glucose","mmol/L"});
		
		//2016-09-22
		CHART_UNIT_NAME_MAP.put("HEIGHT", new String[]{"History of height","cm","height","cm"});
		CHART_UNIT_NAME_MAP.put("WEIGHT", new String[]{"Weight history","kg","weight","kg"});
		CHART_UNIT_NAME_MAP.put("BMI", new String[]{"BMIHistory record","","BMI",""});
		CHART_UNIT_NAME_MAP.put("BMI-WH", new String[]{"BMIHistory record","","BMI",""});

		CHART_UNIT_NAME_MAP.put("TEMP", new String[]{"Temperature History","℃","temperature","℃"}); 
		
		CHART_UNIT_NAME_MAP.put("SPO2", new String[]{"Blood oxygen history","","Oxygen",""});
		CHART_UNIT_NAME_MAP.put("PR2", new String[]{"Pulse rate history","Stroke/branch","Pulse rate","bpm"});
		CHART_UNIT_NAME_MAP.put("SPO2-PR2", new String[]{"Blood oxygen history","","",""});
//		
//		CHART_UNIT_NAME_MAP.put("LEU", new String[]{"白细胞历史记录","","",""});
		
//		INSERT INTO `inspect_kpi_config` VALUES (13, 'LEU', '白细胞', 0, '', 'C06', ',LEU,NCG,', '', '', '');
//		INSERT INTO `inspect_kpi_config` VALUES (14, 'NIT', '亚硝酸盐', 0, '', 'C06', ',NIT,NCG,', '', '', '');
//		INSERT INTO `inspect_kpi_config` VALUES (15, 'UBG', '尿胆原', 0, '', 'C06', ',UBG,NCG,', '', '', '');
//		INSERT INTO `inspect_kpi_config` VALUES (16, 'PH', '酸碱度', 0, '', 'C06', ',PH,NCG,', '', '', '');
//		INSERT INTO `inspect_kpi_config` VALUES (17, 'BLD', '葡萄糖', 0, '', 'C06', ',BLD,NCG,', '', '', '');
//		INSERT INTO `inspect_kpi_config` VALUES (18, 'GLU', '白细胞', 0, '', 'C06', ',GLU,NCG,', '', '', '');
//		INSERT INTO `inspect_kpi_config` VALUES (19, 'KET', '酮体', 0, '', 'C06', ',KET,NCG,', '', '', '');
//		INSERT INTO `inspect_kpi_config` VALUES (20, 'PRO', '蛋白质', 0, '', 'C06', ',PRO,NCG,', '', '', '');
//		INSERT INTO `inspect_kpi_config` VALUES (21, 'BIL', '胆红素', 0, '', 'C06', ',BIL,NCG,', '', '', '');
//		INSERT INTO `inspect_kpi_config` VALUES (22, 'VC', '维生素', 0, '', 'C06', ',VC,NCG,', '', '', '');
//		INSERT INTO `inspect_kpi_config` VALUES (23, 'SG', '比重', 0, '', 'C06', ',SG,NCG,', '', '', '');
		
	}
	
	/**
	 * On ID card number  Must fill  card_code   ID card number   Fill in the following documents Also fill in   ID Global unique identification member user  
	 * @param map
	 * @param cardCode
	 * @param inspectCode
	 * @return
	 */
	@RequestMapping(value = "/chart/{cardCode}/{inspectCode}/{detailCode}/{page}")
	public String chart(ModelMap map,@PathVariable("cardCode") String cardCode,
			@PathVariable("inspectCode") String inspectCode,@PathVariable("detailCode") String detailCode,@PathVariable("page") Integer page){
		if(StringUtils.isEmpty(cardCode) || StringUtils.isEmpty(inspectCode)){
			map.addAttribute("message","Incomplete data!");
			return "inspect/chartdemo/error";
		}
		Record vipRecord = Db.findFirst("select VIP_CODE,AGE,SEX,NICK_NAME from t_vip  where card_code =?  and isvalid = 1 limit 1",cardCode);
		if(vipRecord == null){
			map.addAttribute("message","Incomplete data!");
			return "inspect/chartdemo/error";
		}
		//保留数据
		VipInspectChartVo vo = new VipInspectChartVo();
		vo.setCardCode(cardCode);
		vo.setInspectCode(inspectCode);
		vo.setInspectName(DicSingleton.getInstance().getValueBykeyDic("inspect_code", inspectCode));
		String detalCodeTmp = detailCode;
		if(StringUtils.isEmpty(detailCode) || detailCode.equals("ALL")){
			detailCode = "";
		}
		vo.setDetailCode(detalCodeTmp);
		
		Integer age = vipRecord.getInt("AGE");
		if(age == null){
			age = -1;
		}
		String sex = vipRecord.getStr("SEX");
		if(StringUtils.isNotEmpty(sex)){
			sex = "";
		}
		Map<String,String> DETAILCODE_NAME_MAP = new HashMap<String,String>();
		Map<String,String> DETAILCODE_UNIT_MAP = new HashMap<String,String>();
		//kpi的数据
		List<Record> kpiRecordList = Db.find("select CODE,NAME,UNIT,KPI_MAX,KPI_MIN from inspect_kpi_config  where inspect_code = ?",inspectCode);
		StringBuilder sb = new StringBuilder("");
		if(kpiRecordList != null){
			for(Record r : kpiRecordList){
				String code = r.getStr("CODE");
				DETAILCODE_NAME_MAP.put(code, r.getStr("NAME"));
				DETAILCODE_UNIT_MAP.put(code, r.getStr("UNIT"));
				Record kpiRecordFz = Db.findFirst("select FZ_MAX,FZ_MIN from inspect_kpi_config_fz  where kip_code =?  and sex =? and age_min <= ? and age_max > ?"
						,code,sex,age,age);
				vo.setUnit(r.getStr("UNIT"));
				//如果有详细的指标配置，就按详细的年龄和性别来，如果没有，就用默认的
				if(kpiRecordFz != null && StringUtils.isNotEmpty(kpiRecordFz.getStr("FZ_MAX")) && StringUtils.isNotEmpty(kpiRecordFz.getStr("FZ_MIN"))){
					sb.append(r.getStr("NAME"));
					sb.append("normal range:");
					sb.append(kpiRecordFz.getStr("FZ_MIN"));
//					sb.append(vo.getUnit());
					sb.append("~");
					sb.append(kpiRecordFz.getStr("FZ_MAX"));
//					sb.append(vo.getUnit());
					sb.append("    ");
				}else  if(StringUtils.isNotEmpty(r.getStr("KPI_MAX")) && StringUtils.isNotEmpty(r.getStr("KPI_MIN"))){
					sb.append(r.getStr("NAME"));
					sb.append("normal range:");
					sb.append(r.getStr("KPI_MIN"));
//					sb.append(vo.getUnit());
					sb.append("~");
					sb.append(r.getStr("KPI_MAX"));
//					sb.append(vo.getUnit()); 
					sb.append("    ");
				}
			}
		}
		vo.setInfo(sb.toString()); //Prompt information
		
		Record totalRecord = Db.findFirst("select count(*) as TOTAL  from vip_inspect_data where card_code = ? and inspect_code = ?",cardCode,inspectCode);
		Long totalData = totalRecord.getLong("TOTAL");
		int maxLine = 0;
		if(totalData != null && totalData.intValue()>0){
			vo.setTotalRecord(totalData.intValue());
			vo.setCurrentPage(page);
			vo.calu();
			//有数据
			List<Record> recordList = Db.find("select INSPECT_TIME,PR,SYS,DIA,GLU0,GLU1,GLU2 from vip_inspect_data where card_code = ?  and inspect_code = ? and INSPECT_TIME is not null order by inspect_time asc limit ?,? "
					,cardCode,inspectCode,vo.getCurrentIndex(),vo.getPageSize());
			Set<Long> INSPECT_TIME_SET = new HashSet<Long>();
			List<String> categories = new ArrayList<String>();
			List<BigDecimal> s1 = new ArrayList<BigDecimal>();//Data type needs to be changed,I rely on
			List<BigDecimal> s2 = new ArrayList<BigDecimal>();
			List<BigDecimal> s3 = new ArrayList<BigDecimal>();
			int total = 0;
			if(null != recordList && recordList.size()>0){
				for(Record tmp : recordList){
					INSPECT_TIME_SET.add(tmp.getTimestamp("INSPECT_TIME").getTime());
					total ++;
					//如果没有相同的，就可以用；如果有，就直接
					if(INSPECT_TIME_SET.size()!= total){
						total --;
						continue;
					}
					categories.add(DateUtil.dateForString(new Date(tmp.getTimestamp("INSPECT_TIME").getTime()), "MM-dd HH:mm"));//Xaxis 
					if(StringUtils.isNotEmpty(detailCode) ){
						maxLine = 1;
						vo.setSerie1Name(DETAILCODE_NAME_MAP.get(detailCode));
						vo.setSerie1Unit(DETAILCODE_UNIT_MAP.get(detailCode));
						if(detailCode.equals("PR")){
							s1.add(getKeyValue(detailCode,tmp));//tmp.getStr("PR"));
						}else if(detailCode.equals("SYS")){
							s1.add(getKeyValue(detailCode,tmp));//tmp.getStr("PR"));
						}else if(detailCode.equals("DIA")){
							s1.add(getKeyValue(detailCode,tmp));//tmp.getStr("PR"));
						}else if(detailCode.equals("GLU0")){
							s1.add(getKeyValue(detailCode,tmp));//tmp.getStr("PR"));
						}else if(detailCode.equals("GLU1")){
							s1.add(getKeyValue(detailCode,tmp));//tmp.getStr("PR"));
						}else if(detailCode.equals("GLU2")){
							s1.add(getKeyValue(detailCode,tmp));//tmp.getStr("PR"));
						}
					}else{
						int i = 0;
						for(Map.Entry<String,String> entry : DETAILCODE_NAME_MAP.entrySet()){
							i ++;
							if(i == 1){
								vo.setSerie1Name(entry.getValue());
								vo.setSerie1Unit(DETAILCODE_UNIT_MAP.get(entry.getKey()));
								s1.add(getKeyValue(entry.getKey(),tmp));//tmp.getStr("PR"));
							}else if(i == 2){
								vo.setSerie2Name(entry.getValue());
								vo.setSerie2Unit(DETAILCODE_UNIT_MAP.get(entry.getKey()));
								s2.add(getKeyValue(entry.getKey(),tmp));//tmp.getStr("PR"));
							}else if(i == 3){
								vo.setSerie3Name(entry.getValue());
								vo.setSerie3Unit(DETAILCODE_UNIT_MAP.get(entry.getKey()));
								s3.add(getKeyValue(entry.getKey(),tmp));//tmp.getStr("PR"));
							}
							if(maxLine<i){
								maxLine = i;
							}
						}
					}
				}
				vo.setCategories(JSONObject.toJSONString(categories));
				if(StringUtils.isNotEmpty(detailCode) ){
					vo.setSerie1Data(JSONObject.toJSONString(s1));
				}else{
					if(maxLine>=1){
						vo.setSerie1Data(JSONObject.toJSONString(s1));
					}
					if(maxLine>=2){
						vo.setSerie2Data(JSONObject.toJSONString(s2));
					}
					if(maxLine>=3){
						vo.setSerie3Data(JSONObject.toJSONString(s3));
					}
				}
			}
			
		}else{
			vo.setTotalRecord(0);
			vo.setCurrentPage(0);
			vo.calu();
			maxLine = 1;
		}
		
		vo.setMaxLine(maxLine);
		map.addAttribute("data",vo);
		//error.jsp
		return "inspect/chart/all";
	}
	
	/**
	 * On ID card number  Must fill  card_code   ID card number   Fill in the following documents Also fill in   ID Global unique identification member user  
	 * http://localhost:8080/nkyplatform//vipInspectData/charts/420222198101010001/C01/C2/1.html
	 * @param map
	 * @param cardCode
	 * @param inspectCode
	 * @return
	 */
	@RequestMapping(value = "/charts/{cardCode}/{inspectCode}/{code}/{page}")
	public String charts(ModelMap map,@PathVariable("cardCode") String cardCode,@PathVariable("inspectCode") String inspectCode,
			@PathVariable("code") String code,@PathVariable("page") Integer page){
		if(StringUtils.isEmpty(cardCode) || StringUtils.isEmpty(inspectCode) || StringUtils.isEmpty(code) || null == page || page < 0){
			map.addAttribute("message","Incomplete data!");
			return "inspect/chartdemo/error";
		}
		Record vipRecord = Db.findFirst("select VIP_CODE,AGE,SEX,NICK_NAME from t_vip  where card_code =?  and isvalid = 1 limit 1",cardCode);
		if(vipRecord == null){
			map.addAttribute("message","Incomplete data!");
			return "inspect/chartdemo/error";
		}
		try{
			//保留数据
			VipInspectChartVo vo = new VipInspectChartVo();
			vo.setCardCode(cardCode);
			vo.setCode(code);
			vo.setInspectCode(inspectCode);
			vo.setUnit(CHART_UNIT_NAME_MAP.get(code)[1]);
			vo.setTitle(CHART_UNIT_NAME_MAP.get(code)[0]);
			
			Integer age = vipRecord.getInt("AGE");
			if(age == null){
				age = -1;
			}
			String sex = vipRecord.getStr("SEX");
			if(StringUtils.isEmpty(sex)){
				sex = "";
			}
			Map<String,String> DETAILCODE_NAME_MAP = new HashMap<String,String>();
			Map<String,String> DETAILCODE_UNIT_MAP = new HashMap<String,String>();
			//kpi的数据
			List<Record> kpiRecordList = Db.find("select CODE,NAME,UNIT,KPI_MAX,KPI_MIN from inspect_kpi_config  where des like ?","%,"+code+",%");
			StringBuilder sb = new StringBuilder("");
			Set<String> CODE_SET = new HashSet<String>();
			if(kpiRecordList != null){
				for(Record r : kpiRecordList){
					String cc = r.getStr("CODE");
					CODE_SET.add(cc);
					DETAILCODE_NAME_MAP.put(code, r.getStr("NAME"));
					DETAILCODE_UNIT_MAP.put(code, r.getStr("UNIT"));
					Record kpiRecordFz = Db.findFirst("select FZ_MAX,FZ_MIN from inspect_kpi_config_fz  where kip_code =?  and sex =? and age_min <= ? and age_max > ?"
							,cc,sex,age,age);
//					vo.setUnit(r.getStr("UNIT"));
					//如果有详细的指标配置，就按详细的年龄和性别来，如果没有，就用默认的
					if(kpiRecordFz != null && StringUtils.isNotEmpty(kpiRecordFz.getStr("FZ_MAX")) && StringUtils.isNotEmpty(kpiRecordFz.getStr("FZ_MIN"))){
						sb.append(r.getStr("NAME"));
						sb.append("normal range:");
						sb.append(kpiRecordFz.getStr("FZ_MIN"));
						sb.append(vo.getUnit());
						sb.append("~");
						sb.append(kpiRecordFz.getStr("FZ_MAX"));
						sb.append(vo.getUnit());
						sb.append("    ");
					}else  if(StringUtils.isNotEmpty(r.getStr("KPI_MAX")) && StringUtils.isNotEmpty(r.getStr("KPI_MIN"))){
						sb.append(r.getStr("NAME"));
						sb.append("normal range:");
						sb.append(r.getStr("KPI_MIN"));
						sb.append(vo.getUnit());
						sb.append("~");
						sb.append(r.getStr("KPI_MAX"));
						sb.append(vo.getUnit());
						sb.append("    ");
					}
				}
			}
			vo.setInfo(sb.toString()); //Prompt information
			String xtSql = "";
			if(code.equals("C6")){
				xtSql += " and GLU0 is not null";
			}else if(code.equals("C7")){
				xtSql += " and GLU1 is not null";
			}else if(code.equals("C8")){
				xtSql += " and GLU2 is not null";
			}
			Record totalRecord = Db.findFirst("select count(*) as TOTAL  from vip_inspect_data where card_code = ? and inspect_code = ? " +xtSql,cardCode,inspectCode);
			Long totalData = totalRecord.getLong("TOTAL");
			int maxLine = 0;
			if(totalData != null && totalData.intValue()>0){
				vo.setTotalRecord(totalData.intValue());
				vo.setCurrentPage(page);
				vo.calu();
				//有数据
				List<Record> recordList = Db.find("select INSPECT_TIME,PR,SYS,DIA,GLU0,GLU1,GLU2 from vip_inspect_data where card_code = ?  and inspect_code = ? and INSPECT_TIME is not null " +xtSql+" order by inspect_time asc limit ?,? "
						,cardCode,inspectCode,vo.getCurrentIndex(),vo.getPageSize());
				Set<Long> INSPECT_TIME_SET = new HashSet<Long>();
				List<String> categories = new ArrayList<String>();
				List<BigDecimal> s1 = new ArrayList<BigDecimal>();//Data type needs to be changed,I rely on
				List<BigDecimal> s2 = new ArrayList<BigDecimal>();
				List<BigDecimal> s3 = new ArrayList<BigDecimal>();
				int total = 0;
				if(null != recordList && recordList.size()>0){
					for(Record tmp : recordList){
						INSPECT_TIME_SET.add(tmp.getTimestamp("INSPECT_TIME").getTime());
						total ++;
						//如果没有相同的，就可以用；如果有，就直接
						if(INSPECT_TIME_SET.size()!= total){
							total --;
							continue;
						}
						categories.add(DateUtil.dateForString(new Date(tmp.getTimestamp("INSPECT_TIME").getTime()), "MM-dd HH:mm"));//Xaxis 
						int i = 0;
						for(String entry : CODE_SET){
							i ++;
							if(i == 1){
								vo.setSerie1Name(entry);
								vo.setSerie1Unit(DETAILCODE_UNIT_MAP.get(entry));
								s1.add(getKeyValue(entry,tmp));//tmp.getStr("PR"));
							}else if(i == 2){
								vo.setSerie2Name(entry);
								vo.setSerie2Unit(DETAILCODE_UNIT_MAP.get(entry));
								s2.add(getKeyValue(entry,tmp));//tmp.getStr("PR"));
							}else if(i == 3){
								vo.setSerie3Name(entry);
								vo.setSerie3Unit(DETAILCODE_UNIT_MAP.get(entry));
								s3.add(getKeyValue(entry,tmp));//tmp.getStr("PR"));
							}
							if(maxLine<i){
								maxLine = i;
							}
						}
					
					}
					vo.setCategories(JSONObject.toJSONString(categories));

					if(maxLine>=1){
						vo.setSerie1Data(JSONObject.toJSONString(s1));
					}
					if(maxLine>=2){
						vo.setSerie2Data(JSONObject.toJSONString(s2));
					}
					if(maxLine>=3){
						vo.setSerie3Data(JSONObject.toJSONString(s3));
					}
				
				}
				
			}else{
				vo.setTotalRecord(0);
				vo.setCurrentPage(0);
				vo.calu();
				maxLine = 1;
			}
			
			vo.setMaxLine(maxLine);
			map.addAttribute("data",vo);
		}catch(Exception e){
			LOG.error("Query graph failed",e);
			map.addAttribute("message","Please try later.!");
			return "inspect/chartdemo/error";
		}
		//error.jsp
		return "inspect/chart/alls";
	}
	
	/**
	 * On ID card number  Must fill  card_code   ID card number   Fill in the following documents Also fill in   ID Global unique identification member user  
	 * http://localhost:8080/nkyplatform//vipInspectData/charts/420222198101010001/C01/C2/1.html
	 * @param map
	 * @param cardCode
	 * @param inspectCode
	 * @return
	 */
	@RequestMapping(value = "/inspectchart/{cardCode}/{inspectCode}/{code}/{page}")
	public String inspectchart(ModelMap map,@PathVariable("cardCode") String cardCode,@PathVariable("inspectCode") String inspectCode,
			@PathVariable("code") String code,@PathVariable("page") Integer page){
		if(StringUtils.isEmpty(cardCode) || StringUtils.isEmpty(inspectCode) || StringUtils.isEmpty(code) || null == page || page < 0){
			map.addAttribute("message","Incomplete data!");
			return "inspect/chartdemo/error";
		}
		Record vipRecord = Db.findFirst("select VIP_CODE,AGE,SEX,NICK_NAME from t_vip  where card_code =?  and isvalid = 1 limit 1",cardCode);
		if(vipRecord == null){
			map.addAttribute("message","Incomplete data!");
			return "inspect/chartdemo/error";
		}
		try{
			//保留数据
			VipInspectChartVo vo = new VipInspectChartVo();
			vo.setCardCode(cardCode);
			vo.setCode(code);
			vo.setInspectCode(inspectCode); 
			
			//kpi的数据
			List<Record> desRecordList = Db.find("select DISTINCT des from inspect_kpi_config  where inspect_code  =?",inspectCode);
			List<InspectSubTitleVo> CHART_SUBTITLE_LIST = new ArrayList<InspectSubTitleVo>();//List of all the charts
			boolean matchTab = false;
			Set<String> nametemp = Sets.newHashSet();
			if(desRecordList != null){
				for(Record r : desRecordList){
					String des = r.getStr("des");
					if(StringUtils.isNotEmpty(des)){
						String desArr [] = des.split(",");
						if(desArr != null && desArr.length>0){
							for(String desTmp : desArr){
								if(StringUtils.isNotEmpty(desTmp)){
									//new String[]{"餐后血糖历史记录","毫摩尔/升","餐后血糖","mmol/L"});
									String name = CHART_UNIT_NAME_MAP.get(desTmp)[2];
									if(nametemp.contains(name)){
										continue;
									}
									if(StringUtils.isEmpty(name) && desTmp.indexOf("-")>0){
										name = CHART_UNIT_NAME_MAP.get(desTmp.split("-")[0])[2]+"-"+CHART_UNIT_NAME_MAP.get(desTmp.split("-")[1])[2];
									}
									InspectSubTitleVo sub = new InspectSubTitleVo(desTmp,name,
											CHART_UNIT_NAME_MAP.get(desTmp)[0], CHART_UNIT_NAME_MAP.get(desTmp)[3]) ; 
									CHART_SUBTITLE_LIST.add(sub);
									if(code.equals(desTmp)){
										sub.setChecked(true);
										vo.setSubTitle(sub);
										vo.setUnit(sub.getUnit());
										matchTab = true;
									}
								}
							}
						}
					}
				}
				//如果没有，就设置默认的
				if(!matchTab){
					CHART_SUBTITLE_LIST.get(0).setChecked(true);
					vo.setSubTitle(CHART_SUBTITLE_LIST.get(0));
					code =CHART_SUBTITLE_LIST.get(0).getCode();//Without，With the default first to query 
					vo.setUnit(CHART_SUBTITLE_LIST.get(0).getUnit());
					vo.setCode(code);
				}
				vo.setSubTab(CHART_SUBTITLE_LIST);
				
			}else{
				map.addAttribute("message","No chart data!");
				return "inspect/chartdemo/error";
			}
			
			
			Integer age = vipRecord.getInt("AGE");
			if(age == null){
				age = -1;
			}
			String sex = vipRecord.getStr("SEX");
			if(StringUtils.isEmpty(sex)){
				sex = "";
			}
			Map<String,String> DETAILCODE_NAME_MAP = new HashMap<String,String>();
			Map<String,String> DETAILCODE_UNIT_MAP = new HashMap<String,String>();
			//kpi的数据
			List<Record> kpiRecordList = Db.find("select CODE,NAME,UNIT,KPI_MAX,KPI_MIN from inspect_kpi_config  where des like ?","%,"+code+",%");
			StringBuilder sb = new StringBuilder("");
			Set<String> CODE_SET = new HashSet<String>();
			if(kpiRecordList != null){
				for(Record r : kpiRecordList){
					String cc = r.getStr("CODE");
					CODE_SET.add(cc);
					DETAILCODE_NAME_MAP.put(code, r.getStr("NAME"));
					DETAILCODE_UNIT_MAP.put(code, r.getStr("UNIT"));
					Record kpiRecordFz = Db.findFirst("select FZ_MAX,FZ_MIN from inspect_kpi_config_fz  where kip_code =?  and sex =? and age_min <= ? and age_max > ?"
							,cc,sex,age,age);
//					vo.setUnit(r.getStr("UNIT"));
					//如果有详细的指标配置，就按详细的年龄和性别来，如果没有，就用默认的
					if(kpiRecordFz != null && StringUtils.isNotEmpty(kpiRecordFz.getStr("FZ_MAX")) && StringUtils.isNotEmpty(kpiRecordFz.getStr("FZ_MIN"))){
						sb.append(r.getStr("NAME"));
						sb.append("normal range:");
						sb.append(kpiRecordFz.getStr("FZ_MIN"));
//						sb.append(vo.getUnit());
						sb.append("~");
						sb.append(kpiRecordFz.getStr("FZ_MAX"));
//						sb.append(vo.getUnit());
						sb.append("    ");
					}else  if(StringUtils.isNotEmpty(r.getStr("KPI_MAX")) && StringUtils.isNotEmpty(r.getStr("KPI_MIN"))){
						sb.append(r.getStr("NAME"));
						sb.append("normal range:");
						sb.append(r.getStr("KPI_MIN"));
//						sb.append(vo.getUnit());
						sb.append("~");
						sb.append(r.getStr("KPI_MAX"));
//						sb.append(vo.getUnit());
						sb.append("    ");
					}
				}
			}
			vo.setInfo(sb.toString()); //Prompt information
			String xtSql = "";

			if(inspectCode.equals("C01")){ 
				xtSql += " and SYS is not null";
			}else if(inspectCode.equals("C02")){ 
				xtSql += " and GLU0 is not null";
			}else if(inspectCode.equals("C03")){ 
				xtSql += " and BMI is not null";
			}else if(inspectCode.equals("C04")){ 
				xtSql += " and TEMP is not null";
			}else if(inspectCode.equals("C05")){ 
				xtSql += " and SPO2 is not null";
			}else if(inspectCode.equals("C06")){ 
				xtSql += " and LEU is not null";
			}
			
			if(StringUtils.isNotEmpty(xtSql)){
				if(code.equals("GLU0")){
					xtSql += " and GLU0 is not null";
				}else if(code.equals("GLU1")){
					xtSql += " and GLU1 is not null";
				}else if(code.equals("GLU2")){
					xtSql += " and GLU2 is not null";
				}
			}
			
			Record totalRecord = Db.findFirst("select count(*) as TOTAL  from vip_inspect_data where card_code = ? and inspect_code = ? " +xtSql,cardCode,inspectCode);
			Long totalData = totalRecord.getLong("TOTAL");
			int maxLine = 0;
			if(totalData != null && totalData.intValue()>0){
				vo.setTotalRecord(totalData.intValue());
				vo.setCurrentPage(page);
				vo.calu();
				//有数据
				List<Record> recordList = Db.find("select INSPECT_TIME,PR,SYS,DIA,GLU0,GLU1,GLU2 from vip_inspect_data where card_code = ?  and inspect_code = ? and INSPECT_TIME is not null " +xtSql+" order by inspect_time asc limit ?,? "
						,cardCode,inspectCode,vo.getCurrentIndex(),vo.getPageSize());
				Set<Long> INSPECT_TIME_SET = new HashSet<Long>();
				List<String> categories = new ArrayList<String>();
				List<BigDecimal> s1 = new ArrayList<BigDecimal>();//Data type needs to be changed,I rely on
				List<BigDecimal> s2 = new ArrayList<BigDecimal>();
				List<BigDecimal> s3 = new ArrayList<BigDecimal>();
				int total = 0;
				if(null != recordList && recordList.size()>0){
					for(Record tmp : recordList){
						INSPECT_TIME_SET.add(tmp.getTimestamp("INSPECT_TIME").getTime());
						total ++;
						//如果没有相同的，就可以用；如果有，就直接
						if(INSPECT_TIME_SET.size()!= total){
							total --;
							continue;
						}
						Date tt = new Date(tmp.getTimestamp("INSPECT_TIME").getTime());
						categories.add(DateUtil.dateForString(tt, "MM-dd")+"<br/>"+DateUtil.dateForString(tt, "HH:mm"));//Xaxis 
						int i = 0;
						for(String entry : CODE_SET){
							i ++;
							if(i == 1){
								vo.setSerie1Name(entry);
//								vo.setSerie1Unit(DETAILCODE_UNIT_MAP.get(entry));
								s1.add(getKeyValue(entry,tmp));//tmp.getStr("PR"));
							}else if(i == 2){
								vo.setSerie2Name(entry);
//								vo.setSerie2Unit(DETAILCODE_UNIT_MAP.get(entry));
								s2.add(getKeyValue(entry,tmp));//tmp.getStr("PR"));
							}else if(i == 3){
								vo.setSerie3Name(entry);
//								vo.setSerie3Unit(DETAILCODE_UNIT_MAP.get(entry));
								s3.add(getKeyValue(entry,tmp));//tmp.getStr("PR"));
							}
							if(maxLine<i){
								maxLine = i;
							}
						}
						
					}
					vo.setCategories(JSONObject.toJSONString(categories));
					
					if(maxLine>=1){
						vo.setSerie1Data(JSONObject.toJSONString(s1));
					}
					if(maxLine>=2){
						vo.setSerie2Data(JSONObject.toJSONString(s2));
					}
					if(maxLine>=3){
						vo.setSerie3Data(JSONObject.toJSONString(s3));
					}
					
				}
				
			}else{
				vo.setTotalRecord(0);
				vo.setCurrentPage(0);
				vo.calu();
				maxLine = 1;
			}
			
			vo.setMaxLine(maxLine);
			map.addAttribute("data",vo);
		}catch(Exception e){
			LOG.error("Query graph failed",e);
			map.addAttribute("message","Please try later.!");
			return "inspect/chartdemo/error";
		}
		//error.jsp
		return "inspect/chart/inspectchart";
	}
	
	
	/**
	 * On ID card number  Must fill  card_code   ID card number   Fill in the following documents Also fill in   ID Global unique identification member user  
	 * http://localhost:8080/nkyplatform//vipInspectData/charts/420222198101010001/C01/C2/1.html
	 * @param map
	 * @param cardCode
	 * @param inspectCode
	 * @return
	 */
	@RequestMapping(value = "/chartall/{cardCode}/{inspectCode}/{code}/{resolution}/{page}")
	public String chartall(ModelMap map,@PathVariable("cardCode") String cardCode,@PathVariable("inspectCode") String inspectCode,
			@PathVariable("code") String code,@PathVariable("resolution") String resolution,@PathVariable("page") Integer page){
		if(StringUtils.isEmpty(cardCode) || StringUtils.isEmpty(inspectCode) || StringUtils.isEmpty(code) || null == page || page < 0){
			map.addAttribute("message","Incomplete data!");
			return "inspect/chartdemo/error";
		}
		Record vipRecord = Db.findFirst("select VIP_CODE,AGE,SEX,NICK_NAME from t_vip  where card_code =?  and isvalid = 1 limit 1",cardCode);
		if(vipRecord == null){
			map.addAttribute("message","Incomplete data!");
			return "inspect/chartdemo/error";
		}
		try{
			//保留数据
			VipInspectChartVo vo = new VipInspectChartVo();
			vo.setCardCode(cardCode);
			vo.setCode(code);
			vo.setInspectCode(inspectCode); 
			
			//kpi的数据
			List<Record> desRecordList = Db.find("select DISTINCT des from inspect_kpi_config  where inspect_code  =?",inspectCode);
			List<InspectSubTitleVo> CHART_SUBTITLE_LIST = new ArrayList<InspectSubTitleVo>();//List of all the charts
			boolean matchTab = false;
			if(desRecordList != null){
				Set<String> nametemp = Sets.newHashSet();
				for(Record r : desRecordList){
					String des = r.getStr("des");
					if(StringUtils.isNotEmpty(des)){
						String desArr [] = des.split(",");
						if(desArr != null && desArr.length>0){
							for(String desTmp : desArr){
								if(StringUtils.isNotEmpty(desTmp)){
									//new String[]{"餐后血糖历史记录","毫摩尔/升","餐后血糖","mmol/L"});
									String name = CHART_UNIT_NAME_MAP.get(desTmp)[2];
									if(nametemp.contains(name)){
										continue;
									}else{
										nametemp.add(name);
									}
									if(StringUtils.isEmpty(name) && desTmp.indexOf("-")>0){
										name = CHART_UNIT_NAME_MAP.get(desTmp.split("-")[0])[2]+"-"+CHART_UNIT_NAME_MAP.get(desTmp.split("-")[1])[2];
									}
									InspectSubTitleVo sub = new InspectSubTitleVo(desTmp,name,
											CHART_UNIT_NAME_MAP.get(desTmp)[0], CHART_UNIT_NAME_MAP.get(desTmp)[3]) ; 
									CHART_SUBTITLE_LIST.add(sub);
									if(code.equals(desTmp)){
										sub.setChecked(true);
										vo.setSubTitle(sub);
										vo.setUnit(sub.getUnit());
										matchTab = true;
									}
								}
							}
						}
					}
				}
				//如果没有，就设置默认的
				if(!matchTab){
					CHART_SUBTITLE_LIST.get(0).setChecked(true);
					vo.setSubTitle(CHART_SUBTITLE_LIST.get(0));
					code =CHART_SUBTITLE_LIST.get(0).getCode();//Without，With the default first to query 
					vo.setUnit(CHART_SUBTITLE_LIST.get(0).getUnit());
					vo.setCode(code);
				}
				vo.setSubTab(CHART_SUBTITLE_LIST);
				
			}else{
				map.addAttribute("message","No chart data!");
				return "inspect/chartdemo/error";
			}
			
			
			Integer age = vipRecord.getInt("AGE");
			if(age == null){
				age = -1;
			}
			String sex = vipRecord.getStr("SEX");
			if(StringUtils.isEmpty(sex)){
				sex = "";
			}
			Map<String,String> DETAILCODE_NAME_MAP = new HashMap<String,String>();
			Map<String,String> DETAILCODE_UNIT_MAP = new HashMap<String,String>();
			//kpi的数据
			List<Record> kpiRecordList = Db.find("select CODE,NAME,UNIT,KPI_MAX,KPI_MIN from inspect_kpi_config  where des like ?","%,"+code+",%");
			StringBuilder sb = new StringBuilder("");
			Set<String> CODE_SET = new HashSet<String>();
			if(kpiRecordList != null){
				for(Record r : kpiRecordList){
					String cc = r.getStr("CODE");
					CODE_SET.add(cc);
					DETAILCODE_NAME_MAP.put(code, r.getStr("NAME"));
					DETAILCODE_UNIT_MAP.put(code, r.getStr("UNIT"));
					Record kpiRecordFz = Db.findFirst("select FZ_MAX,FZ_MIN from inspect_kpi_config_fz  where kip_code =?  and sex =? and age_min <= ? and age_max > ?"
							,cc,sex,age,age);
//					vo.setUnit(r.getStr("UNIT"));
					//如果有详细的指标配置，就按详细的年龄和性别来，如果没有，就用默认的
					if(kpiRecordFz != null && StringUtils.isNotEmpty(kpiRecordFz.getStr("FZ_MAX")) && StringUtils.isNotEmpty(kpiRecordFz.getStr("FZ_MIN"))){
						sb.append(r.getStr("NAME"));
						sb.append("normal range:");
						sb.append(kpiRecordFz.getStr("FZ_MIN"));
//						sb.append(vo.getUnit());
						sb.append("~");
						sb.append(kpiRecordFz.getStr("FZ_MAX"));
//						sb.append(vo.getUnit());
						sb.append("    ");
					}else  if(StringUtils.isNotEmpty(r.getStr("KPI_MAX")) && StringUtils.isNotEmpty(r.getStr("KPI_MIN"))){
						sb.append(r.getStr("NAME"));
						sb.append("normal range:");
						sb.append(r.getStr("KPI_MIN"));
//						sb.append(vo.getUnit());
						sb.append("~");
						sb.append(r.getStr("KPI_MAX"));
//						sb.append(vo.getUnit());
						sb.append("    ");
					}
				}
			}
			vo.setInfo(sb.toString()); //Prompt information
			String xtSql = "";
			if(inspectCode.equals("C01")){ 
				xtSql += " and SYS is not null";
			}else if(inspectCode.equals("C03")){ 
				xtSql += " and BMI is not null";
			}else if(inspectCode.equals("C04")){ 
				xtSql += " and TEMP is not null";
			}else if(inspectCode.equals("C05")){ 
				xtSql += " and SPO2 is not null";
			}else if(inspectCode.equals("C06")){ 
				xtSql += " and LEU is not null";
			}
			if(inspectCode.equals("C02")){ 
				if(code.equals("GLU0")){
					xtSql += " and GLU0 is not null";
				}else if(code.equals("GLU1")){
					xtSql += " and GLU1 is not null";
				}else if(code.equals("GLU2")){
					xtSql += " and GLU2 is not null";
				}
			}
			
			Record totalRecord = Db.findFirst("select count(*) as TOTAL  from vip_inspect_data where card_code = ? and inspect_code = ? " +xtSql,cardCode,inspectCode);
			Long totalData = totalRecord.getLong("TOTAL");
			int maxLine = 0;
			if(totalData != null && totalData.intValue()>0){
				vo.setTotalRecord(totalData.intValue());
				vo.setCurrentPage(page);
				vo.calu();
				//有数据
				List<Record> recordList = Db.find("select * from vip_inspect_data where card_code = ?  and inspect_code = ? and INSPECT_TIME is not null " +xtSql+" order by inspect_time desc limit ?,? "
						,cardCode,inspectCode,vo.getCurrentIndex(),vo.getPageSize());
				Set<Long> INSPECT_TIME_SET = new HashSet<Long>();
				List<String> categories = new ArrayList<String>();
				List<BigDecimal> s1 = new ArrayList<BigDecimal>();//Data type needs to be changed,I rely on
				List<BigDecimal> s2 = new ArrayList<BigDecimal>();
				List<BigDecimal> s3 = new ArrayList<BigDecimal>();
				int total = 0;
				if(null != recordList && recordList.size()>0){
					for(Record tmp : recordList){
						INSPECT_TIME_SET.add(tmp.getTimestamp("INSPECT_TIME").getTime());
						total ++;
						//如果没有相同的，就可以用；如果有，就直接
						if(INSPECT_TIME_SET.size()!= total){
							total --;
							continue;
						}
						Date tt = new Date(tmp.getTimestamp("INSPECT_TIME").getTime());
						categories.add(DateUtil.dateForString(tt, "MM-dd")+"<br/>"+DateUtil.dateForString(tt, "HH:mm"));//Xaxis 
						int i = 0;
						for(String entry : CODE_SET){
							i ++;
							if(i == 1){
								vo.setSerie1Name(entry);
//								vo.setSerie1Unit(DETAILCODE_UNIT_MAP.get(entry));
								s1.add(getKeyValue(entry,tmp));//tmp.getStr("PR"));
							}else if(i == 2){
								vo.setSerie2Name(entry);
//								vo.setSerie2Unit(DETAILCODE_UNIT_MAP.get(entry));
								s2.add(getKeyValue(entry,tmp));//tmp.getStr("PR"));
							}else if(i == 3){
								vo.setSerie3Name(entry);
//								vo.setSerie3Unit(DETAILCODE_UNIT_MAP.get(entry));
								s3.add(getKeyValue(entry,tmp));//tmp.getStr("PR"));
							}
							if(maxLine<i){
								maxLine = i;
							}
						}
						
					}
					vo.setCategories(JSONObject.toJSONString(categories));
					
					if(maxLine>=1){
						vo.setSerie1Data(JSONObject.toJSONString(s1));
					}
					if(maxLine>=2){
						vo.setSerie2Data(JSONObject.toJSONString(s2));
					}
					if(maxLine>=3){
						vo.setSerie3Data(JSONObject.toJSONString(s3));
					}
					
				}
				
			}else{
				vo.setTotalRecord(0);
				vo.setCurrentPage(0);
				vo.calu();
				maxLine = 1;
			}
			
			vo.setMaxLine(maxLine);
			map.addAttribute("data",vo);
		}catch(Exception e){
			LOG.error("Query graph failed",e);
			map.addAttribute("message","Please try later.!");
			return "inspect/chartdemo/error";
		}
		
		try{
			String [] wh = resolution.split("-");
			Integer width = Integer.valueOf(wh[0]);
			Integer height = Integer.valueOf(wh[1]);
			if(width == null || height == null || width <100 || height <100){
				width = 0;//map.addAttribute("cw",0);
				height = 0;//map.addAttribute("ch",0);
			}
			map.addAttribute("cw",width);
			map.addAttribute("ch",height);
		}catch(Exception e){
			map.addAttribute("cw",0);
			map.addAttribute("ch",0);
		}

		map.addAttribute("resolution",resolution);
		//error.jsp
		return "inspect/chart/chartall";
	}
	
//	private String getKeyValueBk(String key,Record rTmp){
//		return rTmp.getStr(key);
//	}
	
	/**
	 * Retain2Bit decimal.
	 * @param key
	 * @param rTmp
	 * @return
	 */
	private BigDecimal getKeyValue(String key,Record rTmp){
		return new BigDecimal(rTmp.getStr(key)).setScale(2, BigDecimal.ROUND_HALF_UP);
	}
	
	@RequestMapping(value = "/single")
	public String single(HttpServletRequest req) {
		return "inspect/chartdemo/h1";
	}
	
	@RequestMapping(value = "/two")
	public String two(HttpServletRequest req) {
		return "inspect/chartdemo/h2";
	}
	
	@RequestMapping(value = "/error")
	public String error(ModelMap map,HttpServletRequest req) {
		map.addAttribute("message","Incomplete data！");
		return "inspect/chartdemo/error";
	}

	@RequestMapping(value = "/getDatagrid/{cardCode}/{inspectCode}/{code}/{resolution}/{page}")
	public String getDatagrid(HttpServletRequest request,@PathVariable("cardCode") String cardCode,@PathVariable("inspectCode") String inspectCode,
			@PathVariable("code") String code,@PathVariable("resolution") String resolution,@PathVariable("page") Integer page) 
		{
			if(inspectCode.toLowerCase().equals("c06")){
				//查询总检测条数
				Record totalRecord = Db.findFirst("select count(*) as TOTAL  from vip_inspect_data where card_code = ? and inspect_code = ? " ,cardCode,inspectCode);
				Long totalData = totalRecord.getLong("TOTAL");
				request.setAttribute("total", totalData);
				if(request.getParameter("type") != null && "wx".equals(request.getParameter("type"))){
					return "inspect/data/gridc06wx";
				}
				return "inspect/data/gridc06";
			}else{
				return "inspect/data/grid";
			}
		}
	
	@RequestMapping(value = "/getDatac06")
	@ResponseBody
	public String getDatac06(HttpServletRequest request) {
		String cardCode = request.getParameter("cardCode");
		String inspectCode = "C06";
		String page = request.getParameter("page");
		Map<String,Object> map = Maps.newHashMap();
		map.put("flag","false");
		List<Map<String,Object>> li = Lists.newArrayList();
		try {
			String sql = "select code,name,inspect_code,kpi_max,kpi_min from inspect_kpi_config where inspect_code=?";
			List<Record> list = Db.find(sql,inspectCode);
			Record record = Db.findFirst("select * from vip_inspect_data where card_code = ?  and inspect_code = ? and INSPECT_TIME is not null  order by inspect_time desc limit ?,? "
					,cardCode,inspectCode,Integer.parseInt(page)-1,1);	
			if(record != null){
				map.put("inspect_time", DateUtil.dateForStr(new Date(record.getTimestamp("inspect_time").getTime()), "yyyy-MM-dd HH:mm:ss"));
				for (Record r: list) {
					Map<String,Object> m = Maps.newHashMap();
					m.put("code", r.get("code"));
					m.put("name", r.get("name"));
					m.put("value", record.get(r.get("code")+""));
					String kpi_min = r.get("kpi_min")==null?"": r.get("kpi_min")+"";
					String  kpi_max = r.get("kpi_max")==null?"": r.get("kpi_max")+"";
					if(StringUtils.isEmpty(kpi_min) || StringUtils.isEmpty(kpi_max)){
						m.put("kpi", kpi_min+kpi_max);
					}else{
						m.put("kpi", kpi_min+"~"+kpi_max);
					}
					try {
						m.put("status", 0);
						if(!StringUtils.isEmpty(m.get("value")+"") && !StringUtils.isEmpty(kpi_min) ){
							if(Double.parseDouble(m.get("value")+"") < Double.parseDouble(kpi_min)){
								m.put("status", -1);
							}
						}
						if (!StringUtils.isEmpty(m.get("value")+"") && !StringUtils.isEmpty(kpi_max) ){
							if(Double.parseDouble(m.get("value")+"") > Double.parseDouble(kpi_max)){
								m.put("status", 1);
							}
						}
					} catch (Exception e) {
						// TODO: handle exception
					}
					li.add(m);
				}
				map.put("flag","true");
				map.put("list", li);
			}	
		} catch (Exception e) {
			e.printStackTrace();
		}
		return JSON.toJSONString(map);
	}
	
	@RequestMapping(value = "/getData")
	@ResponseBody
	public String getData(HttpServletRequest request) {
		String cardCode = request.getParameter("cardCode");
		String inspectCode = request.getParameter("inspectCode");
		String code = request.getParameter("code");
		String page = request.getParameter("page");
		Map<String,Object> map = Maps.newHashMap();
		Record totalRecord = Db.findFirst("select count(*) as TOTAL  from vip_inspect_data where card_code = ? and inspect_code = ? " ,cardCode,inspectCode);
		Long totalData = totalRecord.getLong("TOTAL");
		int maxLine = 0;
		if(totalData != null && totalData.intValue()>0){
			map.put("total",totalData.intValue());
			//有数据
			int pagesize = 10;
			int start = 0;
			if(StringUtils.isEmpty(page) || "0".equals(page)){
				start = 0;
			}else{
				start = (Integer.parseInt(page)-1)*10;
			}
			String sql = "select code,name,inspect_code from inspect_kpi_config where inspect_code=?";
			List<Record> list = Db.find(sql,inspectCode);
			List<Record> recordList = Db.find("select * from vip_inspect_data where card_code = ?  and inspect_code = ? and INSPECT_TIME is not null  order by inspect_time asc limit ?,? "
					,cardCode,inspectCode,start,pagesize);			
				map.put("rows", recordList);
			}else{
				map.put("total",0);
				map.put("rows", Lists.newArrayList());
			}		
		return JSON.toJSONString(map);
	}

}