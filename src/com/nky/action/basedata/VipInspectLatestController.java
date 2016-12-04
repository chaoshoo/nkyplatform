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
 * Auxiliary list of detection indexes.
 * @author Ken
 * @version 2016year9month2day
 */
@Controller
@RequestMapping(value = "/vipInspectLatest")
public class VipInspectLatestController extends BaseAction {

	/**
	 * Get list
	 * @param area
	 * @return
	 */
	@RequestMapping(value = "/list")
	@ResponseBody
	public ScriptPage list(HttpServletRequest request, AjaxPage ajaxPage) {
		ScriptPage scriptPage = null;
		Map<String, Object> param = getParam(request);
		try {
			scriptPage = JFinalDb.findPageBySqlid(ajaxPage.getPageNo(), ajaxPage.getPageSize(),
					"vipinspectlatest_list", param, " inspect_code asc , kpi_code asc ");
		} catch (Exception e) {
			LOG.error("Query list failed.", e);
			scriptPage = new ScriptPage();
		}
		return scriptPage;
	}

}