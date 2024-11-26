"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/libs/utils";
import { useRouter } from "next/navigation";

interface Vendor {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Vendor>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    router.push("/vendor/vendor-details");
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
          <h2 className="font-bold text-xl text-neutral-800">Vendor Sign up</h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2">
            Join us as a vendor and start selling your products today!
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  name="firstname"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  type="text"
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  name="lastname"
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
            <LabelInputContainer className="mb-4 flex flex-row items-center space-y-0 space-x-2">
              <input
                type="checkbox"
                id="terms"
                onChange={handleCheckboxChecked}
                checked={isCheckboxChecked}
                className="h-4 w-4 border-gray-300 rounded"
              />
              <Label htmlFor="terms" className="">
                Accept terms and conditions
              </Label>
            </LabelInputContainer>

            <button
              className={`bg-gradient-to-br relative group/btn from-[#f1d47b] to-[#f7e19a] block w-full text-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] (--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] 
                ${
                  isCheckboxChecked
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-70"
                }`}
              type="submit"
              disabled={!isCheckboxChecked}
            >
              Sign up &rarr;
              <BottomGradient />
            </button>
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
