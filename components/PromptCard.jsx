"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Modal from "./Modal";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const [favourite, setFavourite] = useState(false);

  const {data: session, status} = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleProfileClick = async()=>{
    status === 'unauthenticated' 
      ? (() => {
        console.log("inside session check")
        setModelOpen(true)
        return;
      })() 
      : (
          post.creator._id === session?.user.id
          ? router.push('/profile') 
          : router.push(`/profile/${post.creator._id}`)
        )
  }

  const handleFavouriteClick=()=>{
    console.log(post.creator._id);
    setFavourite(!favourite);
  }

  const [modelOpen, setModelOpen] = useState(false);
  const closeModal=()=>{
    setModelOpen(false);
  }

  return (
    <div className="prompt_card">
      { modelOpen && <Modal closeModal={closeModal} />}
      <div className="flex justify-between items-start gap-5">
        {/* User Image, Uesrname and Email */}
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleProfileClick}>
          <Image
            src={post.creator.image}
            alt="user_iamge"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-800">
              {post.creator.username}
            </h3>
            <p className="font-inter text-xs text-gray-700">
              {post.creator.email}
            </p>
          </div>
        </div>
        {/* Copy button */}
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      {/* Prompt message */}
      <p className="my-4 font-inter text-sm text-black" >
        <p className={`message ${isExpanded ? 'h-auto' : 'h-12'} overflow-hidden`}>{post.prompt}</p>
        {post.prompt.length > 70 && (
          <button onClick={toggleExpand} className="text-gray-500" >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </p>
      <div className="flex justify-between">
        {/* Hashtag */}
        <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)}>#{post.tag} </p>
        {/* Favourite */}
        {pathName === "/" && (
          <div className="" onClick={handleFavouriteClick}>
            <svg class="h-5 w-5 text-yellow-500"  fill={ favourite ? "#eab308" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
          </div>
        )}
      </div>
      
      {/* Handle Edit and Delete ( only for own profile ). */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-4 flex-center gap-2">
          <p
            className="font-inter text-sm
            hover:btn hover:btn-sm hover:btn-success"
            onClick={handleEdit}
          >Edit</p>
          <p
            className="font-inter text-sm
            hover:btn hover:btn-sm hover:btn-error"
            onClick={handleDelete}
          >Delete</p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
