/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-readonly */

interface SpinnerConfig {
  text?: string;
  color?: string;
  check?: string;
  x?: string;
  cliSpinner?: CliSpinner;
}

interface CliSpinner {
  interval: number;
  frames: string[];
}

export const dots: CliSpinner = {
  interval: 80,
  frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
};

export class Spinner {
  text: string;
  color: string;
  check: string;
  x: string;
  cliSpinner: CliSpinner;

  private interval: NodeJS.Timer;
  private i = 0;

  constructor(text?: string, config?: SpinnerConfig) {
    this.color = "33";
    this.check = "\x1b[32m✔\x1b[0m";
    this.x = "\x1b[31m✘\x1b[0m";
    this.cliSpinner = dots;

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
      process.stdout.write(
        `\r\x1b[${this.color}m${this.cliSpinner.frames[this.i++]}\x1b[0m ${
          this.text
        }`
      );
      this.i %= this.cliSpinner.frames.length;
    }, this.cliSpinner.interval);

    return this;
  }

  finish(icon: string): this {
    if (!this.interval) throw new Error("not started");

    this.i = 0;
    clearInterval(this.interval);
    console.log(`\r${icon}`);
    return this;
  }

  success(): this {
    this.finish(this.check);
    return this;
  }

  error(): this {
    this.finish(this.x);
    return this;
  }

  private handleConfig(config: SpinnerConfig): this {
    for (const [key, value] of Object.entries(config)) {
      this[key] = value;
    }

    return this;
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
    };
  }
}
