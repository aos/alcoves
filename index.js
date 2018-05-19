const path = require('path');
const puppeteer = require('puppeteer');
const download = require('image-downloader');

// Relative path to directory to download images
const IMAGE_DIRECTORY = '../../../Pictures/covers';

const scrapeImgUrls = async () => {
  console.log('🚀  Launching...');
  // Launches puppeteer and goes to URL
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('🌎  Visiting web page...');
  await page.goto('https://old.reddit.com/r/fakealbumcovers/');

  console.log('⛏  Scraping image URLs...');
  const results = await page.evaluate(() => {
    // Grabs all <divs> of images
    const elements = document
          .querySelectorAll('.content > .spacer > #siteTable > .thing');
    /* 
     * Spreads elements into an array to filter, then creates a new array of
     * only the URLs
     * You can customize this to add another filter below the first if 
     * looking for more specific criteria -- refer to blog post
    */
    return [...elements]
           .filter(el => el.dataset.url.search(/(.jpg)|(.png)/) >= 0)
           .map(el => el.dataset.url)
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
      dest: IMAGE_DIRECTORY 
    });
  }));
  console.log(`👌  Done -- downloaded \x1b[36m${imgs.length}\x1b[0m album covers!`);
}

downloadAll();
