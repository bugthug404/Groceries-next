import axios from "axios";
import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  globalLoaderAtom,
  userAuthTokenAtom,
  userDataAtom,
} from "./global-atom";
import { useRouter } from "next/router";

export function useAuth() {
  const [user, setUser] = useAtom(userDataAtom);
  const setUserToken = useSetAtom(userAuthTokenAtom);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const setLoader = useSetAtom(globalLoaderAtom);

  function login(data: any) {
    setLoader(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/login`, data, {
        headers: {
          mode: "cors",
          "Content-Type": "application/json",
          acccept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(async function (response) {
        if (response.data?.token && response?.data?.user) {
          setUserToken(response?.data?.token);
          setUser(response?.data?.user);
          localStorage.setItem("userData", JSON.stringify(response?.data));
        } else {
          alert("missing data");
        }

        alert("Login Successfull");
        router.push("/home");
      })
      .catch((error: any) => {
        return alert(
          `Api Response : ${
            JSON.stringify(error?.response?.message ?? "Login Failed") ??
            "no data"
          }`
        );
      })
      .finally(() => {
        setLoader(false);
      });
  }

  function signup(data: any, successCallBack?: Function) {
    setLoader(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/signup`, data, {
        headers: {
          mode: "cors",
          "Content-Type": "application/json",
          acccept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        console.log("response == ", response);
        successCallBack?.();
        alert("Signup Success!");
      })
      .catch((error) => {
        console.log(error);
        error.message &&
          alert(
            JSON.stringify(
              error?.response?.data?.error ?? "Error Creating User"
            )
          );
      })
      .finally(() => {
        setLoader(false);
      });
  }

  async function testApiCall() {
    setLoader(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API}`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        res.data.data && alert(`Api Response : ${res.data.data}`);
      })
      .catch((err) => {
        err.message && alert(`Api Response : ${err.message ?? "no data"}`);
      })
      .finally(() => {
        setLoader(false);
      });
  }

  async function logout() {
    localStorage.removeItem("userData");
    setUser(null);
    setUserToken(null);
    router.push("/login");
  }

  return { login, signup, testApiCall, logout, isLoggedIn, user };
}
