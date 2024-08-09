'use client';

import { useState } from 'react';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSignup, setIsSignup] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`/api/${isSignup ? 'signup' : 'login'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(isSignup ? 'Signup successful!' : 'Login successful!');
      } else {
        setMessage(result.error || 'Operation failed');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  return (
    <main className="bg-[#9e13b9a4] h-screen">
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

        <h1 className="font-sans font-bold text-4xl text-[#FFFFFF]  ">
         Website For Creating User Profile Template
      </h1>
       <h1 className="py-5 font-light  md:m-2 text-[#FFFFFF] ">
         Sign up for free and Create a profile of your own Interest
         </h1>

      <h1 className="text-3xl py-1 text-[#FFFFFF] font-bold">{isSignup ? 'Sign Up' : 'Login'}</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="">
          <label htmlFor="email" className="block text-md font-medium py-1 text-[#FFFFFF]">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className=" block w-full px-3 py-2 text-black bg-[#ffffffda] border border-[#fd69fdcb] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className=" block w-full px-3 py-2 text-black bg-[#ffffffda] border border-[#fd69fdcb] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#be2fbe] text-white rounded-md hover:bg-[#8d298d]"
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <button
        onClick={() => setIsSignup(!isSignup)}
        className="mt-4 py-2 px-4 bg-[#509b2e] text-white rounded-md hover:bg-[#3d7224]"
      >
        {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
    </main>
  );
}





//   return (
//     <main className="bg-[#9e13b9a4] h-screen">
//     <div className="flex flex-col items-center justify-center py-24">
    
//     <h1 className="font-sans font-bold text-4xl text-[#FFFFFF]  ">
//          Website For Creating User Profile Template
//       </h1>
//        <h1 className="py-5 font-light  md:m-2 text-[#FFFFFF] ">
//           Sign up for free and Create a profile of your own Interest
//         </h1>
      
//       <h1 className="text-3xl py-1 text-[#FFFFFF] font-bold">{isSignup ? 'Sign Up' : 'Login'}</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-sm">
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-md font-medium py-1 text-[#FFFFFF]">Email address</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="mt-1 block w-full px-3 py-2 text-black bg-[#ffffffda] border border-[#fd69fdcb] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-[#be2fbe] text-white rounded-md hover:bg-[#8d298d]"
//         >
//           {isSignup ? 'Sign Up' : 'Login'}
//         </button>
//       </form>
//       <button
//         onClick={() => setIsSignup(!isSignup)}
//         className="mt-4 py-2 px-4 bg-[#509b2e] text-white rounded-md hover:bg-[#3d7224]"
//       >
//         {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
//       </button>
//       {message && <p className="mt-4 text-red-500">{message}</p>}
//     </div>
//     </main>
//   );
// }







// export default function Home() {
 
//   return (
//     <main className="bg-[#9e13b9a4] h-screen">
//       <div className="flex justify-end p-3 ">
//         <button className="btn btn-active btn-secondary sm:hidden md:block lg:block">Login</button>
//       </div>
//       <div className="flex flex-col justify-center items-center m-24 ">
//         <h1 className="font-sans font-bold text-4xl text-[#FFFFFF]  ">
//           Website For Creating User Profile Template
//         </h1>
//         <h1 className="py-6 font-light md:m-2 text-[#FFFFFF] ">
//           Sign up for free and Create a profile of your own Interest
//         </h1>
//         <div>
//         <input
//         type="email"
//         placeholder="Email address"
//         className="input input-bordered input-secondary lg:pl-52 lg:pr-32 lg:mx-3 sm:px-40 md:px-24 bg-white lg:my-9 sm:my-7   "
//       />
//       <button type="submit"className="btn btn-active btn-secondary md:mx-2 lg:mx-0  ">SignUp</button>
//       <button className="btn btn-active btn-secondary sm:mx-2 md:hidden lg:hidden">Login</button>
//       </div>
//       </div>
     
//     </main>
//   )
// }
      