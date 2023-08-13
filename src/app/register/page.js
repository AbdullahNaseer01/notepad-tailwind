"use client"
import React from 'react'

const page = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
      <h2 className="text-2xl text-center font-bold mb-4">
        {!signUp ? "Sign-In" : "Sign-Up"}
      </h2>
      <form onSubmit={handleAuth}>
        {signUp && (
          <>
            <div className="mb-4">
              <input
                type="text"
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <input
            type="email"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {signUp && (
          <div className="mb-4">
            <input
              type="password"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="text-center">
          <button
            className={`py-2 px-4 rounded-lg ${!signUp ? "bg-blue-500 text-white" : "bg-green-500 text-white"}`}
            type="submit"
          >
            {!signUp ? "Sign-in" : "Sign-up"}
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        {!signUp ? (
          <p className="text-sm">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setSignUp(true)}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setSignUp(false)}
            >
              Sign In
            </span>
          </p>
        )}
      </div>
    </div>
  </div>
  )
}

export default page