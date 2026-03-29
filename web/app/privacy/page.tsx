import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "隐私政策 — iWithYou",
  description: "iWithYou 隐私政策，说明我们如何收集、使用和保护您的个人信息。",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-16 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">iWithYou 隐私政策</h1>
          <p className="text-sm text-gray-400 mb-10">最后更新：2024年</p>

          <div className="prose prose-gray max-w-none space-y-10 text-gray-700 text-sm leading-relaxed">

            {/* 概述 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">概述</h2>
              <p>
                感谢您使用 iWithYou！我们尊重您对于隐私的关注，并感谢您对我们的信任和信心。以下是本《隐私政策》中包含的信息摘要。本摘要旨在帮助您把握政策要点，阅读本摘要并不代表已阅读本政策全文。
              </p>
              <p className="mt-2">
                如果您是 iWithYou 用户，即您已通过您的电子邮箱进行注册，本《隐私政策》就适用于您。
              </p>
            </section>

            {/* 我们收集哪些信息 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">我们收集哪些信息</h2>

              <h3 className="font-medium text-gray-800 mt-4 mb-2">注册数据和登录数据</h3>
              <p>您的名字、昵称、IP 地址、账户标识符、区域、用于注册账户的电子邮件地址和注册日期。</p>

              <h3 className="font-medium text-gray-800 mt-4 mb-2">共享信息 – 个人资料媒体</h3>
              <p>包括您向其他用户提供的所有信息，或其他 iWithYou 用户提供的关于您的信息，包括社区和状态帖子。</p>

              <h3 className="font-medium text-gray-800 mt-4 mb-2">个人设置</h3>
              <p>包括只有您可以查看而不与其他用户分享的个人账户设置，如自定义 iWithYou 体验设置、添加到个人账户和通讯录中的个人注释和详细信息。</p>

              <h3 className="font-medium text-gray-800 mt-4 mb-2">聊天数据</h3>
              <p>
                您与另一用户或一群用户之间的通信内容，我们采用了加密方式进行传输。我们不会将聊天数据永久保留在我们的服务器上，只是通过我们的服务器对这些信息进行传输，以便将其分发给您的聊天数据的预期接收者。聊天数据仅存储在您的设备以及您已向其发送通信的用户之设备上（您的接收者将您的通信内容存储至其收藏，或群聊管理员添加群公告的情况除外）。
              </p>
              <p className="mt-2 text-gray-500">法律依据：为履行我们与您签订以提供 iWithYou 聊天服务的合同所必需。</p>

              <h3 className="font-medium text-gray-800 mt-4 mb-2">使用功能时提供的信息</h3>
              <p>当您使用应用内提供的某些功能（例如，将照片、视频发布到社区）时，我们将处理您的信息以提供这些功能。</p>
            </section>

            {/* 我们如何使用您的信息 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">我们如何使用您的信息</h2>
              <p>我们会使用您的信息：</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                <li>向您提供 iWithYou 服务</li>
                <li>允许您与其他用户交流</li>
                <li>让您可以使用 iWithYou 上提供的功能</li>
                <li>改进和支持您的 iWithYou 体验</li>
              </ul>
              <p className="mt-3">
                如果您是孩子的父母或监护人并已允许他们使用 iWithYou，则我们将保留您提供的联系信息，以确保我们可验证您就您孩子账号提出的任何请求或质疑。
              </p>
            </section>

            {/* 我们与谁共享您的数据 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">我们与谁共享您的数据</h2>
              <p>
                除非为了提供服务（例如邮箱服务提供商）的需要，我们不会与第三方共享您的个人信息。我们采取了严格的内部控制措施，仅限指定人员才能访问您的数据。
              </p>
            </section>

            {/* 信息保留期限 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">我们会将您的信息保留多久</h2>
              <p>
                我们保留您信息的时间取决于信息类型，例如登录数据从收集之日起最多保留 90 天。我们保留您信息的时间不会超过法律规定的期限。
              </p>
            </section>

            {/* 数据权利 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">您如何对自己的数据行使权利</h2>
              <p>
                根据您的居住地，您可能对您的数据及我们使用方式拥有特殊权利，其中包括：访问数据、删除数据、限制数据的使用方式、拒绝使用数据，以及获取您的信息副本。
              </p>
            </section>

            {/* 第三方 SDK */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">第三方 SDK</h2>
              <p>
                为保障消息实时送达，我们的应用直接集成了主流手机厂商的推送 SDK，并在服务端通过自研推送服务与各厂商推送平台对接。我们会对所有第三方 SDK 进行严格安全评估，仅收集推送所必需的最小数据范围。
              </p>
              <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-gray-100 text-gray-600">
                    <tr>
                      <th className="px-4 py-2 text-left">SDK 名称</th>
                      <th className="px-4 py-2 text-left">公司</th>
                      <th className="px-4 py-2 text-left">使用目的</th>
                      <th className="px-4 py-2 text-left">隐私政策</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-4 py-3">
                        华为推送服务（HMS Push）
                        <br /><span className="text-gray-400">Android（华为 / 鸿蒙设备）</span>
                      </td>
                      <td className="px-4 py-3">华为技术有限公司</td>
                      <td className="px-4 py-3">向华为 / 鸿蒙设备用户下发通知消息</td>
                      <td className="px-4 py-3">
                        <a href="https://consumer.huawei.com/cn/privacy/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">查看</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        荣耀推送（Honor Push）
                        <br /><span className="text-gray-400">Android（荣耀设备）</span>
                      </td>
                      <td className="px-4 py-3">荣耀终端有限公司</td>
                      <td className="px-4 py-3">向荣耀设备用户下发通知消息</td>
                      <td className="px-4 py-3">
                        <a href="https://www.hihonor.com/cn/privacy/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">查看</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        小米推送（Mi Push）
                        <br /><span className="text-gray-400">Android（小米 / Redmi 设备）</span>
                      </td>
                      <td className="px-4 py-3">北京小米科技有限责任公司</td>
                      <td className="px-4 py-3">向小米 / Redmi 设备用户下发通知消息</td>
                      <td className="px-4 py-3">
                        <a href="https://dev.mi.com/console/doc/detail?pId=1822" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">查看</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        OPPO 推送（Heytap Push）
                        <br /><span className="text-gray-400">Android（OPPO / 一加等设备）</span>
                      </td>
                      <td className="px-4 py-3">OPPO 广东移动通信有限公司</td>
                      <td className="px-4 py-3">向 OPPO 等设备用户下发通知消息</td>
                      <td className="px-4 py-3">
                        <a href="https://open.oppomobile.com/new/developmentDoc/info?id=10288" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">查看</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        VIVO 推送
                        <br /><span className="text-gray-400">Android（vivo 设备）</span>
                      </td>
                      <td className="px-4 py-3">维沃移动通信有限公司</td>
                      <td className="px-4 py-3">向 vivo 设备用户下发通知消息</td>
                      <td className="px-4 py-3">
                        <a href="https://dev.vivo.com.cn/documentCenter/doc/365" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">查看</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        Apple 推送通知服务（APNs）
                        <br /><span className="text-gray-400">iOS / macOS</span>
                      </td>
                      <td className="px-4 py-3">苹果公司（Apple Inc.）</td>
                      <td className="px-4 py-3">向 iOS / macOS 用户下发通知消息</td>
                      <td className="px-4 py-3">
                        <a href="https://www.apple.com/cn/privacy/" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">查看</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-gray-500">
                <p className="font-medium text-gray-700 mb-1">各推送 SDK 通常收集的信息：</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><span className="font-medium">设备标识符：</span>设备 ID（如 Android ID、推送 Token）、设备型号、操作系统版本</li>
                  <li><span className="font-medium">网络信息：</span>IP 地址、联网方式</li>
                  <li><span className="font-medium">通知状态：</span>通知权限开启状态、消息到达 / 点击回执</li>
                </ul>
                <p className="mt-2 text-xs">以上信息仅用于向您的设备可靠下发通知，各厂商实际收集范围以其隐私政策为准。</p>
              </div>
            </section>

            {/* 数据控制方 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">数据控制方</h2>
              <p>深圳市羽聪软件有限公司</p>
            </section>

            {/* 联系我们 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">联系我们</h2>
              <p>
                如果您对本《隐私政策》或您的个人信息使用有任何疑问或投诉，请发送电子邮件至{" "}
                <a href="mailto:smartv@qq.com" className="text-brand-500 hover:underline">
                  smartv@qq.com
                </a>{" "}
                联系我们的数据保护官。
              </p>
              <p className="mt-2">
                如果您是 EEA、英国或瑞士的居民，您有权向您所在国家的数据保护机构提出投诉。
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
