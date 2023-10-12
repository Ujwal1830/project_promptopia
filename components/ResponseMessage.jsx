'use client'

import { useEffect, useState } from 'react'

const ResponseMessage = ({ message }) => {

    const [lines, setLines] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [words, setWords] = useState([]);
    const [currentLine, setCurrentLine] = useState('');
  
    useEffect(() => {
      const messageLines = message.split('\n').filter((line) => line.trim() !== '');
      setLines(messageLines);
    }, [message]);
  
    useEffect(() => {
      if (currentIndex < lines.length) {
        const timer = setTimeout(() => {
          setCurrentLine(lines[currentIndex]);
          setCurrentIndex(currentIndex + 1);
          setWords([]);
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [currentIndex, lines]);
  
    useEffect(() => {
      if (currentLine && words.length < currentLine.split(' ').length) {
        const timer = setTimeout(() => {
          const lineWords = currentLine.split(' ');
          setWords((prevWords) => [...prevWords, lineWords[words.length]]);
        }, 150);
        return () => clearTimeout(timer);
      }
    }, [words, currentLine]);

  return (
    <div>
        {lines.slice(0, currentIndex).map((line, index) => (
        <p key={index}>
          {index === currentIndex - 1
            ? words.join(' ')
            : line}
        </p>
      ))}
    </div>
  )
}

export default ResponseMessage
