"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import LoadingLayout from "@components/LoadingLayout";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const [userName, setUserName ] = useState("");

  const [posts, setPosts] = useState([]);

  console.log(params);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      try {

        const fetchPosts = async () => {
          try {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();
      
            setUserName(data[0].creator.given_name);
            setPosts(data);
            setIsLoading(false);
          } catch (error) {
            console.log(error);
          }
        };

        if (params?.id) fetchPosts();
        
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }, 3000);
  }, [params?.id]);
    

  return (
    <LoadingLayout loading={isLoading}>
      <Profile
        name={userName+"'s"}
        desc={`Welcome to ${userName}'s personalized profile page. Share ${userName}'s exceptional prompts and inspire others with the power of your imagination`}
        data={posts}
      />
    </LoadingLayout>
  );
};

export default UserProfile;