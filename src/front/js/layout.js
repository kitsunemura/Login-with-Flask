import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import injectContext from "./store/appContext";

import { Home } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/registerPage";
import { Private } from "./pages/private";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

    return (
        <div>
          <BrowserRouter basename={basename}>
            <ScrollToTop>
              <Navbar />
              <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<LoginPage />} path="/login" />
                <Route element={<Private />} path="/private" />
                <Route element={<RegisterPage />} path="/signup" />
                <Route element={<h1>Not found!</h1>} />
              </Routes>
              <Footer />
            </ScrollToTop>
          </BrowserRouter>
        </div>
      );
    };


export default injectContext(Layout);
