export interface ColorSupportObject {
  level: number;
  hasBasic: boolean;
  has256: boolean;
  has16m: boolean;
}

export type ColorSupportValue = false;

export type ColorSupport =
  | ColorSupportValue
  | ColorSupportObject


export interface SupportsColor {
  stdout: ColorSupport;
  stderr: ColorSupport;
  (stream: HasTTY, options?: SupportsColorOptions): ColorSupport;
}

export interface SupportsColorOptions {
  streamIsTTY?: boolean;
  sniffFlags?: boolean;
}

/**
 * from https://github.com/chalk/supports-color/blob/main/index.js
 */

export interface HasTTY {
  /**
   * @see {@link tty.WriteStream}
   * @see {@link tty.ReadStream}
   */
  isTTY?: boolean;
}