/**
 * @overview Entry file for electron-protocol-router
 */
import debugModule from "debug";
import { Constant, buffer, bufferEncoder } from "./constants";
import { Electron, Req, Route } from "./interfaces";
import { Response } from "./response";

const debug = debugModule("electron-protocol-router"); // For debugging

/**
 * Router
 * @class Router
 * @param {Object} electron Electron from module
 */
export class Router {
  // Constants
  public static buffer: Constant = buffer;
  // Props
  public type: Constant;
  public name: string;

  // Private stuff
  private electron: Electron;
  private encoder: (contents: any) => any;
  private middleware: Array<(req: Req, res: (res: ArrayBuffer) => void) => void>;
  private routes: Route[];

  constructor(electron: Electron, type: Constant, name: string) {
    debug("Router created");
    this.electron = electron;
    this.type = type;
    this.name = name;
    this.middleware = [];
    this.routes = [];
    // Load as standard scheme
    this.electron.protocol.registerStandardSchemes([this.name]);
    // Encoder
    if (this.type === Router.buffer) {
      this.encoder = bufferEncoder.constant;
    }
  }

  /**
   * Use a certain error handler
   * @param {Function} handler Error Handler
   */
  public useErrorHandler(handler: (err: Error | TypeError | SyntaxError) => void) {
    this._errHander = handler;
  }

  /**
   * Init the router (creates the protocol)
   * @param {Constant} type One of the constants in ./constants.ts
   * @param {String} name What to put before :// for the protocol (i.e. app://)
   */
  public attach() {
    debug(`Initialising protocol ${this.name}:// of type ${this.type.constant}... `);
    if (this.type === Router.buffer) {
      // Register protocol as a buffer protocol
      this.electron.protocol.registerBufferProtocol(this.name, this._handleResponse, this._errHander);
    }
  }

  /**
   * Add middleware
   * @param {Function} middleware Middleware function
   */
  public use(middleware: (req: Req, res: (res: ArrayBuffer) => void) => void) {
    this.middleware.push(middleware);
  }

  /**
   * Adds a GET method
   * @param {String} route Route
   * @param {Function} handler Handler
   */
  public get(route: string, handler: (req: Req, res: object) => void) {
    this.routes.push({ method: "GET", handler, route });
  }

  /**
   * Adds a POST method
   * @param {String} route Route
   * @param {Function} handler Handler
   */
  public post(route: string, handler: (req: Req, res: object) => void) {
    this.routes.push({ method: "POST", handler, route });
  }

  /**
   * Handle routeing
   * @param {Object} req Request object
   * @param {Function} callback Electron callback
   */
  private _handleResponse(req: Req, callback: (res: ArrayBuffer) => void) {
    debug("Got a request");
    // Middleware
    this._runMiddleware(req, callback);
    // Run
    // routes list
    const routes = this.routes.filter((route) => route.method === req.method);
    const url = req.url.split(`${this.name}://`)[1];
    for (let route of routes) {
      if (route.route === url) {
        route.handler(req, new Response(callback, this.encoder));
      }
    }
  }

  /**
   * Run middlware
   * @param {Object} req Request object
   * @param {Function} res Electron callback
   */
  private _runMiddleware(req: Req, res: (res: ArrayBuffer) => void) {
    debug("Running middleware...");
    for (let middleware of this.middleware) {
      middleware(req, res);
    }
  }

  /**
   * Default error handler
   * @param {Error} err Error
   */
   private _errHander(err: Error | TypeError | SyntaxError) {
     debug("Error!");
     throw err;
   }
}
