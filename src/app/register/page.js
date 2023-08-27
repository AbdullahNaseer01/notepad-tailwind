"use client";

import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter, useNavigate } from "next/navigation";
import { useAuth } from "../../../firebase/Auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const provider = new GoogleAuthProvider();

const Page = () => {
  const router = useRouter();
  const { authUser, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (!isLoading && authUser) {
      console.log(authUser, isLoading);
      router.push("/");
    }
  }, [authUser, isLoading]);
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("all fields are necessary to fill");
    }
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
    } catch (error) {
      if ((error = "auth/email-already-in-use")) {
        toast.error("email already exist use a different one");
        console.error("error accured", error);
      } else {
        console.error("error accured", error);
      }
    }
  };


  const signInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      console.log(user);
      router.push("/login");
    } catch (error) {
      console.error(" error accoured", error);
    }
  };

  return isLoading || (!isLoading && authUser) ? (
    "Loading"
  ) : (
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
              required
              value={username}
              onChange={handleUsernameChange}
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
              required
              value={email}
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
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 py-2 block w-full rounded-md drop-shadow-2xl focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-customDarkYellow hover:bg-moreDarkYellow focus:ring-opacity-50 drop-shadow-2xl"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </form>
        <button
          type="submit"
          className="w-full mt-3 py-2 px-4 bg-white hover:bg-gray-200 focus:ring-opacity-50 drop-shadow-2xl flex justify-evenly"
          onClick={signInWithGoogle}
        >
          <span className="mt-1">
            <FcGoogle />
          </span>{" "}
          continue with Google
        </button>
        <button
          onClick={() => {
            router.push("/login");
          }}
          className="w-full mt-3 py-2 px-4 text-slate-400 hover:text-slate-500"
        >
          Already have an account?
        </button>
      </div>
    </div>
  );
};

export default Page;
