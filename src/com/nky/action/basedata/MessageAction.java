package com.nky.action.basedata;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sys.action.BaseAction;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.ScriptPage;
import com.sys.jfinal.JFinalDb;

/**
 * 消息管理.
 * @author Ken
 * @version 2016年8月30日
 */
@Controller
@RequestMapping(value = "/message")
public class MessageAction extends BaseAction {

	@RequestMapping(value = "/show")
	public String show(HttpServletRequest request) {
		return "basedata/messagelist";
	}

	/**
	 * 获取列表
	 * @return
	 */
	@RequestMapping(value = "/list")
	@ResponseBody
	public ScriptPage list(HttpServletRequest request, AjaxPage ajaxPage) {
		ScriptPage scriptPage = null;
		Map<String, Object> param = getParam(request);
		try {
			scriptPage = JFinalDb.findPageBySqlid(ajaxPage.getPageNo(), ajaxPage.getPageSize(), "message_list", param,
					" create_time desc ");
		} catch (Exception e) {
			LOG.error("查询列表失败.", e);
			scriptPage = new ScriptPage();
		}
		return scriptPage;
	}

}
