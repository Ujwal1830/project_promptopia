"use client";

import Feed from "@components/Feed";
import LoadingLayout from "@components/LoadingLayout";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(async () => {    
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <LoadingLayout loading={loading}>
      <section className="w-full px-4 min-h-screen flex justify-center items-center flex-col mx-auto">
        <h1 className="mt-32 lg:mt-20 head_text text-center">
          Discover & Share
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">
            {" "}
            AI-Powered Prompt
          </span>
        </h1>
        <p className="desc text-center">
          Promptopia is an open-source AI prompting tool for modern world to
          discover, create and share creative prompts
        </p>

        <hr className="mt-6 mb-2 lg:mt-12 border-t text-white w-full" />
        <Link href="/openai">
          <button
            type="button"
            className="px-4 pt-2 pb-3 rounded-xl bg-gradient-to-r from-blue-700 via-cyan-500 to-sky-700 text-white"
          >
            <p className="">Ask me anything</p>
          </button>
        </Link>
        <p className="desc text-center">OR</p>
        <p className="desc text-center lg:mt-4">
          Search for the creative prompts.....
        </p>

        <Feed />
      </section>
    </LoadingLayout>
  );
};

export default Home;
