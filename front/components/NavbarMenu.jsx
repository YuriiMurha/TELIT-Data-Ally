"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill, BsHouseAdd } from "react-icons/bs";
import "@styles/glass.css";
import "@styles/Light_style.css";
import "@styles/Fonts.css";
import { Search } from "lucide-react";
const NavbarMenu = () => {
  return (
    <div className="fixed w-full justify-center z-50">
      <div className="fixed gap-5 py-0 w-full shadow-lg flex items-center justify-between frosted-glass border-b-pink-500 border-b-2 z-50 px-48">
        <div className="flex flex-row gap-5 justify-center items-center">
          {/* Логотип */}
          <a href="http://localhost:3000/">
            <img
              src="https://digitalnakoalicia.sk/wp-content/uploads/2021/11/slovak-telekom-logowine.png"
              alt="Erste Digital Logo"
              width={100} // задайте подходящие размеры
              height={60} // можно настроить по необходимости
              className="p-1"
            />
          </a>
          {/* Навигация */}
          <div className="flex space-x-6 px-10 font-semibold uppercase">
            <div href="#introduction">
              <a className="text-black hover:text-pink-700">Introduction</a>
            </div>
            <div href="#apis">
              <a className="text-black hover:text-pink-700">APIs</a>
            </div>
            <div href="#datasets">
              <a className="text-black hover:text-pink-700">Datasets</a>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 border-l-2 border-pink-500 pl-3">
          <button className="text-pink-600 hover:text-pink-700 flex items-center font-bold uppercase">
            <span className="mr-2">
              <Search size={20} />
            </span>{" "}
            Search
          </button>
          <button className="bg-pink-600 text-white  py-1 px-4 rounded-lg  font-bold uppercase">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default NavbarMenu;
