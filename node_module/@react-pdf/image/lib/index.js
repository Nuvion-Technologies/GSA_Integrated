import fs from 'fs';
import url from 'url';
import path from 'path';
import fetch from 'cross-fetch';
import PNG from '@react-pdf/png-js';
import _JPEG from 'jay-peg';

PNG.isValid = function isValid(data) {
  try {
    return !!new PNG(data);
  } catch (e) {
    return false;
  }
};

class JPEG {
  constructor(data) {
    this.data = null;
    this.width = null;
    this.height = null;
    this.data = data;
    if (data.readUInt16BE(0) !== 0xffd8) {
      throw new Error('SOI not found in JPEG');
    }
    const markers = _JPEG.decode(this.data);
    for (let i = 0; i < markers.length; i += 1) {
      const marker = markers[i];
      if (marker.name === 'EXIF' && marker.entries.orientation) {
        this.orientation = marker.entries.orientation;
      }
      if (marker.name === 'SOF') {
        this.width ||= marker.width;
        this.height ||= marker.height;
      }
    }
    if (this.orientation > 4) {
      [this.width, this.height] = [this.height, this.width];
    }
  }
}
JPEG.isValid = data => {
  return data && Buffer.isBuffer(data) && data.readUInt16BE(0) === 0xffd8;
};

const createCache = function (_temp) {
  let {
    limit = 100
  } = _temp === void 0 ? {} : _temp;
  let cache = {};
  let keys = [];
  return {
    get: key => cache[key],
    set: (key, value) => {
      keys.push(key);
      if (keys.length > limit) {
        delete cache[keys.shift()];
      }
      cache[key] = value;
    },
    reset: () => {
      cache = {};
      keys = [];
    },
    length: () => keys.length
  };
};

const IMAGE_CACHE = createCache({
  limit: 30
});
const getAbsoluteLocalPath = src => {
  const {
    protocol,
    auth,
    host,
    port,
    hostname,
    path: pathname
  } = url.parse(src);
  const absolutePath = path.resolve(pathname);
  if (protocol && protocol !== 'file:' || auth || host || port || hostname) {
    return undefined;
  }
  return absolutePath;
};
const fetchLocalFile = src => new Promise((resolve, reject) => {
  try {
    if (false) ;
    const absolutePath = getAbsoluteLocalPath(src);
    if (!absolutePath) {
      reject(new Error(`Cannot fetch non-local path: ${src}`));
      return;
    }
    fs.readFile(absolutePath, (err, data) => err ? reject(err) : resolve(data));
  } catch (err) {
    reject(err);
  }
});
const fetchRemoteFile = async (uri, options) => {
  const response = await fetch(uri, options);
  const buffer = await (response.buffer ? response.buffer() : response.arrayBuffer());
  return buffer.constructor.name === 'Buffer' ? buffer : Buffer.from(buffer);
};
const isValidFormat = format => {
  const lower = format.toLowerCase();
  return lower === 'jpg' || lower === 'jpeg' || lower === 'png';
};
const guessFormat = buffer => {
  let format;
  if (JPEG.isValid(buffer)) {
    format = 'jpg';
  } else if (PNG.isValid(buffer)) {
    format = 'png';
  }
  return format;
};
const isCompatibleBase64 = _ref => {
  let {
    uri
  } = _ref;
  return /^data:image\/[a-zA-Z]*;base64,[^"]*/g.test(uri);
};
function getImage(body, extension) {
  switch (extension.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
      return new JPEG(body);
    case 'png':
      return new PNG(body);
    default:
      return null;
  }
}
const resolveBase64Image = _ref2 => {
  let {
    uri
  } = _ref2;
  const match = /^data:image\/([a-zA-Z]*);base64,([^"]*)/g.exec(uri);
  const format = match[1];
  const data = match[2];
  if (!isValidFormat(format)) {
    throw new Error(`Base64 image invalid format: ${format}`);
  }
  return new Promise(resolve => {
    return resolve(getImage(Buffer.from(data, 'base64'), format));
  });
};
const resolveImageFromData = src => {
  if (src.data && src.format) {
    return new Promise(resolve => resolve(getImage(src.data, src.format)));
  }
  throw new Error(`Invalid data given for local file: ${JSON.stringify(src)}`);
};
const resolveBufferImage = buffer => {
  const format = guessFormat(buffer);
  if (format) {
    return new Promise(resolve => resolve(getImage(buffer, format)));
  }
  return Promise.resolve();
};
const resolveBlobImage = async blob => {
  const {
    type
  } = blob;
  if (!type || type === 'application/octet-stream') {
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return resolveBufferImage(buffer);
  }
  if (!type.startsWith('image/')) {
    throw new Error(`Invalid blob type: ${type}`);
  }
  const format = type.replace('image/', '');
  if (!isValidFormat(format)) {
    throw new Error(`Invalid blob type: ${type}`);
  }
  const buffer = await blob.arrayBuffer();
  return getImage(Buffer.from(buffer), format);
};
const getImageFormat = body => {
  const isPng = body[0] === 137 && body[1] === 80 && body[2] === 78 && body[3] === 71 && body[4] === 13 && body[5] === 10 && body[6] === 26 && body[7] === 10;
  const isJpg = body[0] === 255 && body[1] === 216 && body[2] === 255;
  let extension = '';
  if (isPng) {
    extension = 'png';
  } else if (isJpg) {
    extension = 'jpg';
  } else {
    throw new Error('Not valid image extension');
  }
  return extension;
};
const resolveImageFromUrl = async src => {
  const {
    uri,
    body,
    headers,
    method = 'GET',
    credentials
  } = src;
  const data = getAbsoluteLocalPath(uri) ? await fetchLocalFile(uri) : await fetchRemoteFile(uri, {
    body,
    headers,
    method,
    credentials
  });
  const extension = getImageFormat(data);
  return getImage(data, extension);
};
const resolveImage = function (src, _temp) {
  let {
    cache = true
  } = _temp === void 0 ? {} : _temp;
  let image;
  const cacheKey = src.data ? src.data.toString() : src.uri;
  if (typeof Blob !== 'undefined' && src instanceof Blob) {
    image = resolveBlobImage(src);
  } else if (Buffer.isBuffer(src)) {
    image = resolveBufferImage(src);
  } else if (cache && IMAGE_CACHE.get(cacheKey)) {
    return IMAGE_CACHE.get(cacheKey);
  } else if (isCompatibleBase64(src)) {
    image = resolveBase64Image(src);
  } else if (typeof src === 'object' && src.data) {
    image = resolveImageFromData(src);
  } else {
    image = resolveImageFromUrl(src);
  }
  if (!image) {
    throw new Error('Cannot resolve image');
  }
  if (cache) {
    IMAGE_CACHE.set(cacheKey, image);
  }
  return image;
};

export { resolveImage as default };
