import React from 'react'

const TypingAnimation = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-200 to-gray-400 animate-pulse"></div>
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-200 to-gray-400 animate-pulse delay-75"></div>
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-200 to-gray-400 animate-pulse delay-150"></div>
    </div>
  )
}

export default TypingAnimation
