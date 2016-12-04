package com.sys.entity.sys;

/**
 * Helpsdk
 * @author hiveview
 *
 */
public class HelpDoc {
	public int id;
	public String sdkTitle;
	public String uploadTime;
	public String downloadUrl;
	public String remark;
	public int status;  //0normal  -1Frozen
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSdkTitle() {
		return sdkTitle;
	}
	public void setSdkTitle(String sdkTitle) {
		this.sdkTitle = sdkTitle;
	}
	public String getUploadTime() {
		return uploadTime;
	}
	public void setUploadTime(String uploadTime) {
		this.uploadTime = uploadTime;
	}
	public String getDownloadUrl() {
		return downloadUrl;
	}
	public void setDownloadUrl(String downloadUrl) {
		this.downloadUrl = downloadUrl;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
}