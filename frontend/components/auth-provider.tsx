import { useAuth } from "@/utils/auth-hook";
import {
  globalLoaderAtom,
  userAuthTokenAtom,
  userDataAtom,
} from "@/utils/global-atom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export function AuthProvider(props: { children: React.ReactNode }) {
  const setLoaderOpen = useSetAtom(globalLoaderAtom);
  const auth = useAuth();
  const [token, setToken] = useAtom(userAuthTokenAtom);
  const [user, setUser] = useAtom(userDataAtom);
  const router = useRouter();
  const publicpath = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];

  useEffect(() => {
    console.log("auth provider");
    setLoaderOpen(true);
    if (!user) {
      const info = localStorage.getItem("userData");
      if (info) {
        setUser(JSON.parse(info).user);
        setToken(JSON.parse(info).token);
        router.push("/home");
        setLoaderOpen(false);
        return;
      } else if (publicpath.includes(router.pathname)) {
        setLoaderOpen(false);
        return;
      } else {
        router.push("/login");
        setLoaderOpen(false);
        return;
      }
    } else {
      router.push("/home");
      setLoaderOpen(false);
      return;
    }
  }, [router.pathname]);

  if (auth.user && !publicpath.includes(router.pathname)) {
    return <>{props.children}</>;
  } else if (!token && publicpath.includes(router.pathname)) {
    return <>{props.children}</>;
  } else {
    return <>{props.children}</>;
  }
}
