package com.nky.dao.doctor;

import com.nky.entity.doctor.RemoteInspectLog;

public interface RemoteInspectLogDao {
    int deleteByPrimaryKey(Long id);

    int insert(RemoteInspectLog record);

    RemoteInspectLog selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(RemoteInspectLog record);

}