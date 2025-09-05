import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshTokenOnLoad } from "./redux/authSlice";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/Themeprovide";

function App() {
  const dispatch = useDispatch();
  const { user, isloading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(refreshTokenOnLoad());
  }, [dispatch]);

  if (isloading) return <div>Loading...</div>;

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar user={user} />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
