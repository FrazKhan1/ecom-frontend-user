import BlogStandard from "./pages/blog/BlogStandard";
import Home from "./pages/home";
import Cart from "./pages/other/Cart";
import Checkout from "./pages/other/Checkout";
import LoginRegister from "./pages/other/LoginRegister";
import Contact from "./pages/other/Contact";
import Product from "./pages/shop-product/Product";
import Shop from "./pages/shop/Shop";
import VerifyUser from "./pages/other/VerifyUser";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import MyAccount from "./pages/other/MyAccount";

const routes = [
  {
    name: "Home",
    layout: "/user",
    path: "home",
    showInMenu: true,
    component: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    name: "Shop",
    layout: "/user",
    path: "shop",
    showInMenu: true,
    component: <Shop />,
  },
  {
    name: "Cart",
    layout: "/user",
    path: "cart",
    component: (
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    ),
    showInMenu: false,
  },
  {
    name: "Checkout",
    layout: "/user",
    path: "checkout",
    showInMenu: false,
    component: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    name: "Product",
    layout: "/user",
    path: "product/:id",
    showInMenu: false,
    component: (
      <ProtectedRoute>
        <Product />
      </ProtectedRoute>
    ),
  },
  {
    name: "Account",
    layout: "/user",
    path: "account/:id",
    showInMenu: false,
    component: (
      <ProtectedRoute>
        <MyAccount />
      </ProtectedRoute>
    ),
  },
  {
    name: "Blog",
    layout: "/user",
    path: "blog",
    showInMenu: true,
    component: (
      <ProtectedRoute>
        <BlogStandard />
      </ProtectedRoute>
    ),
  },
  {
    name: "Contact",
    layout: "/user",
    path: "contact-us",
    showInMenu: true,
    component: (
      <ProtectedRoute>
        <Contact />
      </ProtectedRoute>
    ),
  },
  {
    name: "Login/Register",
    layout: "/auth",
    path: "login",
    showInMenu: false,
    component: (
      <PublicRoute>
        <LoginRegister />
      </PublicRoute>
    ),
  },
  {
    name: "User Verification",
    layout: "/auth",
    path: "activation-account/:token",
    showInMenu: false,
    component: (
      <ProtectedRoute>
        <VerifyUser />
      </ProtectedRoute>
    ),
  },
  ,
];

export default routes;
