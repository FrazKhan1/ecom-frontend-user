import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { getSingleProductData } from "../../actions/productActions";

const Product = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const productss = products.find((product) => product._id === id);
  const [product, setProduct] = useState();

  const getSingelProduct = async () => {
    try {
      const res = await getSingleProductData(id);
      if (res?.data) {
        setProduct(res?.data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getSingelProduct();
  }, []);

  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product Page of flone react minimalist eCommerce template."
      />

      {/* breadcrumb */}
      <Breadcrumb
        pages={[
          { label: "Home", path: process.env.PUBLIC_URL + "/" },
          { label: "Shop Product", path: process.env.PUBLIC_URL + pathname },
        ]}
      />

      {/* product description with image */}
      <ProductImageDescription
        spaceTopClass="pt-100"
        spaceBottomClass="pb-100"
        product={product ? product : null}
      />

      {/* product description tab */}
      <ProductDescriptionTab
        spaceBottomClass="pb-90"
        productFullDesc={product?.productDescription}
      />

      {/* related product slider */}
      <RelatedProductSlider
        spaceBottomClass="pb-95"
        category={productss?.categories}
      />
    </Fragment>
  );
};

export default Product;
