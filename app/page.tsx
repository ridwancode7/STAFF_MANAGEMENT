'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook for navigation
import Link from 'next/link';

const Login = () => {
  const [activeLogin, setActiveLogin] = useState<'student' | 'staff' | 'admin' | 'parent' | 'superadmin' | null>(null); // Include 'parent' and 'superadmin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const router = useRouter(); // Initialize the router for redirection

  // Random words for the typing animation
  const words = ['Best Platform', 'Manage your school', 'Student Success', 'Future Leaders'];

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 150;
    const word = words[textIndex];

    let timeout = setTimeout(() => {
      setDisplayedText((prevText) =>
        isDeleting ? word.substring(0, prevText.length - 1) : word.substring(0, prevText.length + 1)
      );

      if (!isDeleting && displayedText === word) {
        setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 h-screen">
      {/* Left Side with Animated Text */}
      
      <div className=" flex flex-col justify-center  items-center bg-gray-900 text-white">
      <h1 className='text-6xl font-bold my-5'>Welcome to <span className='text-yellow-500'>Edfortify </span> </h1>
        <h1 className="text-4xl lg:text-5xl font-bold">
          
          {displayedText}
          <span className="border-r-2 border-white ml-1 animate-pulse"></span>
        </h1>
        <Link
        href="/portal"
        className='my-20 hover:text-gray-400'>
          Proceed to Login Page</Link>
      </div>

      
    </div>
  );
};

export default Login;
