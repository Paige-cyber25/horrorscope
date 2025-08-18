import React, { useRef } from "react";
import { Icon } from "@iconify/react";
import { Controller, useForm } from "react-hook-form";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import { DropdownProps } from "@/utils/utils";

interface FormData {
  email: string;
  username: string;
}

const EditProfile = ({ onClose }: DropdownProps) => {
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalOverlayRef, onClose);

  const {
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    defaultValues: {
      email: "",
      username: "",
    },
  });
  return (
    <div
      ref={modalOverlayRef}
      className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-[600] p-4" // Centering with flexbox
    >
      <div className="w-[700px] max-w-[calc(100vw-24px)] bg-white rounded-[12px] p-6 sm:p-6 p-4 animate-fadeIn shadow-[0px_8px_8px_-4px_#1018280A] shadow-[0px_20px_24px_-4px_#1018281A]">
        <div className="flex justify-end">
          <Icon
            icon="material-symbols:cancel-outline"
            width={24}
            height={24}
            onClick={onClose}
            className="text-[#111827] cursor-pointer"
          />
        </div>
        <div className="mt-6">
          <p className="text-midnight-black font-opensans text-[18px] sm:text-[24px] font-bold">
            Edit profile details
          </p>

          <form className="flex flex-col gap-6 mt-6">
            <Controller
              name="username"
              control={control}
              rules={{ required: "Username is required" }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  type="text"
                  label="Username"
                  id="username"
                  name="username"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={`${!!errors.username?.message}`}
                  errorMessage={errors.username?.message}
                  placeholder="toba109"
                  customClass="!py-[18px] !pl-10 !bg-[#F8F8FF] rounded-[16px] w-full border border-gray-300 !h-[56px]"
                  leftAccessory={
                    <small className="absolute left-[14px] bottom-[17px] cursor-pointer text-primary">
                      <Icon
                        icon="tdesign:user"
                        className="w-5 h-5 text-[#4B5563]"
                      />
                    </small>
                  }
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
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
                    <small className="absolute left-[14px] bottom-[17px] cursor-pointer text-primary">
                      <Icon
                        icon="ic:outline-mail"
                        className="w-5 h-5 text-[#4B5563]"
                      />
                    </small>
                  }
                />
              )}
            />
            <Button
              type="submit"
              label="Save"
              customClass="gradient-button !text-white text-base font-opensans font-semibold !py-4 !px-[14px] !w-full !rounded-[24px] !h-[56px]"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
