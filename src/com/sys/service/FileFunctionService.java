/**
 * 
 */
package com.sys.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

import org.springframework.stereotype.Service;


/**
 * @ClassName: FileFunctionService
 * @version Created time：2015year3month18day morning10:43:21
 *
 */
@Service
public class FileFunctionService {
	

	/**
	 * Write file stream
	 * @param inputStream
	 * @param fileDir 
	 * @param fileName
	 * @throws IOException
	 */
	public void writeFile(InputStream inputStream, String fileDir, String fileName) throws IOException {
		File isfiledir=new File(fileDir);
		if  (!isfiledir.exists()  && !isfiledir.isDirectory())      
		{       
		    System.out.println("//不存在");  
		    isfiledir.mkdir();    
		} else   
		{  
		    System.out.println("//目录存在");  
		}  
		String filePath = fileDir +System.getProperty("file.separator") + fileName;
		FileOutputStream outputStream = null;
		byte[] bs = new byte[1024];
		try{
			outputStream = new FileOutputStream(filePath);
			int len = bs.length;
			while ((len = inputStream.read(bs)) != -1) {
				outputStream.write(bs, 0, len);
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			if(inputStream != null){
				inputStream.close();
			}
			if(outputStream != null){
				outputStream.close();
			}
		}
	}

 
    
}