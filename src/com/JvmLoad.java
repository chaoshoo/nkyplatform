package com;

import com.sys.singleton.AreaSingleton;
import com.sys.singleton.AuthoritySingleton;
import com.sys.singleton.DicSingleton;





public class JvmLoad{



	public static void main() {
		// TODO Auto-generated method stub
		System.out.println("redis load --------------------------------");
		DicSingleton.getInstance().reload();
		AuthoritySingleton.getInstance().reload();
		AreaSingleton.getInstance().reload();
	}
	

}