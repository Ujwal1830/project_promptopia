"use client";

import ChatBox from "@components/ChatBox";
import DummyPrompts from "@components/DummyPrompts";
import LoadingLayout from "@components/LoadingLayout";
import { fetchChatLogFromServer } from "@utils/fetchChatLogFromServer";
import { sendChatLogToServer } from "@utils/sendChatLogToServer";
import { sendMessageInChat } from "@utils/sendMessageInChat";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OpenAIPage = () => {
  const router = useRouter();
  const {data: session, status } = useSession();
  // if(status === 'unauthenticated'){
  //   router.push("/")
  // }
  
  // loading animation handler
  const [loading, setLoading] = useState(true);
  
  const [inputValue, setInputValue] = useState(""); //stores Input value.
  const [chatLog, setChatLog] = useState([]); // stores full chat logs
  const [isLoading, setIsLoading] = useState(false); //loading animation for message response
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // stores sideBar state

  const [chatSave, setChatSave] = useState(false); // flag for loading animation for save chat

  // Model ON/OFF Handling
  const [openModel, setOpenModel] = useState(false);

  //fetched chat logs from server
  const [fetchedChatLog, setFetchedChatLogs] = useState([]);
  const [allSummaryNames, setAllSummaryNames] = useState([]);

  const [sendChatFlag, setSendChatFlag] = useState(false);

  const [summaryFlag, setSummaryFlag] = useState(false)

  const handleSaveChatClick = async(event) => {
    await sendChatLogToServer(session?.user.id, chatLog, setChatLog, fetchedChatLog, setChatSave, setSendChatFlag, setSummaryFlag);
  };


  useEffect(() => {
    if (session && session.user) {
      const response = fetchChatLogFromServer(session?.user.id);
      response.then((allFetchedChatLogs) => {
        setFetchedChatLogs(allFetchedChatLogs);
        if(allFetchedChatLogs){
          const result = allFetchedChatLogs.map((chatLog) => chatLog.summaryName);
          setAllSummaryNames(result);
        }
      });
  }
  },[session])

  useEffect(() => {
    setTimeout(async () => {
      function handleResize() {setIsSidebarOpen(window.innerWidth > 700);}
      handleResize();
      window.addEventListener("resize", handleResize);
      setLoading(false);
      return () => {window.removeEventListener("resize", handleResize);};
    }, 500);
  }, []);

  const handleSendMessageCLick = async(e) => {
    e.preventDefault();
    
    if (inputValue.trim() === "") return;
    await sendMessageInChat(inputValue, setChatLog, setIsLoading);
    setInputValue("");
  };

  const [newChatflag, setNewChatFlag] = useState(false)
  const handleNewChatClick = async()=>{
    if(chatLog.length !== 0 ){
      await handleSaveChatClick();
      // setChatSave(true);
      document.getElementById('my_modal_4').showModal();
      setTimeout(() => {
        setChatSave(false);
      }, 2000);
    } else {
      setNewChatFlag(true);
      document.getElementById('my_modal_4').showModal();
    }
  }

  const [active, setActive] = useState(-1);

  const handleRecentSearchClick=async(index)=>{
    // const response = fetchChatLogFromServer(session?.user.id);
    setActive(index);
    console.log(index);
    if (fetchedChatLog) {
        if (index >= 0 && index < fetchedChatLog.length) {
          setChatLog(JSON.parse(fetchedChatLog[index].logs));
        }
      }
  }

  return (
    <LoadingLayout loading={loading}>
      {/* Model for save chat button */}
      { chatSave 
        ? <dialog id="my_modal_4" className="modal bg-black bg-opacity-60">
            <div className="modal-box w-fit p-14">
              <form method="dialog"><button onClick={()=>{setOpenModel(!openModel); setNewChatFlag(false);}} className="btn btn-sm btn-circle text-xl btn-ghost absolute right-2 top-2">✕</button></form>
              <span className="text-white bg-green-700 p-3 rounded-lg shadow-lg">Chat Saved !!🥳</span>
            </div>
          </dialog> 
        : <dialog id="my_modal_4" className="modal bg-black bg-opacity-60">
            <div className="modal-box w-fit p-14">
              <form method="dialog"><button onClick={()=>{setOpenModel(!openModel); setNewChatFlag(false);}} className="btn btn-sm btn-circle text-xl btn-ghost absolute right-2 top-2">✕</button></form>
              <span className="text-white bg-red-700 p-3 rounded-lg shadow-lg ">
                { isLoading && "Please wait for Response!" }
                { newChatflag && "Chat is Already empty" } 
                { sendChatFlag && "Chat Already Exist" } 
                {summaryFlag && "Chat can't be empty !!👻" }
              </span>
            </div>
          </dialog>}

      {/* Open AI Interface */}
      <div className="flex h-screen ">
        <div className={`${isSidebarOpen ? 'w-full sm:w-60' : 'md:w-5 w-1'} duration-300 bg-blackish py-12 relative`} >
          <div onClick={()=>{setIsSidebarOpen(!isSidebarOpen)}} className={`${!isSidebarOpen && 'rotate-180'} absolute cursor-pointer rounded-full -right-6 top-20  bg-grayish`}>
            <svg  className="h-12 w-12 text-gray-200"  width="45px" height="45px" viewBox="0 0 25.00 25.00" fill="none" stroke="#e5e7eb" transform="matrix(-1, 0, 0, 1, 0, 0)"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M10.5596 8.41992L13.6196 11.29C13.778 11.4326 13.9047 11.6068 13.9914 11.8015C14.0781 11.9962 14.123 12.2068 14.123 12.4199C14.123 12.633 14.0781 12.8439 13.9914 13.0386C13.9047 13.2332 13.778 13.4075 13.6196 13.55L10.5596 16.4199" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </div>
          <div className={`${!isSidebarOpen && 'scale-0'}mt-2 flex flex-col justify-center gap-2`} >
            <div>
            </div>
            <h1 onClick={handleNewChatClick} className={` ${!isSidebarOpen && 'scale-0'} cursor-pointer flex justify-center items-center gap-2 text-ellipsis text-center sm:text-xl mx-2 py-2 border-2 rounded-lg`}><svg className="h-5 w-5 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
              New Chat
            </h1>
            <h1 className={`${!isSidebarOpen && 'scale-0'} text-ellipsis text-center sm:text-lg w-full pt-1 pb-2 bg-grayish`}>Previous Searches</h1>
            <div className="flex">
                <ul className="flex flex-col gap-2 mx-1 overflow-y-auto flex-1"> 
                  {allSummaryNames?.map((summaryName, index) => (
                    <li key={index} className="relative" >
                      <button onClick={()=> handleRecentSearchClick(index)} className={` ${active===index && 'bg-grayish'} group w-full flex pl-2 pt-2 pb-3 items-center gap-3 relative rounded-md cursor-pointer break-all hover:bg-grayish`}>
                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        <div style={{transitionDelay: `${index+3}00ms`}} className={` ${ !isSidebarOpen && 'opacity-0 translate-x-28'} duration-500 overflow-hidden flex-1 flex justify-between text-ellipsis max-h-5 break-all relative text-sm sm:text-base`}>
                          {summaryName}<div className={`absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l ${active===index ? 'dark:from-grayish' : 'dark:from-blackish' } from-white group-hover:from-grayish dark:group-hover:from-grayish`}></div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
            </div>
          </div>
        </div>
        <div className="text-2xl mt-12 flex-1 flex flex-col justify-between bg-grayish shadow-inner shadow-blackish" >
          <div className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-0 sm:opacity-100' : 'opacity-100'} flex px-8 sm:px-20 justify-around shadow-lg bg-blackish shadow-blackish/40`} >
            <span className={`text-center py-2 uppercase `}>
              Open AI
            </span>
            { chatLog.length !== 0 && <div className="flex justify-end items-center">
              <button onClick={handleSaveChatClick} className=" rounded-lg bg-purple-600 text-sm px-3 py-2 text-white" >Save Chat</button>
            </div>}
          </div>
          <div className="h-fit flex flex-col overflow-y-auto">
                <ChatBox isLoading={isLoading} chatLog={chatLog} />
          </div>
          {chatLog.length === 0 && 
            <>
              <div className="flex flex-col justify-around items-center h-screen">
                <div className="chat-container">
                  <h1 className={`px-2 text-center transition-opacity duration-300 ${isSidebarOpen ? 'opacity-0 sm:opacity-100' : 'opacity-100'} text-lg md:text-2xl text-ellipsis font-inter uppercase`}>
                    Welcome to openai ChatBot Assistance </h1>
                  {/* Your chat content goes here */}
                </div>
                <DummyPrompts isSidebarOpen={isSidebarOpen} />
              </div>
            </>
          }
          <div className="bg-blackish pb-4">
            <hr className="text-ellipsis pt-2" />
              <div className="mx-3 lg:mx-4 mb-2 rounded-full ">
                    <form onSubmit={handleSendMessageCLick} className={`relative flex flex-grow lg:px-20 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-0 sm:opacity-100' : 'opacity-100'}`}>
                      <input type="text" placeholder="Type your message........" value={inputValue} onChange={(e) => setInputValue(e.target.value)} 
                        className={`w-full flex h-10 py-3 pl-4 pr-16 rounded-xl text-sm text-gray-200 outline-0  bg-opacity-90`}
                      />
                      <button
                        type="submit"
                        className="h-8 rounded-xl absolute lg:right-10 right-1 top-1 bottom-0"
                      >
                        <svg
                          className="h-6 w-10 "
                          width="24"
                          height="24"
                          viewBox="0 0 48 48"
                          fill="#fafafa"
                        >
                          <g strokeWidth="0"></g>
                          <g strokeLinecap="round" strokeLinejoin="round"></g>
                          <g>
                            {" "}
                            <g data-name="Layer 2">
                              {" "}
                              <g data-name="invisible box">
                                {" "}
                                <rect width="48" height="48" fill="none"></rect>{" "}
                              </g>{" "}
                              <g data-name="icons Q2">
                                {" "}
                                <path d="M44.9,23.2l-38-18L6,5A2,2,0,0,0,4,7L9.3,23H24a2.1,2.1,0,0,1,2,2,2,2,0,0,1-2,2H9.3L4,43a2,2,0,0,0,2,2l.9-.2,38-18A2,2,0,0,0,44.9,23.2Z"></path>{" "}
                              </g>{" "}
                            </g>{" "}
                          </g>
                        </svg>
                      </button>
                    </form>
              </div>
          </div>
        </div>
        
      </div>
    </LoadingLayout>
  );
};

export default OpenAIPage;
