package com.nky.action.picupload;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import com.sys.util.ServiceConstants;

public class FileUploadUtil {

	
	private static Logger logger = LoggerFactory.getLogger(FileUploadUtil.class);
	
	public static String uploadDir = "";
	
	//图片上传目录
	private static String picPath = "image";
	
	private static String docPath = "doc";
	//富文本编辑器上传目录
	//private static String editorPath = "editor";
	
	/**
	 * 图片上传，最大为5M
	 * 
	 * @param picture
	 * @return	上传后服务器生成的图片名称，如果为null则出错
	 * @throws Exception 
	 */
	public static String uploadPicture(Picture picture) throws Exception  {
		
		if(picture == null || picture.getBase64() == null || picture.getSize() == null){
			return null;
		}
		
		if(picture.getSize() > 5242880){//5M
			logger.error("图片大小超出限制：最大值{}，实际值{}",5242880,picture.getSize());
			return null;
		}
		
		
		String uuid = UUID.randomUUID().toString().replaceAll("-", "");
		String prefix = new SimpleDateFormat("yyyyMMdd").format(new Date());
		String destFilename=uuid+".jpg";
		
		// 生成文件路径
		StringBuffer fileDirPath = new StringBuffer();
		fileDirPath.append(File.separator).append(picPath).append(File.separator).append(prefix.substring(0, 6))
			.append(File.separator).append(prefix.substring(6, 8)).append(File.separator);
		
		//检查目录
		checkPath(fileDirPath.toString());
		
		String sBase64 = picture.getBase64().substring(picture.getBase64().indexOf(",") + 1);
		
		//图片数据Bse64解码
		byte[] data = Base64.decodeBase64(sBase64);
		
		
		String imgFilePath = fileDirPath + destFilename;
		
		try {
			FileUtils.writeByteArrayToFile(new File(uploadDir+imgFilePath),data);//写图片数据到文件
		} catch (IOException e) {
			throw new Exception("保存图片出错",e);
		}
		
		return imgFilePath;
	}
	
	
	/**
	 * 文件上传
	 * @param fileData
	 * @return
	 * @throws Exception 
	 */
	public static String uploadFile(MultipartFile fileData,String floder) throws Exception{
		if(fileData == null || fileData.isEmpty()){
			return null; 
		}
		
		//获得扩展名 如.jpg  .doc
//		String suffix = fileData.getOriginalFilename().substring(fileData.getOriginalFilename().lastIndexOf("."));		
//		String uuid = UUID.randomUUID().toString().replaceAll("-", "");
		String filename = fileData.getOriginalFilename().replaceAll(" ", "");
		String prefix = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		String destFilename=prefix+"_"+filename;
		
		// 生成文件路径
		StringBuffer fileDirPath = new StringBuffer();
		fileDirPath.append(uploadDir).append(File.separator).append(docPath).append(File.separator);
		if(StringUtils.isNotEmpty(floder)){
			fileDirPath.append(floder).append(File.separator);
		}
		fileDirPath.append(prefix.substring(0, 6))
			.append(File.separator).append(prefix.substring(6, 8)).append(File.separator);
		
		//检查目录
		checkPath(fileDirPath.toString());
		
		String imgFilePath = fileDirPath + destFilename;		
		
		try {
			fileData.transferTo(new File(imgFilePath));//将图片移动到指定目录下
		} catch (IOException e) {
			throw new Exception("文件转存出错",e);
		}
		
		return destFilename;
	}

//===================================================================================
	
	/**
	 * 检查目录是否存在，如果不存在则创建
	 * 
	 * @param savePath
	 * @throws Exception 
	 */
	private static void checkPath(String savePath) throws Exception{
		File uploadDir = new File(savePath);
		if (!uploadDir.isDirectory()) {
			uploadDir.mkdirs();
		}

		// 检查目录写权限
//		if (!uploadDir.canWrite()) {
//			throw new Exception("文件上传目录【"+savePath+"】没有写权限");
//		}
	}


}
