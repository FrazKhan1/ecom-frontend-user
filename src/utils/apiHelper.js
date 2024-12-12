import axios from "axios";
import { ENV } from "../config";
import toast from "react-hot-toast";

let baseURL = "http://localhost:8000";

const apiHelper = async (apiType, path, data) => {
  if (baseURL === undefined || !baseURL) {
    baseURL = "";
  }

  let token = localStorage.getItem("token");

  if (
    apiType === "post" ||
    apiType === "get" ||
    apiType === "put" ||
    apiType === "delete"
  ) {
    try {
      let response = await axios({
        method: apiType,
        url: `${baseURL + path}`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
        return;
      } else {
        toast.error(error?.message);
      }
    }
  }
};

const PromiseHandler = async (method) => {
  try {
    return await method;
  } catch (error) {
    console.log(error);
  }
};

export { PromiseHandler, apiHelper };
