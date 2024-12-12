import React, { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Button, Form, Input, Select } from "antd";
import { userLogin, userRegister } from "../../actions/userActions";
import toast from "react-hot-toast";

const LoginRegister = () => {
  let { pathname } = useLocation();
  const [profilePicture, setProfilePicture] = useState();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleRegister = async (data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("profilePicture", profilePicture);
    formData.append(
      "origin",
      window.location.origin + "/auth/activation-account"
    );
    try {
      const res = await userRegister(formData);
      if (res?.data) {
        console.log(res?.data);
        toast.success(res?.data?.message);
      }
    } catch (error) {}
  };

  const handleLogin = async (data) => {
    try {
      const res = await userLogin(data);
      if (res?.data) {
        toast.success(res?.data?.message);
        navigate("/user/home");
        window?.localStorage?.setItem("token", res?.data?.data);
      }
    } catch (error) {}
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      {/* breadcrumb */}
      <Breadcrumb
        pages={[
          { label: "Home", path: process.env.PUBLIC_URL + "/" },
          { label: "Login Register", path: process.env.PUBLIC_URL + pathname },
        ]}
      />
      <div className="login-register-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 ms-auto me-auto">
              <div className="login-register-wrapper">
                <Tab.Container defaultActiveKey="login">
                  <Nav variant="pills" className="login-register-tab-list">
                    <Nav.Item>
                      <Nav.Link eventKey="login">
                        <h4>Login</h4>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="register">
                        <h4>Register</h4>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="login">
                      <div className="login-form-container">
                        <div className="login-register-form">
                          <Form layout="vertical" onFinish={handleLogin}>
                            <Form.Item label="Email" name="email">
                              <Input />
                            </Form.Item>
                            <Form.Item
                              style={{ marginTop: "-35px" }}
                              label="Password"
                              name="password"
                            >
                              <Input />
                            </Form.Item>
                            <div
                              style={{
                                marginTop: "-35px",
                                marginBottom: "20px",
                              }}
                            >
                              <Link to={process.env.PUBLIC_URL + "/"}>
                                Forgot Password?
                              </Link>
                            </div>
                            <Form.Item>
                              <Button
                                style={{ width: "100%", height: "45px" }}
                                type="primary"
                                htmlType="submit"
                              >
                                Login
                              </Button>
                            </Form.Item>
                          </Form>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="register">
                      <div className="login-form-container">
                        <div className="login-register-form">
                          <Form layout="vertical" onFinish={handleRegister}>
                            <div className="row">
                              <div className="col-lg-6">
                                <Form.Item label="First Name" name="firstName">
                                  <Input />
                                </Form.Item>
                              </div>
                              <div className="col-lg-6">
                                <Form.Item label="Last Name" name="lastName">
                                  <Input />
                                </Form.Item>
                              </div>
                            </div>
                            <Form.Item
                              style={{ marginTop: "-35px" }}
                              label="User Name"
                              name="userName"
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              style={{ marginTop: "-35px" }}
                              label="Email"
                              name="email"
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              style={{ marginTop: "-35px" }}
                              label="Password"
                              name="password"
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              style={{ marginTop: "-35px" }}
                              label="Address"
                              name="address"
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              style={{ marginTop: "-35px" }}
                              label="Phone"
                              name="phone"
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              style={{ marginTop: "-35px" }}
                              label="Gender"
                              name="gender"
                            >
                              <Select
                                options={[
                                  {
                                    value: "male",
                                    label: "Male",
                                  },
                                  {
                                    value: "female",
                                    label: "Female",
                                  },
                                ]}
                              />
                            </Form.Item>
                            <Form.Item
                              label="Profile Picture"
                              name="profilePicture"
                            >
                              <input
                                style={{ border: "none", padding: "0px" }}
                                type="file"
                                onChange={handleFileChange}
                              />
                            </Form.Item>
                            <div
                              style={{
                                marginTop: "-35px",
                                marginBottom: "20px",
                              }}
                            >
                              <Link to={process.env.PUBLIC_URL + "/"}>
                                Forgot Password?
                              </Link>
                            </div>
                            <Form.Item>
                              <Button
                                style={{ width: "100%", height: "45px" }}
                                type="primary"
                                htmlType="submit"
                              >
                                Register
                              </Button>
                            </Form.Item>
                          </Form>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginRegister;
