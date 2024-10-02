'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook for navigation
import storage from '@/lib/token';
import axios, {AxiosError} from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [activeLogin, setActiveLogin] = useState<'student' | 'staff' | 'admin' | 'parent' | 'superadmin' | null>(null); // Include 'parent' and 'superadmin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true); // Keep login by default
  const [passwordVisible, setPasswordVisible] = useState(false)
  const router = useRouter(); // Initialize the router for redirection

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  // Random words for the typing animation
  const words = ['Best Platform', 'Manage your school', 'Student Success', 'Future Leaders'];

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("Submitting login form", formData);

      // Send login request and create session
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        formData
      );
      toast.error("error");
      console.log(response);
      // Set authentication token and user data in localStorage
      // storage.setCookie('authToken', response.data.token, 7);
      // storage.setCookie('user', JSON.stringify(response.data.user), 7);

      // Create session and set session cookie
      await storage.createSession(response.data);

      // Handle successful login
      toast.success("Login successful");
      setTimeout(() => {
        router.push('/chat');
      }, 5000);
    } catch (error: any) {
      // Handle login error
      
      const errorMessage = error?.response?.data?.message || "An error occurred during login";
      // setLoginError(errorMessage);
      toast.error("error");
      console.error("Login error", error);
    }
  };
  
//   useEffect(() => {
//     const checkAuthentication = async () => {
//       console.log("in authentication");
//       try {
//         const fromSession = await storage.getSession();
//         let session = fromSession.session;
//         console.log(session);
//         if (!session) {
//           console.log("Session not available");
//           router.push('/');
//           return;
//         }

//         if (session.user.role !== "user") {
//           console.log("User not expected to be here");
//           router.push('/');
//           return;
//         }

//         const token = session.token;
//         if (!token) {
//           console.log("Authentication token not available");
//           router.push('/');
//           return;
//         }

//         setToken(token);
//         router.push('/chat');
//       } catch (error) {
//         console.error("Error checking authentication:", error);
//         router.push('/'); // Redirect on error
//       }
//     };

//     checkAuthentication();
//   }, [router]);


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

  // Handle login submission
  const handleSubmit = (e: React.FormEvent, role: string) => {
    e.preventDefault();

    // Simple form validation
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Example login logic (replace with actual logic)
    if (email === 'admin@example.com' && password === 'password') {
      if (role === 'student') {
        router.push('/portal/student'); // Redirect to student dashboard
      } else if (role === 'staff') {
        router.push('/portal/staff'); // Redirect to staff dashboard
      } else if (role === 'admin') {
        router.push('/portal/schooladmin'); // Redirect to school admin dashboard
      } else if (role === 'parent') {
        router.push('/portal/parent'); // Redirect to parent dashboard
      } else if (role === 'superadmin') {
        router.push('/portal/superadmin/staff'); // Redirect to super admin dashboard
      }
    } else {
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 h-screen">
      {/* Left Side with Animated Text */}
      
      <div className="hidden lg:flex flex-col justify-center  items-center bg-gray-900 text-white">
      <h1 className='text-6xl font-bold my-5'>Welcome to <span className='text-yellow-500'>Edfortify </span> </h1>
        <h1 className="text-4xl lg:text-5xl font-bold">
          
          {displayedText}
          <span className="border-r-2 border-white ml-1 animate-pulse"></span>
        </h1>
      </div>

      {/* Right Side with Login Form */}
      <div className="flex justify-center items-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {activeLogin === 'student' && 'Login as Student'}
            {activeLogin === 'staff' && 'Login as Staff'}
            {activeLogin === 'admin' && 'Login as School Admin'}
            {activeLogin === 'parent' && 'Login as Parent'}
            {activeLogin === 'superadmin' && 'Login as Super Admin'}
          </h2>

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}

          {!activeLogin && (
            <div className="mt-6">
              <p className="text-center text-gray-700 font-bold">Choose a login type:</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  onClick={() => setActiveLogin('student')}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login as Student
                </button>
                <button
                  onClick={() => setActiveLogin('staff')}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login as Staff
                </button>
                <button
                  onClick={() => setActiveLogin('admin')}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login as School Admin
                </button>
                <button
                  onClick={() => setActiveLogin('parent')}
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login as Parent
                </button>
                <button
                  onClick={() => setActiveLogin('superadmin')}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login as Super Admin
                </button>
              </div>
            </div>
          )}

          {activeLogin && (
            <form onSubmit={(e) => handleSubmit(e, activeLogin)} className="mt-6">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 required">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 required">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign In
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="text-center mt-4">
                <button
                  onClick={() => setActiveLogin(null)}
                  className="text-gray-500 hover:text-gray-700 font-bold text-sm"
                >
                  Back to login type selection
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
