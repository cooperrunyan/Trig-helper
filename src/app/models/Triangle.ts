export class Triangle {
  _a: number = 0; // leg
  _b: number = 0; // leg
  _c: number = 0; // hypotenuse
  _X: number = 0; // Angle between a and c
  _Y: number = 0; // Angle between c and b
  _Z = 90; //        Right angle

  constructor() {
    this.init();
  }

  private init() {
    [this._X, this._Y] = Triangle.angles(this);
    [this._a, this._b, this._c] = Triangle.sides(this);
  }

  public get a() {
    return Triangle.sides(this)[0];
  }

  public get b() {
    return Triangle.sides(this)[1];
  }

  public get c() {
    return Triangle.sides(this)[2];
  }

  public get X() {
    return Triangle.angles(this)[0];
  }

  public get Y() {
    return Triangle.angles(this)[1];
  }

  public set a(inp: number) {
    this._a = inp;
  }

  public set b(inp: number) {
    this._b = inp;
  }

  public set c(inp: number) {
    this._c = inp;
  }

  public set X(inp: number) {
    this._X = inp;
  }

  public set Y(inp: number) {
    this._Y = inp;
  }

  static angles({ _a: a, _b: b, _c: c, _X: X, _Y: Y }: Triangle): [number, number] {
    if (X && !Y) return [X, Triangle.otherAngle(X)];
    if (Y && !X) return [Triangle.otherAngle(Y), Y];
    if (a && c) return [Triangle.toDegrees(Triangle.asin(a / c)), Triangle.toDegrees(Triangle.acos(a / c))];
    if (c && b) return [Triangle.toDegrees(Triangle.acos(b / c)), Triangle.toDegrees(Triangle.asin(b / c))];
    if (a && b) return [Triangle.toDegrees(Triangle.atan(a / b)), Triangle.toDegrees(Triangle.atan(b / a))];

    return [0, 0];
  }

  static sides({ _a: a, _b: b, _c: c, _X: X, _Y: Y }: Triangle): [number, number, number] {
    if (a && b && c) return [a, b, c];

    if (a && b) return [a, b, Math.sqrt(a ** 2 + b ** 2)];
    if (b && c) return [Math.sqrt(c ** 2 - b ** 2), b, c];
    if (a && c) return [a, Math.sqrt(c ** 2 - a ** 2), c];

    if (X) {
      if (a) return [a, a / Triangle.tan(Triangle.toRadians(X)), a / Triangle.sin(Triangle.toRadians(X))];
      if (b) return [Math.sqrt((b / Triangle.cos(Triangle.toRadians(X))) ** 2 - b ** 2), b, b / Triangle.cos(Triangle.toRadians(X))];
      if (c) return [c * Triangle.sin(Triangle.toRadians(X)), c * Triangle.cos(Triangle.toRadians(X)), c];
    } else if (Y) {
      if (a) return [a, a * Triangle.tan(Triangle.toRadians(Y)), a / Triangle.cos(Triangle.toRadians(Y))];
      if (b) return [Math.sqrt((b / Triangle.tan(Triangle.toRadians(Y))) ** 2 - b ** 2), b, b / Triangle.tan(Triangle.toRadians(Y))];
      if (c) return [c * Triangle.cos(Triangle.toRadians(Y)), c * Triangle.sin(Triangle.toRadians(Y)), c];
    }

    return [0, 0, 0];
  }

  static acos = (x: number) => Math.acos(x);
  static atan = (x: number) => Math.atan(x);
  static asin = (x: number) => Math.asin(x);

  static cos = (x: number) => Math.cos(x);
  static tan = (x: number) => Math.tan(x);
  static sin = (x: number) => Math.sin(x);

  static otherAngle = (angle: number) => 90 - angle;
  static toRadians = (degree: number) => degree * (Math.PI / 180);
  static toDegrees = (radian: number) => radian * (180 / Math.PI);
}
