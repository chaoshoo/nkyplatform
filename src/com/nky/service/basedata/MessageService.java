package com.nky.service.basedata;

import java.util.Date;

import org.springframework.stereotype.Service;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.nky.entity.basedata.MessageEntity;
import com.sys.jfinal.JFinalDb;

/**
 * @see MessageEntity
 * @author Ken
 * @version 2016年8月30日
 */
@Service
public class MessageService {

	public MessageEntity getEntity() {
		MessageEntity entity = new MessageEntity();
		try {
			entity = JFinalDb.findFirst(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return entity;
	}
	
	/**
	 * 做消息推送使用  
	 * type 为1 表示留言回复  为2 表示视频拒绝 3为预约时间快到了
	 * @return
	 */
	public boolean saveMessage(String type,String sender,String reciver,String content){
		Record r1 = new Record();
		r1.set("msg_type", "1").set("creator", sender).set("title", "提示").set("content", content)
		.set("create_time", new Date());
		boolean flag = Db.save("message", r1);
		if(flag){
			Record r2 = new Record();
			r2.set("msg_type", "1").set("message_id", r1.get("id")).set("reciver", reciver).set("create_time", new Date());
			flag = Db.save("message_center", r2);
		}
		return flag;
	}
}
