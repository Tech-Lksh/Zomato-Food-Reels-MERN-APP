import React from "react";
import { Routes, Route } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import FoodPartnerRegister from "../pages/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/FoodPartnerLogin";
import Home from "../pages/general/Home";
import CreateFood from "../pages/food-partner/CreateFood";
import Profile from "../pages/food-partner/Profile";
import SavedReels from "../pages/general/SavedReels";
import BottomNavBar from "../pages/general/BottomNavBar";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
      <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
      <Route path="/" element={<Home />} />
      <Route path="/createfood" element={<CreateFood />} />
      <Route path="/foodpartner/:id" element={<Profile />} />
      <Route path="/saved" element={<SavedReels />} />
      <Route path="/bottomnavbar" element={<BottomNavBar />} />
    </Routes>
  );
};

export default AppRoutes;
