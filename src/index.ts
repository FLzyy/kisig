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

export const dots: CliSpinner = {
  interval: 80,
  frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
};

export default class Spinner {
  text: string;
  color: string;
  check: string;
  x: string;
  cliSpinner: CliSpinner;
  stream: NodeJS.WriteStream;

  private interval: NodeJS.Timer | null;
  private i = 0;

  constructor(text?: string, config?: SpinnerConfig) {
    this.color = "33";
    this.check = "\x1b[32m✔\x1b[0m";
    this.x = "\x1b[31m✘\x1b[0m";
    this.cliSpinner = dots;
    this.stream = process.stdout;

    if (config) this.handleConfig(config);
    if (text) {
      this.text = text;
      this.start();
    }
  }

  start(): this {
    if (!this.text) throw new Error("no text");
    if (!this.cliSpinner) throw new Error("no cliSpinner");

    this.interval = setInterval(() => {
      this.stream.write(
        `\r\x1b[${this.color}m${this.cliSpinner.frames[this.i++]}\x1b[0m ${
          this.text
        }`
      );
      this.i %= this.cliSpinner.frames.length;
    }, this.cliSpinner.interval ?? 80);

    return this;
  }

  finish(icon: "check" | "x", text?: string, config?: SpinnerConfig): this {
    if (!this.interval) throw new Error("not started");
    if (text) this.text = text;
    if (config) this.handleConfig(config);

    this.i = 0;
    clearInterval(this.interval);
    this.interval = null;
    this.stream.write(
      `\r${this[icon]}${text?.padStart(text.length + 1, " ") ?? ""}`
    );
    return this;
  }

  success(text?: string, config?: SpinnerConfig): this {
    this.finish("check", text, config);
    return this;
  }

  error(text?: string, config?: SpinnerConfig): this {
    this.finish("x", text, config);
    return this;
  }

  private handleConfig(config: SpinnerConfig): this {
    for (const [key, value] of Object.entries(config)) {
      this[key] = value;
    }

    return this;
  }

  get isSpinning(): Boolean {
    return !!this.interval;
  }

  set config(cfg: SpinnerConfig) {
    this.handleConfig(cfg);
  }

  get config(): SpinnerConfig {
    return {
      text: this.text,
      color: this.color,
      check: this.check,
      x: this.x,
      cliSpinner: this.cliSpinner,
      stream: this.stream,
    };
  }
}
