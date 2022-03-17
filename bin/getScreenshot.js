const puppeteer = require("puppeteer");
const { v4 } = require("uuid");
const CONDITIONS = require("./conditions");

const uuidv4 = v4;

async function launchPuppeteer(website, condition, prefix, path = false) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(website);
    await page.emulateVisionDeficiency(condition);

    const filename = `${prefix}-${condition}.png`;

    await page.screenshot({ path: path ? `${path}/${filename}` : filename });
    browser.close();

    return `Screenshot for a user with ${condition} at ${website} created`;
  } catch (error) {
    console.log(error);
    return "Oops, we're having an issue";
  }
}

async function getScreenshot(website, condition, path = false) {
  const prefix = uuidv4();

  if (condition == "all") {
    if (path) {
      console.log("Selecting all means your path will be ignored");
    }

    Promise.all([
      CONDITIONS.map(
        async (cdtn) => await launchPuppeteer(website, cdtn, prefix, path)
      ),
    ])
      .then(() => {
        return "Screenshots have been delivered";
      })
      .catch((err) => {
        console.log(err);
        return "Oops, we're having an issue";
      });
  } else {
    return launchPuppeteer(website, condition, path);
  }
}

module.exports = getScreenshot;
