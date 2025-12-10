import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Home, Bookmark } from "lucide-react";
import BottomNavBar from "./BottomNavBar";
import Navbar from "./Navbar";

export default function SavedReels() {
  const [savedVideos, setSavedVideos] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/save", { withCredentials: true })
      .then((response) => {
        const savedFoods = response.data.savedFood.map((item) => ({
          _id: item.food._id,
          name: item.food.name,
          description: item.food.description,
          video: item.food.video,
          foodPartner: item.food.foodPartner._id,
          likeCount: item.food.likeCount,
          savesCount: item.food.savesCount,
        }));
        setSavedVideos(savedFoods);
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target;
          if (entry.isIntersecting) vid.play();
          else vid.pause();
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));

    return () => observer.disconnect();
  }, [savedVideos]);

  return (
    <>
    <Navbar />
      <div className="w-full h-screen flex flex-col bg-black">
        {/* Scrollable Saved Reels Section */}
        <div
          className="flex-1 overflow-y-scroll snap-y snap-mandatory"
          style={{ scrollSnapType: "y mandatory" }}
        >
          {savedVideos.length === 0 ? (
            <div className="flex justify-center items-center h-screen text-white text-xl">
              No saved videos found
            </div>
          ) : (
            savedVideos.map((item, index) => (
              <div
                key={item._id}
                className="relative h-screen snap-start flex justify-center items-center"
              >
                {/* Video */}
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={item.video}
                  className="h-full w-full object-cover"
                  playsInline
                  loop
                  muted
                />

                {/* Bottom Left Overlay */}
                <div className="absolute bottom-24 left-5 right-5 text-white">
                  <h2 className="text-white text-3xl font-bold mb-2">
                    {item.name}
                  </h2>
                  <p className="text-lg font-semibold line-clamp-2 mb-3">
                    {item.description}
                  </p>

                  <Link
                    to={`/foodpartner/${item.foodPartner}`}
                    className="bg-red-500 px-10 py-2 text-xl font-bold rounded-lg shadow-lg hover:bg-red-600 transition"
                  >
                    Visit Store
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FIXED BOTTOM NAV */}
        {/*       <div className="h-16 bg-black border-t border-gray-700 flex justify-around items-center fixed bottom-0 left-0 w-full z-50">
        <Link
          to="/"
          className="flex flex-col items-center text-white hover:text-red-400 transition"
        >
          <Home className="h-7 w-7" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          to="/saved"
          className="flex flex-col items-center text-red-500 transition"
        >
          <Bookmark className="h-7 w-7" />
          <span className="text-xs mt-1">Saved</span>
        </Link>
      </div> */}
        <BottomNavBar />
      </div>
    </>
  );
}
