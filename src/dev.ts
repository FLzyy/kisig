import Spinner from "./index";

const spinner = new Spinner("Hello World!");

setTimeout(() => {
  spinner.config = {
    text: "h",
    cliSpinner: {
      frames: ["/", "\\"],
      interval: 1000,
    },
  };
}, 2000);
