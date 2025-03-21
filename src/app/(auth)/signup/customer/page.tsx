"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/libs/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Customer>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    router.push("/");
  };
  return (
    <div className="lg:h-screen bg-[#f6f9d6] flex flex-col lg:flex-row">
      <div
        className="hidden lg:block lg:w-1/2 bg-no-repeat bg-cover bg-center lg:h-full"
        style={{
          backgroundImage: "url('/register.svg')",
        }}
      />
      <div className="w-full lg:w-1/2 flex justify-center items-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="font-bold text-xl text-neutral-800">
            Welcome to Snackzy
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 ">
            Be a part of Snackzy and discover savings on products —smart
            snacking starts here!
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  type="text"
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  type="text"
                  required
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@example.com"
                type="email"
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                type="password"
                required
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-[#f1d47b] to-[#f7e19a] block w-full text-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] (--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Sign up &rarr;
              <BottomGradient />
            </button>

            {/* <div className="bg-gradient-to-r from-transparent via-neutral-300  to-transparent my-8 h-[1px] w-full" /> */}
            <LabelInputContainer className="flex-row my-2 space-y-0 space-x-1">
              <p className="text-neutral-600 text-sm max-w-sm">
                Have an account?
              </p>
              <Link
                href={"/login"}
                className="text-neutral-600 text-sm font-bold hover:underline max-w-sm"
              >
                Log In
              </Link>
            </LabelInputContainer>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-[#f1724f] to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-[#f1724f] to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
