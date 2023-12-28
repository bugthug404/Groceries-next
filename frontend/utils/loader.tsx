import { useAtom } from "jotai";
import React from "react";
import { globalLoaderAtom } from "./global-atom";

export default function Loader() {
  const [loading, setLoading] = useAtom(globalLoaderAtom);
  return (
    <>
      {loading && (
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
          className=" fixed top-0 left-0 z-50 h-screen w-full gap-8 flex flex-col items-center justify-center"
        >
          <div className="loading"></div>
          <button
            onClick={() => {
              setLoading(false);
            }}
            className="px-2 py-1 bg-red-500 mt-4"
          >
            close
          </button>
        </div>
      )}
    </>
  );
}
