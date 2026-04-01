/**
 * 根据下载 URL 智能判断按钮文案和是否为内测包
 */

interface PlatformLinkInfo {
  label:       string;          // 按钮文案
  isBeta:      boolean;         // 是否内测包（蒲公英、fir.im 等）
  platformKey: string | null;   // 传给统计接口的 platform 字段
}

export function getPlatformLinkInfo(url: string | undefined): PlatformLinkInfo | null {
  if (!url) return null;

  const u = url.toLowerCase();

  if (u.includes('pgyer.com') || u.includes('fir.im') || u.includes('firim.net')) {
    if (u.includes('ios') || u.includes('iphone') || u.includes('ipad')) {
      return { label: 'iOS 内测版', isBeta: true, platformKey: 'ios' };
    }
    if (u.includes('android')) {
      return { label: 'Android 内测版', isBeta: true, platformKey: 'android' };
    }
    return { label: '内测版下载', isBeta: true, platformKey: null };
  }
  if (u.includes('apps.apple.com') || u.includes('itunes.apple.com')) {
    return { label: '前往 iOS App Store', isBeta: false, platformKey: 'ios' };
  }
  if (u.includes('play.google.com')) {
    return { label: '前往 Google Play', isBeta: false, platformKey: 'android' };
  }
  if (u.endsWith('.exe') || u.includes('windows') || u.includes('setup')) {
    return { label: '下载 Windows 安装包', isBeta: false, platformKey: 'windows' };
  }
  if (u.endsWith('.dmg') || u.includes('macos') || u.includes('applesili') || u.includes('intel')) {
    if (u.includes('applesili') || u.includes('arm') || u.includes('m1') || u.includes('m2') || u.includes('m3')) {
      return { label: '下载 macOS (Apple Silicon)', isBeta: false, platformKey: 'mac' };
    }
    if (u.includes('intel') || u.includes('x86') || u.includes('x64')) {
      return { label: '下载 macOS (Intel)', isBeta: false, platformKey: 'mac' };
    }
    return { label: '下载 macOS 安装包', isBeta: false, platformKey: 'mac' };
  }
  if (u.includes('sangogame.com') || u.includes('play') || u.includes('web')) {
    return { label: '立即在线游玩', isBeta: false, platformKey: 'web' };
  }

  return { label: '立即下载', isBeta: false, platformKey: null };
}
