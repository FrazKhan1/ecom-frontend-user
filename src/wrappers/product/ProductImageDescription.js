import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageFixed from "../../components/product/ProductImageFixed";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  product,
}) => {
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}
            <ProductImageFixed product={product} />
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
              product={product}
              currency={currency}
              cartItems={cartItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  galleryType: PropTypes.string,
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ProductImageDescription;
