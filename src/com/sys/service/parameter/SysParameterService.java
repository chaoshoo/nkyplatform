package com.sys.service.parameter;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sys.dao.parameter.SysParameterDao;
import com.sys.entity.bo.ScriptPage;
import com.sys.entity.parameter.SysParameter;

@Service
public class SysParameterService {

	@Autowired
	private SysParameterDao sysParameterDao;

	/**
	 * 获取列表
	 * @param sysParameter
	 * @return
	 */
	public ScriptPage getSysParameterList(SysParameter sysParameter) {
		List<SysParameter> rows = sysParameterDao.getSysParameterList(sysParameter);
		int total = sysParameterDao.getCount(sysParameter);
		ScriptPage scriptPage = new ScriptPage();
		scriptPage.setRows(rows);
		scriptPage.setTotal(total);
		return scriptPage;
	}

	/**
	 * 修改
	 * @param sysParameter
	 * @return
	 */
	public int updateSysParameter(SysParameter sysParameter) {
		return sysParameterDao.updateSysParameter(sysParameter);
	}

	/**
	 * 添加
	 * @param sysParameter
	 * @return
	 */
	public int addSysParameter(SysParameter sysParameter) {
		sysParameter.setCreateTime(new Date());
		return sysParameterDao.addSysParameter(sysParameter);
	}
    
	/**
	 * 获取数量
	 * @param sysParameter
	 * @return
	 */
	public int getCount(SysParameter sysParameter) {
		return sysParameterDao.getCount(sysParameter);
	}
    
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	public int delSysParameter(BigInteger id) {
		try {
			return sysParameterDao.delSysParameter(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
}
