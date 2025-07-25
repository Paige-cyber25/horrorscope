"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import Input from "@/app/components/input/Input";
import Button from "@/app/components/button/Button";

interface FormData {
  email: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const [type, setType] = useState<"text" | "password">("password");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const showAction = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log("Login data:", data);
    // Do actual login logic here using `data.email`, `data.password`
  
    // Simulate login success
    router.push("/home");
  };
  
  return (
    <div className="header relative min-h-screen w-full pb-[100px]">
      {/* Background images for large screens */}
      <Image
        src="/images/arrow.svg"
        alt="Top Center Decoration"
        width={200}
        height={200}
        className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2"
      />
      <Image
        src="/images/ghost.svg"
        alt="Right Center Decoration"
        width={200}
        height={200}
        className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2"
      />
      <Image
        src="/images/skull.svg"
        alt="Bottom Left Decoration"
        width={200}
        height={200}
        className="hidden lg:block absolute bottom-0 left-0"
      />
      <Image
        src="/images/dead-person.svg"
        alt="Bottom Right Decoration"
        width={200}
        height={200}
        className="hidden lg:block absolute bottom-0 right-0"
      />
      <div className="py-[42px] px-[76px]">
        <Image
          src="/images/white-horrorscope.svg"
          alt="Horroscope Logo"
          width={100}
          height={100}
          className="object-contain w-[254px] h-[43px]"
          priority
        />
      </div>

      <div className="mt-[49px] mx-auto bg-[#F8F8FF] py-[40px] px-[32px] max-w-[700px] rounded-[8px] shadow-[0px_2px_4px_-1px_#0000000F] shadow-[0px_4px_6px_-1px_#0000001A]">
        <h1 className="text-midnight-black text-[24px] font-opensans font-bold text-left">
          Login
        </h1>
        <form className="mt-6 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                type="email"
                label="Email address"
                id="email"
                name="email"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={`${!!errors.email?.message}`}
                errorMessage={errors.email?.message}
                placeholder="example@gmail.com"
                customClass="!py-[18px] !pl-10 !bg-[#F8F8FF] rounded-[16px] w-full border border-gray-300 !h-[56px]"
                leftAccessory={
                  <small
                    className={`absolute left-[14px] bottom-[17px] cursor-pointer text-primary`}
                  >
                    <Icon
                      icon="ic:outline-mail"
                      className="w-5 h-5 text-[#4B5563]"
                    />
                  </small>
                }
              />
            )}
          />
          <div className="mt-4">
            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  type={type}
                  label="Password"
                  id="password"
                  name="password"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={`${!!errors.password?.message}`}
                  errorMessage={errors.password?.message}
                  placeholder="Enter password"
                  customClass="!py-[18px] !pl-10 !bg-[#F8F8FF] rounded-[16px] w-full border border-gray-300 !h-[56px]"
                  leftAccessory={
                    <small
                      className={`absolute left-[14px] bottom-[17px] cursor-pointer text-primary`}
                    >
                      <Icon
                        icon="majesticons:lock-line"
                        className="w-5 h-5 text-[#4B5563]"
                      />
                    </small>
                  }
                  rightAccessory={
                    <small
                      className={`absolute right-[14px] bottom-[17px] cursor-pointer text-primary`}
                      onClick={showAction}
                    >
                      {type === "password" ? (
                        <Icon
                          icon="fluent:eye-24-regular"
                          className="w-5 h-5 text-[#4B5563]"
                        />
                      ) : (
                        <Icon
                          icon="fluent:eye-off-24-regular"
                          className="w-5 h-5 text-[#4B5563]"
                        />
                      )}
                    </small>
                  }
                />
              )}
            />
          </div>

          <span className="!mt-[5px] text-right text-neutral-black font-opensans text-sm font-semibold">
            Forgot Password?
          </span>
          <div className="mt-6">
            <Button
              type="submit"
              label="Log In"
              customClass="gradient-button !text-white text-base font-opensans font-semibold !py-4 !px-[14px] !w-full !rounded-[24px] !h-[56px]"
            />
          </div>

          <div className="mt-6 flex items-center justify-center gap-1">
            <span className="text-gray-500 font-opensans text-sm font-semibold">
              Don’t have an account?
            </span>
            <Link
              href="/auth/sign-up"
              className="text-black font-opensans text-sm font-semibold"
            >
              Sign Up
            </Link>
          </div>

          <div className="my-6 flex items-center justify-center gap-1">
            <span className="text-gray-500 font-opensans text-sm font-semibold">
              OR
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              type="button"
              size="large"
              label="Sign in with Facebook"
              customClass="bg-transparent text-[#1E1E1E] text-base font-bevietnampro font-medium border border-[#D0D5DD] rounded-[16px] py-[18px] h-[60px]"
              leftAccessory={
                <Image
                  alt="facebook icon"
                  width={24}
                  height={24}
                  src="/images/blue-facebook.svg"
                  className="w-6 h-6 mr-[8.78px]"
                />
              }
            />

            <Button
              type="button"
              size="large"
              label="Sign in with Google"
              customClass="bg-transparent text-[#1E1E1E] text-base font-bevietnampro font-medium border border-[#D0D5DD] rounded-[16px] py-[18px] h-[60px]"
              leftAccessory={
                <Image
                  alt="google icon"
                  width={24}
                  height={24}
                  src="/images/colored-google.svg"
                  className="w-6 h-6 mr-[8.78px]"
                />
              }
            />

            <Button
              type="button"
              size="large"
              label="Sign in with Apple"
              customClass="bg-transparent text-[#1E1E1E] text-base font-bevietnampro font-medium border border-[#D0D5DD] rounded-[16px] py-[18px] h-[60px]"
              leftAccessory={
                <Image
                  alt="apple icon"
                  width={24}
                  height={24}
                  src="/images/apple.svg"
                  className="w-6 h-6 mr-[8.78px]"
                />
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
