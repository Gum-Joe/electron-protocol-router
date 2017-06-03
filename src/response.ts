/**
 * @overview Response object
 */

/**
 * Response class
 * @class Response
 * @param {Function} callback Callback to handle response
 */
export class Response {
  public callback: (res: ArrayBuffer) => void;
  public contents: ArrayBuffer;
  private encoder: (contents: any) => any;
  constructor(callback: (res: ArrayBuffer) => void, encoder: (contents: any) => any) {
    this.callback = callback;
    this.encoder = encoder;
  }

  /**
   * Send text
   * @param text {String} Text to send
   */
  public send(text: string) {
    this.contents = this.encoder(text);
  }

  /**
   * Handles & ends the response
   */
  public end() {
    this.callback(this.contents);
  }

}
