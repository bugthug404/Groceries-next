import React from "react";

export default function Input({
  Ref,
  value,
  placeholder,
  className,
}: {
  Ref?: React.RefObject<HTMLInputElement>;
  value?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      ref={Ref}
      defaultValue={value}
      onChange={(e) => {
        if (Ref?.current?.value) {
          Ref.current.value = e.target.value;
        }
      }} // to remove warning
      className={
        "pl-4 py-2 focus:outline-none bg-gray-900 rounded-xl font-bold" +
        className
      }
    />
  );
}
