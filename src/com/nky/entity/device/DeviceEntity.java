package com.nky.entity.device;

import java.util.Date;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;


/**
ALTER TABLE `device` ADD UNIQUE INDEX `UQ_DEVICE_SN` (`sn`) USING BTREE ;

CREATE TABLE `device_doctor` ( 
  `deviceid` bigint(20) NOT NULL COMMENT 'equipmentID',
  `doctorid` bigint(20) NOT NULL COMMENT 'DoctorID', 
  `create_time` datetime DEFAULT NULL COMMENT 'Created time', 
  PRIMARY KEY (`deviceid`,`doctorid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Device associated doctor';


 * @author Ken
 * @version 2016year11month18day
 */
@TableBind(name = "device")
public class DeviceEntity extends JFinalEntity {

	private String device_id;// 'equipmentID',

	private String device_type;//`Equipment type',

	private String sn;//'SN',

	private Date product_time;// 'Generation time',

	private Date deliver_time;// 'Delivery time',

	private Date create_time;// 'Created time',

	private String remark;

	public String getDevice_id() {
		return device_id;
	}

	public void setDevice_id(String device_id) {
		this.device_id = device_id;
	}

	public String getDevice_type() {
		return device_type;
	}

	public void setDevice_type(String device_type) {
		this.device_type = device_type;
	}

	public String getSn() {
		return sn;
	}

	public void setSn(String sn) {
		this.sn = sn;
	}

	public Date getProduct_time() {
		return product_time;
	}

	public void setProduct_time(Date product_time) {
		this.product_time = product_time;
	}

	public Date getDeliver_time() {
		return deliver_time;
	}

	public void setDeliver_time(Date deliver_time) {
		this.deliver_time = deliver_time;
	}

	public Date getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}