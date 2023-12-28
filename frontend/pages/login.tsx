import { Inter } from "@next/font/google";
import React, { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/utils/auth-hook";
import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { UserModel } from "@/utils/user-model";
import {
  userLoginSchema,
  userSignupSchema,
} from "@/components/user/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import LabeledInput from "@/components/labeled-input";
import Button from "@/components/button";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserModel>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = (data: any) => {
    auth.login(data);
  };

  useEffect(() => {
    reset({
      email: "jelly@bean.com",
      password: "jellybean",
    });
  }, []);

  return (
    <>
      <div className=" font-bold flex flex-col space-y-4 justify-center items-center h-screen w-full">
        <div className="bg-gray-800 p-8 rounded-2xl flex flex-col items-center max-w-sm w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div className="flex flex-col space-y-2 w-full">
              <div className="text-center text-3xl font-semibold mb-10">
                Login Form
              </div>
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

            <div className="flex gap-x-4 pt-2">
              <Button type="submit">Submit</Button>
              <Button
                onClick={() => {
                  auth.testApiCall();
                }}
              >
                Api call
              </Button>
            </div>
            <p className="text-sm text-center">
              <Link href="/signup">go to Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
