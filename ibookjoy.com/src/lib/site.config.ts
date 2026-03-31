/**
 * 约享平台 — 集中配置文件
 * 所有需要自定义的信息都在这里修改，无需改动其他文件
 */

/**
 * 部署子路径前缀（由 next.config.ts 的 NEXT_PUBLIC_BASE_PATH 注入）
 * 用于在静态导出模式下为图片路径手动补全前缀
 */
export const BASE_PATH: string = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// --- 品牌信息 ---
export const BRAND = {
  /** 网站/平台名称，显示在导航栏、页脚、标题栏 */
  name: '约享平台',
  /** Logo 图片路径（放在 public/ 目录下，例如 '/logo.png'）；留空则回退到 logoChar 文字徽章 */
  logoImage: `${BASE_PATH}/logo.png`,
  /** Logo 左上角的单字徽章（logoImage 为空时使用） */
  logoChar: '约',
  /** 网站 SEO 默认描述 */
  seoDescription: '面向服务行业的一站式智能预约管理平台。覆盖健身私教、美容美发、教育培训、医疗健康等6大行业，提供预约、支付、核销、结算全流程数字化解决方案。',
  /** 网站 SEO 关键词 */
  seoKeywords: ['预约系统', '预约小程序', '健身预约', '教练管理', '课程预约', 'SaaS', '微信小程序'],
};

// --- 联系方式 ---
export const CONTACT = {
  /** 咨询电话（留空 '' 则自动隐藏该项） */
  phone: '',
  /** 联系邮箱（留空 '' 则自动隐藏） */
  email: 'smartv@qq.com',
  /** 微信客服号（留空 '' 则自动隐藏） */
  wechat: 'sheltonwan',
  /** 公司地址（留空 '' 则自动隐藏） */
  address: '',
  /**
   * 小程序码图片路径，相对于 /public 目录
   * 示例：'/miniprogram-qr.png' → 将图片放到 website/public/miniprogram-qr.png
   * 留空 '' 则显示占位符
   */
  qrCodeImage: `${BASE_PATH}/qr.png`,
};

// --- 首页统计数字 ---
export const STATS = [
  { value: 6,     suffix: ' 大行业', label: '覆盖服务行业' },
  { value: 68000, suffix: '+',       label: '行代码精心打磨' },
  { value: 42,    suffix: '+',       label: '核心功能模块' },
  { value: 11,    suffix: ' 种',     label: '消息通知场景' },
];

// --- 定价方案 ---
export const PRICING = {
  /** 专业版价格（如 '¥299'；设为 '免费' 则不显示付费周期） */
  proPrice: '¥299',
  /** 付费周期，如 '/月' 或 '/年' */
  proPeriod: '/月',
  /** 专业版最大服务者数量 */
  proMaxProviders: 20,
};

// --- 页脚 ---
export const FOOTER = {
  /** 页脚品牌简介 */
  tagline: '面向服务行业的一站式智能预约管理平台，从预约到核销，全流程数字化闭环。',
  /** 服务协议链接（留空 '' 则显示纯文字） */
  tosUrl: '',
  /** 隐私政策链接（留空 '' 则显示纯文字） */
  privacyUrl: '/privacy',
};
