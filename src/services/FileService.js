import axios from 'axios/index';
import Base from "./BaseService";

export const FileService = {
  getUrl
};

export default FileService;

function getUrl(filename) {
  let payload = { name: filename };
  return axios.post(Base.apiLocation() + "/upload_url", payload, Base.getFullHeaders());
}


