import type { Metadata } from "next";
import FeaturesContent from "./FeaturesContent";

export const metadata: Metadata = {
  title: "功能介绍",
  description:
    "约享平台完整功能清单：用户端15项、服务端10项、管理端17项，覆盖预约、支付、核销、结算全流程。",
};

export default function FeaturesPage() {
  return <FeaturesContent />;
}
