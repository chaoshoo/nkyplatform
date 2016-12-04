package com.sys.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.collect.Lists;

public class FileUtil {
	private static final Logger LOG = LoggerFactory.getLogger(FileUtil.class);
	protected static char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e',
			'f' };
	protected static MessageDigest messagedigest = null;

	static {
		try {
			messagedigest = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			LOG.info("File initialization failed...");
		}
	}

	// 通过文件路径得到文件
	public static File getFileByUrl(String url) {
		return new File(url);
	}

	@SuppressWarnings("resource")
	public static String getFileMD5String(String url) {
		try {
			File file = getFileByUrl(url);
			FileInputStream in = new FileInputStream(file);
			FileChannel ch = in.getChannel();
			MappedByteBuffer byteBuffer = ch.map(FileChannel.MapMode.READ_ONLY, 0, file.length());
			messagedigest.update(byteBuffer);
			return bufferToHex(messagedigest.digest());
		} catch (Exception e) {
			e.printStackTrace();
			LOG.info("Get fileMD5fail......");
			return null;
		}
	}

	public static String getMD5String(byte[] bytes) {
		messagedigest.update(bytes);
		return bufferToHex(messagedigest.digest());
	}

	private static String bufferToHex(byte bytes[]) {
		return bufferToHex(bytes, 0, bytes.length);
	}

	private static String bufferToHex(byte bytes[], int m, int n) {
		StringBuffer stringbuffer = new StringBuffer(2 * n);
		int k = m + n;
		for (int l = m; l < k; l++) {
			appendHexPair(bytes[l], stringbuffer);
		}
		return stringbuffer.toString();
	}

	private static void appendHexPair(byte bt, StringBuffer stringbuffer) {
		char c0 = hexDigits[(bt & 0xf0) >> 4];
		char c1 = hexDigits[bt & 0xf];
		stringbuffer.append(c0);
		stringbuffer.append(c1);
	}

	public static boolean checkPassword(String password, String md5PwdStr) {
		String s = getMD5String(password);
		return s.equals(md5PwdStr);
	}

	// 得到文件的MD5值
	public static String getMD5String(String s) {
		return getMD5String(s.getBytes());
	}

	// 得到文件大小
	public static long getFileSizes(String url) {
		long s = -1;
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(getFileByUrl(url));
			s = fis.available();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
			LOG.info("The program did not find this file... ... ");
		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return s;
	}

	public static List<File> getXmlFile(String path) {
		List<File> list = Lists.newArrayList();
		if(FileUtil.class.getClassLoader().getResource(path)==null){
			return Lists.newArrayList();
		}
		String paths = FileUtil.class.getClassLoader().getResource(path).getPath(); 
		File file = new File(paths);
		if(file.isDirectory()){
			for (File f : file.listFiles()) {
				if(f.getName().endsWith(".xml")){
					list.add(f);
				}
			}
		}else{
			if(file.getName().endsWith(".xml")){
				list.add(file);
			}
		}
		return list;
	}

	public static void main(String[] args) throws IOException {
//		long begin = System.currentTimeMillis();
//		String md5 = getFileMD5String("E:\\youku_38.apk");
//
//		long end = System.currentTimeMillis();
//		System.out.println("md5:" + md5);
//		System.out.println("time:" + ((end - begin) / 1000) + "s");
//		System.out.println("文件大小：" + getFileSizes("E:\\youku_38.apk"));
		List<File> list = getXmlFile("mapper");
		for (int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).getName());
		}
	}

}