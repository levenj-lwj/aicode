package org.levenj.aicodetest.service;

import com.mybatisflex.core.query.QueryWrapper;
import com.mybatisflex.core.service.IService;
import org.levenj.aicodetest.model.dto.app.AppAddRequest;
import org.levenj.aicodetest.model.dto.app.AppQueryRequest;
import org.levenj.aicodetest.model.entity.App;
import org.levenj.aicodetest.model.entity.User;
import org.levenj.aicodetest.model.vo.AppVO;
import reactor.core.publisher.Flux;

import java.io.Serializable;
import java.util.List;

/**
 * 应用 服务层。
 *
 * @author LevenJ
 */
public interface AppService extends IService<App> {

    Long createApp(AppAddRequest appAddRequest, User loginUser);

    String deployApp(Long appId, User loginUser);

    void generateAppScreenshotAsync(Long appId, String appUrl);

    Flux<String> chatToGenCode(Long appId, String message, User loginUser);

    AppVO getAppVO(App app);

    QueryWrapper getQueryWrapper(AppQueryRequest appQueryRequest);

    List<AppVO> getAppVOList(List<App> appList);

    boolean removeById(Serializable id);
}
