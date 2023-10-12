"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import LoadingLayout from "./LoadingLayout";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([]);
  
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
      const fetchPosts = async ()=>{
        const response = await fetch(`/api/prompt`);
        const data = await response.json();
    
        setPosts(data);
      }
      fetchPosts();
  }, []);

  
  const filterPrompts = (searchText)=>{
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (post) =>
      regex.test(post.creator.username) ||
      regex.test(post.tag) ||
      regex.test(post.prompt)
      ); 
    }
    
    const handleSearchChange = (e) => {
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);

      setSearchTimeout(
        setTimeout(() => {
          const searchResult = filterPrompts(e.target.value);
          setSearchResults(searchResult);
        }, 300)
      )
    };

    const handleTagClick = (tagName) => {
      setSearchText(tagName);

      const searchResult = filterPrompts(tagName);
      setSearchResults(searchResult);
    }


  return (
    // className="feed"
    <section className="px-3 sm:px-32 w-full">
      <form className=" mt-1 flex justify-center items-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <hr className="my-2 border-t text-white w-full flex overflow-hidden" />
        { searchText ? (
            <PromptCardList 
              data={searchResults}
              handleTagClick={handleTagClick}
            />
          ) : (
            <PromptCardList data={posts} handleTagClick={handleTagClick} />
          )}
    </section>
  );
};

export default Feed;
