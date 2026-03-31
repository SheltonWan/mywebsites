import type { Metadata } from "next";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  QrCode,
} from "lucide-react";
import { CONTACT } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "联系我们",
  description: "联系约享平台，免费体验小程序，预约演示或咨询定制方案。",
};

export default function ContactPage() {
  const contactItems = [
    { icon: Phone,         label: "咨询电话", value: CONTACT.phone },
    { icon: Mail,          label: "邮箱",     value: CONTACT.email },
    { icon: MessageSquare, label: "微信客服", value: CONTACT.wechat },
    { icon: MapPin,        label: "地址",     value: CONTACT.address },
  ].filter((item) => item.value);
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            联系我们
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            扫码体验小程序，或填写表单获取专属方案
          </p>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: QR Code + Contact Info */}
            <div>
              {/* QR Code */}
              <div className="bg-gray-50 rounded-3xl p-8 text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  扫码体验小程序
                </h3>
                <div className="inline-flex items-center justify-center w-48 h-48 bg-white rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden">
                  {CONTACT.qrCodeImage ? (
                    <Image
                      src={CONTACT.qrCodeImage}
                      alt="小程序码"
                      width={192}
                      height={192}
                      className="object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <QrCode className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <span className="text-sm text-gray-400">
                        小程序码
                      </span>
                      <span className="block text-xs text-gray-300 mt-1">
                        在 site.config.ts 配置 qrCodeImage
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  微信扫一扫，即刻体验完整功能
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                {contactItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                    <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-500" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{label}</div>
                      <div className="font-semibold text-gray-900">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-gray-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                获取专属方案
              </h3>
              <p className="text-sm text-gray-500 mb-8">
                填写信息，我们将在 24 小时内联系您
              </p>

              <form className="space-y-5" action="#" method="POST">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    姓名 *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                    placeholder="请输入您的姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    手机号 *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                    placeholder="请输入手机号码"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    所属行业
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition">
                    <option value="">请选择行业</option>
                    <option value="fitness">健身私教</option>
                    <option value="beauty">美容美发</option>
                    <option value="education">教育培训</option>
                    <option value="healthcare">医疗健康</option>
                    <option value="housekeeping">家政服务</option>
                    <option value="youth">青少年体能</option>
                    <option value="other">其他行业</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    需求描述
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition resize-none"
                    placeholder="请简要描述您的需求（可选）"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-brand-400 to-brand-500 text-white font-bold text-base rounded-xl shadow-lg shadow-brand-200 hover:shadow-brand-300 hover:scale-[1.02] transition-all"
                >
                  提交咨询
                </button>
                <p className="text-xs text-gray-400 text-center">
                  提交即代表您同意我们的服务条款和隐私政策
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
