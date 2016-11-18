package com.nky.vo;

/**
 * 医生的群组的Vo.
 * @author Ken
 * @version 2016年9月9日
 */
public class DocGroupVo {

	private Long id;
	private String name;
	private boolean group = false;

	public DocGroupVo() {

	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return this.id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isGroup() {
		return group;
	}

	public void setGroup(boolean group) {
		this.group = group;
	}

}
