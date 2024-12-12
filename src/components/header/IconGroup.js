import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { ENV } from "../../config";
import { setUser } from "../../store/slices/user-slice";

const IconGroup = ({ iconWhiteClass }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const setImage = (img) => {
    return `http://localhost:8000/public/${img}`;
  };

  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const { cartItems } = useSelector((state) => state.cart);

  const handleLogout = () => {
    ENV.logOut();
    dispatch(setUser(null));
  };

  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)}>
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
        >
          {user ? (
            <img
              width="25"
              height="25"
              style={{ borderRadius: "50px" }}
              className="pe-7s-user-female"
              src={setImage(user?.profilePicture)}
              alt="Profile Picture"
            />
          ) : (
            <i className="pe-7s-user-female" />
          )}
        </button>
        <div className="account-dropdown">
          <ul>
            {user ? (
              " "
            ) : (
              <li>
                <Link to={"/auth/login"}>Login/Register</Link>
              </li>
            )}

            {user && (
              <>
                <li>
                  <Link to={`/user/account/${user?._id}`}>Profile</Link>
                </li>
                <li>
                  <Link onClick={handleLogout} to={"/auth/login"}>
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareItems && compareItems.length ? compareItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
          </span>
        </Link>
      </div> */}
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
