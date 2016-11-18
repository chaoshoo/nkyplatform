package com.nky.entity.doctor;

import java.util.Date;

public class RemoteInspect {
    private Long id;

    private String code;

    private String vipCode;

    private String doctorCode;

    private String hospitalCode;

    private Date orderTime;

    private Date affirmTime;

    private Byte iszd;

    private Byte isdeal;

    private Date zdBeginTime;

    private Date zdEndTime;

    private Date createTime;

    private String remark;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

    public String getVipCode() {
        return vipCode;
    }

    public void setVipCode(String vipCode) {
        this.vipCode = vipCode == null ? null : vipCode.trim();
    }

    public String getDoctorCode() {
        return doctorCode;
    }

    public void setDoctorCode(String doctorCode) {
        this.doctorCode = doctorCode == null ? null : doctorCode.trim();
    }

    public String getHospitalCode() {
        return hospitalCode;
    }

    public void setHospitalCode(String hospitalCode) {
        this.hospitalCode = hospitalCode == null ? null : hospitalCode.trim();
    }

    public Date getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }

    public Date getAffirmTime() {
        return affirmTime;
    }

    public void setAffirmTime(Date affirmTime) {
        this.affirmTime = affirmTime;
    }

    public Byte getIszd() {
        return iszd;
    }

    public void setIszd(Byte iszd) {
        this.iszd = iszd;
    }

    public Byte getIsdeal() {
        return isdeal;
    }

    public void setIsdeal(Byte isdeal) {
        this.isdeal = isdeal;
    }

    public Date getZdBeginTime() {
        return zdBeginTime;
    }

    public void setZdBeginTime(Date zdBeginTime) {
        this.zdBeginTime = zdBeginTime;
    }

    public Date getZdEndTime() {
        return zdEndTime;
    }

    public void setZdEndTime(Date zdEndTime) {
        this.zdEndTime = zdEndTime;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
}