"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AccountMainComponent = () => {
  const router = useRouter();

  const [authCookie, setAuthCookie] = useState(Cookies.get("auth"));

  useEffect(() => {
    setAuthCookie(Cookies.get("auth"));
  }, [Cookies.get("auth")]);

  useEffect(() => {
    if (authCookie == undefined || authCookie.length < 1) {
      router.push("/login");
    }
  }, [authCookie]);

  return <div>Enter</div>;
};

export default AccountMainComponent;
