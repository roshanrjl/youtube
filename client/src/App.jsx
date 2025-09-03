import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshTokenOnLoad } from "./redux/authSlice";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { user, isloading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(refreshTokenOnLoad());
  }, [dispatch]);

  if (isloading) return <div>Loading...</div>;

  return (
    <>
      <Navbar user={user} />
      <Outlet />
    </>
  );
}

export default App;
