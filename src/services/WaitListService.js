import axios from 'axios/index';
import Base from "./BaseService";

export const WaitListService = {
  validateInviteRequest,
};

export default WaitListService;

function validateInviteRequest(invite) {
  return axios.post(Base.apiLocation() + "/validate_invite", {uuid: invite}, Base.getLocaleHeader());
}
