import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Home, Bookmark, Heart, MessageCircle } from "lucide-react";
import BottomNavBar from "./BottomNavBar";

export default function HomeReels() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((response) => {
        setVideos(response.data.foodItems);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) video.play();
          else video.pause();
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));
    return () => observer.disconnect();
  }, [videos]);

  // ------------------------------------------------------
  // 🔥 LIKE
  // ------------------------------------------------------
  async function likeVideo(item) {
    const response = await axios.post(
      "http://localhost:3000/api/food/like",
      { foodId: item._id },
      { withCredentials: true }
    );

    if (response.data.like) {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v
        )
      );
    } else {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v
        )
      );
    }
  }

  // ------------------------------------------------------
  // 🔥 SAVE
  // ------------------------------------------------------
  async function savesVideo(item) {
    const response = await axios.post(
      "http://localhost:3000/api/food/save",
      { foodId: item._id },
      { withCredentials: true }
    );

    if (response.data.save) {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v
        )
      );
    } else {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v
        )
      );
    }
  }

  // ------------------------------------------------------
  // 🔥 COMMENT
  // ------------------------------------------------------

  const handleComment = async (id) => {
    const text = prompt("Write a comment:");
    if (!text) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/comment",
        { foodId: id, text },
        { withCredentials: true }
      );

      if (response.data.comment) {
        setVideos((prev) =>
          prev.map((v) =>
            v._id === id ? { ...v, comments: (v.comments || 0) + 1 } : v
          )
        );
      }

      alert("Comment Added!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-black">
      {/* Scroll Section */}
      <div className="flex-1 overflow-y-scroll snap-y snap-mandatory">
        {videos.map((item, index) => (
          <div
            key={item._id}
            className="relative h-[100vh] snap-start flex justify-center items-center"
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={item.video}
              className="h-full w-full object-cover"
              playsInline
              muted
              loop
            />

            {/* ACTION BUTTONS */}
            <div className="absolute right-4 bottom-60 flex flex-col items-center gap-6 text-white">
              {/* LIKE */}
              <div
                onClick={() => likeVideo(item)}
                className="flex flex-col items-center cursor-pointer"
              >
                <Heart
                  className={`h-9 w-9 transition ${
                    item.isLiked ? "text-red-500 scale-110" : "hover:scale-110"
                  }`}
                  fill={item.isLiked ? "red" : "none"}
                />
                <span className="mt-1 font-semibold">
                  {item.likeCount || 0}
                </span>
              </div>

              {/* COMMENT */}
              <div
                onClick={() => handleComment(item._id)}
                className="flex flex-col items-center cursor-pointer"
              >
                <MessageCircle className="h-9 w-9 hover:scale-110 transition" />
                <span className="mt-1 font-semibold">{item.comments || 0}</span>
              </div>

              {/* SAVE */}
              <div
                onClick={() => savesVideo(item)}
                className="flex flex-col items-center cursor-pointer"
              >
                <Bookmark
                  className={`h-9 w-9 transition ${
                    item.isSaved ? "text-blue-400 scale-110" : "hover:scale-110"
                  }`}
                  fill={item.isSaved ? "white" : "none"}
                />
                <span className="mt-1 font-semibold">
                  {item.savesCount || 0}
                </span>
              </div>
            </div>

            {/* Bottom Left Info */}
            <div className="absolute bottom-24 left-5 text-white">
              <h2 className="text-3xl font-bold mb-2">{item.name}</h2>
              <p className="text-lg font-semibold line-clamp-2 mb-4">
                {item.description}
              </p>

              <Link
                to={`/foodpartner/${item.foodPartner}`}
                className="bg-red-500 px-10 py-2 text-xl font-bold rounded-lg hover:bg-red-600 transition"
              >
                Visit Store
              </Link>
            </div>
          </div>
        ))}
      </div>

      <BottomNavBar />
    </div>
  );
}
