# kisig

> Lightweight terminal spinners.

## Usage

```js
import Spinner from "kisig";

const spinner = new Spinner("Loading Content");

try {
  spinner.success("Finished loading your content!");
} catch (err) {
  spinner.error(`Something went wrong: ${err}`);
}
```

_[Read the rest of the documentation on github](https://github.com/FLzyy/kisig)_
