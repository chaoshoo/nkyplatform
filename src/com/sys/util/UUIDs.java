package com.sys.util;

import java.util.UUID;

public class UUIDs {

	public static String getShortRandomUUID() {

		return UUID.randomUUID().toString().replace("-", "");
	}

	public static String getRandomUUID() {

		return UUID.randomUUID().toString();
	}

}