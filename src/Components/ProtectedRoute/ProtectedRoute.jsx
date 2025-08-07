import  {  useContext, useEffect } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, msg, redirect }) => {
  const [{ user }] = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  });

  return children;
};

export default ProtectedRoute;
