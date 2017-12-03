const path = require('path');
const puppeteer = require('puppeteer');
const download = require('image-downloader');

const scrapeImgUrls = async () => {
  console.log('🚀  Launching...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('🌎  Visiting web page...');
  await page.goto('https://www.reddit.com/r/fakealbumcovers/');

  console.log('⛏  Scraping image URLs...');
  const results = await page.evaluate(() => {
    const imageLinks = [];
    const elements = document.querySelectorAll('.content > .spacer > #siteTable > .thing');
    for (const el of elements) {
      if (el.dataset.url.search(/(.jpg)|(.png)/) >= 0) {
        imageLinks.push(el.dataset.url);
      }
    }
    return imageLinks;
  });
  browser.close();
  return results;
}

const downloadImg = async (options = {}) => {
  try {
    const { filename, image } = await download.image(options);
    console.log('⬇️  ', path.basename(filename)); // => image.jpg
  }
  catch (e) {
    throw e;
  }
}

const downloadAll = async () => {
  const imgs = await scrapeImgUrls();

  await Promise.all(imgs.map(async (file) => {
    await downloadImg({
      url: file,
      dest: '../../../../Pictures/covers'
    });
  }));
  console.log(`👌  Done -- downloaded \x1b[36m${imgs.length}\x1b[0m album covers!`);
}

downloadAll();
