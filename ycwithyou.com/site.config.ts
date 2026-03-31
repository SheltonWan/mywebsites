/**
 * iWithYou 网站统一配置文件
 * 所有图片路径、下载链接、文案、联系信息均在此配置
 * 修改此文件即可更新整个网站内容，无需修改组件代码
 */

export const siteConfig = {
  // ==================== 品牌信息 ====================
  name: "iWithYou",
  tagline: "连接每一个你",
  description:
    "iWithYou 是一款全平台即时通讯应用，为用户提供流畅的聊天体验。同时面向企业和开发者提供完整的即时通讯接入服务。",
  slogan: "随时随地，与你同在",

  // ==================== 图片资源 ====================
  // 替换为本地路径（如 /images/logo.png）或保持远程 URL
  images: {
    logo: "/images/logo.png", // 替换为实际 logo 路径
    heroMockup: "https://withyou-1256315836.cos.ap-guangzhou.myqcloud.com/snapshots/7.webp",
    screenshots: [
      {
        src: "https://withyou-1256315836.cos.ap-guangzhou.myqcloud.com/snapshots/1.webp",
        alt: "登录界面",
      },
      {
        src: "https://withyou-1256315836.cos.ap-guangzhou.myqcloud.com/snapshots/7.webp",
        alt: "聊天界面",
      },
      {
        src: "https://withyou-1256315836.cos.ap-guangzhou.myqcloud.com/snapshots/2.webp",
        alt: "通讯列表",
      },
      {
        src: "https://withyou-1256315836.cos.ap-guangzhou.myqcloud.com/snapshots/4.webp",
        alt: "聊天列表",
      },
      {
        src: "https://withyou-1256315836.cos.ap-guangzhou.myqcloud.com/snapshots/9.webp",
        alt: "个人中心",
      },
      {
        src: "https://withyou-1256315836.cos.ap-guangzhou.myqcloud.com/snapshots/3.webp",
        alt: "发现界面",
      },
    ],
  },

  // ==================== 下载链接 ====================
  downloads: {
    ios: {
      platform: "ios",
      label: "App Store / iOS",
      icon: "🍎",
      url: "https://www.pgyer.com/ZuxdmB",
      available: true,
    },
    android: {
      platform: "android",
      label: "Android",
      icon: "🤖",
      url: "https://www.pgyer.com/C1fiuN",
      available: true,
    },
    mac: {
      platform: "mac",
      label: "macOS",
      icon: "💻",
      url: "https://apps.apple.com/app/iwithyou/id6477150756",
      available: true,
    },
    windows: {
      platform: "windows",
      label: "Windows",
      icon: "🪟",
      url: "https://withyou-1256315836.cos.ap-guangzhou.myqcloud.com/iwithyou.exe",
      available: true,
    },
  },

  // ==================== 产品统计数字 ====================
  stats: [
    { value: 4, suffix: " 平台", label: "全平台覆盖", description: "Android / iOS / macOS / Windows" },
    { value: 8, suffix: "+", label: "消息类型", description: "文字、图片、语音、视频、文件、位置…" },
    { value: 6, suffix: " 厂商", label: "推送覆盖", description: "华为、小米、OPPO、VIVO、荣耀、APNs" },
    { value: 99.9, suffix: "%", label: "消息到达率", description: "WebSocket + 离线推送双重保障" },
  ],

  // ==================== C 端核心功能 ====================
  features: [
    {
      icon: "chat",
      title: "即时消息",
      description: "毫秒级消息投递，支持文字、图片、语音、视频、文件、位置等多种消息类型，消息状态实时更新。",
    },
    {
      icon: "group",
      title: "群聊 & 好友",
      description: "创建群组、管理好友，支持好友申请、备注、拉黑，群组支持成员管理与权限控制。",
    },
    {
      icon: "moments",
      title: "朋友圈",
      description: "分享生活瞬间，发布图文、视频动态，支持点赞、评论、互动，构建社交圈子。",
    },
    {
      icon: "ai",
      title: "AI 智能助手",
      description: "内置 AI 聊天功能，智能回复、内容创作、信息检索，让沟通更聪明高效。",
    },
    {
      icon: "push",
      title: "消息推送",
      description: "离线时也不错过重要消息。支持华为、小米、OPPO、VIVO、荣耀 HMS 及 APNs 全平台推送。",
    },
    {
      icon: "multiplatform",
      title: "全平台支持",
      description: "Flutter 构建，一套代码覆盖 Android、iOS、macOS、Windows，体验高度一致。",
    },
    {
      icon: "media",
      title: "富媒体内容",
      description: "支持社区内容创作，富文本编辑、图文排版，轻松发布高质量图文资讯。",
    },
    {
      icon: "security",
      title: "安全可靠",
      description: "JWT 认证、WebSocket 加密传输、离线消息持久化，保障通讯安全与数据完整性。",
    },
  ],

  // ==================== B 端服务 ====================
  business: {
    title: "为你的产品接入即时通讯能力",
    subtitle: "完整的 IM 后端服务，让你的 App 快速拥有聊天、推送、用户系统，专注核心业务。",
    highlights: [
      {
        icon: "websocket",
        title: "WebSocket 实时通讯",
        description: "基于 Dart Shelf 的高性能 WebSocket 服务，支持大并发连接，消息实时双向传输。",
      },
      {
        icon: "api",
        title: "完整 REST API",
        description: "认证、用户、聊天、群组、好友、推送全套 API，JSON 格式，JWT 鉴权，开箱即用。",
      },
      {
        icon: "push",
        title: "六大厂商推送",
        description: "统一推送接口覆盖华为、小米、OPPO、VIVO、荣耀 HMS、Apple APNs，一次接入全平台触达。",
      },
      {
        icon: "database",
        title: "MySQL 持久化",
        description: "消息存储、离线缓冲、已读状态全部持久化，用户上线自动拉取离线消息。",
      },
      {
        icon: "docker",
        title: "Docker 一键部署",
        description: "提供完整 Dockerfile 和环境变量配置，云服务器 5 分钟完成部署上线。",
      },
      {
        icon: "sdk",
        title: "Flutter SDK",
        description: "配套 Flutter 客户端 SDK，直接集成到你的 Flutter App，无需重复造轮子。",
      },
    ],
    steps: [
      { step: "01", title: "联系接入", description: "发送邮件说明你的产品需求，获取接入方案和技术文档。" },
      { step: "02", title: "部署配置", description: "使用 Docker 镜像快速部署服务端，配置数据库和推送厂商密钥。" },
      { step: "03", title: "SDK 集成", description: "将 Flutter SDK 集成到你的 App，即可拥有完整即时通讯能力。" },
    ],
    cta: {
      label: "联系我们获取接入方案",
      href: "mailto:smartv@qq.com",
    },
  },

  // ==================== 导航链接 ====================
  nav: [
    { label: "产品特性", href: "/#features" },
    { label: "截图展示", href: "/#screenshots" },
    { label: "商家接入", href: "/business" },
    { label: "下载", href: "/download" },
  ],

  // ==================== 统计服务配置 ====================
  // 后端统计 API 地址，留空则不上报（本地开发）
  // 部署时设置为实际的后端服务地址，例如 "https://api.example.com"
  statsApiBase: process.env.NEXT_PUBLIC_STATS_API_URL ?? '',

  // 当前网站的 site_id，多站点接入时各站点使用不同的值
  statsSiteId: 'iwithyou_web',

  // ==================== 联系信息 ====================
  contact: {
    email: "smartv@qq.com",
  },

  // ==================== 页脚 ====================
  footer: {
    icp: "粤ICP备2024260305号-2",
    icpUrl: "https://beian.miit.gov.cn/",
    copyright: `© ${new Date().getFullYear()} iWithYou. All rights reserved.`,
    links: [
      { label: "隐私政策", href: "/privacy" },
      { label: "联系我们", href: "mailto:smartv@qq.com" },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
