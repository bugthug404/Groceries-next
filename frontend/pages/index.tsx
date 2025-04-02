import { useAuth } from "@/utils/auth-hook";
import Loader from "@/utils/loader";
import Link from "next/link";
import React from "react";

export default function Index() {
  const auth = useAuth();
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <div className="p-4 text-center">
          <div className="mb-4 text-2xl font-semibold">
            Groceries App (NodeJS + NextJs)
          </div>
          <div className="flex gap-4 justify-center">
            <Link href={"/login"}>Login</Link>
            <Link href={"/signup"}>Signup</Link>
            <div
              onClick={() => {
                auth.testApiCall();
              }}
            >
              Test api
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
