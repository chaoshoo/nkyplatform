package com.sys.service.url;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sys.dao.url.UrlPicDao;
import com.sys.entity.bo.ScriptPage;
import com.sys.entity.url.UrlPic;

/**
 * 系统图片URL配置管理Service
 * @author 
 *
 */
@Service
public class UrlPicService {

	@Autowired
	private UrlPicDao urlPicDao;
	
	public ScriptPage getList(UrlPic urlPic) throws Exception{
		ScriptPage page = new ScriptPage();
		page.setRows(urlPicDao.getList(urlPic));
		page.setTotal(urlPicDao.count(urlPic));
		return page;
	}
	
	public int save(UrlPic urlPic) throws Exception {
		return urlPicDao.save(urlPic);
	}
	
	public int update(UrlPic urlPic) throws Exception {
		return urlPicDao.update(urlPic);
	}
	
	public int delete(UrlPic urlPic) throws Exception {
		return urlPicDao.delete(urlPic);
	}
}
