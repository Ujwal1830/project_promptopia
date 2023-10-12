import React from 'react'

const DummyPrompts = ({ isSidebarOpen }) => {
  return (
    <div className={` transition-opacity duration-300 ${isSidebarOpen ? 'opacity-0 sm:opacity-100' : 'opacity-100'} mx-10 md:mx-60`}>
            <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 gap-4">
              <div className="w-full bg-blackish cursor-pointer text-center pt-1 pb-2 sm:pt-2 sm:pb-3 rounded-lg shadow-lg shadow-blackish ">
                {/* <button className="btn relative btn-neutral group w-full whitespace-nowrap rounded-xl text-left text-gray-700 shadow-[0px_1px_6px_0px_rgba(0,0,0,0.02)] dark:text-gray-300 md:whitespace-normal" as="button"><div className="flex w-full gap-2 items-center justify-center"><div className="flex w-full items-center justify-between"><div className="flex flex-col overflow-hidden"><div className="truncate font-semibold">Brainstorm edge cases</div><div className="truncate opacity-50">for a function with birthdate as input, horoscope as output</div></div><div className="absolute bottom-0 right-0 top-0 flex items-center rounded-xl bg-gradient-to-l from-gray-100 from-[60%] pl-6 pr-3 text-gray-700 opacity-0 group-hover:opacity-100 dark:from-gray-700 dark:text-gray-200"><span className="" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="icon-sm"><path d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z" fill="currentColor"></path></svg></span></div></div></div></button> */}
                  <span className="text-sm sm:text-base">Lorem ipsum dolor sit amet</span>
              </div>
              <div className="w-full bg-blackish cursor-pointer text-center pt-1 pb-2 sm:pt-2 sm:pb-3 rounded-lg shadow-lg shadow-blackish ">
                  <span className="text-sm sm:text-base">Lorem ipsum dolor sit amet</span>
              </div>
              <div className="sm:row-start-2 w-full bg-blackish cursor-pointer text-center pt-1 pb-2 sm:pt-2 sm:pb-3 rounded-lg shadow-lg shadow-blackish ">
                  <span className="text-sm sm:text-base">Lorem ipsum dolor sit amet</span>
              </div>
              <div className=" sm:row-start-2 w-full bg-blackish cursor-pointer text-center pt-1 pb-2 sm:pt-2 sm:pb-3 rounded-lg shadow-lg shadow-blackish ">
                  <span className="text-sm sm:text-base">Lorem ipsum dolor sit amet</span>
              </div>
            </div>
    </div>
  )
}

export default DummyPrompts