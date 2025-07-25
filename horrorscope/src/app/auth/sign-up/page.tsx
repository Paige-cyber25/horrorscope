"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import Button from "@/app/components/button/Button";
import Radio from "@/app/components/input/Radio";
import Input from "@/app/components/input/Input";

interface FormData {
  isOver18: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  genres: string[];
}

const Page: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const [confirmPasswordType, setConfirmPasswordType] = useState<
    "text" | "password"
  >("password");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    mode: "all",
    defaultValues: {
      isOver18: "",
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      genres: [],
    },
  });

  const selectedGenres = watch("genres");

  const allGenres: string[] = [
    "Found Footage",
    "Psychological",
    "Cosmic Horror",
    "Ghosts",
    "Shootings",
    "Slasher",
    "Folk Horror",
    "Ancient Curses",
    "Rituals",
    "Vampire Horror",
    "Trees",
    "Neo-Noir Horror",
    "J-Horror/K-Horror",
    "Werewolf Horror",
    "Zombie Horror",
  ];

  const filteredGenres = allGenres.filter((genre) =>
    genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = useCallback(
    (data: FormData) => {
      if (step === 1 && !data.isOver18) {
        return; // Prevent proceeding if isOver18 is not selected
      }
      if (
        step === 2 &&
        (!data.username ||
          !data.email ||
          !data.password ||
          !data.confirmPassword)
      ) {
        return; // Prevent proceeding if required fields are empty
      }
      if (step === 3) {
        console.log("Form Data:", data);
        router.push("/auth/login");
      } else {
        setStep((prev) => prev + 1);
      }
    },
    [step, router]
  );

  const handleSkip = useCallback(() => {
    if (step === 3) {
      // Get current form data
      const formData = watch();
      console.log("Skipped Genre Selection, Form Data:", formData);
      router.push("/auth/login");
    }
  }, [step, watch, router]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  }, [step]);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setConfirmPasswordType((prev) =>
      prev === "password" ? "text" : "password"
    );
  }, []);

  const handleGenreChange = useCallback(
    (genre: string) => {
      const currentGenres = selectedGenres || [];
      if (currentGenres.includes(genre)) {
        setValue(
          "genres",
          currentGenres.filter((g: string) => g !== genre),
          { shouldValidate: true }
        );
      } else {
        setValue("genres", [...currentGenres, genre], { shouldValidate: true });
      }
    },
    [selectedGenres, setValue]
  );

  const renderFormContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div>
              <p className="text-midnight-black font-opensans text-[20px] font-normal">
                Enter if you dare… Are you 18 or older?
              </p>
            </div>
            <div>
              <p className="text-sm font-opensans text-midnight-black font-semibold">
                Click yes if you are 18 or older and no if otherwise
              </p>
              <div className="flex items-center gap-8 mt-[3px]">
                <Controller
                  name="isOver18"
                  control={control}
                  rules={{ required: "Please select an option" }}
                  render={({ field }) => (
                    <Radio
                      label="Yes"
                      value="yes"
                      checked={field.value === "yes"}
                      onChange={() => field.onChange("yes")}
                    />
                  )}
                />
                <Controller
                  name="isOver18"
                  control={control}
                  rules={{ required: "Please select an option" }}
                  render={({ field }) => (
                    <Radio
                      label="No"
                      value="no"
                      checked={field.value === "no"}
                      onChange={() => field.onChange("no")}
                    />
                  )}
                />
              </div>
              {errors.isOver18 && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.isOver18.message}
                </p>
              )}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <p className="text-midnight-black font-opensans text-[20px] font-normal">
                Email and password… Where shall we send your nightmares?
              </p>
            </div>
            <div className="flex flex-col gap-4">
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
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div>
              <p className="text-midnight-black font-opensans text-[20px] font-normal">
                Select your Horror Subgenre Preferences
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-midnight-black font-opensans text-sm font-semibold">
                {allGenres.length} Total
              </span>
              <div className="relative right-[-12%]">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  className="py-2 font-opensans font-semibold text-base text-midnight-black focus:outline-none"
                />
                <Icon
                  icon="material-symbols:search"
                  className="w-5 h-5 text-[#4B5563] absolute right-20 top-1/2 transform -translate-y-1/2"
                />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {filteredGenres.map((genre) => (
                  <div
                    key={genre}
                    onClick={() => handleGenreChange(genre)}
                    className={`cursor-pointer px-3 py-[10px] rounded-[10px] font-opensans text-base font-semibold transition-all ${
                      selectedGenres.includes(genre)
                        ? "bg-[#121212] text-white shadow-[0px_0px_0px_4px_#1F293740]"
                        : "bg-white text-[#242E49]"
                    }`}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            </div>
            {selectedGenres.length > 0 && (
              <div className="mt-4">
                <div className="text-sm font-opensans text-midnight-black font-semibold flex items-center gap-2">
                  Selected:{" "}
                  <span className="flex flex-wrap gap-2">
                    {selectedGenres.map((genre) => (
                      <div
                        key={genre}
                        className="flex items-center gap-1 bg-gray-200 rounded-[7px] px-2 py-[6px]"
                      >
                        <span className="text-[12px] font-opensans text-midnight-black font-semibold">
                          {genre}
                        </span>
                        <Icon
                          icon="iconoir:cancel"
                          className="w-4 h-4 text-midnight-black cursor-pointer"
                          onClick={() => handleGenreChange(genre)}
                          aria-label={`Remove ${genre}`}
                        />
                      </div>
                    ))}
                  </span>
                </div>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="header relative min-h-screen w-full pb-[100px]">
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
          height={200}
          className="object-contain w-[254px] h-[43px]"
          priority
        />
      </div>
      <div className="mt-[49px] mx-auto bg-[#F8F8FF] py-[40px] px-[32px] max-w-[700px] rounded-[8px] shadow-[0px_2px_4px_-1px_#0000000F] shadow-[0px_4px_6px_-1px_#0000001A]">
        {step > 1 && (
          <div
            className="flex items-center gap-2 cursor-pointer mb-6"
            onClick={handleBack}
          >
            <div className="bg-white w-6 h-6 border border-[#E4E7EC] rounded-[4px] flex items-center justify-center">
              <Icon icon="material-symbols:arrow-back" className="w-3 h-3" />
            </div>
            <span className="text-sm font-opensans text-midnight-black font-medium">
              Go back
            </span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <h1 className="text-midnight-black text-[24px] font-opensans font-bold text-left">
            Sign up
          </h1>
          <div className="bg-red-900 text-[#F8F8FF] font-opensans text-[18px] font-bold rounded-[8px] p-[4px]">
            {step}/3
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-6"
        >
          {renderFormContent()}
          <div className="flex gap-4">
            {step === 1 && (
              <Button
                type="submit"
                label="Next"
                customClass="gradient-button !text-white text-base font-opensans font-semibold !py-4 !px-[14px] !w-full !rounded-[24px] !h-[56px]"
              />
            )}
            {step === 2 && (
              <Button
                type="submit"
                label="Sign up"
                customClass="gradient-button !text-white text-base font-opensans font-semibold !py-4 !px-[14px] !w-full !rounded-[24px] !h-[56px]"
              />
            )}
            {step === 3 && (
              <Button
                type="submit"
                label="Save"
                customClass="gradient-button !text-white text-base font-opensans font-semibold !py-4 !px-[14px] !w-full !rounded-[24px] !h-[56px]"
              />
            )}
          </div>
        </form>
        {step === 2 && (
          <div className="mt-6 flex items-center justify-center gap-1">
            <span className="text-gray-500 font-opensans text-sm font-semibold">
              Have an account?
            </span>
            <Link
              href="/auth/login"
              className="text-black font-opensans text-sm font-semibold"
            >
              Log in
            </Link>
          </div>
        )}
        {step === 3 && (
          <div className="mt-6 flex items-center justify-center gap-1">
            <span
              onClick={handleSkip}
              className="text-gray-500 font-opensans text-sm font-semibold"
            >
              Skip
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
