import type { Metadata } from "next";
import { BRAND, CONTACT } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "隐私政策",
  description: `${BRAND.name}隐私政策 — 了解我们如何收集、使用和保护您的个人信息。`,
};

const sections = [
  {
    title: "一、信息收集",
    content: [
      {
        subtitle: "1. 您主动提供的信息",
        items: [
          "注册信息：微信头像、昵称、手机号码",
          "预约信息：姓名、联系方式、预约时间",
        ],
      },
      {
        subtitle: "2. 自动收集的信息",
        items: [
          "设备信息：设备型号、操作系统",
          "日志信息：访问时间、浏览记录",
          "位置信息：仅在您授权时收集",
        ],
      },
    ],
  },
  {
    title: "二、信息使用",
    items: [
      "提供、维护和改进我们的服务",
      "处理您的预约和订单",
      "向您发送服务通知和活动信息",
      "保障账户安全和服务安全",
      "遵守法律法规要求",
    ],
  },
  {
    title: "三、信息共享",
    paragraph:
      "我们不会出售您的个人信息。仅在以下情况下共享：",
    items: [
      "获得您的明确同意",
      "法律法规要求",
      "为提供服务必须的第三方合作（如支付服务）",
    ],
  },
  {
    title: "四、信息存储",
    items: [
      "您的信息存储于中华人民共和国境内",
      "我们采用业界标准的安全措施保护您的信息",
      "信息保存期限为服务期间及法律要求的必要期限",
    ],
  },
  {
    title: "五、信息安全",
    paragraph: "我们采取以下措施保护您的信息：",
    items: [
      "数据加密传输和存储",
      "访问权限管理",
      "安全审计和监控",
      "定期安全评估",
    ],
  },
  {
    title: "六、您的权利",
    paragraph: "您对个人信息享有以下权利：",
    rights: [
      { name: "查询权", desc: "查询您的个人信息" },
      { name: "更正权", desc: "更正不准确的信息" },
      { name: "删除权", desc: "删除您的个人信息" },
      { name: "撤回同意", desc: "撤回之前的授权" },
    ],
  },
  {
    title: "七、未成年人保护",
    items: [
      "我们不主动收集未成年人信息",
      "如发现误收集，将立即删除",
      "监护人可联系我们管理未成年人信息",
    ],
  },
  {
    title: "八、隐私政策更新",
    paragraph:
      "我们可能更新本政策，重大变更将通过平台通知您。继续使用本服务即表示您同意更新后的政策。",
  },
];

export default function PrivacyPage() {
  const contactValues = [
    CONTACT.email && `邮箱：${CONTACT.email}`,
    CONTACT.wechat && `微信：${CONTACT.wechat}`,
    CONTACT.phone && `电话：${CONTACT.phone}`,
  ].filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
            隐私政策
          </h1>
          <p className="text-gray-500 text-sm">
            本政策适用于 <span className="font-medium text-gray-700">{BRAND.name}</span> 旗下小程序及相关服务
          </p>
          <p className="text-gray-400 text-xs mt-2">最后更新：2025年1月</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100 overflow-hidden">
            {sections.map((section) => (
              <div key={section.title} className="px-8 py-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>

                {section.paragraph && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {section.paragraph}
                  </p>
                )}

                {/* 嵌套小节（信息收集） */}
                {"content" in section &&
                  section.content?.map((sub) => (
                    <div key={sub.subtitle} className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        {sub.subtitle}
                      </p>
                      <ul className="space-y-1.5 pl-4">
                        {sub.items.map((item) => (
                          <li
                            key={item}
                            className="text-sm text-gray-600 flex gap-2"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                {/* 普通列表 */}
                {"items" in section && section.items && (
                  <ul className="space-y-1.5 pl-4">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* 权利列表（加粗名称） */}
                {"rights" in section && section.rights && (
                  <ul className="space-y-2 pl-4">
                    {section.rights.map((r) => (
                      <li key={r.name} className="text-sm text-gray-600 flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                        <span>
                          <span className="font-semibold text-gray-800">{r.name}：</span>
                          {r.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* 联系我们 */}
            <div className="px-8 py-8 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 mb-4">九、联系我们</h2>
              <p className="text-sm text-gray-600 mb-3">
                如有任何隐私相关问题，请通过以下方式联系：
              </p>
              {contactValues.length > 0 ? (
                <ul className="space-y-1.5 pl-4">
                  {contactValues.map((c) => (
                    <li key={c as string} className="text-sm text-gray-600 flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                      {c}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 pl-4">
                  请通过平台内的客服功能联系我们。
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
