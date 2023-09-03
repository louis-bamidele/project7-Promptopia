"use client";
import { useState, useEffect, useRef } from "react";
import PromptFile from "./PromptFile";
import { useRouter } from "next/navigation";
const PromptFileList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptFile
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const router = useRouter();
  const submit = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (value.length > 0) {
      const filteredSearchPosts = posts.filter((post) => {
        return (
          post.tag.includes(value) ||
          post.creator.username.includes(value) ||
          post.prompt.includes(value)
        );
      });
      setPosts(filteredSearchPosts);
    } else {
      setFetchTrigger(fetchTrigger + 1);
    }
  };
  const handleTagClick = (tag) => {
    setSearchText(tag);
    // Create a new Event object for the 'change' event
    const event = new Event("change");

    // Trigger the 'change' event
    submit.current.dispatchEvent(event);
    console.log(submit.current);
    // handleSearchChange();
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [fetchTrigger]);
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          ref={submit}
          placeholder='Search for a Tag, username and any keywords'
          value={searchText}
          pattern='^[A-Za-z\s]*$'
          onChange={handleSearchChange}
          onBlur={handleSearchChange}
          className='search_input peer slideLeftReturn'
        />
      </form>
      <PromptFileList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
