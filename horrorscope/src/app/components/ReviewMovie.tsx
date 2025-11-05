"use client";

import React, { useRef } from "react";
import { Icon } from "@iconify/react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { usePopularHorrorMovies, useReviewMovieMutation } from "@/hooks/useMovieHooks";
import Button from "./button/Button";
import Input from "./input/Input";
import SearchableSelect from "./input/SearchableSelect";
import TextArea from "./input/TextArea";
import StarRating from "./input/StarRating";
import { DropdownProps, FormData, ReviewPayload, SelectOption, capitalizeFirstLetter } from "@/utils/utils";
import Spinner from "./spinner/Spinner";

const ReviewMovie = ({ onClose }: DropdownProps) => {
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  
  // Fetch the list of movies for the dropdown
  const { data: movieOptions, isLoading: isMoviesLoading, error: moviesError } = usePopularHorrorMovies();

  // Initialize the form with react-hook-form
  const {
    control,
    handleSubmit,
    reset,
    watch, // <--- 1. Import watch to monitor form values
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    defaultValues: {
      filmId: "", // Default for the movie ID
      streamingPlatform: "",
      reviewText: "",
      rating: 0,
    },
  });

  // 2. Watch the value of the 'filmId' field
  const selectedFilmId = watch("filmId");

  // 3. Find the selected movie title
  const selectedMovie = movieOptions?.find(opt => opt.value === selectedFilmId);
  
  // Construct the dynamic title
  const modalTitle = selectedMovie 
    ? `Review ${selectedMovie.label}` 
    : "Review a Movie";
  
  // Mutation hook for submitting the review
  const reviewMutation = useReviewMovieMutation(() => {
    onClose(); // Close the modal on successful submission
    reset(); // Reset the form fields
  });

  // Apply useOnClickOutside to the outer modal overlay
  useOnClickOutside(modalOverlayRef, onClose);
  
  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const payload: ReviewPayload = {
        filmId: data.filmId,
        rating: data.rating,
        reviewText: data.reviewText,
        streamingPlatform: data.streamingPlatform,
    };
    reviewMutation.mutate(payload);
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
            {capitalizeFirstLetter(modalTitle)} {/* <--- Dynamic Title Used Here */}
          </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* --- Select Movie Dropdown --- */}
              <Controller
                name="filmId" // Field name must match FormData
                control={control}
                rules={{ required: "Please select a movie" }}
                render={({ field: { onChange, value } }) => (
                  <SearchableSelect
                    id="select-movie"
                    // Show a loading message or options
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
                    disabled={isMoviesLoading || !!moviesError}
                    // Value ensures the correct option object is passed back to the Select
                    value={movieOptions?.find(opt => opt.value === value) as SelectOption | undefined}
                  />
                )}
              />
              {errors.filmId && (
                  <p className="text-red-500 text-sm mb-4 mt-[-10px]">
                    {errors.filmId.message}
                  </p>
              )}


              {/* --- Review Text Area --- */}
              <Controller
                render={({ field: { onChange, value } }) => (
                  <TextArea
                    id="textArea"
                    label="Add review"
                    value={value || ""}
                    name="reviewText"
                    onChange={onChange}
                    placeholder="add brief reviewText"
                  />
                )}
                name="reviewText"
                control={control}
                rules={{ required: "Review text is required" }}
              />
              {errors.reviewText && (
                <p className="text-red-500 text-sm mb-4 mt-[-10px]">
                  {errors.reviewText.message}
                </p>
              )}


              {/* --- Streaming Platform Input --- */}
              <Controller
                name="streamingPlatform"
                control={control}
                rules={{ required: "Platform is required" }}
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

              {/* --- Star Rating Field --- */}
              <Controller
                name="rating"
                control={control}
                rules={{ required: "Please provide a rating", min: { value: 1, message: "Rating must be at least 1 star" } }}
                render={({ field: { value, onChange, name } }) => (
                  <StarRating
                    label="Rate movie"
                    name={name}
                    value={value as number}
                    onChange={onChange} 
                    customClass="mb-4"
                  />
                )}
              />
               {errors.rating && (
                <p className="text-red-500 text-sm mb-4 mt-[-10px]">
                  {errors.rating.message}
                </p>
              )}

              <Button
                type="submit"
                label={reviewMutation.isPending ? <Spinner size="small" /> : "Save"}
                customClass="gradient-button !text-white text-base font-opensans font-semibold !py-4 !px-[14px] !w-full !rounded-[24px] !h-[56px] mt-4"
                disabled={reviewMutation.isPending}
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
        </div>
      </div>
    </div>
  );
};

export default ReviewMovie;