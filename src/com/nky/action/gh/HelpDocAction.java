package com.nky.action.gh;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.sys.singleton.DicSingleton;


@Controller
@RequestMapping("/helpdoc")
public class HelpDocAction {
	
	@RequestMapping(value = "/getValueBykeyDic", produces = { "application/json;charset=UTF-8" })
	@ResponseBody
	public String getValueBykeyDic( HttpServletRequest req)
			throws ServletRequestBindingException {
		String rst = "";
		String type = req.getParameter("type");
		String value = req.getParameter("value");
		rst = DicSingleton.getInstance().getValueBykeyDic(type, value);
		
		
		return rst;
	}
}
