/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-readonly */

export interface SpinnerConfig {
  text?: string;
  color?: string;
  check?: string;
  x?: string;
  cliSpinner?: CliSpinner;
  stream?: NodeJS.WriteStream;
}

export interface CliSpinner {
  interval?: number;
  frames: string[];
}

// https://github.com/sindresorhus/cli-spinners/blob/HEAD/spinners.json
export const dots: CliSpinner = {
  interval: 80,
  frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
};

export default class Spinner {
  text: string;
  color = "33";
  check = "\x1b[32m✔\x1b[0m";
  x = "\x1b[31m✘\x1b[0m";
  stream = process.stdout;

  private s = dots;
  private t: NodeJS.Timer | null;
  private i = 0;
  private l = 0;

  constructor(text?: string, config?: SpinnerConfig) {
    if (config) this.h(config);
    if (text) {
      this.text = text;
      this.start();
    }
  }

  private c(): this {
    if (!this.stream.isTTY) return this;

    this.stream.cursorTo(0);

    for (let i = 0; i < this.l; i++) {
      if (i > 0) {
        this.stream.moveCursor(0, -1);
      }

      this.stream.clearLine(1);
    }

    this.l = 0;

    return this;
  }

  start(): this {
    if (!this.text) throw new Error("no text");
    if (!this.cliSpinner) throw new Error("no cliSpinner");

    const self = (): void => {
      this.l = this.text.length;
      this.c().stream.write(
        `\x1b[${this.color}m${this.cliSpinner.frames[this.i++]}\x1b[0m ${
          this.text
        }`
      );
      this.i %= this.cliSpinner.frames.length;
      this.t = setTimeout(self, this.cliSpinner.interval ?? 80);
    };

    self();

    return this;
  }

  private o(): this {
    if (!this.t) throw new Error("not started");
    this.i = 0;
    clearTimeout(this.t);
    this.t = null;
    this.l = this.text.length;

    return this;
  }

  private f(icon: "check" | "x", text?: string, config?: SpinnerConfig): this {
    if (text) this.text = text;
    if (config) this.h(config);

    this.o().c().stream.write(`${this[icon]} ${this.text}`);
    return this;
  }

  success(text?: string, config?: SpinnerConfig): this {
    this.f("check", text, config);
    return this;
  }

  error(text?: string, config?: SpinnerConfig): this {
    this.f("x", text, config);
    return this;
  }

  private h(config: SpinnerConfig): this {
    for (const [key, value] of Object.entries(config)) {
      this[key] = value;
    }

    return this;
  }

  get isSpinning(): Boolean {
    return !!this.t;
  }

  set config(cfg: SpinnerConfig) {
    this.h(cfg);
  }

  set cliSpinner(cspinner: CliSpinner) {
    this.s = cspinner;
    if (this.t) this.o().start();
  }

  get cliSpinner(): CliSpinner {
    return this.s;
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  get config(): SpinnerConfig {
    return {
      text: this.text,
      color: this.color,
      check: this.check,
      x: this.x,
      cliSpinner: this.s,
      stream: this.stream,
    };
  }
}
