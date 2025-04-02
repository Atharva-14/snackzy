"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Login {
  email: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Login>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
          <h2 className="font-bold text-xl text-neutral-800">Welcome Back</h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2">
            Hey, Enter your details to get signed in to your account
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
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

            <LabelInputContainer className="mb-4">
              <Link
                href={"/"}
                className="text-neutral-600 text-sm hover:underline w-fit max-w-sm"
              >
                Having trouble in sign in?
              </Link>
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-[#f1d47b] to-[#f7e19a] block w-full text-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] (--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Login &rarr;
              <BottomGradient />
            </button>

            {/* <div className="bg-gradient-to-r from-transparent via-neutral-300  to-transparent my-8 h-[1px] w-full" /> */}

            <LabelInputContainer className="flex-row my-2 space-y-0 space-x-1">
              <p className="text-neutral-600 text-sm max-w-sm">
                Don&apos;t have an account?
              </p>
              <Link
                href={"/signup/customer"}
                className="text-neutral-600 text-sm font-bold hover:underline max-w-sm"
              >
                Create One
              </Link>
            </LabelInputContainer>
          </form>

          <div className="flex flex-col items-center lg:items-end">
            <div className="pr-4 pb-2.5">
              <p className="text-neutral-600 mb-1 text-center lg:text-left">
                Grow with Snackzy!
              </p>
              <Link
                href={`/signup/vendor`}
                className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-[#fec8b3] bg-[linear-gradient(110deg,#fec8b3,45%,#f9d9a1,55%,#fec8b3)] bg-[length:200%_100%] px-6 font-medium text-[#4a3c31] transition-colors focus:outline-none"
              >
                Join as a Seller
              </Link>
            </div>
          </div>
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
