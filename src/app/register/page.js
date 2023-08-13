"use client";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
         <div className="bg-customYellow p-8 rounded shadow-md max-w-sm w-full">
      <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
      <form>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 py-2 block w-full rounded-md drop-shadow-2xl focus:outline-none"
          />
        </div>
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
            className="mt-1 py-2 block w-full rounded-md drop-shadow-2xl focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-customDarkYellow hover:bg-moreDarkYellow focus:ring-opacity-50 drop-shadow-2xl"
        >
          Sign Up
        </button>
      </form>
    </div>
    </div>
   
  );
};

export default page;
