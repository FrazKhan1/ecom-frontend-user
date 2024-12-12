import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Logo from "../../components/header/Logo";
import NavMenu from "../../components/header/NavMenu";
import IconGroup from "../../components/header/IconGroup";
import MobileMenu from "../../components/header/MobileMenu";

const Header = ({
  layout,
  top,
  borderStyle,
  headerPaddingClass,
  headerPositionClass,
  headerBgClass,
}) => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header
      className={clsx(
        "header-area clearfix",
        headerBgClass,
        headerPositionClass
      )}
    >
      <div
        className={clsx(
          "header-top-area",
          headerPaddingClass,
          top === "visible" ? "d-none d-lg-block" : "d-none",
          borderStyle === "fluid-border" && "border-none"
        )}
      >
        <div className={layout === "container-fluid" ? layout : "container"}>
          {/* header top */}
        </div>
      </div>

      <div
        className={clsx(
          headerPaddingClass,
          "sticky-bar header-res-padding clearfix",
          scroll > "stick"
        )}
      >
        <div className={layout === "container-fluid" ? layout : "container"}>
          <div className="row">
            <div
              className="col-xl-2 col-lg-2 col-md-6 col-4"
              style={{ marginTop: "0px" }}
            >
              {/* header logo */}
              <Logo imageUrl="/assets/img/logo/logo.png" logoClass="logo" />
            </div>
            <div className="col-xl-8 col-lg-8 d-none d-lg-flex  justify-content-lg-center align-items-lg-center gap-lg-5">
              {/* Nav menu */}
              <NavMenu />
            </div>
            <div
              className="col-xl-2 col-lg-2 col-md-6 col-8 mb-3 "
              style={{ marginTop: "0px" }}
            >
              {/* Icon group */}
              <IconGroup />
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <MobileMenu />
      </div>
    </header>
  );
};

Header.propTypes = {
  borderStyle: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  layout: PropTypes.string,
  top: PropTypes.string,
};

export default Header;
