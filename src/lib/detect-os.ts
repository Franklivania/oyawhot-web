export type OSDevice =
  | "android"
  | "ios"
  | "windows"
  | "macos"
  | "linux"
  | "unknown";

export type DetectOSInput = {
  userAgent?: string;
  platform?: string;
};

export type OSInfo = {
  device: OSDevice;
  isMobile: boolean;
  isDesktop: boolean;
  userAgent: string;
  platform: string;
};

function getBrowserSignals(): DetectOSInput {
  if (typeof navigator === "undefined") {
    return {};
  }

  const uaDataPlatform = (
    navigator as Navigator & { userAgentData?: { platform?: string } }
  ).userAgentData?.platform;

  return {
    userAgent: navigator.userAgent || "",
    platform: uaDataPlatform || navigator.platform || "",
  };
}

export function detectOS(input?: DetectOSInput): OSInfo {
  const signals =
    input && (input.userAgent || input.platform) ? input : getBrowserSignals();

  const userAgent = (signals.userAgent || "").toLowerCase();
  const platform = (signals.platform || "").toLowerCase();

  const isAndroid = /android/.test(userAgent) || /android/.test(platform);
  const isIOS =
    /iphone|ipad|ipod/.test(userAgent) ||
    (/mac/.test(platform) && /mobile/.test(userAgent));
  const isWindows = /windows|win32|win64|wow64/.test(userAgent + platform);
  const isMacOS =
    !isIOS &&
    (/macintosh|mac os x/.test(userAgent) || /mac|darwin/.test(platform));
  const isLinux = /linux|x11/.test(userAgent + platform);

  let device: OSDevice = "unknown";

  if (isAndroid) {
    device = "android";
  } else if (isIOS) {
    device = "ios";
  } else if (isWindows) {
    device = "windows";
  } else if (isMacOS) {
    device = "macos";
  } else if (isLinux) {
    device = "linux";
  }

  const isMobile = device === "android" || device === "ios";

  return {
    device,
    isMobile,
    isDesktop: !isMobile && device !== "unknown",
    userAgent: signals.userAgent || "",
    platform: signals.platform || "",
  };
}

export function matchDevice<T>(
  os: OSInfo,
  handlers: Partial<Record<OSDevice, T>> & { default: T }
): T {
  return handlers[os.device] ?? handlers.default;
}
