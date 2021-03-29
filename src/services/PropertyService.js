import axios from 'axios/index';
import Base from "./BaseService";

export const PropertyService = {
  index
};

export default PropertyService;

function index(vacant_only) {
  return axios.get(Base.apiLocation() + "/properties?vacant_only=" + vacant_only, Base.getFullHeaders());
}
