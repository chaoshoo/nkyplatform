package com.nky.entity.doctor;

import java.util.Date;

import com.sys.jfinal.JFinalEntity;
import com.sys.jfinal.TableBind;

public class RemoteInspectLog{
    private Long id;

    private String vipOrDoctor;

    private String remoteInspectCode;

    private Date createTime;

    private String des;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVipOrDoctor() {
        return vipOrDoctor;
    }

    public void setVipOrDoctor(String vipOrDoctor) {
        this.vipOrDoctor = vipOrDoctor == null ? null : vipOrDoctor.trim();
    }

    public String getRemoteInspectCode() {
        return remoteInspectCode;
    }

    public void setRemoteInspectCode(String remoteInspectCode) {
        this.remoteInspectCode = remoteInspectCode == null ? null : remoteInspectCode.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des == null ? null : des.trim();
    }
}