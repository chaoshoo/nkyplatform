package com.nky.action.url;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sys.entity.LoginEntity;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.Data;
import com.sys.entity.bo.LoginAttribute;
import com.sys.entity.bo.ScriptPage;
import com.sys.entity.url.UrlPic;
import com.sys.service.url.UrlPicService;

@Controller
@RequestMapping(value="/urlPic")
public class UrlPicController {
	
	@Autowired
	private UrlPicService urlPicService;
	
	@RequestMapping(value="/show")
	public String index() {
		return "url/url_pic";
	}
	
	@RequestMapping(value="/getList")
	@ResponseBody
	public ScriptPage getList(UrlPic urlPic,AjaxPage ajaxPage) {
		try {
			urlPic.copy(ajaxPage);
			return urlPicService.getList(urlPic);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ScriptPage();
	}
	
	@RequestMapping(value="/save")
	@ResponseBody
	public Data save(UrlPic urlPic,HttpServletRequest req) {
		Data data = new Data();
		try {
			LoginEntity user =(LoginEntity) req.getSession().getAttribute(LoginAttribute.ATTRIBUTE_USER);
			urlPic.setOption_id(user.getSysUser().getUserName());
			urlPic.setCreate_time(new Date());
			if (urlPicService.save(urlPic) > 0) {
				return data;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		data.setCode(0);
		return data;
	}
	
	@RequestMapping(value="/update")
	@ResponseBody
	public Data update(UrlPic urlPic,HttpServletRequest req) {
		Data data = new Data();
		try {
			LoginEntity user =(LoginEntity) req.getSession().getAttribute(LoginAttribute.ATTRIBUTE_USER);
			urlPic.setOption_id(user.getSysUser().getUserName());
			if (urlPicService.update(urlPic) > 0) {
				return data;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		data.setCode(0);
		return data;
	}
	
	@RequestMapping(value="/delete")
	@ResponseBody
	public Data delete(UrlPic urlPic) {
		Data data = new Data();
		try {
			if (urlPicService.delete(urlPic) > 0) {
				return data;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		data.setCode(0);
		return data;
	}
}
