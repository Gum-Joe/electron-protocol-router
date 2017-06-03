/**
 * @overview Interfaces
 */

/**
 * Electron interface
 * @interface
 */
export interface Electron {
  protocol: {
    registerBufferProtocol: (scheme: string, handler: (req: Req, callback: (res: ArrayBuffer) => void) => void, errHandler: (err: Error | TypeError | SyntaxError) => void) => void,
    registerStandardSchemes: (scheme: string[]) => void,
  };
}

/**
 * Request Interface
 * @interface
 */
export interface Req {
  url: string;
  method: string;
}

/**
 * Route interface
 * @interface
 */
export interface Route {
  method: string;
  route: string; // Route to server
  handler: (req: Req, res: object) => void;
}
