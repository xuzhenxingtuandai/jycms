package com.cms.jycms.dao;

import com.cms.jycms.domain.NewsInfo;

import java.util.List;
import java.util.Map;

public interface NewsInfoMapper {
    NewsInfo selectByPrimaryKey(String id);

    List<NewsInfo> selectAll(Map<String, Object> query);

    int selectCount(Map<String,Object> query);

    int delByIds(List<String> ids);

    int addContent(NewsInfo model);

    int updateContent(NewsInfo model);
}