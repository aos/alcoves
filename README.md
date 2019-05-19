# /r/fakealbumcovers frontpage image scraper

Motivated by laziness, I wrote a scraper that will download all album covers on
the frontpage of [r/fakealbumcovers](https://reddit.com/r/fakealbumcovers)

[Blog post](https://aos.github.io/2017/12/02/web-scraping-with-puppeteer/) 
explaining my process writing this little scraper.

## Installation and Usage
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

## Using Docker

The image is stored on Docker Hub. You can run it with the following command:

```
$ docker run --cap-add=SYS_ADMIN -v ~/Desktop/imgs:/app/images --rm aosd/alcoves
```

**Note:** The images are downloaded into `/app/images` inside the container (can
be changed in `index.js`), so you will need to mount the appropriate folder
to download the images locally. In the example above, I've mounted the
`~/Desktop/imgs` folder.

(`--cap-add=SYS_ADMIN` is needed when running locally because the Dockerfile
uses a non-privileged user which may not have all necessary privileges.)

If you want to build it locally, follow these steps:

1. Clone the repo
2. Build image
```
$ docker build -t alcoves .
```
3. Run image

```
$ docker run --cap-add=SYS_ADMIN -v ~/Desktop/imgs:/app/images --rm alcoves
```
