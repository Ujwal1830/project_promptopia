'use client'
import Link from 'next/link';
import React, { useState } from 'react'


const ContactInfo = ({ data }) => {
  return (
    <div className="flex flex-col items-center">
      {data.map((item, index) => (
        <div key={index} className="contact-item flex items-center space-x-2 my-2">
          <span className="text-xl">{getIcon(item.key)}</span>
          <a href={item.value} className="text-blue-500 hover:text-blue-700">
            {item.value}
          </a>
        </div>
      ))}
    </div>
  );
};

const getIcon = (key) => {
  switch (key) {
    case 'phone':
      return <svg className="h-6 w-6 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
    case 'email':
      return <svg className="h-6 w-6 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />  <polyline points="22,6 12,13 2,6" /></svg>;
    case 'linkedIn':
      return <svg className="h-6 w-6" fill="#ffffff" width="64px" height="64px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>linkedin</title> <path d="M28.778 1.004h-25.56c-0.008-0-0.017-0-0.027-0-1.199 0-2.172 0.964-2.186 2.159v25.672c0.014 1.196 0.987 2.161 2.186 2.161 0.010 0 0.019-0 0.029-0h25.555c0.008 0 0.018 0 0.028 0 1.2 0 2.175-0.963 2.194-2.159l0-0.002v-25.67c-0.019-1.197-0.994-2.161-2.195-2.161-0.010 0-0.019 0-0.029 0h0.001zM9.9 26.562h-4.454v-14.311h4.454zM7.674 10.293c-1.425 0-2.579-1.155-2.579-2.579s1.155-2.579 2.579-2.579c1.424 0 2.579 1.154 2.579 2.578v0c0 0.001 0 0.002 0 0.004 0 1.423-1.154 2.577-2.577 2.577-0.001 0-0.002 0-0.003 0h0zM26.556 26.562h-4.441v-6.959c0-1.66-0.034-3.795-2.314-3.795-2.316 0-2.669 1.806-2.669 3.673v7.082h-4.441v-14.311h4.266v1.951h0.058c0.828-1.395 2.326-2.315 4.039-2.315 0.061 0 0.121 0.001 0.181 0.003l-0.009-0c4.5 0 5.332 2.962 5.332 6.817v7.855z"></path> </g></svg>
    case 'github':
      return <svg className="h-6 w-6" viewBox="0 0 20 20" version="1.1" fill="#ffffff"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#ffffff]"> </path> </g> </g> </g> </g></svg>;
    default:
      return '';
  }
};

const EachContact=({ data })=>{

  return (
    data.map((item, index) => (
      <div key={index} className="mx-16 flex justify-start items-center gap-4 text-sm sm:text-base text-ellipsis py-2">
        {/* phone */}
        {getIcon(item.key)}
        { (item.key === 'phone' || item.key === 'email') 
            ? <h1 className='underline cursor-pointer'>{item.value}</h1>
            : <div>
                <Link href={item.value} className='underline'>{item.name}</Link>
              </div>
        }
      </div>
    ))
  )
}

const Contact = () => {

  const data = [
    {name: 'Phone', key: 'phone', value: '+91 - 7387781178'},
    {name: 'Email', key: 'email', value: 'ujwal.yangalwar.2247@gmail.com'},
    {name: 'LinkedIn', key: 'linkedIn', value: 'https://www.linkedin.com/in/ujwal-yangalwar-344961128/'},
    {name: 'GitHub', key: 'github', value: 'https://github.com/Ujwal1830'},
  ]

  return (
    <section className=" flex w-full h-screen pt-16 bg-blackish ">
      <div className='overflow-y-auto'>
        <h1 className="head_text text-left pl-10">
          <span className="bg-gradient-to-r from-red-500 via-orange-300 to-yellow-400 bg-clip-text text-transparent">Contact</span>
        </h1>
        <div className=' mt-12 mb-5'>
          <EachContact data={data} />
        </div>
      </div>
    </section>
  )
}

export default Contact
