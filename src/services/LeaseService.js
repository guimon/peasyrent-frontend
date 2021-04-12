import axios from 'axios/index';
import Base from "./BaseService";

export const LeaseService = {
  index,
  loadLease,
  saveLease,
  updateLease,
  deleteLease,
};

export default LeaseService;

function index() {
  return axios.get(Base.apiLocation() + "/leases", Base.getFullHeaders());
}

function loadLease(id) {
  return axios.get(Base.apiLocation() + "/leases/" + id, Base.getFullHeaders());
}

function saveLease(lease) {
  let payload = { lease: lease };
  return axios.post(Base.apiLocation() + "/leases", payload, Base.getFullHeaders());
}

function updateLease(lease) {
  let payload = { lease: lease };
  return axios.patch(Base.apiLocation() + "/leases/" + lease.id, payload, Base.getFullHeaders());
}

function deleteLease(lease) {
  return axios.delete(Base.apiLocation() + "/leases/"+ lease.id, { ...Base.getFullHeaders() });
}
