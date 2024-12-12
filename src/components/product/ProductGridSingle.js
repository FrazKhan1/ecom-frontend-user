import { Fragment } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/slices/cart-slice";
import { useDispatch } from "react-redux";

const ProductGridSingle = ({ product, cartItem, spaceBottomClass }) => {
  const dispatch = useDispatch();

  const setImage = (img) => {
    return `http://localhost:8000/public/${img}`;
  };
  return (
    <Fragment>
      <div className={clsx("product-wrap", spaceBottomClass)}>
        <div className="product-img">
          <Link to={`/user/product/${product?._id}`}>
            <img
              style={{ height: "300px" }}
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
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                  }
                >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartItem !== undefined && cartItem.quantity > 0
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
            <Link to={`/user/product/${product?._id}`}>
              {product.productTitle}
            </Link>
          </h3>

          <div className="product-price">$ {product.productPrice}</div>
        </div>
      </div>
      {/* product modal */}
    </Fragment>
  );
};

export default ProductGridSingle;
