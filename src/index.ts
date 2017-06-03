/**
 * @overview Entry file for electron-protocol-router
 */
import debugModule from "debug";
import { Constant, buffer } from "./constants";

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
  private electron: object;

  constructor(electron: object) {
    debug("Router created");
    this.electron = electron;
  }

  /**
   * Init the router (creates the protocol)
   * @param type {Constant} One of the constants in ./constants.ts
   * @param name {String} What to put before :// for the protocol (i.e. app://)
   * @returns {Undefined} Nothing
   */
  public attach(type: Constant, name: string) {
    this.type = type;
    this.name = name;
    debug(`Initialising protocol ${name}:// of type ${type.constant}... `);
  }

}
