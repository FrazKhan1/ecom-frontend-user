import React from "react";
import { Navigate, Route, Routes } from "react-router-dom/dist";
import routes from "../../routes";

const Auth = () => {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
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
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </div>
  );
};

export default Auth;
