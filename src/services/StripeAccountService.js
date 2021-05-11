import axios from 'axios/index';
import Base from "./BaseService";

export const StripeAccountService = {
  index,
  loadStripeAccount,
  saveStripeAccount,
  updateStripeAccount,
  deleteStripeAccount,
};

export default StripeAccountService;

function index() {
  return axios.get(Base.apiLocation() + "/stripe_accounts", Base.getFullHeaders());
}

function loadStripeAccount(id) {
  return axios.get(Base.apiLocation() + "/stripe_accounts/" + id, Base.getFullHeaders());
}

function saveStripeAccount(stripeAccount) {
  let payload = { stripe_account: stripeAccount };
  return axios.post(Base.apiLocation() + "/stripe_accounts", payload, Base.getFullHeaders());
}

function updateStripeAccount(stripeAccount) {
  let payload = { stripe_account: stripeAccount };
  return axios.patch(Base.apiLocation() + "/stripe_accounts/" + stripeAccount.id, payload, Base.getFullHeaders());
}

function deleteStripeAccount(stripeAccount) {
  return axios.delete(Base.apiLocation() + "/stripe_accounts/"+ stripeAccount.id, { ...Base.getFullHeaders() });
}
