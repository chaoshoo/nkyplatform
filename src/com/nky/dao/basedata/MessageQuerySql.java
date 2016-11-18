package com.nky.dao.basedata;

import com.sys.jfinal.JdbcSql;

/**
 * 消息查询.
 * @author Ken
 * @version 2016年9月8日 下午2:06:16
 */
public class MessageQuerySql extends JdbcSql {

	static {
		//sqlid  全名要规范  类名+名字 jdbcSql.put("HospitalSql_selecttest", "select * from hospital  where 1=1 ${where}");
		jdbcSql.put("messagequery_list",
				"select m.id,m.msg_type,m.creator,m.title,m.content,m.isvalid,m.create_time,c.reciver,c.send_time from message m "
				+ " left join message_center c on c.message_id = m.id where 1=1 ${where}");
	}

}
