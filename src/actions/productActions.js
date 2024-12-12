import { PromiseHandler, apiHelper } from "../utils/apiHelper";

// Update your backend API endpoint to accept a query parameter for filtering products by category
export const getAllProducts = (categoryName) => {
  if (categoryName) {
    return PromiseHandler(
      apiHelper("get", `/api/admin/get-products?categoryName=${categoryName}`)
    );
  } else {
    return PromiseHandler(apiHelper("get", `/api/admin/get-products`));
  }
};

export const getAllProductsByCategories = (data) => {
  return PromiseHandler(
    apiHelper("post", "/api/admin/get-products-by-categories", data)
  );
};

export const getSingleProductData = (id) => {
  return PromiseHandler(
    apiHelper("get", `/api/admin/get-single-product/${id}`)
  );
};

export const getCategoriesData = () => {
  return PromiseHandler(apiHelper("get", "/api/admin/get-categories"));
};
