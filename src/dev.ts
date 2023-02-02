import Spinner from "./index";

const spinner = new Spinner("Hello World!");

setTimeout(() => {
  spinner.success("asdasdw", {
    check: "a",
  });
}, 4000);
