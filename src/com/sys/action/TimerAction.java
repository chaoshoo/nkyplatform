package com.sys.action;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.sys.util.DateUtil;
import com.sys.util.HttpClient;


/**
 * 定时器控制类
 * @author lenovo
 *
 */
@Controller
@RequestMapping(value = "/timeraction")
public class TimerAction {
	
	/**
	 * 03:00 执行
	 * 百度 合作商 信息同步
	 * 
	 */
	@RequestMapping("/baidusync")
	@ResponseBody
	public void baidusync() {
		
	}

	
}
