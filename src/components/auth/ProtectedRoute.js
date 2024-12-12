import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { verifyUserById } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/user-slice";

const ProtectedRoute = (props) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getUserInfoById = async () => {
    try {
      const res = await verifyUserById();
      if (res?.data) {
        dispatch(setUser(res?.data?.data));
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (!user) {
      getUserInfoById();
    }
  }, [user]);

  return props.children;
};

export default ProtectedRoute;
