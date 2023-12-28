import React, { useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn<any>;
  error: any;
  type?: string;
}
export default function LabeledInput({
  register,
  label,
  error,
  type = "text",
}: InputProps) {
  return (
    <div className="relative flex flex-col items-start w-full ">
      <label>{label}</label>
      <input
        type={type}
        className={`w-full px-2 py-1 bg-black font-normal rounded-md outline-none bg-primaryContainer focus:outline-[1px] focus:outline-offset-0 focus-within:outline-secondary ${
          type === "file" && "text-[12px]"
        }`}
        {...register}
      />

      <p
        className={`absolute text-xs font-normal text-red-600 text-error transition-all duration-100 ease-in-out ${
          error ? "-bottom-[14px] " : "opacity-0 bottom-0"
        }`}
      >
        {error}
      </p>
    </div>
  );
}
