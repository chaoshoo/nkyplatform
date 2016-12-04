package com.nky.action.picupload;

import java.io.File;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.sys.util.ServiceConstants;

/**   
 * @Description File upload controller
 * @author shiwc   
 * @date 2016year3month9day Afternoon22:24:32
 */

@Controller
public class FileUploadAction {
	static Logger LOG = LoggerFactory.getLogger(FileUploadAction.class);
	/**
	 * Picture upload
	 * 
	 * @param picture  picturebase64data
	 * @return
	 */
	@RequestMapping(value = {"/sys/file/webuploader","/pub/file/webuploader"}, method = {RequestMethod.POST, RequestMethod.GET}, headers = {"content-type=application/json"})
	@ResponseBody
	public String webuploader(HttpServletRequest request,@RequestBody Picture picture) {
		try {
			File floder = com.sys.util.FileUploadUtil.buildFolder(request);
			FileUploadUtil.uploadDir = floder.getAbsolutePath();
			String picpath = FileUploadUtil.uploadPicture(picture);
			picpath = picpath.replace("\\", "/");
			return ServiceConstants.www + "/" + floder.getName() + picpath;
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
			return "";
		}
	}
	
	@RequestMapping(value = {"/sys/file/fileuploader","/pub/file/fileuploader"}, method = {RequestMethod.POST, RequestMethod.GET})
	@ResponseBody
	public FileUpload upload(HttpServletRequest request, String folder) {
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();
		FileUpload upload = new FileUpload();
		try {
			StringBuffer filename = new StringBuffer();
			for (Map.Entry<String, MultipartFile> entity : fileMap.entrySet()) {
				filename.append(",").append(FileUploadUtil.uploadFile(entity.getValue(), folder));
			}
			if(filename.length() < 1){
				upload.setSuccess(false);
				upload.setMsg("Upload failed，File is empty");
			}else{
				upload.setSuccess(true);
				upload.setFileUrl(filename.substring(1));
			}
		} catch (Exception e) {
			upload.setSuccess(false);
			upload.setMsg(e.getMessage());
			LOG.error(e.getMessage(),e);
		}
		
		return upload;
	}
	
	@RequestMapping(value = "/sys/lookpic/show")
	public String show(HttpServletRequest request) {
		String prefix = "";
//		File floder = com.lezu.util.FileUploadUtil.buildFolder(request);
//		if(floder != null){
//			prefix = floder.getName();
//		}
		String picpath = request.getParameter("picpath");
		request.setAttribute("picpath", prefix+picpath);
		return "fileupload/picshow";
	}

}