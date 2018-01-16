# /r/fakealbumcovers frontpage image scraper

Motivated by laziness, I wrote a scraper that will download all album covers  
on the frontpage of [r/fakealbumcovers](https://reddit.com/r/fakealbumcovers)

[Blog post](https://aos.github.io/2017/12/02/web-scraping-with-puppeteer/) 
explaining my process writing this little scraper. 

## Installation and Running
> Requires Node v7.6 or above

1. Clone the repo
```
$ git clone https://github.com/aos/alcoves.git
```
2. Install dependencies
```
$ npm install
```
3. Change the download path by setting `IMAGE_DIRECTORY` with a relative path 
to your desired location
```javascript
const IMAGE_DIRECTORY = '../../Pictures/covers'
```
4. Run either using `npm start` or `node index.js`
