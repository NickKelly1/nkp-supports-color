import { SupportsColor } from './types';

// node.ts and browser.ts both export default supportsColor
// in NodeJS environments, node.js will be used
// in Browser environments, browser.js will be used
declare const supportsColor: SupportsColor;
export default supportsColor;
