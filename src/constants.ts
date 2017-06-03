/**
 * @overview Contains constants & constant type
 */
export class Constant {
  public constant: any;

  constructor(constant: any) {
    this.constant = constant;
  }
}

export const buffer = new Constant("buffer");
export const bufferEncoder = new Constant((contents: any) => new ArrayBuffer(contents));
