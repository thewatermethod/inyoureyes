const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const getScreenshot = require("./getScreenshot");
const CONDITIONS = require("./conditions");
const LYRICS = require("./lyrics");

module.exports = function () {
  yargs
    .usage("Usage: -w <website>")
    .option("w", {
      alias: "website",
      describe: "Website to be tested",
      type: "string",
      demandOption: true,
    })
    .usage("Usage: -c <condition>")
    .option("c", {
      alias: "condition",
      describe: "Condition to test for",
      choices: [...CONDITIONS, "all"],
      demandOption: true,
    })
    .usage("Usage: -p <path>")
    .option("p", {
      alias: "path",
      describe: "directory path to save screenshot",
      type: "string",
    })
    .usage("Usage: -l <lyrics>")
    .option("l", {
      alias: "lyrics",
      describe: "instead of helpful info, print lyrics as well as screenshot",
      type: "string",
    }).argv;

  const argv = yargs(hideBin(process.argv)).argv;

  const website = argv.w;
  const condition = argv.c;
  const printLyrics = argv.l;

  getScreenshot(website, condition).then((value) => {
    let text = value;

    if (condition == "all") {
      text = "Your screenshots are pending";
    }

    if (printLyrics) {
      const boxenOptions = {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "#800080",
      };

      LYRICS.forEach((stanza, index) => {
        setTimeout(() => {
          console.log(boxen(stanza, boxenOptions));
        }, 1500 * index);
      });
    } else {
      const message = chalk.white.bold(text);

      const boxenOptions = {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "#800080",
      };

      const msgBox = boxen(message, boxenOptions);

      console.log(msgBox);
    }
  });
};
