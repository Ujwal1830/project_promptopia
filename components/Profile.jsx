"use client";

import PromptCard from "./PromptCard";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingLayout from "./LoadingLayout";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const { status } = useSession();

  if (status === "unauthenticated") {
    console.log("inside session check");
    useRouter().push("/");
  }

  return (
    
      <section className="w-full h-screen pt-20 px-3">
        <h1 className="head_text text-left">
          <span className="bg-gradient-to-r from-red-500 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
            {name} Profile
          </span>
        </h1>
        <p className="desc text-left">{desc}</p>

        <div className="mt-10 prompt_layout">
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      </section>
  );
};

export default Profile;
