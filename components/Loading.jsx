"use client";

import React, { useEffect, useState } from "react";
import TypingAnimation from "./TypingAnimation";
import { useParams, usePathname } from "next/navigation";

const Loading = () => {
  const pathName = usePathname();

  const [text, setText] = useState("");
  const loadingText = "Loading...";


  useEffect(() => {

    const delay = 120;

    const typeText = (index) => {
      if (index <= loadingText.length) {
        setText(loadingText.slice(0, index));
        setTimeout(() => {
          typeText(index + 1);
        }, delay);
      }
    };

    typeText(0);
  }, []);

  return (
    <>
      {pathName === "/" && (
        <div className="h-screen flex justify-center items-center">
          <progress className="progress bg-white w-56"></progress>
        </div>
      )}
      {(pathName.startsWith("/profile") || pathName.startsWith("/openai") || pathName === "/create-prompt" ||
        pathName.startsWith("/update-prompt")) && (
        <div className="flex justify-center items-center h-screen">
          <div className="text-2xl font-semibold text-white">{text}</div>
        </div>
      )}
    </>
  );
};

export default Loading;
