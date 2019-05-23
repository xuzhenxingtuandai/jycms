package com.cms.jycms.controller.admin;

import com.cms.jycms.common.R;
import com.cms.jycms.domain.LeaveMessage;
import com.cms.jycms.domain.Query;
import com.cms.jycms.service.LeaveMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/api/leaveMessage")
public class LeaveMessageController {
    @Autowired
    private LeaveMessageService service;

    @GetMapping("getList")
    public R getList(Integer page, Integer limit) {
        Map<String, Object> query = new HashMap<>();
        Query q = new Query(page, limit);
        query.put("offset", q.getOffset());
        query.put("pageSize", q.getPageSize());
        List<LeaveMessage> list = service.selectAll(query);
        int count = service.selectCount(query);
        return R.ok().put("total", count).put("data", list);
    }

    @PostMapping("deleteByIds")
    public R deleteByIds(String ids) {
        String[] array = ids.split(",");
        List<String> list = new ArrayList<>();
        for (int i = 0; i < array.length; i++) {
            list.add(array[i]);
        }
        int result = service.delete(list);
        if (result > 0) {
            return R.ok();
        }
        return R.error(-1, "删除失败");
    }
}