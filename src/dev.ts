import { Spinner } from "./index";

const spinner = new Spinner("Hello World!");

setTimeout(() => {
  spinner.success();
}, 4000);
