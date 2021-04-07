import axios from 'axios/index';

export const S3Service = {
  upload
};

export default S3Service;

function upload(filename, url, file) {
  let fileParts = filename.split('.');
  var options = {
    headers: {
      'Content-Type': fileParts[fileParts.length - 1]
    }
  };
  return axios.put(url, file, options);
}
