import React from 'react'

const About = () => {
  return (
    <section className=" flex w-full h-screen pt-16 bg-blackish ">
      <div className='overflow-y-auto'>
        <h1 className="head_text text-left mx-2">
          <span className="bg-gradient-to-r from-red-500 via-orange-300 to-yellow-400 bg-clip-text text-transparent">About</span>
        </h1>
        <div className='mx-2 mb-5'>
          <p className="text-sm sm:text-base text-ellipsis py-2 ">Hello, My name is Ujwal Yangalwar, and I want to extend a warm welcome to my website. I'm a passionate software developer with a background in engineering. Currently, I work as a Software Development Engineer, and I'm enthusiastic about creating digital experiences.</p>
          <p className="text-sm sm:text-base text-ellipsis py-2 ">My skill set spans a wide range of technologies, from the fundamentals of web development, including HTML, CSS, and vanilla JavaScript, to modern tools like React.js and Next.js.</p>
          <p className="text-sm sm:text-base text-ellipsis py-2 ">I'm well-versed in server-side development using Node.js and Express.js. Additionally, I have experience in various back-end technologies, such as Java with Play Framework, Python with Pandas and Flask, and FastAPI.</p>
          <p className="text-sm sm:text-base text-ellipsis py-2 ">When it comes to crafting beautiful and responsive user interfaces, I'm skilled in using frameworks and libraries like Bootstrap, Tailwind CSS, and Material UI. </p>
          <p className="text-sm sm:text-base text-ellipsis py-2 ">My goal is to leverage this expertise to build innovative, user-friendly web solutions that leave a lasting impact.</p>
          <p className="text-sm sm:text-base text-ellipsis py-2 ">Thank you for visiting my website, and I look forward to sharing my work with you.</p>

        </div>
      </div>
    </section>
  )
}

export default About
