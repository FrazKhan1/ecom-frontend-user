import { Fragment, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Form, Input, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import { setUser } from "../../store/slices/user-slice";
import toast from "react-hot-toast";
import { hideLoader, showLoader } from "../../store/slices/loader";

const MyAccount = () => {
  let { pathname } = useLocation();
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [profilePicture, setProfilePicture] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setImage = (img) => {
    return `http://localhost:8000/public/${img}`;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleUserUpdate = async (data) => {
    const formData = new FormData();

    if (data.firstName) {
      formData.append("firstName", data.firstName);
    }
    if (data.lastName) {
      formData.append("lastName", data.lastName);
    }
    if (data.userName) {
      formData.append("userName", data.userName);
    }
    if (data.email) {
      formData.append("email", data.email);
    }
    if (data.address) {
      formData.append("address", data.address);
    }
    if (data.phone) {
      formData.append("phone", data.phone);
    }
    if (data.password) {
      formData.append("password", data.password);
    }
    if (data.gender) {
      formData.append("gender", data.gender);
    }

    if (profilePicture !== null) {
      formData.append("profilePicture", profilePicture);
    }
    try {
      dispatch(showLoader());
      const res = await updateProfile(id, formData);
      dispatch(hideLoader());
      if (res?.data) {
        dispatch(setUser(res?.data?.data));
        toast.success(res?.data?.message);
      }
    } catch (error) {}
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="My Account page of flone react minimalist eCommerce template."
      />
      <Breadcrumb
        pages={[
          { label: "Home", path: process.env.PUBLIC_URL + "/" },
          { label: "My Account", path: process.env.PUBLIC_URL + pathname },
        ]}
      />

      <div className="myaccount-area pb-80 pt-100">
        <div className="container">
          <div className="row">
            <div className="ms-auto me-auto col-lg-9">
              <div className="myaccount-wrapper">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item
                    eventKey="0"
                    className="single-my-account mb-20"
                  >
                    <Accordion.Header className="panel-heading">
                      <span>1 .</span> Edit your account information{" "}
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="myaccount-info-wrapper">
                        <div className="account-info-wrapper">
                          <h4>My Account Information</h4>
                          <h5>Your Personal Details</h5>
                        </div>
                        <div className="row">
                          {user && (
                            <Form
                              layout="vertical"
                              onFinish={handleUserUpdate}
                              initialValues={user ? user : ""}
                            >
                              <div className="row">
                                <div className="col-lg-6">
                                  <Form.Item
                                    label="First Name"
                                    name="firstName"
                                  >
                                    <Input />
                                  </Form.Item>
                                </div>
                                <div className="col-lg-6">
                                  <Form.Item label="Last Name" name="lastName">
                                    <Input />
                                  </Form.Item>
                                </div>
                              </div>
                              <Form.Item label="User Name" name="userName">
                                <Input />
                              </Form.Item>
                              <Form.Item label="Email" name="email">
                                <Input />
                              </Form.Item>

                              <Form.Item label="Address" name="address">
                                <Input />
                              </Form.Item>
                              <Form.Item label="Phone" name="phone">
                                <Input />
                              </Form.Item>
                              <Form.Item label="Gender" name="gender">
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
                              {user?.profilePicture && (
                                <>
                                  <img
                                    width="250"
                                    src={setImage(user?.profilePicture)}
                                  />
                                  <Form.Item label="Profile Picture">
                                    <input
                                      style={{ border: "none", padding: "0px" }}
                                      type="file"
                                      onChange={handleFileChange}
                                    />
                                  </Form.Item>
                                </>
                              )}

                              <Form.Item>
                                <Button
                                  style={{ width: "100%", height: "45px" }}
                                  type="primary"
                                  htmlType="submit"
                                >
                                  Update
                                </Button>
                              </Form.Item>
                            </Form>
                          )}
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item
                    eventKey="1"
                    className="single-my-account mb-20"
                  >
                    <Accordion.Header className="panel-heading">
                      <span>2 .</span> Change your password
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="myaccount-info-wrapper">
                        <div className="account-info-wrapper">
                          <h4>Change Password</h4>
                        </div>
                        <div className="row">
                          <Form onFinish={handleUserUpdate} layout="vertical">
                            <Form.Item label="New Password" name="password">
                              <Input />
                            </Form.Item>
                            <Form.Item>
                              <Button
                                style={{ width: "100%", height: "45px" }}
                                type="primary"
                                htmlType="submit"
                              >
                                Update Password
                              </Button>
                            </Form.Item>
                          </Form>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item
                    eventKey="2"
                    className="single-my-account mb-20"
                  >
                    <Accordion.Header className="panel-heading">
                      <span>3 .</span> Modify your address book entries
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="myaccount-info-wrapper">
                        <div className="account-info-wrapper">
                          <h4>Address Book Entries</h4>
                        </div>
                        <div className="entries-wrapper">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                              <div className="entries-info text-center">
                                <p>John Doe</p>
                                <p>Paul Park </p>
                                <p>Lorem ipsum dolor set amet</p>
                                <p>NYC</p>
                                <p>New York</p>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                              <div className="entries-edit-delete text-center">
                                <button className="edit">Edit</button>
                                <button>Delete</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="billing-back-btn">
                          <div className="billing-btn">
                            <button type="submit">Continue</button>
                          </div>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MyAccount;
