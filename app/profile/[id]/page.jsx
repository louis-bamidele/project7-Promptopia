"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const publicProfilePage = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [posts, setPosts] = useState([]);

  const pathname = usePathname();
  const [name, setName] = useState(pathname.replace("/profile/", ""));
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };
    if (userId) {
      fetchProfile();
    }
  }, []);
  let desc = `Unlock Your Creativity at Promptopia! 🌟 Dive into the world of ${name} endless inspiration. Craft, collect, and collaborate on prompts that ignite your imagination. Join our vibrant community of storytellers!`;

  return <Profile name={name} desc={desc} data={posts} />;
};

export default publicProfilePage;
