package com.nky.action.picupload;

public class FileUpload {

	private boolean success; //上传是否成功    true  表示成功
	private String msg;//上传失败原因
	private String fileUrl;//上传文件存储路径,多个文件用逗号分隔
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getFileUrl() {
		return fileUrl;
	}
	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}
	

}
