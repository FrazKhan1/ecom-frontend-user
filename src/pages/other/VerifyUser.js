import React, { useEffect } from "react";
import { verifyUser } from "../../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyUser = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const userVerification = async () => {
    try {
      const res = await verifyUser(token);
      if (res) {
        navigate("/user/home");
        console.log("res in userVerify", res);
        toast.success(res?.data?.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    userVerification();
  }, []);
  return <div></div>;
};

export default VerifyUser;
