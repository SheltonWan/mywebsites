// ─── 类型定义 ───────────────────────────────────────────────────────────────

export interface DownloadLinks {
  ios?:         string;
  android?:     string;
  macos_arm?:   string;
  macos_intel?: string;
  windows?:     string;
  web?:         string;
}

export interface ContactConfig {
  email: string;
}

export interface LegalLinks {
  privacyPolicyUrl?: string;
  supportPageUrl?:   string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ScenarioItem {
  chapter:    string;
  title:      string;
  date:       string;
  desc:       string;
  image:      string; // relative to /assets/images/
}

export interface ScreenshotItem {
  tag:   string;  // 分类标签
  title: string;
  desc:  string;
  image: string;  // relative to /assets/snapshots/
}

export interface StatItem {
  count:    number;
  label:    string;
  showPlus: boolean;
}

export interface PromoConfig {
  officerImageBasePath: string;
  officers:             string[];
  downloadLinks:        DownloadLinks;
  contact:              ContactConfig;
  legalLinks:           LegalLinks;
  faqItems:             FaqItem[];
  screenshots:          ScreenshotItem[];
  scenarios:            ScenarioItem[];
  stats:                StatItem[];
}

// ─── 配置数据 ────────────────────────────────────────────────────────────────

export const PROMO_CONFIG: PromoConfig = {

  officerImageBasePath: '/assets/officers/',

  officers: [
    '曹操', '刘备', '孙权', '诸葛亮', '关羽', '张飞', '赵云',
    '吕布', '周瑜', '司马懿', '马超', '黄忠', '魏延', '庞统',
    '夏侯惇', '张辽', '徐庶', '荀彧', '贾诩', '孙策',
    '夏侯渊', '许褚', '张郃', '徐晃',
  ],

  downloadLinks: {
    ios:         'https://www.pgyer.com/lyubuguitian-ios',
    android:     'https://www.pgyer.com/lyubuguitian-android',
    macos_arm:   'https://sango-1256315836.cos.ap-guangzhou.myqcloud.com/%E5%8D%A7%E9%BE%99%E9%A3%8E%E4%BA%91-1.0.0-AppleSilicon.dmg',
    macos_intel: 'https://sango-1256315836.cos.ap-guangzhou.myqcloud.com/%E5%8D%A7%E9%BE%99%E9%A3%8E%E4%BA%91-1.0.0-Intel.dmg',
    windows:     'https://sango-1256315836.cos.ap-guangzhou.myqcloud.com/sango-windows-1.0.0-setup.exe',
    web:         'https://www.sangogame.com/sangoplay',
  },

  contact: {
    email: 'smart.xmu@me.com',
  },

  legalLinks: {
    privacyPolicyUrl: '/privacy/',
    supportPageUrl:   '/support/',
  },

  screenshots: [
    { tag: '地图',     title: '三国大地',     desc: '超过 150 座历史城池，俯瞰天下格局',           image: 'map.webp'       },
    { tag: '势力',     title: '群雄割据',     desc: '多方势力同台竞技，运筹帷幄决胜千里',           image: 'factions.webp'  },
    { tag: '城池',     title: '内政经营',     desc: '管理城池资源，扩充兵力，筑牢根基',             image: 'cities.webp'    },
    { tag: '武将',     title: '名将云集',     desc: '数十位历史名将各具属性，招募、策反皆可为用',   image: 'officers.webp'  },
    { tag: '武将',     title: '武将详情',     desc: '武力、统率、智力、政治四维属性一览无余',       image: 'officers_2.webp'},
    { tag: '武将',     title: '武将选择',     desc: '出征阵容灵活搭配，因敌制宜运兵如神',           image: 'officers_3.webp'},
    { tag: '战斗',     title: '沙场征战',     desc: '三兵种相克，主将率六部队阵型决胜负',           image: 'attack.webp'    },
    { tag: '战斗',     title: '攻城鏖战',     desc: '攻守城战斗模式，血战至最后一兵一卒',           image: 'attack_2.webp'  },
  ],

  scenarios: [
    {
      chapter: '第一章',
      title:   '吕布归天',
      date:    '公元 196 年',
      desc:    '吕布覆灭，曹操携天子以令诸侯，各路诸侯群雄逐鹿。曹操、袁绍、孙策、刘备等十余方势力割据一方。',
      image:   'intro_ch1.jpg',
    },
    {
      chapter: '第二章',
      title:   '赤壁之战',
      date:    '公元 208 年',
      desc:    '曹操挥师南下，孙刘联军于赤壁展开决战。这场改变天下格局的大战，将由你来书写结局。',
      image:   'intro_ch2.jpg',
    },
    {
      chapter: '第三章',
      title:   '蜀地偏安',
      date:    '公元 212 年',
      desc:    '三足鼎立初现，刘备入蜀，天下三分格局逐渐成形。群雄争霸进入新的阶段。',
      image:   'intro_ch3.jpg',
    },
    {
      chapter: '第四章',
      title:   '刘禅即位',
      date:    '公元 225 年',
      desc:    '刘备驾崩，刘禅继位，诸葛亮主持蜀汉大局。魏蜀吴三国鼎立，谁将最终一统天下？',
      image:   'intro_ch4.jpg',
    },
  ],

  stats: [
    { count: 150, label: '历史城池', showPlus: true  },
    { count: 6,   label: '城池类型', showPlus: false },
    { count: 70,  label: '名将武将', showPlus: true  },
    { count: 4,   label: '历史剧本', showPlus: false },
  ],

  faqItems: [
    {
      q: '游戏支持哪些平台？',
      a: '卧龙风云目前支持 iOS、Android、macOS（Apple Silicon & Intel 双版本）、Windows 以及 Web 浏览器五大平台，下载后即可畅玩。',
    },
    {
      q: '如何保存游戏进度？',
      a: '游戏支持多个本地存档槽位，在游戏设置界面可随时手动保存；退出时也会自动记录进度，下次打开直接继续。',
    },
    {
      q: '游戏支持哪些语言？',
      a: '目前界面支持简体中文、繁体中文、英文、日文四种语言，可在游戏设置中随时切换。',
    },
    {
      q: '遇到 Bug 或游戏崩溃怎么办？',
      a: '请将问题描述（设备型号、操作系统版本及复现步骤）通过支持页面的邮件入口发送给我们，我们会尽快跟进修复。',
    },
    {
      q: '如何提交功能建议？',
      a: '欢迎将你的想法通过邮件联系我们，优质建议将直接影响游戏的后续更新方向。',
    },
    {
      q: '不同平台的存档是否互通？',
      a: '当前版本存档保存在本地设备上，暂不支持跨平台同步。云端存档功能在规划中，敬请期待。',
    },
  ],
};
