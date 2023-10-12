"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import LoadingLayout from "./LoadingLayout";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
<<<<<<< HEAD
    <div className="prompt_layout">
=======
    <div className='mt-16 prompt_layout'>
>>>>>>> 901ab111b41606ac6e8491ed965f6ed29454feba
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> 901ab111b41606ac6e8491ed965f6ed29454feba

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

<<<<<<< HEAD
=======
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

>>>>>>> 901ab111b41606ac6e8491ed965f6ed29454feba
  useEffect(() => {
      const fetchPosts = async ()=>{
        const response = await fetch(`/api/prompt`);
        const data = await response.json();
    
        setPosts(data);
      }
      fetchPosts();
  }, []);
<<<<<<< HEAD

  
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
=======
>>>>>>> 901ab111b41606ac6e8491ed965f6ed29454feba

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
<<<<<<< HEAD
    // className="feed"
    <section className="px-8 sm:px-32 w-full">
      <form className=" mt-1 flex justify-center items-center">
=======
    <section className='feed'>
      <form className='relative w-full flex-center'>
>>>>>>> 901ab111b41606ac6e8491ed965f6ed29454feba
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
<<<<<<< HEAD
      <hr className="my-2 border-t text-white w-full flex overflow-hidden" />
        { searchText ? (
            <PromptCardList 
              data={searchResults}
              handleTagClick={handleTagClick}
            />
          ) : (
            <PromptCardList data={posts} handleTagClick={handleTagClick} />
          )}
=======

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
>>>>>>> 901ab111b41606ac6e8491ed965f6ed29454feba
    </section>
  );
};

export default Feed;
