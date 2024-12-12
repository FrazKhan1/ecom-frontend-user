import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGrid from "./ProductGrid";

const TabProduct = ({
  spaceTopClass,
  spaceBottomClass,
  bgColorClass,
  category,
}) => {
  return (
    <div
      className={clsx(
        "product-area",
        spaceTopClass,
        spaceBottomClass,
        bgColorClass
      )}
    >
      <div className="container">
        <SectionTitle titleText="PRODUCTS" positionClass="text-center" />
        <ProductGrid
          category={category}
          type="new"
          limit={8}
          spaceBottomClass="mb-25"
        />
      </div>
    </div>
  );
};

TabProduct.propTypes = {
  bgColorClass: PropTypes.string,
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default TabProduct;
