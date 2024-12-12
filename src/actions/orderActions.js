import { PromiseHandler, apiHelper } from "../utils/apiHelper";

export const createCheckout = (data) => {
  return PromiseHandler(apiHelper("post", "/api/user/checkout", data));
};
