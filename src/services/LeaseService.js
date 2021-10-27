import axios from 'axios/index';
import Base from "./BaseService";

export const LeaseService = {
  index,
  loadLease,
  saveLease,
  updateLease,
  deleteLease,
  saveFile,
  deleteFile,
  saveRenter,
  deleteRenter,
  saveBill,
  updateBill,
  deleteBill,
  setupPayment,
  verifyPayment,
};

export default LeaseService;

function index(for_messages, requires_attention) {
  return axios.get(Base.apiLocation() + "/leases?for_messages=" + for_messages + "&requires_attention=" + requires_attention, Base.getFullHeaders());
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

function saveFile(leaseId, path, description) {
  let payload = { lease_file: { path, description } };
  return axios.post(Base.apiLocation() + "/leases/" + leaseId + "/lease_files", payload, Base.getFullHeaders());
}

function deleteFile(leaseId, fileId) {
  return axios.delete(Base.apiLocation() + "/leases/" + leaseId + "/lease_files/" + fileId , { ...Base.getFullHeaders() });
}

function saveRenter(leaseId, renter) {
  let payload = { renter };
  return axios.post(Base.apiLocation() + "/leases/" + leaseId + "/renters", payload, Base.getFullHeaders());
}

function deleteRenter(leaseId, renterId) {
  return axios.delete(Base.apiLocation() + "/leases/" + leaseId + "/renters/" + renterId , { ...Base.getFullHeaders() });
}

function saveBill(leaseId, bill) {
  let payload = { ...bill };
  return axios.post(Base.apiLocation() + "/leases/" + leaseId + "/bills", payload, Base.getFullHeaders());
}

function updateBill(leaseId, bill) {
  let payload = { ...bill };
  return axios.patch(Base.apiLocation() + "/leases/" + leaseId + "/bills/" + bill.id , payload, Base.getFullHeaders());
}

function deleteBill(leaseId, billId) {
  return axios.delete(Base.apiLocation() + "/leases/" + leaseId + "/bills/" + billId , { ...Base.getFullHeaders() });
}

function setupPayment(bill) {
  let payload = { bill_id: bill.id };
  return axios.post(Base.apiLocation() + "/setup_payment/", payload, Base.getFullHeaders());
}

function verifyPayment(billId) {
  let payload = { bill_id: billId };
  return axios.post(Base.apiLocation() + "/verify_payment/", payload, Base.getFullHeaders());
}