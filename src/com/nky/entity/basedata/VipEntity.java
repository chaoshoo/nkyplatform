package com.nky.entity.basedata;

import java.util.Date;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;
import com.sys.util.Reflections;

/**
 * 客户实体.
 * @author Ken
 * @version 2016年8月26日 下午9:47:58
 */
@TableBind(name = "t_vip")
public class VipEntity extends JFinalEntity {

	private static final long serialVersionUID = 1L;
	private String vip_code;
	private String card_code;
	private String login_account;
	private String mobile;
	private String login_password;
	private String heard_img_url;
	private Integer isvalid;
	private String papers_type;
	private String papers_num;
	private String nick_name;
	private String real_name;
	private String account_mail;
	private String weight;
	private String height;
	private String sex;
	private String area;
	private String address;
	private String birthday;
	private Integer age;
	private String post_code;
	private String phone;
	private String ill_history;
	private String gm;
	private String qq;
	private String wxopenid;
	private String android_tv_token_id;
	private String android_tv_channel_id;
	private Date modify_time;
	private Date create_time;

	public VipEntity() {

	}

	public String getVip_code() {
		return vip_code;
	}

	public void setVip_code(String vip_code) {
		this.vip_code = vip_code;
	}

	public String getCard_code() {
		return card_code;
	}

	public void setCard_code(String card_code) {
		this.card_code = card_code;
	}

	public String getLogin_account() {
		return login_account;
	}

	public void setLogin_account(String login_account) {
		this.login_account = login_account;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getLogin_password() {
		return login_password;
	}

	public void setLogin_password(String login_password) {
		this.login_password = login_password;
	}

	public String getHeard_img_url() {
		return heard_img_url;
	}

	public void setHeard_img_url(String heard_img_url) {
		this.heard_img_url = heard_img_url;
	}

	public Integer getIsvalid() {
		return isvalid;
	}

	public void setIsvalid(Integer isvalid) {
		this.isvalid = isvalid;
	}

	public String getPapers_type() {
		return papers_type;
	}

	public void setPapers_type(String papers_type) {
		this.papers_type = papers_type;
	}

	public String getPapers_num() {
		return papers_num;
	}

	public void setPapers_num(String papers_num) {
		this.papers_num = papers_num;
	}

	public String getNick_name() {
		return nick_name;
	}

	public void setNick_name(String nick_name) {
		this.nick_name = nick_name;
	}

	public String getReal_name() {
		return real_name;
	}

	public void setReal_name(String real_name) {
		this.real_name = real_name;
	}

	public String getAccount_mail() {
		return account_mail;
	}

	public void setAccount_mail(String account_mail) {
		this.account_mail = account_mail;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getPost_code() {
		return post_code;
	}

	public void setPost_code(String post_code) {
		this.post_code = post_code;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getIll_history() {
		return ill_history;
	}

	public void setIll_history(String ill_history) {
		this.ill_history = ill_history;
	}

	public String getGm() {
		return gm;
	}

	public void setGm(String gm) {
		this.gm = gm;
	}

	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public String getWxopenid() {
		return wxopenid;
	}

	public void setWxopenid(String wxopenid) {
		this.wxopenid = wxopenid;
	}

	public String getAndroid_tv_token_id() {
		return android_tv_token_id;
	}

	public void setAndroid_tv_token_id(String android_tv_token_id) {
		this.android_tv_token_id = android_tv_token_id;
	}

	public String getAndroid_tv_channel_id() {
		return android_tv_channel_id;
	}

	public void setAndroid_tv_channel_id(String android_tv_channel_id) {
		this.android_tv_channel_id = android_tv_channel_id;
	}

	public Date getModify_time() {
		return modify_time;
	}

	public void setModify_time(Date modify_time) {
		this.modify_time = modify_time;
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