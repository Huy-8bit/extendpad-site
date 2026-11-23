// Page copy. Facts only from the ExtendPad project notes; nothing here should be invented.

export const features = [
  {
    title: 'A real extended display',
    body: 'macOS sees a genuine second monitor, “ExtendPad Display”, in System Settings → Displays. Drag windows onto it, keep different apps on each screen, and arrange it like any monitor. It extends your desktop rather than mirroring it; an optional Mirror mode also exists.',
    icon: 'display',
  },
  {
    title: 'A cursor that stays smooth',
    body: 'The mouse cursor is sent separately at 120 Hz and drawn by the tablet, so it moves smoothly regardless of the video frame rate.',
    icon: 'cursor',
  },
  {
    title: 'Hardware encode and decode',
    body: 'VideoToolbox encodes H.264 in hardware on the Mac; the tablet’s MediaCodec hardware decoder draws it to a SurfaceView.',
    icon: 'chip',
  },
  {
    title: 'Reconnects on its own',
    body: 'Unplug the cable or restart adb and ExtendPad reconnects automatically.',
    icon: 'refresh',
  },
  {
    title: 'Automatic pairing over USB',
    body: 'A pairing token is delivered over ADB, and both sides authenticate with HMAC-SHA256. There is nothing to type.',
    icon: 'key',
  },
  {
    title: 'Menu-bar app with presets',
    body: 'Pick quality and scaling from the menu bar: Native, Comfortable/Retina, Large, or Performance.',
    icon: 'menu',
  },
  {
    title: 'Private by design',
    body: 'No Wi-Fi, internet, account, cloud or telemetry. The Mac listens only on 127.0.0.1. No root, no need to disable SIP, and no kernel extension.',
    icon: 'lock',
  },
] as const;

export const setup = [
  {
    title: 'Prepare the tablet',
    steps: [
      'Open Settings → About tablet and tap <b>Build number</b> seven times to unlock Developer options.',
      'In Developer options, turn on <b>USB debugging</b>.',
      'On Huawei tablets, also turn on <b>Allow ADB debugging in charge only mode</b>.',
    ],
  },
  {
    title: 'Prepare the Mac',
    steps: [
      'Install adb: <code>brew install android-platform-tools</code>',
      'Open the DMG and drag <b>ExtendPad</b> to Applications.',
      'For the first launch, right-click ExtendPad and choose <b>Open</b> (the app is ad-hoc signed).',
      'Grant <b>Screen Recording</b> when asked, then reopen ExtendPad.',
    ],
  },
  {
    title: 'Connect',
    steps: [
      'Plug the tablet in with a data-capable USB-C cable.',
      'Tap <b>Allow</b> on the tablet when it asks to allow USB debugging.',
      'If the tablet app isn’t installed yet, click <b>Install app on tablet</b> in the ExtendPad menu.',
      'Arrange the new display in System Settings → Displays.',
    ],
  },
] as const;

export const performance = {
  hardware: 'Huawei MatePad SE (AGS6-W09, HarmonyOS 2 / Android 10) with a MacBook Pro M1 Pro on macOS 15.7.4',
  rows: [
    { metric: 'Estimated capture → shown on tablet', value: '~30–40 ms' },
    { metric: 'Tablet hardware decode', value: '~7–12 ms' },
    { metric: 'USB round trip', value: '~5–7 ms' },
    { metric: 'Frame rate while moving windows', value: '~36–55 fps', note: 'The Performance preset (≈1280×768) runs at ~58 fps' },
    { metric: 'Static screen', value: '~0 fps', note: 'A few kbit/s' },
  ],
} as const;

export const limitations = [
  'ExtendPad uses a private macOS API, so a macOS update could break it. If that happens, the app shows an error.',
  'The Mac app is ad-hoc signed, not notarized. The first launch needs right-click → Open, and macOS may ask you to grant Screen Recording again after an update.',
  'The APK is debug-signed, so Huawei asks you to confirm each install over USB.',
  'Touch input is implemented but not yet verified on a real device.',
  'HarmonyOS NEXT cannot run Android APKs.',
  'The Mac needs adb installed (<code>brew install android-platform-tools</code>).',
] as const;

export const faq = [
  {
    q: 'macOS says the app can’t be opened.',
    a: 'The Mac app is ad-hoc signed rather than notarized, so macOS blocks a normal double-click the first time. Right-click ExtendPad in Applications and choose <b>Open</b>, then confirm.',
  },
  {
    q: 'Huawei blocks the install.',
    a: 'The APK is debug-signed, so Huawei asks for confirmation on every install over USB. Watch the tablet screen and confirm the install there.',
  },
  {
    q: 'The tablet isn’t detected.',
    a: 'Use a data-capable USB-C cable (some cables only charge), check that USB debugging is on, and tap <b>Allow</b> on the tablet’s prompt. Running <code>adb devices</code> on the Mac should list the tablet as <code>device</code>.',
  },
  {
    q: 'Does it need Wi-Fi?',
    a: 'No. Everything runs over the USB-C cable through <code>adb reverse</code>; no Wi-Fi or internet connection is used.',
  },
  {
    q: 'Is my screen sent anywhere?',
    a: 'No. The video goes only over the local USB connection to your tablet. The Mac listens only on 127.0.0.1, and there is no account, cloud or telemetry.',
  },
] as const;
