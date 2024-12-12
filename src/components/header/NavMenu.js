import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import routes from "../../routes";
const NavMenu = () => {
  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route?.showInMenu) {
        if (route.layout === "/user" || route.layout === "/auth") {
          return (
            <div className="main-menu menuWhiteClass">
              <Link
                className="d-flex"
                key={index}
                to={route.layout + "/" + route.path}
              >
                <div className="d-flex flex-row">
                  <li className="d-flex flex-row" key={index}>
                    <p>{route.name}</p>
                  </li>
                </div>
              </Link>
            </div>
          );
        }
      }
    });
  };

  return createLinks(routes);
};

export default NavMenu;
