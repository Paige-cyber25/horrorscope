"use client";

import React, { useRef, useState } from "react";
import type { RefObject } from "react";
import { Icon } from "@iconify/react";
import { Controller, useForm } from "react-hook-form";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Button from "./button/Button";
import Input from "./input/Input";
import SearchableSelect from "./input/SearchableSelect";
import TextArea from "./input/TextArea";

interface ReviewDropdownProps {
  onClose: () => void;
  top: number;
  left: number;
}

interface FormData {
  platform: string;
  watchDate: string;
  description: string;
}

const ReviewMovie = ({ onClose, top, left }: ReviewDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [visibility, setVisibility] = useState<"Public" | "Private" | null>(
    "Private"
  );

  useOnClickOutside(dropdownRef as RefObject<HTMLElement>, onClose);

  // Data will come from BE
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const {
    // handleSubmit,
    control,
    formState: { errors },
    // setValue,
    // watch,
  } = useForm<FormData>({
    mode: "all",
    defaultValues: {
      platform: "",
      watchDate: "",
      description: "",
    },
  });

  const handleToggle = (option: "Public" | "Private") => {
    setVisibility(option);
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute w-[700px] max-w-[calc(100vw-24px)] bg-white z-50 rounded-[12px] p-6 sm:p-6 p-4 animate-fadeIn shadow-[0px_8px_8px_-4px_#1018280A] shadow-[0px_20px_24px_-4px_#1018281A]"
      style={{ 
        top: `${top}px`, 
        left: typeof window !== 'undefined' && window.innerWidth < 768 ? '50%' : `${left}px`,
        transform: typeof window !== 'undefined' && window.innerWidth < 768 ? 'translateX(-50%)' : 'none'
      }}
    >
      <div className="flex justify-end">
        <Icon
          icon="material-symbols:cancel-outline"
          width={24}
          height={24}
          onClick={onClose}
          className="text-[#111827] cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-[#121212] text-[24px] sm:text-[24px] text-[20px] font-opensans font-semibold">
          Create a watch party
        </h1>
        <div className="flex items-center gap-4 bg-[#E2E8F0] rounded-[31px] w-fit p-[4px] mx-auto sm:mx-0">
          <button
            onClick={() => handleToggle("Public")}
            className={`px-4 py-2 text-sm font-opensans font-semibold rounded-[28px] ${
              visibility === "Public"
                ? "bg-white text-[#121212] cursor-pointer"
                : "bg-[#E2E8F0] text-gray-500 cursor-pointer"
            }`}
          >
            Public
          </button>
          <button
            onClick={() => handleToggle("Private")}
            className={`px-4 py-2 text-sm font-opensans font-semibold rounded-[28px] ${
              visibility === "Private"
                ? "bg-white text-[#121212]"
                : "bg-[#E2E8F0] text-gray-500"
            }`}
          >
            Private
          </button>
        </div>

        {visibility && (
          <form>
            <SearchableSelect
              id="select-movie"
              options={options}
              onChange={handleChange}
              placeholder="Trick 'n' Treat"
              label="Select a movie"
              customClass="mb-4"
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <Controller
                name="watchDate"
                control={control}
                rules={{ required: "Watch date is required" }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    type="date"
                    label="Date to watch"
                    id="watchDate"
                    name="watchDate"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={`${!!errors.watchDate?.message}`}
                    errorMessage={errors.watchDate?.message}
                    placeholder="eg netflix"
                    customClass="!py-[18px] !pl-5 !bg-[#F8F8FF] rounded-[16px] w-full border border-gray-300 !h-[56px]"
                  />
                )}
              />
              <SearchableSelect
                id="select-time"
                options={options}
                onChange={handleChange}
                placeholder="6pm"
                label="Time"
                customClass="mb-4 sm:mb-0"
              />
              <SearchableSelect
                id="select-timezone"
                options={options}
                onChange={handleChange}
                placeholder="WAT"
                label="Timezone"
                customClass="mb-4 sm:mb-0"
              />
            </div>

            <Controller
              render={({ field: { onChange, value } }) => (
                <TextArea
                  id="textArea"
                  label="Description"
                  value={value || ""}
                  name="description"
                  onChange={(value) => {
                    onChange(value);
                  }}
                  placeholder="add brief description"
                />
              )}
              name="description"
              control={control}
            />
            <Controller
              name="platform"
              control={control}
              rules={{ required: "Platform is required" }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  type="text"
                  label="Streaming platform(s)"
                  id="platform"
                  name="platform"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={`${!!errors.platform?.message}`}
                  errorMessage={errors.platform?.message}
                  placeholder="eg netflix"
                  customClass="!py-[18px] !pl-5 !bg-[#F8F8FF] rounded-[16px] w-full border border-gray-300 !h-[56px]"
                />
              )}
            />
            <SearchableSelect
              id="select-members"
              options={options}
              onChange={handleChange}
              placeholder="Tope"
              label="Members"
              customClass="mb-4"
            />
            <Button
              type="submit"
              label="Save"
              customClass="gradient-button !text-white text-base font-opensans font-semibold !py-4 !px-[14px] !w-full !rounded-[24px] !h-[56px]"
            />
            <div className="mt-6 cursor-pointer flex justify-center">
              <span
                onClick={onClose}
                className="text-gray-500 font-opensans text-sm font-semibold"
              >
                Cancel
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReviewMovie;