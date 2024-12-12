import PropTypes from "prop-types";

const ProductImageFixed = ({ product }) => {
  const setImage = (img) => {
    return `http://localhost:8000/public/${img}`;
  };

  return (
    <div className="product-large-image-wrapper">
      <div className="product-fixed-image">
        {product?.productImage ? (
          <img
            src={setImage(product?.productImage)}
            alt=""
            className="img-fluid"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.shape({}),
};

export default ProductImageFixed;
