// Page copy. Every statement here is backed by how ExtendPad works; nothing is invented.

export const features = [
  {
    title: 'A real extended display',
    body: 'macOS sees a genuine second monitor, “ExtendPad Display”, in System Settings → Displays. Drag windows onto it, keep different apps on each screen, and arrange it like any monitor. It extends your desktop rather than mirroring it, and a Mirror mode is there when you want one.',
  },
  {
    title: 'A cursor that never lags behind',
    body: 'The pointer travels on its own channel at 120 Hz and is drawn by the tablet itself, so it stays fluid whatever the video is doing.',
  },
  {
    title: 'Hardware encode and decode',
    body: 'VideoToolbox encodes H.264 in hardware on the Mac, and the tablet’s MediaCodec hardware decoder puts it on screen.',
  },
  {
    title: 'Picks up where it left off',
    body: 'Unplug the cable or restart adb, and ExtendPad reconnects on its own.',
  },
  {
    title: 'Pairs itself over USB',
    body: 'A pairing token is delivered over ADB and both sides authenticate with HMAC-SHA256. There are no codes to type.',
  },
  {
    title: 'Lives in your menu bar',
    body: 'Choose quality and scaling from the menu bar: Native, Comfortable/Retina, Large or Performance.',
  },
  {
    title: 'Private by design',
    body: 'No Wi-Fi, internet, account, cloud or telemetry. The Mac listens only on 127.0.0.1. No root, no SIP changes and no kernel extension.',
  },
] as const;

export const speed = [
  {
    title: 'Hardware video, end to end',
    body: 'Frames are encoded by VideoToolbox on the Mac and decoded by MediaCodec on the tablet: dedicated video hardware on both sides of the cable.',
  },
  {
    title: 'A 120 Hz pointer',
    body: 'The cursor is sent separately at 120 Hz and drawn locally on the tablet, so pointing feels immediate even while the picture updates.',
  },
  {
    title: 'Over the cable, not the air',
    body: 'Video travels through adb reverse on the USB-C cable. It never touches your Wi-Fi.',
  },
  {
    title: 'Quiet when nothing moves',
    body: 'A still screen sends almost no video, so an idle second display costs next to nothing.',
  },
  {
    title: 'Presets for every priority',
    body: 'Switch between Native, Comfortable/Retina and Large scaling from the menu bar, or choose Performance, at about 1280×768, when frame rate matters most.',
  },
] as const;

export const setup = [
  {
    title: 'Prepare the tablet',
    steps: [
      'Open Settings → About tablet and tap <b>Build number</b> seven times to unlock Developer options.',
      'In Developer options, turn on <b>USB debugging</b>.',
      'Some tablets also need <b>Allow ADB debugging in charge only mode</b>; turn it on if you see it.',
    ],
  },
  {
    title: 'Prepare the Mac',
    steps: [
      'Install adb: <code>brew install android-platform-tools</code>',
      'Open the DMG and drag <b>ExtendPad</b> to Applications.',
      'The first time, right-click ExtendPad and choose <b>Open</b>.',
      'Allow <b>Screen Recording</b> when asked, then reopen ExtendPad.',
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

export const requirements = [
  {
    title: 'Mac',
    icon: 'apple',
    items: ['macOS 13 or later', 'Apple Silicon or Intel', 'adb, via <code>brew install android-platform-tools</code>', 'Screen Recording permission'],
  },
  {
    title: 'Tablet',
    icon: 'android',
    items: ['Android 8 or later, or HarmonyOS 2–4', 'USB debugging turned on', 'HarmonyOS NEXT does not run Android apps'],
  },
  {
    title: 'Cable',
    icon: 'usb',
    items: ['A USB-C cable that carries data, not just power'],
  },
  {
    title: 'Languages',
    icon: 'sparkles',
    items: ['English and Vietnamese, on both apps'],
  },
] as const;

export const faq = [
  {
    q: 'macOS won’t open ExtendPad the first time.',
    a: 'Right-click ExtendPad in Applications, choose <b>Open</b> and confirm. You only need to do this once; after that it opens normally.',
  },
  {
    q: 'The tablet asks me to confirm the install.',
    a: 'Some tablets ask for confirmation whenever an app is installed over USB. Confirm it on the tablet screen and the installation continues.',
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
  {
    q: 'What happens after a macOS update?',
    a: 'ExtendPad builds on macOS’s virtual display support. If an update changes it, ExtendPad shows a clear error instead of failing silently. macOS may also ask you to allow Screen Recording again.',
  },
] as const;
