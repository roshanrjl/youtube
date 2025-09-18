import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const success = params.get("success");
    const user = params.get("user");
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (success === "true" && user && accessToken) {
      localStorage.setItem("user", user);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
    }
  }, [location, navigate]);

  return <div>Logging in...</div>;
};

export default GoogleCallback;
