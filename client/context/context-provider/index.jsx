"use client";
import axios from "axios";
import { AppContext } from "../app-context";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ContextProvider = ({ children }) => {
  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));
  const [cartNumber, setCartNumber] = useState(-1);

  useEffect(() => {
    axios
      .get(`https://fileshop-server.iran.liara.run/api/cart-number`, {
        headers: { auth_cookie: auth_cookie },
      })
      .then((d) => {
        setCartNumber(d.data.number);
      })
      .catch((err) => {
        setCartNumber(0);
      });
  }, [cartNumber]);

  return (
    <AppContext.Provider value={{ cartNumber, setCartNumber }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
