import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useAuth } from "@/utils/auth-hook";
import Input from "@/components/input";
import LabeledInput from "@/components/labeled-input";
import { useForm } from "react-hook-form";
import { UserModel } from "@/utils/user-model";
import { userSignupSchema } from "@/components/user/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/button";

export default function SignUp() {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserModel>({
    resolver: zodResolver(userSignupSchema),
  });

  const onSubmit = (data: any) => {
    auth.signup(data);
  };

  useEffect(() => {
    reset({
      firstName: "jelly",
      lastName: "bean",
      email: "jelly@bean.com",
      password: "jellybean",
    });
  }, []);

  return (
    <>
      <div className=" flex justify-center items-center h-screen w-full">
        <div className="bg-gray-800 p-8 rounded-2xl flex flex-col items-center max-w-sm w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div className="flex flex-col space-y-2 w-full">
              {/* convert above input to Input */}
              <div className="text-center text-3xl font-semibold mb-10">
                SignUp Form
              </div>
              <LabeledInput
                label="First Name"
                register={{
                  ...register("firstName"),
                }}
                error={errors.firstName?.message}
              />{" "}
              <LabeledInput
                label="Last Name"
                register={{
                  ...register("lastName"),
                }}
                error={errors.lastName?.message}
              />
              <LabeledInput
                label="Email"
                register={{
                  ...register("email"),
                }}
                error={errors.email?.message}
              />
              <LabeledInput
                label="Password"
                register={{
                  ...register("password"),
                }}
                error={errors.password?.message}
              />
            </div>

            <div className="flex gap-x-4 mt-4">
              <Button type="submit">Submit</Button>
              <Button
                onClick={() => {
                  auth.testApiCall();
                }}
              >
                Api call
              </Button>
            </div>
            <p className="text-sm mt-2 text-center">
              <Link href="/login"> go to Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
