/**
 * @overview Contains constants & constant type
 */
export class Constant {
  public constant: string;

  constructor(constant: string) {
    this.constant = constant;
  }
}

export const buffer = new Constant("buffer");
