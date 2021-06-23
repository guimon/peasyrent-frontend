import axios from 'axios/index';
import Base from "./BaseService";

export const MessageService = {
  updateViewedTime,
  sendNewMessage,
  loadMessages
};

export default MessageService;

function updateViewedTime(lease_id, last_message_timestamp) {
  let payload = { lease_id: lease_id, last_message_timestamp: last_message_timestamp};
  return axios.post(Base.apiLocation() + "/leases/viewed_time", payload, Base.getFullHeaders());
}

function sendNewMessage(lease_id, new_message, image_path) {
  let payload = { lease_id: lease_id, new_message: new_message, image_path: image_path};
  return axios.post(Base.apiLocation() + "/leases/"+ lease_id + "/messages", payload, Base.getFullHeaders());
}

function loadMessages(lease_id) {
  return axios.get(Base.apiLocation() + "/leases/" + lease_id + "/messages", Base.getFullHeaders());
}