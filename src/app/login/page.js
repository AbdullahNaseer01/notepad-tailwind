"use client"
import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('login submitted:', email, password);
  };

  return (
    <div className="flex items-center justify-center h-screen">
    <div className="bg-customYellow p-8 rounded shadow-md max-w-sm w-full">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            // value={email}
            onChange={handleEmailChange}
            className="mt-1 py-2 block w-full rounded-md drop-shadow-2xl focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            // value={password}
            onChange={handlePasswordChange}
            className="mt-1 py-2 block w-full rounded-md drop-shadow-2xl focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-customDarkYellow hover:bg-moreDarkYellow focus:ring-opacity-50 drop-shadow-2xl"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  )
}

export default Page