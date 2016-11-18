package com.sys.common.db;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Iterator;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.DbKit;
import com.sys.common.vo.TableVo;

/**
 * 数据库敏捷操作
 * 		动态添加,更新
 */
public class DBAgileSupport {
	private String sql;
	private boolean result;

	/**
	 * 新增
	 */
	@SuppressWarnings("rawtypes")
	public boolean agileAdd(HashMap<String, Object> data) {
		result = false;
		String tableName = (String) data.get("table");
		if (tableName == null || "".equals(tableName)) {
			return result;
		}

		Iterator it = data.keySet().iterator();
		String fileName = " (";
		String fileValue = " (";
		try {
			while (it.hasNext()) {
				Object obj = data.get(it.next());
				if (!(obj instanceof TableVo)) {
					continue;
				}
				TableVo table = (TableVo) obj;
				// 字段值
				String value = table.getValue();
				String cName = table.getColumn();
				if (cName == null || "".equals(cName)) {
					continue;
				}

				// 判断是否为主键,且参数中主键值是否为空
				if (table.isPrimkey() == true) {
					if (value == null || "".equals(value.toString())) {
						value = String.valueOf(this.getPrimaryValue(tableName, cName));
					}
				}

				value = value == null ? "" : value;
				fileName += cName + ",";
				fileValue += "'" + value + "',";
			}
			fileName = fileName.substring(0, fileName.length() - 1) + ")";
			fileValue = fileValue.substring(0, fileValue.length() - 1) + ")";
		} catch (Exception e) {
			e.printStackTrace();
		}
		sql = " insert into " + tableName + fileName + " values " + fileValue;
		return Db.update(sql)>0;
	}




	/**
	 * 修改
	 */
	@SuppressWarnings("rawtypes")
	public boolean agileUpdate(HashMap data) {
		if (data == null || data.isEmpty()) {
			return false;
		}
		String tableName = (String) data.get("table");
		if (tableName == null || "".equals(tableName.trim())) {
			return false;
		}
		Iterator it = data.keySet().iterator();
		String setValue = "";// 更新的字段和值
		String conditions = "";// 更新的条件
		try {
			while (it.hasNext()) {
				Object obj = data.get(it.next());
				if (!(obj instanceof TableVo)) {
					continue;
				}
				TableVo table = (TableVo) obj;
				
				String value = table.getValue();// 字段值
				String cName = table.getColumn();

				// 如果为主键,则为更新的条件
				if (table.isPrimkey() == true) {
					if (value == "") {
						return false;
					}
					conditions += cName + " = '" + value + "'";
					continue;
				}

				value = value == null ? "" : value;
				setValue += cName + "= '" + value + "',";
			}
			if (conditions == "") {
				return false;
			}

			if (setValue != "") {
				setValue = setValue.replaceAll(",$", "");
				sql = "update " + tableName + " set " + setValue + " where "
						+ conditions;
				return Db.update(sql)>0;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 取自增长主键值
	 * @param tableName
	 * @param primaryKey
	 * @return
	 */
	private int getPrimaryValue(String tableName, String primaryKey) {
		int primaryValue = 0;
		if (tableName == null || primaryKey == null || "".equals(tableName)|| "".equals(primaryKey)) {
			return primaryValue;
		}

		Connection connection = null;
		try {
			connection = DbKit.getConnection();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		if (connection == null) {
			return primaryValue;
		}
		String sql  = "select * from " + tableName + " order by " + primaryKey+ " desc limit 0,1";
		Statement stmt = null;
		ResultSet rs = null;
		try {

			stmt = connection.createStatement();
			rs = stmt.executeQuery(sql);
			if (rs.next()) {
				primaryValue = Integer.parseInt(rs.getString(primaryKey));
			}
			primaryValue++;
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			this.close(stmt, rs, connection);
		}
		return primaryValue;
	}
	
	/**
	 * 关闭查询,连接
	 */
	private void close(Statement stmt, ResultSet rs, Connection conn) {
		try {
			if (stmt != null) {
				stmt.close();
			}
			if (rs != null) {
				rs.close();
			}
			if (conn != null) {
				conn.close();
				conn = null;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
