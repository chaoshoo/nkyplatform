package com.sys.util;

import java.util.Random;

public class CodeUtil {
	
	/**
	 * Get the random code of the specified length
	 * @param len
	 * @return
	 */
	public static String getRandomCode(int len){
		StringBuffer rntStr=new StringBuffer();
		Random r=new Random();
		for(int i=0;i<len;i++){
			rntStr.append(r.nextInt(10));
		}
		return rntStr.toString();
	}
	
}