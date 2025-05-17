"use client";

import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "next/link";
import router from "next/router";
import { toast } from "sonner";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    user_type: "Citizen",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    console.log(formData);
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.error);
      }
      toast.success(data.message);
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 overflow-hidden relative">
      <div className="absolute h-screen bg-purple-1 w-full left-[55%] rounded-full z-10" />
      <form
        onSubmit={handleSubmit}
        className="bg-grey-3 p-8 rounded shadow-lg w-full max-w-md z-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <div className="mb-4">
          <label htmlFor="user_type" className="block font-medium mb-1">
            User Type
          </label>
          <select
            id="user_type"
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black-2"
          >
            <option value="Citizen">Citizen</option>
            <option value="Agent">Agency</option>
          </select>
        </div>

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit">Create Account</Button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-1 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
