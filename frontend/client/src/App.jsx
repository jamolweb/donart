import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Footer, Header, Main } from "./components";
import Favorites from "./components/layout/pages/Favorites";
import Karzina from "./components/layout/pages/Karzina";
import Location from "./components/layout/pages/Location";
import Sales from "./components/layout/pages/Sales";
import Admin from "./components/layout/Admin";
import Smartfones from "./components/layout/kategoryPages/Smartfones";
import Washing from "./components/layout/kategoryPages/Washing";
import TV from "./components/layout/kategoryPages/TV";
import Gaz from "./components/layout/kategoryPages/Gaz";
import Notebook from "./components/layout/kategoryPages/Notebook";
import Utik from "./components/layout/kategoryPages/Utik";
import User from "./components/layout/pages/User";
import ProductIN from "./components/profuct-in/ProductIn";

const Loading = () => {
  return (
    <div className="setLoading">
      <svg className="pl3" viewBox="0 0 128 128" width="128px" height="128px">
        <g fill="var(--primary)">
          <rect
            className="pl3__rect"
            rx="8"
            ry="8"
            width="64"
            height="64"
            transform="translate(64,0)"
          />
          <g className="pl3__rect-g" transform="scale(-1,-1)">
            <rect
              className="pl3__rect"
              rx="8"
              ry="8"
              width="64"
              height="64"
              transform="translate(64,0)"
            />
          </g>
        </g>
        <g fill="#DD1470" mask="url(#pl-mask)">
          <rect
            className="pl3__rect"
            rx="8"
            ry="8"
            width="64"
            height="64"
            transform="translate(64,0)"
          />
          <g className="pl3__rect-g" transform="scale(-1,-1)">
            <rect
              className="pl3__rect"
              rx="8"
              ry="8"
              width="64"
              height="64"
              transform="translate(64,0)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1);
  }, []);

  return (
    <div className="app">
      {isLoading ? <Loading /> : <>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/karzina" element={<Karzina />} />
            <Route path="/location" element={<Location />} />
            <Route path="/profile" element={<User />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/product/:id" element={<ProductIN />} />
            <Route path="/smartphone" element={<Smartfones />} />
            <Route path="/washing" element={<Washing />} />
            <Route path="/tv" element={<TV />} />
            <Route path="/gaz" element={<Gaz />} />
            <Route path="/notebook" element={<Notebook />} />
            <Route path="/utik" element={<Utik />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
        </>
        }
    </div>
  );
};

export default App;
