"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AccountMainComponent = () => {
  const router = useRouter();

  const [auth_cookie, setauth_cookie] = useState(Cookies.get("auth_cookie"));
  const [auth_cookie2, setauth_cookie2] = useState(Cookies.get("auth_cookie"));

  useEffect(() => {
    if (auth_cookie != auth_cookie2) {
      router.push("/login");
    }
  }, [Cookies.get("auth_cookie")]);

  useEffect(() => {
    setauth_cookie2(Cookies.get("auth_cookie"));
  }, [Cookies.get("auth_cookie")]);

  return <div>Enter</div>;
};

export default AccountMainComponent;
