"use client";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "./Modal";

const Nav = () => {

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const {data: session } = useSession();
  const [providers, setProviders] = useState(null);

  const [modelOpen, setModelOpen] = useState(false);
  const closeModel=()=>{
    setModelOpen(!modelOpen);
  }

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (<>
    { modelOpen && <Modal closeModel={closeModel} />}
    <nav className="flex-between w-full fixed py-1 top-0 left-0 z-10 pr-4 pl-2 lg:px-36 bg-white">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src="/assets/images/main-logo.svg"
          alt="Promptopia Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5 justify-center items-center group">
            <Link href="/create-prompt" className="btn bg-grayish btn-sm text-white hover:text-blackish">
              Create Prompt
              <svg class="h-6 w-8 text-purple-400 group-hover:text-purple-700"  fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </Link>

            {!toggleDropdown ? (
                <Image
                  src={session?.user.image}
                  alt="profile-logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                  onClick={() => {setToggleDropdown((prev) => !prev)}}
                />
              ) : ( 
                <div onClick={()=>setToggleDropdown(false)}>
                  <svg class="h-8 w-8 text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                </div>
            )}
            {toggleDropdown && (
              <>
                <div className="dropdown_large">
                  <Link href="/profile" onClick={() => setToggleDropdown(false)} className="flex justify-between items-center">
                    <Image src={session?.user.image} alt="profile-logo" width={50} height={50} className="rounded-full" onClick={() => {setToggleDropdown((prev) => !prev)}} />
                    <div>
                      <h1 className="font-bold text-lg text-right bg-gradient-to-r from-red-500 via-yellow-400 to-orange-300 bg-clip-text text-transparent">
                        {session?.user.name}
                      </h1>
                      <h1 className="text-xs">
                        {session?.user.email}
                      </h1>
                    </div>
                  </Link>
                  <div className="border-t"></div>
                  <Link
                    href="/about"
                    className="flex justify-end hover:bg-grayish hover:py-1.5 hover:rounded-xl hover:px-2"
                    onClick={() => setToggleDropdown(false)}
                  ><div className="flex items-center">
                      About
                      <svg class="h-6 w-10 text-purple-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg>
                    </div>
                  </Link>
                  <Link
                    href="/contact"
                    className="flex justify-end hover:bg-grayish hover:py-1.5 hover:rounded-xl hover:px-2"
                    onClick={() => setToggleDropdown(false)}
                  ><div className="flex items-center">
                      Contact
                      <svg class="h-6 w-10 text-purple-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />  <path d="M15 7a2 2 0 0 1 2 2" />  <path d="M15 3a6 6 0 0 1 6 6" /></svg>
                    </div>
                  </Link>
                  <button
                    type="button" onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }} className="btn btn-neutral text-white">
                    Sign Out
                    <svg class="h-8 w-8 text-purple-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />  <polyline points="16 17 21 12 16 7" />  <line x1="21" y1="12" x2="9" y2="12" /></svg>
                  </button>
                </div>
              </>)}
          </div>
        ) : (
          <>
            <button
              type="button"
              key={"google"}
              onClick={() => setModelOpen(!modelOpen)}
              className="px-3 text-xs btn btn-neutral btn-sm text-white"
            >
              Sign In
              <svg class="h-6 w-6 text-purple-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />  <polyline points="10 17 15 12 10 7" />  <line x1="15" y1="12" x2="3" y2="12" /></svg>
            </button>
          </>
        )}
      </div>

      {/* Mobile */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            {!toggleDropdown ? (
                <Image
                  src={session?.user.image}
                  alt="profile-logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                  onClick={() => {setToggleDropdown((prev) => !prev)}}
                />
              ) : ( 
                <div onClick={()=>setToggleDropdown(false)}>
                  <svg class="h-8 w-8 text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                </div>
            )}

            {toggleDropdown && (
              <>
                <div className="dropdown">
                  <Link href="/profile" onClick={() => setToggleDropdown(false)} className="flex justify-between items-center">
                    <Image src={session?.user.image} alt="profile-logo" width={50} height={50} className="rounded-full" onClick={() => {setToggleDropdown((prev) => !prev)}} />
                    <div>
                      <h1 className="font-bold text-lg text-right bg-gradient-to-r from-red-500 via-orange-300 to-yellow-400 bg-clip-text text-transparent">{session?.user.name}</h1>
                      <h1 className="text-xs text-white">{session?.user.email}</h1>
                    </div>
                  </Link>
                  <div className="border-t"></div>
                  <Link
                    href="/create-prompt"
                    className="flex justify-end"
                    onClick={() => setToggleDropdown(false)}
                  ><div className="flex items-center">
                    Create Prompt
                    <svg class="h-6 w-10 text-purple-400"  fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </div>
                  </Link>
                  <Link
                    href="/about"
                    className="flex justify-end"
                    onClick={() => setToggleDropdown(false)}
                  ><div className="flex items-center">
                      About
                      <svg class="h-6 w-10 text-purple-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg>
                    </div>
                  </Link>
                  <Link
                    href="/contact"
                    className="flex justify-end"
                    onClick={() => setToggleDropdown(false)}
                  ><div className="flex items-center">
                      Contact
                      <svg class="h-6 w-10 text-purple-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />  <path d="M15 7a2 2 0 0 1 2 2" />  <path d="M15 3a6 6 0 0 1 6 6" /></svg>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut("/");
                    }}
                    className="btn btn-neutral text-white"
                  >
                    Sign Out
                    <svg class="h-8 w-8 text-purple-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />  <polyline points="16 17 21 12 16 7" />  <line x1="21" y1="12" x2="9" y2="12" /></svg>
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <button
              type="button"
              key={"google"}
              onClick={() => {setModelOpen(true)}}
              className="px-4 btn btn-neutral btn-sm text-white"
            >
              Sign In{' '}
              <svg class="h-6 w-6 text-purple-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />  <polyline points="10 17 15 12 10 7" />  <line x1="15" y1="12" x2="3" y2="12" /></svg>
            </button>
        
          </>
        )}
      </div>
    </nav>
    </>
  );
};

export default Nav;
