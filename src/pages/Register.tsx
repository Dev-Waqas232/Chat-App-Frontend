import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/form-validations";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmoit = (e: FormEvent) => {
    e.preventDefault();

    const isValidName = validateName(name);
    if (!isValidName) {
      toast.error("Name should contain at least 3 characters!");
      return;
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email!");
      return;
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      toast.error(
        "Password should contain at least 8 characters, including a special character and a number!"
      );
      return;
    }
  };

  return (
    <section className="bg-primary-100 min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md rounded-lg transition-all duration-300 ease-in-out">
        <p className="font-primary text-3xl text-secondary-100 text-center italic mb-8 animate-fade-in">
          ChatterSphere
        </p>

        <form className="space-y-6" onSubmit={handleSubmoit}>
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-secondary-100 font-medium mb-2 font-secondary"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="px-4 py-2 rounded-md border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-transparent transition-all duration-200 text-secondary-100 font-secondary"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-secondary-100 font-medium mb-2 font-secondary"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="px-4 py-2 rounded-md border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-transparent transition-all duration-200 text-secondary-100 font-secondary"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="password"
              className="text-secondary-200 font-medium mb-2 font-secondary"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="px-4 py-2 rounded-md border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-transparent transition-all duration-200 text-secondary-100 pr-10 font-secondary"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div
              className="absolute right-3 top-[44px] cursor-pointer text-secondary-200 hover:text-secondary-100 transition"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <FaRegEye size={18} />
              ) : (
                <FaRegEyeSlash size={18} />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-secondary-200 text-primary-200 border border-secondary-200 cursor-pointer py-2 rounded-md hover:scale-105 active:scale-95 transition-transform duration-300 font-semibold font-secondary"
          >
            Register
          </button>

          <Link
            to="/login"
            className="text-sm text-secondary-200 flex justify-center font-primary"
          >
            Already have an account ?&nbsp;
            <span className="font-secondary italic">Login</span>
            &nbsp; here
          </Link>
        </form>
      </div>
    </section>
  );
}
