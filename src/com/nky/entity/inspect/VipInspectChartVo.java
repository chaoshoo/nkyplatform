package com.nky.entity.inspect;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 图表数据.
 * @author Ken
 * @version 2016年8月24日
 */
public class VipInspectChartVo {

	private String cardCode;

	private String inspectCode;

	private String inspectName;

	private Integer currentPage;

	@JsonIgnore
	private Integer currentIndex;

	private Integer nextPage;

	private Integer frontPage;

	@JsonIgnore
	private Integer totalPage;

	@JsonIgnore
	private Integer totalRecord;

	@JsonIgnore
	private Integer pageSize = 7;//一页10条记录吧

	//	private Set<VipInspectData> datas = new HashSet<VipInspectData>();

	private String categories = "[]";//new ArrayList<String>(); JSONObject.toJSONString(str)

	private String code;

	private String title = "";

	private InspectSubTitleVo subTitle;

	private List<InspectSubTitleVo> subTab = new ArrayList<InspectSubTitleVo>();

	//目前已知可能最多的就是3个图表.
	private String serie1Name = "";
	private String serie1Unit = "";
	private String serie1Data = "[]";//new ArrayList<String>();

	private String serie2Name;
	private String serie2Unit;
	private String serie2Data = "[]";//new ArrayList<String>();

	private String serie3Name;
	private String serie3Unit;
	private String serie3Data = "[]";// new ArrayList<String>();

	private String info;

	private String unit;

	private String detailCode;

	private String detailName;

	private int maxLine = 1;

	/**
	 * 计算各种上一页，下一页页面，及索引.
	 */
	public void calu() {
		//totalPage计算出来 0 为没有
		this.totalPage = this.totalRecord / this.pageSize + (this.totalRecord % this.pageSize > 0 ? 1 : 0);
		//校准currentPage 0 开始
		if (this.totalPage < this.currentPage) {
			this.currentPage = this.totalPage;
		}
		this.currentIndex = this.currentPage * this.pageSize;
		this.frontPage = this.currentPage - 1;
		if (this.frontPage < 0) {
			this.frontPage = 0;
		}
		this.nextPage = this.currentPage + 1;
		if (this.nextPage > (this.totalPage - 1)) {
			this.nextPage = (this.totalPage - 1);
		}
		if (this.nextPage < 0) {
			this.nextPage = 0;
		}
	}

	public Integer getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(Integer currentPage) {
		this.currentPage = currentPage;
	}

	public Integer getNextPage() {
		return nextPage;
	}

	public void setNextPage(Integer nextPage) {
		this.nextPage = nextPage;
	}

	public Integer getFrontPage() {
		return frontPage;
	}

	public void setFrontPage(Integer frontPage) {
		this.frontPage = frontPage;
	}

	public Integer getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(Integer totalPage) {
		this.totalPage = totalPage;
	}

	public Integer getTotalRecord() {
		return totalRecord;
	}

	public void setTotalRecord(Integer totalRecord) {
		this.totalRecord = totalRecord;
	}

	//	public Set<VipInspectData> getDatas() {
	//		return datas;
	//	}
	//
	//	public void setDatas(Set<VipInspectData> datas) {
	//		this.datas = datas;
	//	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getCurrentIndex() {
		return currentIndex;
	}

	public void setCurrentIndex(Integer currentIndex) {
		this.currentIndex = currentIndex;
	}

	public String getCardCode() {
		return cardCode;
	}

	public void setCardCode(String cardCode) {
		this.cardCode = cardCode;
	}

	public String getInspectCode() {
		return inspectCode;
	}

	public void setInspectCode(String inspectCode) {
		this.inspectCode = inspectCode;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getDetailCode() {
		return detailCode;
	}

	public void setDetailCode(String detailCode) {
		this.detailCode = detailCode;
	}

	public String getDetailName() {
		return detailName;
	}

	public void setDetailName(String detailName) {
		this.detailName = detailName;
	}

	public String getSerie1Name() {
		return serie1Name;
	}

	public void setSerie1Name(String serie1Name) {
		this.serie1Name = serie1Name;
	}

	public String getSerie2Name() {
		return serie2Name;
	}

	public void setSerie2Name(String serie2Name) {
		this.serie2Name = serie2Name;
	}

	public String getSerie3Name() {
		return serie3Name;
	}

	public void setSerie3Name(String serie3Name) {
		this.serie3Name = serie3Name;
	}

	public String getInspectName() {
		return inspectName;
	}

	public void setInspectName(String inspectName) {
		this.inspectName = inspectName;
	}

	public int getMaxLine() {
		return maxLine;
	}

	public void setMaxLine(int maxLine) {
		this.maxLine = maxLine;
	}

	public String getSerie1Unit() {
		return serie1Unit;
	}

	public void setSerie1Unit(String serie1Unit) {
		this.serie1Unit = serie1Unit;
	}

	public String getSerie2Unit() {
		return serie2Unit;
	}

	public void setSerie2Unit(String serie2Unit) {
		this.serie2Unit = serie2Unit;
	}

	public String getSerie3Unit() {
		return serie3Unit;
	}

	public void setSerie3Unit(String serie3Unit) {
		this.serie3Unit = serie3Unit;
	}

	public String getCategories() {
		return categories;
	}

	public void setCategories(String categories) {
		this.categories = categories;
	}

	public String getSerie1Data() {
		return serie1Data;
	}

	public void setSerie1Data(String serie1Data) {
		this.serie1Data = serie1Data;
	}

	public String getSerie2Data() {
		return serie2Data;
	}

	public void setSerie2Data(String serie2Data) {
		this.serie2Data = serie2Data;
	}

	public String getSerie3Data() {
		return serie3Data;
	}

	public void setSerie3Data(String serie3Data) {
		this.serie3Data = serie3Data;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public List<InspectSubTitleVo> getSubTab() {
		return subTab;
	}

	public void setSubTab(List<InspectSubTitleVo> subTab) {
		this.subTab = subTab;
	}

	public InspectSubTitleVo getSubTitle() {
		return subTitle;
	}

	public void setSubTitle(InspectSubTitleVo subTitle) {
		this.subTitle = subTitle;
	}

	@Override
	public String toString() {
		return ReflectionToStringBuilder.toString(this);
	}

}
