import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Home, Bookmark, Heart, MessageCircle } from "lucide-react";

export default function Profile() {
  const { id } = useParams();
  console.log("PARAM ID:", id);

  const [profile, setProfile] = useState(null);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/foodpartner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("DATA:", response.data); // IMPORTANT
        setProfile(response.data.foodPartner);
        setVideo(response.data.foodPartner.foodItems);
      })
      .catch((err) => console.log("ERROR:", err));
  }, [id]);

  return (
    <div className=" min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex justify-center">
      <div className="w-full max-w-md h-[93vh] bg-gray-100 dark:bg-gray-800 shadow-lg overflow-hidden relative">
        {/* TOP FIXED */}
        <div className="p-4 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 sticky top-0 z-20">
          <div className="flex items-center gap-5">
            {/* Profile Image */}
            {/* {profile?.image ? (
              <img
                src="https://images.unsplash.com/photo-1628563694622-5a76957fd09c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover"
              />
            ) : (
              <div className="h-32 w-32 rounded-full bg-gray-300 dark:bg-gray-700" />
            )} */}

            <div className="object-cover ">
              <img
              className="h-32 w-32 rounded-full"
               src="https://images.unsplash.com/photo-1628563694622-5a76957fd09c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" srcset="" />
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <div className="bg-blue-600 text-white py-2 rounded-lg text-center text-base md:text-lg">
                {profile?.name || "Business Name"}
              </div>
              <div className="bg-blue-600 text-white py-2 rounded-lg text-center text-base md:text-lg">
                {profile?.address || "Address"}
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="flex justify-between mt-4">
            <div className="text-center">
              <p className="bg-gray-300 dark:bg-gray-700 px-6 py-3 rounded-lg text-sm md:text-lg">
                Total Meals
              </p>
              <p className="mt-1 text-lg font-semibold">
                {profile?.totalMeals || 0}
              </p>
            </div>

            <div className="text-center">
              <p className="bg-gray-300 dark:bg-gray-700 px-6 py-3 rounded-lg text-sm md:text-lg">
                Customers Served
              </p>
              <p className="mt-1 text-lg font-semibold">
                {profile?.customersServed || 0}
              </p>
            </div>
          </div>
        </div>

        {/* SCROLLABLE GRID */}
        <div className="overflow-y-auto h-[calc(94vh-260px)] p-1 pb-28">
          <div className="grid grid-cols-3 gap-1">
            {profile?.foodItems?.length > 0 ? (
              profile.foodItems.map((item) => (
                <video
                  key={item._id}
                  src={item.video}
                  className="h-65 w-full rounded-xl object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-3 text-center">
                No videos found
              </p>
            )}
          </div>
        </div>

              {/* 🔥 FIXED BOTTOM NAVIGATION */}
              <div className="h-16 bg-black border-t border-gray-700 flex justify-around items-center fixed bottom-0 left-0 w-full z-50">
        
                <Link 
                to='/'
                className="flex flex-col items-center text-white hover:text-red-400 transition">
                  <Home className="h-7 w-7" />
                  <span className="text-xs mt-1">Home</span>
                </Link>
        
                <Link 
                to='/saved'
                className="flex flex-col items-center text-white hover:text-red-400 transition">
                  <Bookmark className="h-7 w-7" />
                  <span className="text-xs mt-1">Saved</span>
                </Link>
        
              </div>
      </div>
    </div>
  );
}
