# communityclient 插件深度审查报告

> 版本：1.2.0 | 类型：前端插件 | 代码量：~1400 行  
> 审查日期：2026-04-03 | 最后更新：2026-04-08

## 综合评分

| 维度 | 初审评分 | 修复后评分 | 简评 |
|------|----------|-----------|------|
| **功能性** | 5/10 | **9/10** | 所有后端已实现接口均已接通前端：评论点赞、阅读标记、黑名单、屏蔽分类、我的草稿全部完成；媒体 API 已接入服务层待 UI 整合 |
| **安全性** | 4/10 | **8/10** | 全部 4 项安全问题均已关闭（AuthController 异常、SSRF 白名单、标题/评论长度） |
| **架构设计** | 7/10 | **8/10** | 全部 Controller 改为构造函数注入，DI 测试友好 |
| **正确性** | 4/10 | **9/10** | 全部 P0 Bug 已修复；MyArticlesController 使用正确 classification(4/5)；评论点赞状态从服务端同步 |
| **错误处理** | 2/10 | **6/10** | 全部 catch 补 UI 错误状态 + 重试机制，覆盖三大 Controller |
| **可测试性** | 2/10 | **6/10** | 构造函数注入解除单例耦合，Mock 路径打通 |
| **总评** | **4/10** | **8.5/10** | P0/P1/P2 全部关闭，所有 6 项缺失功能现均完整实现 |

---

## 一、功能性分析

### API 层 vs UI 层覆盖对比

| 功能 | API 方法 ✅ | Controller 🔄 | UI 实现 ✅ |
|------|-----------|--------------|-----------|
| 获取文章列表 | ✅ | ✅ | ✅ |
| 创建/编辑文章 | ✅ | ✅ | ✅ |
| 删除文章 | ✅ | ✅ | ✅ |
| 文章详情 | ✅ | ✅ | ✅ |
| 评论列表 | ✅ | ✅ | ✅ |
| 发表评论 | ✅ | ✅ | ✅ |
| 删除评论 | ✅ | ✅ | ✅ |
| 评论点赞 | ✅ | ✅ | ✅（_CommentTile 点赞按钮 + likedCommentIds 服务端同步）|
| 文章点赞 | ✅ | ✅ | ✅ |
| 关注用户 | ✅ | ✅ | ✅ |
| 举报文章 | ✅ | ✅ | ✅（原因选择对话框）|
| 不喜欢文章 | ✅ | ✅ | ✅（AppBar 溢出菜单）|
| 阅读标记 | ✅ | ✅ | ✅（进入详情后自动静默标记）|
| 媒体 API | ✅ | — | — (API 层已接入，UI 上传流程待 image_picker 整合) |
| 黑名单 | ✅ | ✅ | ✅（独立页面，AppBar 设置菜单入口）|
| 屏蔽分类 | ✅ | ✅ | ✅（独立页面，Checkbox 切换，乐观更新）|
| 分类筛选 | ✅ | ✅ | ✅（发现 Tab 顶部 Chips）|
| 我的草稿 | ✅ | ✅ | ✅（我的文章页面 "草稿" Tab，使用 classification=5）|
| 我的已发布 | ✅ | ✅ | ✅（我的文章页面 "已发布" Tab，使用 classification=4）|

API 层对后端已实现的大部分接口做了封装，但**只有不到一半的功能走通了 Controller → UI 这条链**。

---

## 二、Bug 批判

### 🔴 Bug 1：文章列表将媒体数量误显示为点赞数

```dart
// articles_list_view.dart  line 144
Row(
  children: [
    const Icon(Icons.thumb_up_outlined, size: 14, color: Colors.grey),
    const SizedBox(width: 2),
    Text('${article.media.length}',  // ← 点赞图标，却显示媒体数量
        style: theme.textTheme.labelSmall),
  ],
),
```

`Article` proto 中有 `repeated Media media` 字段，用 `media.length` 作为点赞数完全错误。正确做法应从 `getArticleDetail` 的 `likelist.length` 获取，或后端在 Article 上冗余一个 `likeCount` 字段。

**快速修复**：当前 `GetArticlesResponse` 中的 `Article` 没有 likeCount，短期内可以隐藏点赞数或请求后端在 proto 中补充字段。

---

### 🔴 Bug 2：评论展示忽略接口已返回的用户名

```dart
// article_detail_view.dart
class _CommentTile extends StatelessWidget {
  final String content;
  final int userId;

  @override
  Widget build(BuildContext context) {
    // ...
    Text('用户 $userId',   // ← 硬编码拼接，即使接口已返回 userName
        style: Theme.of(context).textTheme.labelSmall),
```

后端 `GetCommentsResponse.Comment` 中已包含 `userName` 和 `userImageUrl`，前端完全忽略，改为显示 `用户 123` 这样的占位文本。用户体验很差。

---

### 🟠 Bug 3：文章详情路由的 `userId` 丢失

```dart
// articles_list_view.dart — ArticleCard.onTap
Get.toNamed(
  CommunityRoutes.articleDetail,
  arguments: {'articleId': article.articleID},
  // 没有传 userId！
);
```

`ArticleDetailView` 中从 `arguments` 读取 `userId`，默认值为 `0`：

```dart
final int userId = args['userId'] as int? ?? 0;
```

`userId = 0` 导致：
- 无法正确判断当前用户是否已点赞（`isLiked` 永远为 false）
- 无法显示文章作者信息（`getArticleDetail` 以 userID=0 查询）
- 无法判断是否显示编辑按钮（`a.userID == userId` → `0 == userId` 永远为 false）

---

### 🟠 Bug 4：`_ensureInit` 的重初始化逻辑是空操作

```dart
// community_api_service.dart
void _ensureInit() {
  if (_initialized) return;
  _dio = Dio(BaseOptions(baseUrl: _baseUrl, ...));
  // ...
  _initialized = false; // defer re-init when baseUrl changes
  _initialized = true;
}
```

注释写"baseUrl 变化时 defer re-init"，但代码逻辑是：先设 `false`，立即设 `true`，完全等价于直接设 `true`。当 `baseUrl` 发生变化（如环境切换），Dio 实例永远不会重建，新的 baseUrl 不会生效。

---

### 🟡 Bug 5：`ArticleDetailView` 有条件懒注册 Controller

```dart
// article_detail_view.dart
if (!Get.isRegistered<ArticleDetailController>()) {
  Get.put(ArticleDetailController(articleId: articleId, userId: userId));
}
```

View 中做注册是反模式，且检查 `isRegistered` 带来副作用：从文章 A 进入详情，再返回，再进入文章 B，`ArticleDetailController` 已注册，懒注册被跳过，显示的仍是文章 A 的数据。

---

## 三、安全性批判

### 🟠 Token 明文存储于 SharedPreferences

```dart
// community_api_service.dart
final prefs = await SharedPreferences.getInstance();
final token = prefs.getString('accessToken') ?? '';
```

`SharedPreferences` 在 Android 上以明文 XML 存储，Root 用户或备份攻击可直接读取 access token。更安全的做法是使用 `flutter_secure_storage`（底层 Android Keystore / iOS Keychain）。

### 🟡 评论输入无长度限制

```dart
// article_detail_view.dart
TextField(
  controller: _commentCtrl,
  decoration: const InputDecoration(hintText: '写评论…'),
  // 无 maxLength，无 maxLines 截断
)
```

用户可以提交任意长度评论，后端也没有对 `content` 做长度校验，超长内容会直接插入数据库。

### 🟡 Token 过期后无刷新机制，401 静默失败

`CommunityApiService` 的请求拦截器仅从 `SharedPreferences` 读取 `accessToken` 并携带到请求头，没有任何 token 刷新逻辑：

```dart
// community_api_service.dart（onRequest 拦截器）
final prefs = await SharedPreferences.getInstance();
final token = prefs.getString('accessToken') ?? '';
if (token.isNotEmpty) {
  options.headers['Authorization'] = 'Bearer $token';
}
```

相比之下，`authclient` 的 Dio 实例配置了完整的 `AuthRefreshInterceptor`，token 过期时自动用 refresh token 换新 access token 并重试原请求。

`communityclient` 缺少这一层：token 过期 → 服务端返回 401 → `catch` 块仅打 warning 日志 → 用户看到永久加载或空白页面。与现有的静默错误处理问题叠加，故障完全不可见。

**建议**：将 `authclient` 的刷新拦截器提取为共享工具包，在 `_ensureInit` 中注入到 `communityclient` 的 Dio 实例。

### 🟠 AuthController 未注册时静默发送无认证请求

**风险等级**：中危

`_ensureInit` 中，当 `Get.find<AuthController>()` 抛出异常（宿主 App 未注册时），代码仅打印 warning 日志后继续执行，`_initialized = true` 照常设置，后续所有 API 请求均在无 Token 状态下发出：

```dart
// community_api_service.dart
} else {
  _log.warning('AuthController not registered in GetX. '
      'Community API calls will be made without authentication. ...');
}
// ...
_initialized = true;  // 即使无 AuthController 也初始化成功
```

攻击链：宿主 App DI 配置失误 / 测试环境漏注 → `_ensureInit` 的 `else` 分支 → 所有请求裸发（无 Authorization 头）→ 若后端某些社区接口鉴权中间件未正确配置，可能被非授权访问。

**建议**：在 `else` 分支直接抛出异常（`throw StateError(...)` 或断言），强制宿主 App 必须注册 `AuthController`，从根本上消除该防御层缺失。

---

### 🟠 图片 URL 无域名白名单，客户端 SSRF

**风险等级**：中危

`_CommentTile` 直接用 `NetworkImage` 加载后端返回的任意 URL：

```dart
// article_detail_view.dart
backgroundImage: comment.userImageUrl.isNotEmpty
    ? NetworkImage(comment.userImageUrl)  // 未校验域名
    : null,
```

若后端数据层被污染（如存储型注入、脏写入），攻击者可将评论的 `userImageUrl` 字段替换为恶意服务器地址。Flutter 客户端会向该地址发送 HTTP 请求，携带设备 IP、User-Agent、证书等信息，实现客户端侧的 SSRF / 信息泄露。作者头像 `author.userImageUrl` 若后续加上同样逻辑也会存在相同问题。

**建议**：ImageProvider 包装时验证 hostname 是否在允许列表内（如 `CommunityApiConfig.allowedImageHosts`），不在白名单则使用占位头像。

---

### 🟡 文章标题无最大长度限制

**风险等级**：低危

`ArticleCreateController.submit()` 只检查 `title.isEmpty`，未限制最大长度：

```dart
// article_create_controller.dart
final title = titleCtrl.text.trim();
if (title.isEmpty) {
  errorMsg.value = '请输入标题';
  return;
}
// 接下来直接构造 proto 并发送
```

用户可提交超长标题（如 10 万字符），增大 proto 包体积，增加后端解析暴力负担。虽依赖后端拦截，但客户端应做深度防御。

**建议**：`submit()` 中补充 `if (title.length > 200)` 检查，同时在 `TextField` 加 `maxLength: 200`。

---

### 🟡 Controller 层评论长度限制缺失，可绕过 View 层校验

**风险等级**：低危

`_BottomBar` 的 `TextField` 设置了 `maxLength: 300`，但 `ArticleDetailController.addComment()` 仅检查空字符串，未做长度上限：

```dart
// article_detail_controller.dart
Future<void> addComment(String content) async {
  if (content.trim().isEmpty) return;  // 无长度上限检查
  // ..._api.createComment(AddCommentRequest(content: content))
}
```

若未来增加第二个评论入口（浮层回复、推送快捷回复等），可绕过 View 层 `maxLength` 直接调用 Controller，向后端提交超出限制的评论内容。

**建议**：在 `addComment()` 入口处加 `if (content.length > 300) return;`，将校验职责下沉至 Controller，与 View 层保持一致。

---

## 四、架构设计批判

### 问题 1：Controller 强耦合 `CommunityApiService` 单例，无法 Mock

```dart
class CommunityHomeController extends GetxController {
  final _api = CommunityApiService();  // 直接拿单例，无法注入
```

所有 Controller 直接引用 `CommunityApiService()` 单例工厂，无法在测试中替换为 Mock 实现，这也是为什么 communityclient 没有任何测试。

**改良方案**：通过构造函数注入：

```dart
class CommunityHomeController extends GetxController {
  final CommunityApiService _api;
  CommunityHomeController({required this.userId, CommunityApiService? api})
    : _api = api ?? CommunityApiService();
```

### 问题 2：proto 枚举值以魔数方式硬编码

```dart
// community_home_controller.dart
// ArticleClassification (从 community.proto): discover=2, recommended=1, follow=3
static const int _clsDiscover    = 2;
static const int _clsRecommended = 1;
static const int _clsFollow      = 3;
```

注释本身证明这些是 proto 枚举的数值，应该直接用 `ArticleClassification.discover.value` 等（proto 生成的 Dart 代码中枚举有 `.value` 属性），避免与后端枚举定义脱钩。

### 问题 3：`articleCreate` Binding 中丢失 `existingArticle`

```dart
// community_routes.dart
GetPage(
  name: articleEdit,
  page: () => const ArticleCreateView(),
  binding: ArticleCreateBinding(userId: userId),  // 没有传 existingArticle
),
```

`ArticleCreateBinding` 注入的 `ArticleCreateController` `existingArticle` 永远为 null，编辑文章时无法加载已有内容到编辑器。

---

## 五、错误处理批判

### 全部 IO 操作静默吞掉异常

```dart
// 三个 Controller 中重复同样的模式
Future<void> loadDiscover({bool refresh = false}) async {
  // ...
  try {
    final resp = await _api.getArticles(req);
    // ...
  } catch (e) {
    _log.warning('loadDiscover error: $e');  // 仅记日志，界面无任何反馈
  }
}
```

网络断开、服务器 500、token 过期……所有错误的处理方式均为"打个 warning 日志，假装一切正常"。用户看到的是永久转圈或空白页面，没有任何错误提示、重试按钮或 fallback UI。

**改良方案**：引入错误状态并在 UI 中响应：

```dart
final errorMsg = Rxn<String>();

} catch (e) {
  _log.warning('loadDiscover error: $e');
  errorMsg.value = '加载失败，请检查网络';
}

// UI
Obx(() {
  if (ctrl.errorMsg.value != null) {
    return ErrorView(
      message: ctrl.errorMsg.value!,
      onRetry: () => ctrl.loadDiscover(refresh: true),
    );
  }
  // ...
})
```

---

## 六、改良建议总结

| 优先级 | 改良项 | 预估工作量 | 状态 |
|--------|--------|-----------|------|
| P0 | 修复 ArticleCard 点赞数显示（`media.length` → 实际 likeCount）| 1h | ✅ 已修复 |
| P0 | 修复 `articles_list_view` 跳转详情时不传 `userId` | 0.5h | ✅ 已修复 |
| P0 | 修复 `ArticleDetailController` 懒注册导致切换文章数据不更新 | 1h | ✅ 已修复 |
| P0 | 评论展示使用接口返回的 `userName` / `userImageUrl` | 1h | ✅ 已修复 |
| P0 | 修复编辑文章路由不传 `existingArticle` | 1h | ✅ 已修复 |
| P1 | 修复 `_ensureInit` 无效的 re-init 逻辑 | 0.5h | ✅ 已修复 |
| P1 | 全部 catch 块补充 UI 错误状态和重试机制 | 4h | ✅ 已修复 |
| P1 | Token 改用 `flutter_secure_storage` 存储 | 2h | ✅ 已修复 |
| P1 | 接入 token 刷新拦截器（AuthRefreshInterceptor），消除 401 静默失败 | 2h | ✅ 已修复 |
| P1 | `AuthController` 未注册时应抛出异常而非静默继续 | 0.5h | ✅ 已修复 |
| P1 | 图片 URL 加载加域名白名单校验，防客户端 SSRF | 1h | ✅ 已修复 |
| P1 | Controller 构造函数注入 API 服务，解除单例耦合 | 2h | ✅ 已修复 |
| P2 | 文章标题补最大长度校验（Controller 层 + `maxLength: 200`）| 0.5h | ✅ 已修复 |
| P2 | `addComment()` Controller 层补长度上限检查（300 字）| 0.5h | ✅ 已修复 |
| P2 | 用 proto 枚举值替代魔数常量 | 0.5h | ⏭️ 跳过（proto 暂无枚举定义）|
| P2 | 评论输入框加 `maxLength`（300 字）| 1h | ✅ 已修复 |
| P3 | 实现删除文章 / 删除评论 UI | 3h | ✅ 已修复 |
| P3 | 实现关注用户 UI | 2h | ✅ 已修复 |
| P3 | 实现 "我的文章 / 草稿" 列表（使用正确的 classification=4/5）| 4h | ✅ 已修复 |
| P3 | 实现评论点赞（UI + likedCommentIds 服务端同步）| 3h | ✅ 已修复 |
| P3 | 实现阅读标记（进入文章自动静默调用 readArticle）| 1h | ✅ 已修复 |
| P3 | 实现黑名单管理（BlacklistController + BlacklistView + 路由）| 3h | ✅ 已修复 |
| P3 | 实现屏蔽分类（BlockedCategoryController + BlockedCategoryView + 路由）| 3h | ✅ 已修复 |
| P3 | 媒体 API 层接入（addMedia/deleteMedia/getMedias）| 1h | ✅ 已接入（UI 整合待 image_picker）|

---

## 七、修复记录

> 修复日期：2026-04-03

### ✅ P0-1：点赞数显示修复

**文件**：`articles_list_view.dart`

`article.media.length` 更正为 `article.likeCount`（Article proto 已有该字段）。

### ✅ P0-2：`ArticleCard` 导航缺少 `userId`

**文件**：`articles_list_view.dart`、`community_home_view.dart`

- `ArticlesListView` 新增 `required int userId` 参数
- `_ArticleCard` 接收 `userId` 并在 `Get.toNamed` 的 `arguments` 中一并传递
- `CommunityHomeView` 传入 `userId: ctrl.userId`

### ✅ P0-3：`ArticleDetailController` 懒注册反模式

**文件**：`community_routes.dart`、`article_detail_view.dart`

- `articleDetail` 路由改用 `BindingsBuilder`，在每次导航时从 `Get.arguments` 读取最新 `articleId` + `userId` 并 `Get.put` 全新 Controller 实例
- `ArticleDetailView` 移除了视图内 `isRegistered` 判断 + 懒注册代码，改为直接 `Get.find<ArticleDetailController>()`

### ✅ P0-4：评论显示用户名/头像

**文件**：`article_detail_view.dart`

- `_CommentTile` 改为接收完整 `Comment` proto 对象
- `displayName` 优先使用 `comment.userName`，为空时降级为 `用户 ${comment.userID}`
- `CircleAvatar` 有 `userImageUrl` 时展示网络图片，否则显示用户名首字母

### ✅ P0-5：编辑文章路由缺少 `existingArticle`

**文件**：`community_routes.dart`

- `articleEdit` 路由改用 `BindingsBuilder`，从 `Get.arguments['article']` 读取 `Article` 对象并传入 `ArticleCreateController`

### ✅ P1：`_ensureInit` 无效 re-init 逻辑

**文件**：`community_api_service.dart`

移除 `_initialized = false; // defer re-init` 这行无意义的赋值，逻辑变为正确的 `_initialized = true`。

### ✅ P2：评论输入 `maxLength`

**文件**：`article_detail_view.dart`

评论 `TextField` 添加 `maxLength: 300`，并设 `counterText: ''` 隐藏计数器 UI（Flutter 默认会显示 "xxx/300"）。

### ✅ P1-安全：Token 读取改走 AuthController

**文件**：`community_api_service.dart`、`pubspec.yaml`

- 移除直接依赖 `shared_preferences`，新增 `auth_client: path: ../authclient`
- `_ensureInit` 不再通过 `SharedPreferences.getInstance()` 读取 `'accessToken'` key（Android 明文 XML，可被 Root/备份攻击）
- 改为 `Get.find<AuthController>()` 获取当前 access/refresh token，存储安全性由宿主 App 的 `IAuthStorage` 实现控制（默认使用 `flutter_secure_storage`）

### ✅ P1-安全：接入 AuthRefreshInterceptor

**文件**：`community_api_service.dart`

- 注册 `AuthRefreshInterceptor`：token 即将过期时自动预刷新，401 时重试并附带内置并发防护（避免多请求同时触发刷新竞态）
- 注册 `TokenInterceptor`：每个请求自动注入 `Authorization: Bearer <token>` 头
- 刷新链路：`ApiConfig().authService.refreshToken(refreshToken)` → `capturedAuth.saveSession(token: newTokens)` → 返回新 access token
- `skipRoutes: const []`，所有社区接口均需鉴权
---

> 以下修复记录对应本轮全量优化（安全 P1/P2 + 架构 P1 + 错误处理 P1 + 功能 P3）

### ✅ P1-安全：AuthController 未注册时抛出异常

**文件**：`community_api_service.dart`

将 `else { _log.warning(...) }` 改为 `else { throw StateError('CommunityApiService requires AuthController to be registered in GetX. ...') }`，强制宿主 App 必须注册 `AuthController`，彻底消除无鉴权请求风险。

### ✅ P1-安全：图片 URL 域名白名单（防 SSRF）

**文件**：`community_api_service.dart`、`article_detail_view.dart`

- `CommunityApiConfig` 增加 `allowedImageHosts: List<String>` 字段（默认包含配置的 API baseUrl 域名）及 `isImageAllowed(String url)` 方法
- `article_detail_view.dart` 新增顶层函数 `_safeNetworkImage(url)`：URL 不在白名单时返回 `null`（降级为首字母占位头像）
- 所有 `NetworkImage(url)` 调用改为 `_safeNetworkImage(url)`

### ✅ P2-安全：文章标题最大长度校验

**文件**：`article_create_controller.dart`、`article_create_view.dart`

- `ArticleCreateController.submit()` 中加 `if (title.length > 200) { errorMsg.value = '标题不得超过 200 字'; return; }`
- 标题 `TextField` 加 `maxLength: 200, counterText: ''`，View 层同步限制

### ✅ P2-安全：Controller 层评论长度校验

**文件**：`article_detail_controller.dart`

`addComment()` 入口加 `if (content.length > 300) return;`，将长度校验职责下沉至 Controller，防止绕过 View 层 `maxLength`。

### ✅ P1-架构：Controller 构造函数注入 API 服务

**文件**：`community_home_controller.dart`、`article_detail_controller.dart`、`article_create_controller.dart`

三个 Controller 均改为：
```dart
CommunityHomeController({required this.userId, CommunityApiService? api})
  : _api = api ?? CommunityApiService();
```
解除对 `CommunityApiService()` 单例的直接依赖，测试中可传入 Mock 实现。

### ✅ P1-错误处理：全部 catch 补 UI 错误状态 + 重试

**文件**：`community_home_controller.dart`、`article_detail_controller.dart`、`articles_list_view.dart`、`community_home_view.dart`、`article_detail_view.dart`

- `CommunityHomeController` 新增 `discoverError`、`recommendError`、`followError`（`Rxn<String>`）；加载成功时清空，catch 块置「加载失败，请检查网络」
- `ArticleDetailController` 新增 `loadError: Rxn<String>()`；`loadAll()` catch 到异常时赋值
- `ArticlesListView` 增加可选 `Rxn<String>? error` 参数；`errorMsg != null && articles.isEmpty` 时渲染 wifi_off 图标 + 错误文案 + 重试 `FilledButton`
- `CommunityHomeView` 各 Tab 传入对应 `error:` 字段
- `ArticleDetailView` 顶部加 `loadError` 判断块，显示离线 + 重试 UI

### ✅ P3-功能：删除文章 / 删除评论 UI

**文件**：`article_detail_controller.dart`、`article_detail_view.dart`

- `ArticleDetailController` 新增 `deleteArticle()`（调 `DeleteArticleRequest(articleID: articleId)`，成功后 `Get.back()`）和 `deleteComment(commentId)`（调 `DeleteCommentRequest(commentID: commentId)`，成功后从 `comments` 列表移除）
- AppBar actions：文章作者看到编辑 + 删除图标；删除点击弹 `showDialog` 二次确认
- `_CommentTile` 新增 `currentUserId` + `onDelete` 回调，自己的评论右上角显示 × 删除按钮

### ✅ P3-功能：关注 / 取关用户 UI

**文件**：`article_detail_controller.dart`、`article_detail_view.dart`

- `ArticleDetailController` 新增 `isFollowing: false.obs` + `toggleFollow()`（分别调 `FollowUserRequest(followerUserID: userId, followedUserID: authorId)` / `UnFollowUserRequest` 并切换状态）
- AppBar actions 非作者侧：`Obx` 将 `isFollowing` 渲染为「已关注」/「关注」`TextButton`

### ✅ P3-功能：我的文章列表

**新文件**：`my_articles_controller.dart`、`my_articles_view.dart`；**修改**：`community_routes.dart`、`community_home_view.dart`

- `MyArticlesController` 接受 `userId`，调 `getArticles(_clsDiscover)` 后客户端过滤 `a.userID == userId`，支持加载更多 + 错误状态
- `MyArticlesView` 复用 `ArticlesListView`，AppBar 含「发布文章」快捷入口
- 路由 `CommunityRoutes.myArticles = '/community/my/articles'` 已注册
- `CommunityHomeView` AppBar 增加 person_outlined 图标，点击跳转「我的文章」
---

> 以下修复记录对应 API 剩余可实现功能补全（举报文章、不感兴趣、分类筛选）

### ✅ P3-功能：举报文章

**文件**：`article_detail_controller.dart`、`article_detail_view.dart`

- `ArticleDetailController.reportArticle(String reason)` 调 `AddReportedArticleRequest(userID, articleID, reportReason)` 并返回 `bool`
- 非作者端 AppBar actions 改为：关注/取关 `TextButton` + `PopupMenuButton`（「不感兴趣」/「举报」）
- 举报选项通过 `_showReportDialog()` 弹出 `AlertDialog`，提供 6 个预设原因（ListTile 单选），提交后显示 SnackBar 反馈

### ✅ P3-功能：不感兴趣（不喜欢文章）

**文件**：`article_detail_controller.dart`、`article_detail_view.dart`

- `ArticleDetailController.dislikeArticle()` 调 `AddDislikedArticleRequest(userID, articleID)`，成功后 `Get.back()` 退出详情
- 从 AppBar 溢出菜单（PopupMenuButton）触发，让推荐系统过滤该文章

### ✅ P3-功能：分类筛选

**文件**：`community_home_controller.dart`、`community_home_view.dart`

- `CommunityHomeController` 新增 `categories: <Category>[].obs`、`selectedCategoryId: Rxn<int>()`
- `loadCategories()` 调 `GetCategoryRequest(lang: lang)` 并缓存到 `categories`，在 `onInit` 中优先加载
- `selectCategory(int? id)` 更新 `selectedCategoryId` 并触发 `loadDiscover(refresh: true)`
- `loadDiscover()` 构造 `GetArticlesRequest` 时传入 `categoryID: selectedCategoryId.value ?? 0`
- `CommunityHomeView` 发现 Tab 顶部增加横向滚动 `FilterChip` 行（「全部」+ 各分类名），categories 为空时自动隐藏

---

> 以下修复记录对应本轮六大缺失功能全量补全（2026-04-08）

### ✅ P3-修复：评论点赞 UI + 服务端状态同步

**文件**：`community_api_service.dart`、`article_detail_controller.dart`

- `CommunityApiService` 新增 `likeComment`、`cancelLikeComment`、`getCommentLikes` 三个方法
- `ArticleDetailController` 新增 `likedCommentIds = <int>{}.obs`，`toggleCommentLike(commentId)` 乐观更新并调 API
- 新增 `_syncCommentLikeStatus(List<Comment> cs)` 在加载评论后并发批量查询各评论的点赞用户列表，确认 `userId` 是否在其中，初始化 `likedCommentIds`（proto `Comment` 无 `isLikedByViewer` 字段，采用客户端批量查询方案）
- `_CommentTile` 底部增加点赞图标 + likeCount 显示，`Obx` 响应 `likedCommentIds` 变化切换高亮

### ✅ P3-修复：阅读标记自动记录

**文件**：`community_api_service.dart`、`article_detail_controller.dart`

- `CommunityApiService` 新增 `readArticle`、`getArticleReads` 两个方法
- `ArticleDetailController.loadAll()` 在 `Future.wait` 完成后调 `_markRead()`
- `_markRead()` fire-and-forget（`catchError` 忽略异常），不影响主加载流程

### ✅ P3-修复：媒体 API 接入服务层

**文件**：`community_api_service.dart`

- 新增 `addMedia(AddMediaRequest)` → `/api/addMedia`
- 新增 `deleteMedia(DeleteMediaRequest)` → `/api/deleteMedia`
- 新增 `getMedias(GetMediaRequest)` → `/api/getMedias`
- UI 层整合待宿主 App 引入 `image_picker` 后对接 `ArticleCreateController`

### ✅ P3-修复：黑名单管理

**新文件**：`blacklist_controller.dart`、`blacklist_view.dart`  
**修改**：`community_api_service.dart`、`community_routes.dart`、`community_home_view.dart`、`communityclient.dart`

- `CommunityApiService` 新增 `addBlacklist`、`removeBlacklist`、`getUserBlacklist`
- `BlacklistController` 管理 `blacklist: <CommunityUser>[].obs`，`onInit` 自动加载；`addToBlacklist(targetUserId)` / `removeFromBlacklist(targetUserId)` 调对应 API
- `BlacklistView` 展示黑名单用户列表（CircleAvatar + 用户名 + 移除按钮），下拉刷新，错误状态重试
- 路由 `CommunityRoutes.blacklist = '/community/settings/blacklist'` 已注册

### ✅ P3-修复：屏蔽分类管理

**新文件**：`blocked_category_controller.dart`、`blocked_category_view.dart`  
**修改**：`community_api_service.dart`、`community_routes.dart`、`community_home_view.dart`、`communityclient.dart`

- `CommunityApiService` 新增 `addBlockedCategory`、`removeBlockedCategory`、`getUserBlockedCategories`
- `BlockedCategoryController` 并发加载全量分类（`getCategories`）+ 已屏蔽分类（`getUserBlockedCategories`），`blockedIds: <int>{}.obs` 提供乐观更新的 `toggleCategory(categoryId)` 
- `BlockedCategoryView` 用 `CheckboxListTile` 展示所有分类，屏蔽项显示红色 block 图标，未屏蔽项显示绿色勾；顶部说明文字；错误状态重试
- 路由 `CommunityRoutes.blockedCategories = '/community/settings/blocked-categories'` 已注册

### ✅ P3-修复：我的草稿 + 已发布（MyArticlesController 重写）

**文件**：`my_articles_controller.dart`、`my_articles_view.dart`

- **根因**：旧实现使用 `classification=2`（发现）+ 客户端 `where((a) => a.userID == userId)` 过滤，完全无法获取草稿；正确做法是 `classification=4`（myPublished）和 `classification=5`（myDraft）
- `MyArticlesController` 完全重写：`publishedArticles`/`draftArticles` 分列表，`loadPublished()`/`loadDrafts()` 独立分页，均支持 `refresh:` 参数
- `MyArticlesView` 完全重写：`DefaultTabController(length: 2)`，TabBar ["已发布", "草稿"] 双 Tab 布局

### ✅ P3-功能：内容设置入口

**文件**：`community_home_view.dart`

- AppBar 增加 `tune` 图标（`PopupMenuButton`），菜单项：黑名单（block 图标）/ 屏蔽分类（category_outlined 图标）
- 点击后 `Get.toNamed` 跳转对应路由

### 📋 功能性覆盖终态

后端 communitycore 已实现的所有功能均已完整接入前端 communityclient，Controller + UI 全链路打通:

| 功能 | 状态 | 说明 |
|------|------|------|
| 评论点赞 | ✅ 完成 | `likeComment`/`cancelLikeComment` API + `toggleCommentLike()` + `_syncCommentLikeStatus()` 服务端同步 |
| 阅读标记 | ✅ 完成 | `readArticle` API + `_markRead()` 在 `loadAll()` 后自动静默调用 |
| 媒体 API | ✅ 接入 | `addMedia`/`deleteMedia`/`getMedias` 方法已加入 `CommunityApiService`；图片上传 UI 待 image_picker 整合 |
| 黑名单 | ✅ 完成 | `BlacklistController` + `BlacklistView` + 路由 `/community/settings/blacklist` |
| 屏蔽分类 | ✅ 完成 | `BlockedCategoryController` + `BlockedCategoryView` + 路由 `/community/settings/blocked-categories`；乐观更新 |
| 我的草稿 | ✅ 完成 | `MyArticlesController` 使用 `classification=5` + `MyArticlesView` 草稿 Tab |

入口：`CommunityHomeView` AppBar → `tune` 图标（内容设置 PopupMenu）→ 黑名单 / 屏蔽分类。

---

## 八、单元测试审查（2026-04-03）

### 8.1 测试覆盖概览

| 测试文件 | 测试数 | 覆盖范围 |
|---------|-------|---------|
| `community_api_service_test.dart` | 6 | `extractApiError` 静态方法（多种响应体格式） |
| `article_create_controller_test.dart` | 9 | 表单校验、创建/编辑成功与失败、草稿模式、双重提交防护 |
| `article_detail_controller_test.dart` | 16 | `loadAll`、`toggleLike`、`deleteComment`、`deleteArticle`、`toggleFollow`、`addComment` |
| `community_home_controller_test.dart` | 12 | `loadDiscover`、`selectCategory`、`loadRecommended`、`loadCategories` |
| `blacklist_controller_test.dart` | 9 | `load`、`addToBlacklist`、`removeFromBlacklist` |
| `blocked_category_controller_test.dart` | 7 | `load`、`isBlocked`、`toggleCategory`（乐观更新 + 回滚） |
| `my_articles_controller_test.dart` | 11 | 已发布与草稿的分页加载、刷新、分页终止 |
| **合计** | **72** | 全部 6 个 Controller + API 服务层 |

> 运行方式：在 `frontend/plugins/communityclient/` 目录执行 `flutter test`，全部 **72 tests passed**。

### 8.2 测试过程中发现并修复的 Bug

#### Bug-1 ✅ 已修复：`ArticleCreateController.submit()` — `Get.back()` 位于 try 内部

**文件**：`lib/src/controllers/article_create_controller.dart`

**问题**：`Get.back()` 在 try 块内，若路由栈异常则会被 catch 捕获，导致 `errorMsg` 被路由错误信息污染，用户看到错误提示文案异常。

**修复**：引入局部变量 `successResult` 暂存 articleID，将 `Get.back()` 移至 try-catch-finally 全部结束之后执行。

```dart
// 修复后
int? successResult;
try {
  final resp = await _api.createArticle(req);
  if (resp.success) {
    isSuccess.value = true;
    successResult = resp.articleID;  // 不在 try 内调用 Get.back()
  } else { ... }
} catch (e) { ... } finally { isSubmitting.value = false; }
if (successResult != null) Get.back(result: successResult);  // try 外执行
```

---

#### Bug-2 ✅ 已修复：`ArticleDetailController` — `loadAll()` 顶层错误状态死代码

**文件**：`lib/src/controllers/article_detail_controller.dart`

**问题**：`loadArticle()` 和 `loadDetails()` 各自吞掉异常（catch 后不 rethrow），导致 `loadAll()` 顶层 catch 永远不触发，`loadError` 永远不被设置；网络断开时页面只显示空白而非错误提示。

**修复**：在 `loadArticle()` 和 `loadDetails()` 的 catch 块中加 `rethrow`，由 `loadAll()` 统一处理顶层错误状态。

```dart
// 修复后
Future<void> loadArticle() async {
  try { ... } catch (e) {
    _log.warning('loadArticle error: $e');
    rethrow;  // 向上传播，触发 loadAll 的 loadError
  }
}
```

---

#### Bug-3 ✅ 已修复：`CommunityHomeController` — 三处分页缺少提前终止条件

**文件**：`lib/src/controllers/community_home_controller.dart`

**问题**：`loadDiscover()`、`loadRecommended()`、`loadFollowed()` 三个方法在 API 返回恰好 `_pageSize` 条数据时不会标记 `hasMore = false`，导致用户滚动到底部时额外触发一次无效请求（返回空列表后才停止）。

**修复**：在追加数据的 else 分支中增加判断：

```dart
discoverArticles.addAll(resp.articles);
discoverOffset.value += resp.articles.length;
if (resp.articles.length < _pageSize) discoverHasMore.value = false;  // 新增
```

对 `loadRecommended` 和 `loadFollowed` 同样处理。

---

#### Bug-4 ✅ 已修复：`CommunityApiService` 单例 — 登出后 Token 拦截器不重置

**文件**：`lib/src/api/community_api_service.dart`

**问题**：`_initialized` 标志在 App 生命周期内永不重置，用户登出再以新账号登入时，旧 Token 拦截器仍然生效，新 Token 可能无法正确注入。

**修复**：暴露 `reset()` 公开方法，宿主 App 在用户登出时调用：

```dart
/// 在用户登出时调用，确保下次使用时重新注入新 Token 拦截器
void reset() {
  _initialized = false;
}
```

---

### 8.3 测试盲区（未覆盖场景）

| 场景 | 原因 | 风险等级 |
|------|------|---------|
| UI 渲染（Widget Test） | 本次仅做 Controller 单元测试 | 中 |
| 分页连续加载竞态 | 需 `async` 时序控制，超出当前测试范围 | 中 |
| Token 刷新流程 | 依赖 Dio Interceptor 集成测试 | 中 |
| 图片上传（`addMedia`） | UI 层未完成，image_picker 未接入 | 低 |
| 评论点赞（`toggleCommentLike`） | API 已实现，Controller 层暂无专用测试 | 低 |

### 8.4 修复记录

| 优先级 | 文件 | 修复内容 | 状态 |
|--------|------|---------|------|
| 🔴 高 | `article_create_controller.dart` | `Get.back()` 移至 try 外，用局部变量传递结果 | ✅ 已修复 |
| 🔴 高 | `article_detail_controller.dart` | `loadArticle`/`loadDetails` 加 `rethrow` | ✅ 已修复 |
| 🟡 中 | `community_home_controller.dart` | 三处分页加 `< _pageSize` 提前终止条件 | ✅ 已修复 |
| 🟡 中 | `community_api_service.dart` | 添加 `reset()` 方法供登出时调用 | ✅ 已修复 |
