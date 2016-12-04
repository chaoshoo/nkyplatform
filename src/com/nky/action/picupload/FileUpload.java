package com.nky.action.picupload;

public class FileUpload {

	private boolean success; //Upload success    true  Express success
	private String msg;//Upload failed reason
	private String fileUrl;//Upload file storage path,Multiple files are separated by a comma
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