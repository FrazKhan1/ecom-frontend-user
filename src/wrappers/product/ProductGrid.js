import { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingle from "../../components/product/ProductGridSingle";
import { getAllProducts } from "../../actions/productActions";
import { setProducts } from "../../store/slices/product-slice";

const ProductGrid = ({ spaceBottomClass, category, type, limit }) => {
  const { products } = useSelector((state) => state.product);

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const getAllProductsData = async () => {
    try {
      const res = await getAllProducts();
      if (res?.data) {
        dispatch(setProducts(res?.data?.data));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllProductsData();
  }, []);

  return (
    <>
      <div className="row mt-5 ">
        {products?.map((product) => {
          return (
            <div
              className="col-xl-3 col-md-6 col-lg-3 col-sm-6"
              key={product._id}
            >
              <ProductGridSingle
                spaceBottomClass={spaceBottomClass}
                product={product}
                cartItem={cartItems.find(
                  (cartItem) => cartItem.id === product._id
                )}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

ProductGrid.propTypes = {
  spaceBottomClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number,
};

export default ProductGrid;
