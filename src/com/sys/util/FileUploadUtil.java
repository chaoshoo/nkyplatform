package com.sys.util;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/** 
 * 
 */
public class FileUploadUtil {

	protected static final Logger logger = LoggerFactory.getLogger(FileUploadUtil.class);
	/** ~~~ 上传文件的最大文件大小 */
	private static final long MAX_FILE_SIZE = 1024 * 1024 * 200;
	/** ~~~ 系统默认建立和使用的以时间字符串作为文件名称的时间格式*/
	private static final String DEFAULT_SUB_FOLDER_FORMAT_AUTO = "yyyyMMdd";

	/**
	 * 
	 * @param request
	 * @param response
	 * @param flag
	 */
	public static void upload(HttpServletRequest request, HttpServletResponse response) {
		System.err.println("***********************************");

		// 判断提交的请求是否包含文件  
		boolean isMultipart = ServletFileUpload.isMultipartContent(request);

		if (!isMultipart) {
			return;
		}

		// 获取目录  
		File floder = buildFolder(request);
		if (null == floder) {
			return;
		}

		try {
			response.setContentType("text/html; charset=UTF-8");
			response.setHeader("Cache-Control", "no-cache");
			PrintWriter out = response.getWriter();
			// 上传文件的返回地址  
			String fileUrl = "";

			FileItemFactory factory = new DiskFileItemFactory();

			ServletFileUpload servletFileUpload = new ServletFileUpload(factory);
			servletFileUpload.setFileSizeMax(MAX_FILE_SIZE);

			@SuppressWarnings("unchecked")
			List<FileItem> fileitem = servletFileUpload.parseRequest(request);

			if (null == fileitem || 0 == fileitem.size()) {
				return;
			}

			for (FileItem file : fileitem) {

				if (file.isFormField()) {
					logger.error("上传文件非法！isFormField=true");
					continue;
				}
				String name = request.getParameter("name");
				System.out.println("name---->" + name);

				String fileClientName = getFileName(file.getName());
				String fileFix = StringUtils.substring(fileClientName, fileClientName.lastIndexOf(".") + 1);
				if (ServiceConstants.upload_type.indexOf(fileFix) < 0) {
					logger.error("上传文件的格式错误=" + fileFix);
					continue;
				}

				if (logger.isInfoEnabled()) {
					logger.info("开始上传文件:" + file.getName());
				}

				File newfile = new File(floder, name + "." + fileFix);
				file.write(newfile);

				if (logger.isInfoEnabled()) {
					logger.info("上传文件结束，新名称:" + fileClientName + ".floder:" + newfile.getPath());
				}

				fileUrl = floder.getName() + "/" + newfile.getName();

				fileUrl = ServiceConstants.www + "/" + fileUrl;
				System.out.println("---->" + fileUrl);

			}

			out.flush();
			out.close();

		} catch (IOException e) {
			logger.error("上传文件发生异常！", e);
		} catch (FileUploadException e) {
			logger.error("上传文件发生异常！", e);
		} catch (Exception e) {
			logger.error("上传文件发生异常！", e);
		}

		return;
	}

	/** 
	 * 获取文件名称 
	 * @param str 
	 * @return 
	 */
	private static String getFileName(String str) {
		int index = str.lastIndexOf("//");
		if (-1 != index) {
			return str.substring(index);
		} else {
			return str;
		}
	}

	/** 
	 * 创建目录 
	 *  
	 * @return 
	 */
	public static File buildFolder(HttpServletRequest request) {

		String realPath = request.getRealPath("/");

		File floder = new File(realPath);
		if (!floder.exists()) {
			if (!floder.mkdirs()) {
				logger.error("创建文件夹出错！path=" + realPath);
				return null;
			}

		}
		return floder;

	}

	/** 
	 * 根据当前的时间建立文件夹，时间格式yyyyMMdd 
	 *  
	 * @param path 
	 * @return 
	 */
	private static File buildFileBySysTime(String path) {
		DateFormat df = new SimpleDateFormat(DEFAULT_SUB_FOLDER_FORMAT_AUTO);
		String fileName = df.format(new Date());
		File file = new File(path + File.separator + fileName);
		if (!file.mkdir()) {
			return null;
		}
		return file;
	}

}
