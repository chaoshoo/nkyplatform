package com.nky.action.basedata;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;

import com.garea.common.util.ecg.IExporter;
import com.garea.common.util.ecg.ImageExporter;

public class App {
	public static void main(String[] args) {
		byte[] data = null;
		try {
			FileInputStream fis = new FileInputStream("data.txt");
			data = new byte[fis.available()];
			fis.read(data);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		if (data != null) {
			testRawImage(new String(data));
			//testImagePath(new String(data));
		} else {
			System.out.print("读取心电数据失败！");
		}
	}

	public static void testRawImage(String data) {
		/*
		 * dataTo passBase64Encoded data
		 * If the original data is taken，NonBase64Encoded data，Please replace the function
		 * 
		 * Please refer to the interface documentation to confirm whether the acquired ECG data isBase64Encoded data
		 */
		Map<String, byte[]> imgs = new ImageExporter().export(data);
		int i = 1;
		for (Map.Entry<String, byte[]> entry : imgs.entrySet()) {
			//			printLead(entry.getKey());
			/*  Save data to file，To facilitate inspection */
			try {
				FileOutputStream fos = new FileOutputStream("test/" + (i++) + "-" + entry.getKey() + ".jpg");
				fos.write(entry.getValue());
				fos.flush();
				fos.close();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}

		}
	}

	//	public static void testImagePath(String data) {
	//		/*
	//		 * data为经过Base64编码后的数据
	//		 * 如果取到了原始数据，即非Base64编码后的数据，请换用函数
	//		 * 
	//		 * 请参考接口文档以确认获取到的心电数据是否为Base64编码后的数据
	//		 */
	//		IExporter exporter = new ImageExporter();
	//		Map<String, String> imgs = exporter.export("test/export-test", data);
	//		for (Map.Entry<String, String> entry : imgs.entrySet()) {
	//			System.out.print("心电导联 [" + entry.getKey() + "] 存储在: " + entry.getValue());
	//		}
	//	}
	//
	//	/**
	//	 * 本函数只是举个例子，如果想区分导联图，需要按照本函数的样子来区分
	//	 * @param id
	//	 */
	//	private static String getLead(String id) {
	//		if (IExporter.ECG_LEAD_I.equals(id)) {
	//			System.out.print("心电导联: " + id);
	//		} else if (IExporter.ECG_LEAD_II.equals(id)) {
	//			System.out.print("心电导联: " + id);
	//		} else if (IExporter.ECG_LEAD_III.equals(id)) {
	//			System.out.print("心电导联: " + id);
	//		} else if (IExporter.ECG_LEAD_AVR.equals(id)) {
	//			System.out.print("心电导联: " + id);
	//		} else if (IExporter.ECG_LEAD_AVL.equals(id)) {
	//			System.out.print("心电导联: " + id);
	//		} else if (IExporter.ECG_LEAD_AVF.equals(id)) {
	//			System.out.print("心电导联: " + id);
	//		} else if (IExporter.ECG_LEAD_V1.equals(id)) {
	//			System.out.print("心电导联: " + id);
	//		} else if (IExporter.ECG_LEAD_V2.equals(id)) {
	//			System.out.print("心电导联: " + id);
	//		} else if (IExporter.ECG_LEAD_V3.equals(id)) {
	//			System.out.print("心电导联: " + id);
	//		} else if (IExporter.ECG_LEAD_V4.equals(id)) {
	//			System.out.print("心电导联: " + id);
	//		} else if (IExporter.ECG_LEAD_V5.equals(id)) {
	//			System.out.print("心电导联: " + id);
	//		} else if (IExporter.ECG_LEAD_V6.equals(id)) {
	//			System.out.print("心电导联: " + id);
	//		} 
	//	} 
}