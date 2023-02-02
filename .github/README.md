# kisig

[![npm version](https://img.shields.io/npm/v/kisig)](https://www.npmjs.com/package/kisig)
[![npm downloads](https://img.shields.io/npm/dw/kisig.svg)](https://www.npmjs.com/package/kisig)
[![CodeFactor](https://www.codefactor.io/repository/github/flzyy/kisig/badge)](https://www.codefactor.io/repository/github/flzyy/kisig)

> Lightweight terminal spinners.

## Usage

```js
import Spinner from "kisig";

const spinner = new Spinner("Loading Content");

try {
  // Do Something...

  spinner.success("Finished loading your content!");
} catch (err) {
  spinner.error(`Something went wrong: ${err}`);
}

spinner.text = "Loading new Stuff";
spinner.color = "32"; // Ansi color code
spinner.check = "🟢"; // Set the icon for success()
spinner.x = "🔴"; // Set the icon for error()

// or...

spinner.config = {
  text: "Loading new Stuff",
  color: "32",
  check: "🟢",
  x: "🔴",
};
```

## API

### `new Spinner(text?: string, config?: SpinnerConfig)`

Class to create a new spinner object. If text is passed, it will automatically start it.

### `<Spinner>.start()`

Starts the spinner, if text and/or `cliSpinner` is not provided it will throw an `Error` object.

### `<Spinner>.success(text?: string, config?: SpinnerConfig)`

Stops the spinner with the `check` icon and replaces the text if provided.

### `<Spinner>.error(text?: string, config?: SpinnerConfig)`

Stops the spinner with the `x` icon and replaces the text if provided.

### `<Spinner>.isSpinning`

Returns a boolean value of whether or not the current `Spinner` instance is spinning.

### `<Spinner>.[property]`<sup>get/set</sup>

- `config` - Shorthand property for setting the following.
- `text` - Text used after the loading icon.
- `color` (`33`) - Ansi color code used for loading icon.
- `check` (`\x1b[32m✔\x1b[0m`) - String used for `<Spinner>.success()`'s icon.
- `x` (`\x1b[31m✘\x1b[0m`) - String used for `<Spinner>.error()`'s icon.
- `cliSpinner` ([`dots`](https://github.com/sindresorhus/cli-spinners/blob/HEAD/spinners.json)) - An object with the properties: `frames`, `interval`. (Same structure of spinners in [`cli-spinners`](https://github.com/sindresorhus/cli-spinners))
- `stream` (`process.stdout`) - Stream used for output.
