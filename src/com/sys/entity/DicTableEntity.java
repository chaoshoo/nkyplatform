package com.sys.entity;


import com.jfinal.plugin.activerecord.Model;
import com.sys.jfinal.TableBind;

@SuppressWarnings("serial")
@TableBind(name="dic")
public class DicTableEntity extends Model<DicTableEntity>{
	public static final DicTableEntity dao = new DicTableEntity();
}
