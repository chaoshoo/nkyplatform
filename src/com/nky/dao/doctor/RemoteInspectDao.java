package com.nky.dao.doctor;

import org.apache.ibatis.annotations.Param;

import com.nky.entity.doctor.RemoteInspect;

public interface RemoteInspectDao {
    int deleteByPrimaryKey(Long id);

    int insert(RemoteInspect record);

    RemoteInspect selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(RemoteInspect record);
    
    int videoDiagnoseOper(@Param("id") String id , @Param("flag") String flag);

}