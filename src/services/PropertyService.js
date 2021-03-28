import axios from 'axios/index';
import Base from "./BaseService";

export const PropertyService = {
  index
};

export default PropertyService;

function index() {
  return axios.get(Base.apiLocation() + "/properties", Base.getFullHeaders());
}


