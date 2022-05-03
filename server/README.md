> 先通过 `docker-compose.yml` 启动数据库

> 环境要求
> node@14+

```bash
docker-compose up -d
```

結構關係
author 創建 resource，裡面的 paragraph 被收錄；其中 resource 有具體的 category，paragraph 可以被打上 tag。
tag 按 tag-group 分組。

## 项目内部请求第三方接口

[nestjs http module](https://docs.nestjs.com/techniques/http-module)
根据文档使用 `@nestjs/axios` 。但是目前遇到返回类型不知道怎么处理的问题，所以直接使用 `axios`。

## 微信登录流程

> 参考文章
>
> [wx.login](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html)
>
> [auth.code2Session](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html)
>
> [微信小程序授权登录与用户信息保存详解](https://cloud.tencent.com/developer/article/1608597)
