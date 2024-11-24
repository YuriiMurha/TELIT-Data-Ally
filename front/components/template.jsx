"use client";

import { useEffect } from "react";
import { animatePageIn } from "@utils/animation";

export default function Template({ children }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <>
      <div
        id="banner-1"
        style={{ width: "9.09%", left: "0%", backgroundColor: "#635a67" }}
        className="min-h-screen bg-gray-100 z-[9999] fixed top-0 bg-[#635a67]"
      />
      <div
        id="banner-2"
        style={{ width: "9.09%", left: "9.09%", backgroundColor: "#635a67" }}
        className="min-h-screen bg-gray-100 z-[9999] fixed top-0"
      />
      <div
        id="banner-3"
        style={{ width: "9.09%", left: "18.18%", backgroundColor: "#635a67" }}
        className="min-h-screen bg-gray-100 z-[9999] fixed top-0"
      />
      <div
        id="banner-4"
        style={{ width: "9.09%", left: "27.27%", backgroundColor: "#635a67" }}
        className="min-h-screen bg-gray-100 z-[9999] fixed top-0"
      />
      <div
        id="banner-5"
        style={{ width: "9.09%", left: "36.36%", backgroundColor: "#635a67" }}
        className="min-h-screen bg-gray-100 z-[9999] fixed top-0"
      />
      <div
        id="banner-6"
        style={{ width: "9.09%", left: "45.45%", backgroundColor: "#635a67" }}
        className="min-h-screen bg-gray-100 z-[9999] fixed top-0"
      />
      <div
        id="banner-7"
        style={{ width: "9.09%", left: "54.54%", backgroundColor: "#635a67" }}
        className="min-h-screen bg-gray-100 z-[9999] fixed top-0"
      />
      <div
        id="banner-8"
        style={{ width: "9.09%", left: "63.63%", backgroundColor: "#635a67" }}
        className="min-h-screen bg-gray-100 z-[9999] fixed top-0"
      />
      <div
        id="banner-9"
        style={{ width: "9.09%", left: "72.72%", backgroundColor: "#635a67" }}
        className="min-h-screen bg-gray-100 z-[9999] fixed top-0"
      />
      <div
        id="banner-10"
        style={{ width: "9.09%", left: "81.81%", backgroundColor: "#635a67" }}
        className="min-h-screen bg-gray-100 z-[9999] fixed top-0"
      />
      <div
        id="banner-11"
        style={{ width: "9.09%", left: "90.9%", backgroundColor: "#635a67" }}
        className="min-h-screen bg-gray-100 z-[9999] fixed top-0"
      />
      {children}
    </>
  );
}
