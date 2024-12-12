import clsx from "clsx";
import ProductGrid from "./ProductGrid";

const ShopProducts = ({ layout }) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className={clsx("row", layout)}>
        <ProductGrid type="new" limit={8} spaceBottomClass="mb-25" />
      </div>
    </div>
  );
};

export default ShopProducts;
