import { Fragment, useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { createCheckout } from "../../actions/orderActions";
import toast from "react-hot-toast";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with your public key
const Checkout = () => {
  let cartTotalPrice = 0;

  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const [totalAmounts, setTotalAmount] = useState();
  const { user } = useSelector((state) => state.user);

  const calculateTotalAmount = useCallback(() => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.productPrice * item.quantity;
    });
    return totalAmount.toFixed(2);
  }, [cartItems]);

  useEffect(() => {
    const total = calculateTotalAmount();
    setTotalAmount(total);
  }, [calculateTotalAmount]);

  const stripePromise = loadStripe(
    "pk_test_51Oua6q07U8GQEuIa4pKSXCJdMRZaNGLy7vDCYLNcyQ7l1gjrCvnR8T2QwHW2Dqls3iF7fAakHjq1XTgEjRzi0dA900DC1apqyF"
  );

  const createOrder = async (values) => {
    try {
      const data = {
        cartItems,
        ...values,
        userId: user?._id,
        totalAmount: totalAmounts,
        amount: parseInt(totalAmounts * 100),
        items: cartItems?.map((item, index) => {
          const subtotalNumber = parseInt(item?.productPrice * item?.quantity);

          return {
            productId: item._id,
            quantity: item?.quantity,
            subtotal: subtotalNumber,
            productName: item?.productTitle,
          };
        }),
      };
      const res = await createCheckout(data);
      if (res?.data) {
        toast.success(res?.data?.message);
      }
      // Once you get the client secret from your server, you can redirect the user to the Stripe checkout page
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: res?.data?.paymentData?.sessionId,
        lineItems: res?.data?.paymentData?.line_items,
      });

      if (error) {
        console.error("Error redirecting to checkout page:", error);
      }

      console.log("Order created successfully:", res);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  const { Option } = Select;

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of flone react minimalist eCommerce template."
      />
      {/* breadcrumb */}
      <Breadcrumb
        pages={[
          { label: "Home", path: process.env.PUBLIC_URL + "/" },
          { label: "Checkout", path: process.env.PUBLIC_URL + pathname },
        ]}
      />
      <Form layout="vertical" onFinish={createOrder}>
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <Form.Item label="First Name" name="firstName">
                            <Input />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <Form.Item label="Last Name" name="lastName">
                            <Input />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <Form.Item name="country">
                            <Select defaultValue="Select a country">
                              <Option value="Select a country" disabled>
                                Select a country
                              </Option>
                              <Option value="Azerbaijan">Azerbaijan</Option>
                              <Option value="Bahamas">Bahamas</Option>
                              <Option value="Bahrain">Bahrain</Option>
                              <Option value="Bangladesh">Bangladesh</Option>
                              <Option value="Barbados">Barbados</Option>
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <Form.Item label="Address" name="address">
                            <Input />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <Form.Item label="Phone" name="phone">
                            <Input />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <Form.Item label="Email Address" name="email">
                            <Input />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <Form.Item name="notes">
                          <TextArea />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem?.productTitle} X{" "}
                                    {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    ${" "}
                                    {cartItem?.productPrice *
                                      cartItem?.quantity}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>$ {calculateTotalAmount()}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <Button type="primary" htmlType="submit">
                        Place Order
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Form>
    </Fragment>
  );
};

export default Checkout;
