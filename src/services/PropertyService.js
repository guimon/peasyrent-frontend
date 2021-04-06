import axios from 'axios/index';
import Base from "./BaseService";

export const PropertyService = {
  index,
  loadProperty,
  saveProperty,
  updateProperty,
  deleteProperty,
  savePicture,
  deletePicture
};

export default PropertyService;

function index(vacant_only) {
  return axios.get(Base.apiLocation() + "/properties?vacant_only=" + vacant_only, Base.getFullHeaders());
}

function loadProperty(id) {
  return axios.get(Base.apiLocation() + "/properties/" + id, Base.getFullHeaders());
}

function saveProperty(property) {
  let payload = { property: property };
  return axios.post(Base.apiLocation() + "/properties", payload, Base.getFullHeaders());
}

function updateProperty(property) {
  let payload = { property: property };
  return axios.patch(Base.apiLocation() + "/properties/" + property.id, payload, Base.getFullHeaders());
}

function deleteProperty(id) {
  let payload = { id: id };
  return axios.delete(Base.apiLocation() + "/properties/", { data: payload, ...Base.getFullHeaders() });
}

function savePicture(propertyId, path) {
  let payload = { property_image: { path: path } };
  return axios.post(Base.apiLocation() + "/properties/" + propertyId + "/property_images", payload, Base.getFullHeaders());
}

function deletePicture(propertyId, pictureId) {
  return axios.delete(Base.apiLocation() + "/properties/" + propertyId + "/property_images/" + pictureId , { ...Base.getFullHeaders() });
}