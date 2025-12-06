"use client";

import React, { useRef } from "react";
import type { RefObject } from "react";
import { Icon } from "@iconify/react";
import { Controller, useForm } from "react-hook-form";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { DropdownProps } from "@/utils/utils";
import Input from "../components/input/Input";
import TextArea from "../components/input/TextArea";
import Button from "../components/button/Button";

interface FormData {
    listName: "",
    description: "",
  }

const CreateNewList = ({ onClose }: DropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(dropdownRef as RefObject<HTMLElement>, onClose);
  
    const {
      control,
      formState: { errors },
    } = useForm<FormData>({
      mode: "all",
      defaultValues: {
        listName: "",
        description: "",
      },
    });
  
    return (
      <div
        ref={dropdownRef}
        className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-[600] p-4"
      >
        <div className="absolute w-full sm:w-[700px] max-w-[calc(100vw-16px)] sm:max-w-[calc(100vw-24px)] bg-white z-50 rounded-[12px] p-4 sm:p-6 animate-fadeIn shadow-[0px_8px_8px_-4px_#1018280A] shadow-[0px_20px_24px_-4px_#1018281A]">
          <div className="flex justify-end">
            <Icon
              icon="material-symbols:cancel-outline"
              width={20}
              height={20}
              onClick={onClose}
              className="text-[#111827] cursor-pointer sm:w-6 sm:h-6"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-[#121212] text-[18px] sm:text-[24px] font-opensans font-semibold">
            Create new List
            </h1>
  
            <form>
              <Controller
                name="listName"
                control={control}
                rules={{ required: "List name is required" }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    type="text"
                    label="Name of List"
                    id="listName"
                    name="listName"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={`${!!errors.listName?.message}`}
                    errorMessage={errors.listName?.message}
                    placeholder="eg netflix"
                    customClass="!py-3 sm:!py-[18px] !pl-4 sm:!pl-5 !bg-[#F8F8FF] rounded-[12px] sm:rounded-[16px] w-full border border-gray-300 !h-[48px] sm:!h-[56px]"
                  />
                )}
              />
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
              {/* <SearchableSelect
                id="select-movie"
                options={options}
                onChange={handleChange}
                placeholder="Trick ‘n’ Treate"
                label="Add a movie"
                customClass="mb-4"
              /> */}
              <Button
                type="submit"
                label="Save"
                customClass="gradient-button !text-white text-sm sm:text-base font-opensans font-semibold !py-3 sm:!py-4 !px-4 sm:!px-[14px] !w-full !rounded-[16px] sm:!rounded-[24px] !h-[48px] sm:!h-[56px]"
              />
              <div className="mt-4 sm:mt-6 cursor-pointer flex justify-center">
                <span
                  onClick={onClose}
                  className="text-gray-500 font-opensans text-xs sm:text-sm font-semibold"
                >
                  Cancel
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

export default CreateNewList;