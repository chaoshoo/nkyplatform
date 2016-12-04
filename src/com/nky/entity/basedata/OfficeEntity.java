package com.nky.entity.basedata;

import java.util.Date;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;
import com.sys.util.Reflections;

/**
 * office Department table.
 * @author Ken
 * @version 2016year8month24day
 */
@TableBind(name = "office")
//@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
public class OfficeEntity extends JFinalEntity {

	private static final long serialVersionUID = -7789104309874798390L;
//	private Integer id;
	private String code;
	private String name;
	private String pic;
	private String des;
	private String description;
	private Date create_time;//	Created time 

//	public Integer getId() {
//		return id;
//	}
//
//	public void setId(Integer id) {
//		this.id = id;
//	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPic() {
		return pic;
	}

	public void setPic(String pic) {
		this.pic = pic;
	}

	public String getDes() {
		return des;
	}

	public void setDes(String des) {
		this.des = des;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public String tableName() throws Exception {
		return Reflections.getAnnotationTableBind(getClass());
	}
}