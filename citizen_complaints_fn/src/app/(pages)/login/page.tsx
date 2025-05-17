"use client";

import { useState } from "react";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import Link from "next/link";
import router from "next/router";
import { toast } from "sonner";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.error);
      }
      toast.success("Login successful!");
      router.push("/dashboard"); // or any protected route
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 overflow-hidden relative">
      <div className="absolute h-screen bg-purple-1 w-full left-[55%] rounded-full z-10" />
      <form
        onSubmit={handleSubmit}
        className="bg-grey-3 p-8 rounded shadow-lg w-full max-w-md z-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <Input
          label="Email"
          name="email"
          type="email"
          value={credentials.email}
          onChange={handleChange}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
        />

        <Button type="submit">Sign In</Button>

        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-purple-1 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
