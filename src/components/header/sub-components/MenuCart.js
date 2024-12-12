import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiscountPrice } from "../../../helpers/product";
import { deleteFromCart } from "../../../store/slices/cart-slice";

const MenuCart = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  let cartTotalPrice = 0;

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.productPrice * item.quantity;
    });
    return totalAmount.toFixed(2);
  };

  const setImage = (img) => {
    return `http://localhost:8000/public/${img}`;
  };

  return (
    <div className="shopping-cart-content">
      {cartItems && cartItems.length > 0 ? (
        <Fragment>
          <ul>
            {cartItems.map((item) => {
              return (
                <li className="single-shopping-cart" key={item.cartItemId}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + item.id}>
                      <img
                        alt=""
                        src={setImage(item.productImage)}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link
                        to={process.env.PUBLIC_URL + "/product/" + item._id}
                      >
                        {" "}
                        {item.productTitle}{" "}
                      </Link>
                    </h4>
                    <h6>Qty: {item.quantity}</h6>
                  </div>
                  <div className="shopping-cart-delete">
                    <button
                      onClick={() => dispatch(deleteFromCart(item.cartItemId))}
                    >
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :{" "}
              <span className="shop-total">{calculateTotalAmount()}</span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/user/cart"}
            >
              view cart
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              checkout
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

export default MenuCart;
