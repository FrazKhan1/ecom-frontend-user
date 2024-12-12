import { Fragment, useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getIndividualCategories } from "../../helpers/product";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import {
  getAllProducts,
  getCategoriesData,
} from "../../actions/productActions";
import clsx from "clsx";
import { showLoader, hideLoader } from "../../store/slices/loader";
import { addToCart } from "../../store/slices/cart-slice";
import { setProducts } from "../../store/slices/product-slice";

const Shop = () => {
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const { products } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const [categories, setCategories] = useState();

  const cartItem = cartItems.find(
    (cartItem) => cartItem.id === products.find((product) => product._id)
  );

  const setImage = (img) => {
    return `http://localhost:8000/public/${img}`;
  };

  const dispatch = useDispatch();

  const pageLimit = 15;
  let { pathname } = useLocation();

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  const getProductsData = async () => {
    try {
      dispatch(showLoader());
      const res = await getAllProducts(sortValue ? sortValue : "");
      dispatch(hideLoader());

      if (res?.data) {
        setCurrentData(res?.data?.data);
        dispatch(setProducts(res?.data?.data));
      }
    } catch (error) {}
  };

  const getCategories = async () => {
    try {
      const res = await getCategoriesData();
      console.log("res === ", res);
      if (res?.data) {
        setCategories(res?.data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProductsData();
    getCategories();
  }, [sortValue]);

  console.log("categories === ", categories);

  const uniqueCategories = getIndividualCategories(currentData);

  const setActiveLayout = (e) => {
    // Remove 'active' class from all buttons within the sidebar
    const sidebarButtons = document.querySelectorAll(
      ".sidebar-widget-list-left button"
    );
    sidebarButtons.forEach((button) => {
      button.classList.remove("active");
    });

    // Add 'active' class to the clicked button
    e.currentTarget.classList.add("active");
  };

  return (
    <Fragment>
      {/* breadcrumb */}
      <Breadcrumb
        pages={[
          { label: "Home", path: process.env.PUBLIC_URL + "/" },
          { label: "Shop", path: process.env.PUBLIC_URL + pathname },
        ]}
      />

      <div className="shop-area pt-95 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 order-2 order-lg-1">
              {/* shop sidebar */}
              <div className="sidebar-widget">
                <h4 className="pro-sidebar-title">Categories </h4>
                <div className="sidebar-widget-list mt-30">
                  {categories ? (
                    <ul>
                      <li>
                        <div className="sidebar-widget-list-left">
                          <button
                            onClick={(e) => {
                              setActiveLayout(e);
                              getSortParams("category", "");
                            }}
                          >
                            <span className="checkmark" /> All Categories
                          </button>
                        </div>
                      </li>
                      {categories?.map((category, key) => {
                        return (
                          <li key={key}>
                            <div className="sidebar-widget-list-left">
                              <button
                                onClick={(e) => {
                                  getSortParams(
                                    "category",
                                    category?.categoryName
                                  );
                                  setActiveLayout(e);
                                }}
                              >
                                {" "}
                                <span className="checkmark" />
                                {category?.categoryName}{" "}
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    "No categories found"
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-9 order-1 order-lg-2">
              {/* shop topbar default */}
              <ShopTopbar
                getLayout={getLayout}
                getFilterSortParams={getFilterSortParams}
                productCount={products.length}
                sortedProductCount={currentData?.length}
              />

              {/* shop page content default */}
              <div className="row mt-5 ">
                {currentData &&
                  currentData?.map((product) => {
                    return (
                      <div
                        className="col-xl-3 col-md-6 col-lg-3 col-sm-6 mt-5"
                        key={product._id}
                      >
                        <div className={clsx("product-wrap")}>
                          <div className="product-img">
                            <Link to={`/user/product/${product?._id}`}>
                              <img
                                style={{
                                  height: "300px",
                                  objectFit: "contain",
                                }}
                                className="default-img"
                                src={setImage(product.productImage)}
                                alt=""
                              />
                            </Link>

                            <div
                              style={{ justifyContent: "center" }}
                              className="product-action product-center text-center "
                            >
                              <div className="pro-same-action pro-cart">
                                {product.stock && product.stock > 0 ? (
                                  <button
                                    onClick={() => dispatch(addToCart(product))}
                                    className={
                                      cartItem !== undefined &&
                                      cartItem.quantity > 0
                                        ? "active"
                                        : ""
                                    }
                                    disabled={
                                      cartItem !== undefined &&
                                      cartItem.quantity > 0
                                    }
                                    title={
                                      cartItem !== undefined
                                        ? "Added to cart"
                                        : "Add to cart"
                                    }
                                  >
                                    {" "}
                                    <i className="pe-7s-cart"></i>{" "}
                                    {cartItem !== undefined &&
                                    cartItem.quantity > 0
                                      ? "Added"
                                      : "Add to cart"}
                                  </button>
                                ) : (
                                  <button disabled className="active">
                                    Out of Stock
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="product-content text-center">
                            <h3
                              className="d-inline-block text-truncate"
                              style={{ maxWidth: "150px" }}
                            >
                              <Link to={`/product/${product?._id}`}>
                                {product.productTitle}
                              </Link>
                            </h3>

                            <div className="product-price">
                              $ {product.productPrice}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* shop product pagination */}
              <div className="pro-pagination-style text-center mt-30">
                <Paginator
                  totalRecords={sortedProducts.length}
                  pageLimit={pageLimit}
                  pageNeighbours={2}
                  setOffset={setOffset}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageContainerClass="mb-0 mt-0"
                  pagePrevText="«"
                  pageNextText="»"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Shop;
