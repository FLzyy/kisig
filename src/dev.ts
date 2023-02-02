import Spinner from "./index";

const spinner = new Spinner("Hello World!");

setTimeout(() => {
  spinner.config = {
    text: "h",
  };
}, 2000);
