package com.cms.jycms.controller.admin;

import com.alibaba.fastjson.JSON;
import com.cms.jycms.common.R;
import com.cms.jycms.domain.NewsInfo;
import com.cms.jycms.domain.Query;
import com.cms.jycms.dto.ImageNameDTO;
import com.cms.jycms.service.NewsInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("admin/api/news")
public class NewsController {
    @Autowired
    private NewsInfoService service;

    @GetMapping("selectNews")
    public R selectNews(Integer page, Integer limit, String title, String start, String end, Integer classId) {
        Map<String, Object> query = new HashMap<>();
        Query q = new Query(page, limit);
        query.put("title", title);
        query.put("offset", q.getOffset());
        query.put("pageSize", q.getPageSize());
        if (classId != null && classId > 0) {
            query.put("classId", classId);
        }
        if (start != null && !start.isEmpty()) {
            query.put("start", start);
        }
        if (end != null && !end.isEmpty()) {
            query.put("end", LocalDate.parse(end, DateTimeFormatter.ofPattern("yyyy-MM-dd")).plusDays(1).toString());
        }
        List<NewsInfo> list = service.selectAll(query);
        int total = service.selectCount(query);
        return R.ok().put("total", total).put("data", list);
    }

    @PostMapping("deleteByIds")
    public R deleteByIds(String ids) {
        String[] array = ids.split(",");
        List<String> list = new ArrayList<>();
        for (int i = 0; i < array.length; i++) {
            list.add(array[i]);
        }
        int result = service.delByIds(list);
        if (result > 0) {
            return R.ok();
        }
        return R.error(-1, "删除失败");
    }

    @PostMapping("recommend")
    public R recommend(String ids)
    {
        String[] array = ids.split(",");
        List<String> list = new ArrayList<>();
        for (int i = 0; i < array.length; i++) {
            list.add(array[i]);
        }
        int result = service.updateRecommendByIds(list);
        if (result > 0) {
            return R.ok();
        }
        return R.error(-1, "推荐失败");
    }

    @PostMapping("addContent")
    public R addContent(NewsInfo model) {
        int result = service.addContent(model);
        if (result > 0) {
            return R.ok();
        }
        return R.error();
    }

    @PostMapping("batchAddContent")
    public R batchAddContent(Integer classId, String files) {
        List<ImageNameDTO> list = JSON.parseArray(files, ImageNameDTO.class);

        for (ImageNameDTO imageNameDTO : list) {
            String name = imageNameDTO.getName();
            NewsInfo newsInfo = new NewsInfo();
            newsInfo.setClassId(classId);
            newsInfo.setTitle(name);
            newsInfo.setContent("<p><img src='" + imageNameDTO.getUrl() + "'/></p>");
            newsInfo.setComeFrom(name);
            newsInfo.setAddDate(LocalDateTime.now())
                    .setUpdateDate(LocalDateTime.now())
                    .setDel(false)
                    .setImageUrl(imageNameDTO.getUrl())
                    .setDescription("")
                    .setEnTitle(name);
            service.addContent(newsInfo);
        }
        return R.ok();
    }

    @GetMapping("getNewsById")
    public R getNewsById(String id) {
        NewsInfo model = service.selectByPrimaryKey(id);
        return R.ok().put("data", model);
    }

    @PostMapping("updateContent")
    public R updateContent(NewsInfo model) {
        int result = service.updateContent(model);
        if (result > 0) {
            return R.ok();
        }
        return R.error();
    }
}
