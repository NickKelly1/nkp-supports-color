/* eslint-env browser */

import { ColorSupport, SupportsColor } from './types';

/**
 * from https://github.com/chalk/supports-color/blob/main/browser.js
 */

const isBlinkBasedBrowser = /\b(Chrome|Chromium)\//.test(navigator.userAgent);

const colorSupport: ColorSupport = isBlinkBasedBrowser ? {
  level: 1,
  hasBasic: true,
  has256: false,
  has16m: false,
} : false;

const supportsColor: SupportsColor = function supportsColorBrowser() {
  return colorSupport;
};

supportsColor.stdout = colorSupport;
supportsColor.stderr = colorSupport;

export default supportsColor;