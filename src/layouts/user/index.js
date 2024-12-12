import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom/dist";
import routes from "../../routes";
import NavMenu from "../../components/header/NavMenu";
import Header from "../../wrappers/header/Header";
import Footer from "../../wrappers/footer/Footer";
import Home from "../../pages/home";

const User = ({
  headerContainerClass,
  headerTop,
  headerPaddingClass,
  headerPositionClass,
}) => {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      console.log("prop === ", prop);
      if (prop.layout === "/user") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div>
      <Header
        layout={headerContainerClass}
        headerPaddingClass={headerPaddingClass}
        headerPositionClass={headerPositionClass}
      />
      <div>
        <Routes>
          {getRoutes(routes)}

          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer
        backgroundColorClass="bg-gray"
        spaceTopClass="pt-100"
        spaceBottomClass="pb-70"
      />
    </div>
  );
};

export default User;
