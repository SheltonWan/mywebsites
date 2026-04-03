# communityclient 使用指南

> 版本：1.2.0 | 更新日期：2026-04-08

## 概述

`communityclient` 是社区功能的 Flutter 前端插件，提供文章浏览、发布、评论、互动及内容管理等完整功能，对接后端 `communitycore` 插件的全部 API。

---

## 快速接入

### 1. 在宿主 App 中注册依赖

```dart
// main.dart 或 App 初始化方法中
void main() {
  // 必须先注册 AuthController（communityclient 鉴权依赖）
  Get.put(AuthController(...));

  // 注册社区 API 配置（baseUrl + 可信图片域名）
  Get.put(CommunityApiConfig(
    baseUrl: 'https://your-api.example.com',
    allowedImageHosts: ['your-api.example.com', 'cdn.example.com'],
  ));
}
```

### 2. 注册路由

```dart
GetMaterialApp(
  getPages: [
    ...CommunityRoutes.pages(userId: currentUserId, lang: 'zh'),
    // 其他路由...
  ],
);
```

### 3. 进入社区首页

```dart
Get.toNamed(CommunityRoutes.home);
```

---

## 功能一览

| 功能 | 路由 / 入口 | 说明 |
|------|------------|------|
| 社区首页 | `CommunityRoutes.home` | 发现 / 推荐 / 关注三 Tab |
| 文章详情 | `CommunityRoutes.articleDetail` | 自动阅读标记、评论点赞 |
| 发布文章 | `CommunityRoutes.articleCreate` | Quill 富文本编辑 |
| 编辑文章 | `CommunityRoutes.articleEdit` | 传入 `existingArticle` |
| 我的文章 | `CommunityRoutes.myArticles` | 已发布 + 草稿两 Tab |
| 黑名单 | `CommunityRoutes.blacklist` | 管理页，支持移除 |
| 屏蔽分类 | `CommunityRoutes.blockedCategories` | Checkbox 切换，乐观更新 |

---

## 导航参数说明

### 文章详情

```dart
Get.toNamed(
  CommunityRoutes.articleDetail,
  arguments: {
    'articleId': article.articleID,  // int, 必填
    'userId': currentUserId,          // int, 必填（用于点赞/关注/权限判断）
  },
);
```

### 编辑文章

```dart
Get.toNamed(
  CommunityRoutes.articleEdit,
  arguments: {
    'userId': currentUserId,
    'article': existingArticle,  // Article proto 对象
  },
);
```

---

## 六大功能详解

### 1. 评论点赞

**实现路径**：`ArticleDetailController.toggleCommentLike(commentId)`

- 进入详情页时，`_syncCommentLikeStatus()` 并发查询各评论的点赞用户列表，初始化 `likedCommentIds`
- 点击评论点赞图标 → `toggleCommentLike()` 乐观更新 `likedCommentIds` + `comments[i].likeCount`，同步调 API

> **Proto 限制**：`Comment` 消息无 `isLikedByViewer` 字段，采用客户端批量查询方案。若请求量大可考虑后端扩展 proto。

### 2. 阅读标记

**实现路径**：`ArticleDetailController._markRead()`

- 在 `loadAll()` 的 `Future.wait` 完成后自动调用，fire-and-forget 方式（失败不抛异常）
- 后端 `read_routes.dart` 支持幂等写入，重复标记安全

### 3. 媒体 API

**服务层**：`CommunityApiService.addMedia / deleteMedia / getMedias`

- API 方法已接入，但当前编辑器（Quill）无文件选择 UI
- 接入步骤：宿主 App 引入 `image_picker`，上传文件后调 `addMedia(AddMediaRequest(articleID: id, url: uploadedUrl, mediaType: 'image'))`

### 4. 黑名单

**Controller**：`BlacklistController(userId: currentUserId)`  
**View**：`BlacklistView`（路由 `/community/settings/blacklist`）

```dart
// 在其他页面（如用户资料页）将用户加入黑名单
final blacklistCtrl = Get.find<BlacklistController>();
await blacklistCtrl.addToBlacklist(targetUserId);
```

**入口**：社区首页 AppBar → `tune` 图标 → 「黑名单」

### 5. 屏蔽分类

**Controller**：`BlockedCategoryController(userId: currentUserId, lang: 'zh')`  
**View**：`BlockedCategoryView`（路由 `/community/settings/blocked-categories`）

- 自动加载所有分类 + 用户已屏蔽的分类
- `toggleCategory(categoryId)` 乐观更新，API 失败时自动回滚

**入口**：社区首页 AppBar → `tune` 图标 → 「屏蔽分类」

### 6. 我的草稿

**Controller**：`MyArticlesController(userId: currentUserId)`  
**View**：`MyArticlesView`（TabBar：已发布 / 草稿）

| Tab | classification 值 | 后端路径 |
|-----|------------------|---------|
| 已发布 | 4 | `getPublishedArticlesByAuthor()` |
| 草稿 | 5 | `getDraftArticlesByAuthor()` |

> **修复说明**：旧实现错误使用 `classification=2`（发现）并客户端过滤 `userID`，现已修正为正确的 classification 值。

---

## CommunityApiConfig 配置项

```dart
CommunityApiConfig({
  required String baseUrl,            // 后端基础 URL
  List<String> allowedImageHosts = const [],  // 可信图片域名（SSRF 防护白名单）
})
```

`isImageAllowed(String url)` 会校验 URL 的 host 是否在白名单内，`BlacklistView`、`BlockedCategoryView` 中的头像加载均通过此方法过滤。

---

## 导出符号清单

```dart
import 'package:communityclient/communityclient.dart';

// API
CommunityApiService        // 所有社区 API
CommunityApiConfig         // 配置（baseUrl、allowedImageHosts）

// Controllers
ArticleCreateController
ArticleDetailController
BlacklistController        // 新增
BlockedCategoryController  // 新增
CommunityHomeController
MyArticlesController

// Views
ArticleCreateView
ArticleDetailView
ArticlesListView
BlacklistView              // 新增
BlockedCategoryView        // 新增
CommunityHomeView
MyArticlesView

// Routes
CommunityRoutes            // 含 blacklist、blockedCategories 路由常量

// Proto
community.pb.dart          // 所有 proto 消息类
community.pbenum.dart      // 枚举

// Bindings
CommunityHomeBinding
```

---

## 常见问题

**Q：进入详情页后点赞状态总是未点赞？**  
A：检查 `Get.toNamed()` 的 `arguments` 是否传入了正确的 `userId`。`userId=0` 会导致 `_syncCommentLikeStatus` 永远匹配不到当前用户。

**Q：我的草稿显示为空？**  
A：旧版使用了错误的 classification=2，请确认已升级到最新版 `MyArticlesController`（使用 classification=4/5）。

**Q：黑名单 / 屏蔽分类页面路由 404？**  
A：确认 `CommunityRoutes.pages(userId: ..., lang: ...)` 正确传入了当前用户 ID，并已注册到 `GetMaterialApp.getPages`。

**Q：图片不显示？**  
A：检查 `CommunityApiConfig.allowedImageHosts` 是否包含了图片服务器的域名。
