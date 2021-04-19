import axios from 'axios/index';

export const S3Service = {
  upload
};

export default S3Service;

function getMimeType(filename) {
  if (filename.endsWith("pdf")) {
    return "application/pdf";
  } else {
    let fileParts = filename.split('.');
    return "image/" + fileParts[fileParts.length - 1];
  }
}

function upload(filename, url, file) {
  var options = {
    headers: {
      'Content-Type': getMimeType(filename)
    }
  };
  return axios.put(url, file, options);
}
