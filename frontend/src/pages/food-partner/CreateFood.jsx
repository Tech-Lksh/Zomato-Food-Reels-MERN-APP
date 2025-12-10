import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../general/BottomNavBar";

export default function CreateFood() {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      alert("Please upload a video!");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("name", name);
    formData.append("description", description);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/food",
        formData,
        {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );

      console.log("Food Created:", response.data);
      setUploadProgress(0);
      alert("Upload Successful!");

      navigate("/");

    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading food item.");
    }
  };

  const handleVideoUpload = (file) => {
    setVideo(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeVideo = () => {
    setVideo(null);
    setPreview(null);
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white dark:bg-gray-800 p-1 space-y-14 transition"
      >
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Create Food Item
        </h1>

        {/* Video Upload */}
        <label className="block">
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Upload Video
          </span>

          {!preview ? (
            <div className="mt-3 relative flex items-center justify-center h-48 bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-500 dark:border-gray-400 rounded-xl cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              <input
                type="file"
                accept="video/*"
                className="absolute opacity-0 h-full w-full cursor-pointer"
                onChange={(e) => handleVideoUpload(e.target.files[0])}
              />

              {/* SVG Upload Icon */}
              <div className="flex flex-col items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14 text-gray-700 dark:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 16V4m0 0l4 4m-4-4l-4 4m8 4v6H8v-6"
                  />
                </svg>

                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Select video to upload
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-3 relative">
              <video
                src={preview}
                className="w-full h-48 rounded-xl object-cover"
                controls
              />

              {/* Remove Button */}
              <button
                type="button"
                onClick={removeVideo}
                className="absolute top-2 right-2 bg-red-600 text-white px-4 py-1 rounded-lg shadow hover:bg-red-700 active:scale-95 transition"
              >
                Remove
              </button>
            </div>
          )}
        </label>

        {/* Progress Bar */}
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-300 dark:bg-gray-700 h-3 rounded-full">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {/* Food Name */}
        <label className="block">
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Food Name
          </span>
          <input
            type="text"
            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none mt-2"
            placeholder="Enter food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        {/* Food Description */}
        <label className="block">
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Description
          </span>
          <textarea
            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white outline-none mt-2"
            placeholder="Enter description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold shadow 
                     hover:bg-blue-700 active:scale-95 transition"
        >
          Upload Food
        </button>
      </form>

      <BottomNavBar />
    </div>
  );
}