import React, { useCallback, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Controller, useForm } from "react-hook-form";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Button from "../components/button/Button";
import Input from "../components/input/Input";
import { DropdownProps } from "@/utils/utils";

interface FormData {
  password: string;
  confirmPassword: string;
}

const ChangePassword = ({ onClose }: DropdownProps) => {
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const [confirmPasswordType, setConfirmPasswordType] = useState<
    "text" | "password"
  >("password");
  useOnClickOutside(modalOverlayRef, onClose);

  const {
    control,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    mode: "all",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const togglePasswordVisibility = useCallback(() => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setConfirmPasswordType((prev) =>
      prev === "password" ? "text" : "password"
    );
  }, []);

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
            Change Password
          </p>

          <form className="flex flex-col gap-6 mt-6">
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  type={passwordType}
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
                    <small className="absolute left-[14px] bottom-[17px] cursor-pointer text-primary">
                      <Icon
                        icon="majesticons:lock-line"
                        className="w-5 h-5 text-[#4B5563]"
                      />
                    </small>
                  }
                  rightAccessory={
                    <small
                      className="absolute right-[14px] bottom-[17px] text-[#4B5563] cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      <Icon
                        icon={
                          passwordType === "password"
                            ? "fluent:eye-24-regular"
                            : "fluent:eye-off-24-regular"
                        }
                        className="w-5 h-5 text-[#4B5563]"
                      />
                    </small>
                  }
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  type={confirmPasswordType}
                  label="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={`${!!errors.confirmPassword?.message}`}
                  errorMessage={errors.confirmPassword?.message}
                  placeholder="Confirm password"
                  customClass="!py-[18px] !pl-10 !bg-[#F8F8FF] rounded-[16px] w-full border border-gray-300 !h-[56px]"
                  leftAccessory={
                    <small className="absolute left-[14px] bottom-[17px] cursor-pointer text-primary">
                      <Icon
                        icon="majesticons:lock-line"
                        className="w-5 h-5 text-[#4B5563]"
                      />
                    </small>
                  }
                  rightAccessory={
                    <small
                      className="absolute right-[14px] bottom-[17px] text-[#4B5563] cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      <Icon
                        icon={
                          confirmPasswordType === "password"
                            ? "fluent:eye-24-regular"
                            : "fluent:eye-off-24-regular"
                        }
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

export default ChangePassword;
