package com.sys.service.auth;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sys.dao.auth.DicDao;
import com.sys.dao.auth.DicDefineDao;
import com.sys.entity.auth.Dic;
import com.sys.entity.auth.DicDefine;
import com.sys.entity.bo.ScriptPage;

@Service
public class DicDefineService {
	
	@Autowired
	DicDefineDao dicDefineMapper;
	@Autowired
	DicDao dicMapper;

	/**
	 * Get alldefinelist
	 */
	public ScriptPage getDicDefineList(DicDefine dicDefine) {
		try {
			List<DicDefine> rows = dicDefineMapper.getDicDefineList(dicDefine);
			int total = dicDefineMapper.getCount(dicDefine);
			ScriptPage scriptPage = new ScriptPage();
			scriptPage.setRows(rows);
			scriptPage.setTotal(total);
			return scriptPage;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	/**
	 * Add dictionary definition
	 * @param sysAuth
	 * @return
	 */
	public int addDicDefine(DicDefine dicDefine) {
		try {
			dicDefine.setDateTime(new Date(System.currentTimeMillis()));
			return dicDefineMapper.addDicDefine(dicDefine);
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	/**
	 * Get alldic
	 */
	public List findDicById(Integer id) {
		try {
			List<Dic> list = dicDefineMapper.findDicById(id);
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	public int delDicDefine(Integer id) {
		try {
			if (dicMapper.delDicByType(id) >= 0) {
				return dicDefineMapper.delDicDefine(id);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	public int updateDicDefine(DicDefine sysAuth) {
		try {
			return dicDefineMapper.updateDicDefine(sysAuth);
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}
}