package com.nky.entity.basedata;

import java.sql.Timestamp;
import java.util.Date;

import org.apache.commons.lang.StringUtils;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;
import com.sys.util.DateUtil;
import com.sys.util.Reflections;

/**
 * 客户慢病管理
 * @author Ken
 * @version 2016年10月11日 下午11:09:02
 */
@TableBind(name = "t_vip_chronic")
public class VipMbEntity extends JFinalEntity {

	private static final long serialVersionUID = 1L;
	private Integer ischronic;
	private Long vip_id;
	private String yb_type;
	private String ill_name;
	private String chronic_type;
	private String ill_type;
	private Date inspect_time;
	private String inspect_timeStr;
	private String ill_med;

	public VipMbEntity() {
		super();
	}

	public Long getVip_id() {
		return vip_id;
	}

	public void setVip_id(Long vip_id) {
		this.vip_id = vip_id;
	}

	public String getYb_type() {
		return yb_type;
	}

	public void setYb_type(String yb_type) {
		this.yb_type = yb_type;
	}

	public String getChronic_type() {
		return chronic_type;
	}

	public void setChronic_type(String chronic_type) {
		this.chronic_type = chronic_type;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getIll_name() {
		return ill_name;
	}

	public void setIll_name(String ill_name) {
		this.ill_name = ill_name;
	}

	public String getIll_type() {
		return ill_type;
	}

	public void setIll_type(String ill_type) {
		this.ill_type = ill_type;
	}

	public String getIll_med() {
		return ill_med;
	}

	public void setIll_med(String ill_med) {
		this.ill_med = ill_med;
	}

	public Integer getIschronic() {
		return ischronic;
	}

	public void setIschronic(Integer ischronic) {
		this.ischronic = ischronic;
	}

	public Date getInspect_time() {
		if(this.inspect_time == null && StringUtils.isNotEmpty(this.inspect_timeStr)){
			this.inspect_time = DateUtil.getDateFromStr2(this.inspect_timeStr);
		}
		return inspect_time;
	}

	public void setInspect_time(Date inspect_time) {
		this.inspect_time = inspect_time;
	}

	public String getInspect_timeStr() {
		if(null != this.inspect_time && StringUtils.isEmpty(inspect_timeStr)){
			this.inspect_timeStr = DateUtil.dateForString(this.inspect_time, "yyyy-MM-dd");
		}
		return inspect_timeStr;
	}

	public void setInspect_timeStr(String inspect_timeStr) {
		this.inspect_timeStr = inspect_timeStr;
		this.inspect_time = DateUtil.getDateFromStr2(inspect_timeStr);
	}

	public String tableName() throws Exception {
		return Reflections.getAnnotationTableBind(getClass());
	}
}
