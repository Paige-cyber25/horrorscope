"use client";

import React, { useRef } from "react";
import type { RefObject } from "react";
import { Icon } from "@iconify/react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Button from "./button/Button";
import Input from "./input/Input";
import SearchableSelect from "./input/SearchableSelect";
import TextArea from "./input/TextArea";
import { usePopularHorrorMovies } from "@/hooks/useMovieHooks";
import { useCreateListMutation } from "@/hooks/useListHooks"; // <--- Import Mutation Hook
import { ListFormData, SelectOption } from "@/utils/utils";
import Spinner from "./spinner/Spinner";

interface CreateNewListDropdownProps {
  onClose: () => void;
}


// Type for the final payload sent to the API
interface CreateListPayload {
    name: string;
    description: string;
    isPublic: boolean;
    filmIds: string[];
}

const CreateNewList = ({ onClose }: CreateNewListDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef as RefObject<HTMLElement>, onClose);
  
  const { data: movieOptions, isLoading: isMoviesLoading, error: moviesError } = usePopularHorrorMovies();

  // Mutation hook for list submission
  const createListMutation = useCreateListMutation(onClose);

  const options = [
    { value: "true", label: "Public" },
    { value: "false", label: "Private" },
  ];
  
  const {
    control,
    handleSubmit, // <--- Import handleSubmit
    formState: { errors },
  } = useForm<ListFormData>({
    mode: "all",
    defaultValues: {
      name: "",
      description: "",
      filmId: "", // Single string ID
      isPublic: "", // String representation of boolean
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<ListFormData> = (data) => {
    // Transform form data to match the API payload structure
    const payload: CreateListPayload = {
        name: data.name,
        description: data.description,
        // Convert string "true"/"false" to boolean
        isPublic: data.isPublic === "true", 
        // Convert single ID string to an array of IDs
        filmIds: data.filmId ? [data.filmId] : [],
    };
    
    // Call the mutation
    createListMutation.mutate(payload);
  };

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
            Create a new list
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}> {/* <--- Bind onSubmit here */}
            {/* Name Input */}
            <Controller
              name="name"
              control={control}
              rules={{ required: "List name is required" }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  type="text"
                  label="Name of List"
                  id="name"
                  name="name"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={`${!!errors.name?.message}`}
                  errorMessage={errors.name?.message}
                  placeholder="e.g. My Favorites"
                  customClass="!py-3 sm:!py-[18px] !pl-4 sm:!pl-5 !bg-[#F8F8FF] rounded-[12px] sm:rounded-[16px] w-full border border-gray-300 !h-[48px] sm:!h-[56px]"
                />
              )}
            />
            {/* Is Public Select */}
            <Controller
                name="isPublic"
                control={control}
                rules={{ required: "Please select an option" }}
                render={({ field: { onChange, value } }) => (
                <SearchableSelect
                  id="select-view"
                  options={options}
                  onChange={onChange}
                  placeholder="Public"
                  label="Who can view?"
                  customClass="mb-4"
                  // Ensure value is the corresponding option object for display
                  value={options.find(opt => opt.value === value) as SelectOption | undefined}
                    />
                )}
                />
            {/* Description Text Area */}
            <Controller
              render={({ field: { onChange, value } }) => (
                <TextArea
                  id="textArea"
                  label="Description"
                  value={value || ""}
                  name="description"
                  onChange={onChange} // Corrected onChange usage
                  placeholder="add brief description"
                />
              )}
              name="description"
              control={control}
            />
            {/* Select Film */}
            <Controller
                name="filmId" // Field name is filmId (string)
                control={control}
                rules={{ required: "Please select a movie" }}
                render={({ field: { onChange, value } }) => (
                  <SearchableSelect
                    id="select-movie"
                    options={movieOptions || []} 
                    onChange={onChange}
                    placeholder={
                      isMoviesLoading 
                        ? "Loading movies..." 
                        : moviesError 
                        ? "Error loading movies" 
                        : "Select a movie to review"
                    }
                    label="Select a movie"
                    customClass="mb-4"
                    disabled={isMoviesLoading || !!moviesError || createListMutation.isPending}
                    value={movieOptions?.find(opt => opt.value === value) as SelectOption | undefined}
                  />
                )}
              />
              {errors.filmId && (
                  <p className="text-red-500 text-sm mb-4 mt-[-10px]">
                    {errors.filmId.message}
                  </p>
              )}
            <Button
              type="submit"
              label={createListMutation.isPending ? <Spinner size="small" /> : "Save"}
              customClass="gradient-button !text-white text-sm sm:text-base font-opensans font-semibold !py-3 sm:!py-4 !px-4 sm:!px-[14px] !w-full !rounded-[16px] sm:!rounded-[24px] !h-[48px] sm:!h-[56px]"
              disabled={createListMutation.isPending}
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