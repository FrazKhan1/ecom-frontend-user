import { PromiseHandler, apiHelper } from "../utils/apiHelper";

export const userRegister = (data) => {
  return PromiseHandler(apiHelper("post", "/api/user/user-register", data));
};

export const userLogin = (data) => {
  return PromiseHandler(apiHelper("post", "/api/user/user-login", data));
};

export const verifyUser = (token) => {
  return PromiseHandler(apiHelper("get", `/api/user/verify/${token}`));
};

export const verifyUserById = (data) => {
  return PromiseHandler(
    apiHelper("post", `/api/user/get-user-info-by-id`, data)
  );
};

export const updateProfile = (id, data) => {
  return PromiseHandler(
    apiHelper("post", `/api/user/update-user-data/${id}`, data)
  );
};
