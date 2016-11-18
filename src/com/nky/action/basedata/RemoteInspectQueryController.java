package com.nky.action.basedata;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nky.entity.basedata.RemoteInspectQueryEntity;
import com.sys.action.BaseAction;
import com.sys.entity.bo.AjaxPage;
import com.sys.entity.bo.ScriptPage;
import com.sys.jfinal.JFinalDb;

/**
 * @see RemoteInspectQueryEntity
 * @author Ken
 * @version 2016年9月7日
 */
@Controller
@RequestMapping(value = "/remoteinspectquery")
public class RemoteInspectQueryController extends BaseAction {

	/**
	 * 获取列表
	 * @param area
	 * @return
	 */
	@RequestMapping(value = "/list")
	@ResponseBody
	public ScriptPage list(HttpServletRequest request, AjaxPage ajaxPage) {
		ScriptPage scriptPage = null;
		Map<String, Object> param = getParam(request);
		try {
			scriptPage = JFinalDb.findPageBySqlid(ajaxPage.getPageNo(), ajaxPage.getPageSize(), "remoteinspect_list",
					param, "  i.create_time desc  ");
		} catch (Exception e) {
			LOG.error("查询列表失败.", e);
			scriptPage = new ScriptPage();
		}
		return scriptPage;
	}

}
