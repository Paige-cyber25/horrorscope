
"use client";

import React, { useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Controller, useForm } from "react-hook-form";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Button from "./button/Button";
import Input from "./input/Input";
import SearchableSelect from "./input/SearchableSelect";
import TextArea from "./input/TextArea";
import { DropdownProps, CreatePartyFormData, SelectOption, generateTimeOptions, findOptionByValue, WatchPartyPayload } from "@/utils/utils";
import { usePopularHorrorMovies } from "@/hooks/useMovieHooks"; 
import { useAllUsers, useCreateWatchParty } from "@/hooks/useUserHooks";
import Spinner from "./spinner/Spinner";

// Define the component
const CreateWatchParty = ({ onClose }: DropdownProps) => {
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const [visibility, setVisibility] = useState<"Public" | "Private" | null>(
    "Private"
  );
  
  // --- Data Fetching ---
  const { data: movieOptions, isLoading: isMoviesLoading, error: moviesError } = usePopularHorrorMovies();
  const { data: userOptions, isLoading: isUsersLoading, error: usersError } = useAllUsers();
  
  // Generate time options once
  const timeOptions = useMemo(() => generateTimeOptions(), []);

  // --- Form Setup ---
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreatePartyFormData>({
    mode: "all",
    defaultValues: {
      streamingPlatform: "",
      scheduledAt: "",
      description: "",
      filmId: "",
      time: "",
      participants: [], // Initialize the participants array
    },
  });
  
  // Watch the selected time and participants for display/submission logic
  const watchTime = watch("time");

  // --- Mutation Setup ---
  const { mutate: createParty, isPending: isCreatingParty } = useCreateWatchParty(onClose);

  // --- Handlers ---
  useOnClickOutside(modalOverlayRef, onClose);

  const handleToggle = (option: "Public" | "Private") => {
    setVisibility(option);
  };
  
  const onSubmit = (data: CreatePartyFormData) => {
    if (!visibility) return;

    // 1. Prepare the payload for the API
    const payload: WatchPartyPayload = {
      filmId: data.filmId,
      description: data.description,
      scheduledAt: data.scheduledAt, // Should be YYYY-MM-DD
      time: findOptionByValue(timeOptions, data.time)?.label || "", // Get display label like "8:00 PM"
      streamingPlatform: data.streamingPlatform,
      isPrivate: visibility === "Private",
      // Extract only the IDs (values) from the SelectOption[] array
      participants: data.participants.map(opt => opt.value),
    };

    // 2. Call the mutation
    createParty(payload);
  };


  return (
    <div
      ref={modalOverlayRef}
      className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-[600] p-4"
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
            <form onSubmit={handleSubmit(onSubmit)}>
               {/* Select Film */}
            <Controller
                name="filmId"
                control={control}
                rules={{ required: "Please select a movie" }}
                render={({ field: { onChange, value } }) => (
                  <SearchableSelect
                    id="select-movie"
                    options={movieOptions || []} 
                    onChange={onChange}
                    loadingIndicator={isMoviesLoading ? <Spinner size="small" /> : undefined}
                    placeholder={
                      moviesError
                            ? "Error loading movies"
                            : "Select a movie to review"
                    }
                    label="Select a movie"
                    customClass="mb-4"
                    disabled={isMoviesLoading || !!moviesError || isCreatingParty }
                    value={movieOptions?.find(opt => opt.value === value) as SelectOption | undefined}
                  />
                )}
              />
              {errors.filmId && (
                  <p className="text-red-500 text-sm mb-4 mt-[-10px]">
                    {errors.filmId.message}
                  </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <Controller
                  name="scheduledAt"
                  control={control}
                  rules={{ required: "Watch date is required" }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Input
                      type="date"
                      label="Date to watch"
                      id="scheduledAt"
                      name="scheduledAt"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={`${!!errors.scheduledAt?.message}`}
                      errorMessage={errors.scheduledAt?.message}
                      placeholder="eg 2025-12-25"
                      customClass="!py-[18px] !pl-5 !bg-[#F8F8FF] rounded-[16px] w-full border border-gray-300 !h-[56px]"
                    />
                  )}
                />
                <Controller
                  name="time"
                  control={control}
                  rules={{ required: "Watch time is required" }}
                  render={({ field: { onChange } }) => (
                    <SearchableSelect
                      id="select-time"
                      options={timeOptions}
                      onChange={onChange}
                      placeholder="Select time"
                      label="Time"
                      customClass="mb-4 sm:mb-0"
                      value={findOptionByValue(timeOptions, watchTime)}
                    />
                  )}
                />
                {errors.time && (
                  <p className="text-red-500 text-sm mb-4 mt-[-10px]">
                    {errors.time.message}
                  </p>
              )}
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
                name="streamingPlatform"
                control={control}
                rules={{ required: "Streaming platform is required" }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    type="text"
                    label="Streaming platform(s)"
                    id="streamingPlatform"
                    name="streamingPlatform"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={`${!!errors.streamingPlatform?.message}`}
                    errorMessage={errors.streamingPlatform?.message}
                    placeholder="eg netflix"
                    customClass="!py-[18px] !pl-5 !bg-[#F8F8FF] rounded-[16px] w-full border border-gray-300 !h-[56px]"
                  />
                )}
              />
               {/* Select Members (Participants) */}
               {visibility === "Private" && (
                <Controller
                    name="participants"
                    control={control}
                    rules={{ required: "Select at least one participant for a private party" }}
                    render={({ field: { onChange, value } }) => (
                      <SearchableSelect
                        id="select-members"
                        options={userOptions || []}
                        onChange={onChange}
                        placeholder={
                            usersError
                              ? "Error loading users"
                              : "Select participants (usernames)"
                          }
                        label="Members"
                        customClass="mb-4"
                        isMulti={true} // Enable multi-select
                        disabled={isUsersLoading || !!usersError || isCreatingParty}
                        loadingIndicator={isUsersLoading ? <Spinner size="small" /> : undefined}
                        value={value}
                      />
                    )}
                  />
               )}
              
              {errors.participants && visibility === "Private" && (
                  <p className="text-red-500 text-sm mb-4 mt-[-10px]">
                    {errors.participants.message}
                  </p>
              )}
              
              <Button
                type="submit"
                label={isCreatingParty ?  <Spinner size="small" /> : "Save"}
                customClass="gradient-button !text-white text-base font-opensans font-semibold !py-4 !px-[14px] !w-full !rounded-[24px] !h-[56px]"
                disabled={isCreatingParty || isMoviesLoading || isUsersLoading}
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
    </div>
  );
};

export default CreateWatchParty;