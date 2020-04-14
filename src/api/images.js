
const parseStaticImg = (rawImage) => {

  if (rawImage.match('(png)|(gif)')) {
    if (rawImage.match('http')) {
      return rawImage;
    }
    if (rawImage.match('/ImagesAll')) {
      return rawImage;
    }
    if (rawImage.match('/favicons')) {
      return rawImage;
    }	
  }
    return '/favicons/default.png';
};

const parseTitle = (title, text) => `title="${title || text}"`;

const parseImageTag = ({ href, title, text }) => `<img class="lozad d-block mx-auto" data-src=${parseStaticImg(
  href
)} ${parseTitle(title, text)} />`;

const getGalleryImage = ({ href, title, text }) => `<a data-fancybox="gallery" href="${parseStaticImg(
  href
)}">${parseImageTag({ href, title, text })}</a>`;

module.exports = {
  parseStaticImg,
  parseImageTag,
  getGalleryImage,
};
