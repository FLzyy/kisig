import { Spinner } from "./index";

const spinner = new Spinner("Hello World!");

setTimeout(() => {
  spinner.config = {
    text: "World Hello!",
    color: "31",
  };
}, 4000);
