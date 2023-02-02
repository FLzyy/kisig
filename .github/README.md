# kisig

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
