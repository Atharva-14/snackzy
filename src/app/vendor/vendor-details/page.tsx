"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/libs/utils";
import React, { useState } from "react";

interface VendorDetails {
  shopName: string;
  shopLicense: string;
  documentType: "PAN Card" | "Aadhaar Card";
  documentNumber: string;
  address: string;
}

const Page = () => {
  const [formData, setFormData] = useState<VendorDetails>({
    shopName: "",
    shopLicense: "",
    documentType: "PAN Card",
    documentNumber: "",
    address: "",
  });

  const [error, setError] = useState<string>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "documentNumber" ? value.toUpperCase() : value,
    }));

    if (name === "documentNumber") {
      setError("");
    }
  };

  const validateDocument = (number: string, type: string): boolean => {
    if (type === "PAN Card") {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
      return panRegex.test(number);
    } else if (type === "Aadhaar Card") {
      const aadhaarRegex = /^[2-9]{1}[0-9]{11}$/;
      return aadhaarRegex.test(number);
    }
    return false;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateDocument(
      formData.documentNumber.trim(),
      formData.documentType
    );

    if (!isValid) {
      setError(
        formData.documentType === "PAN Card"
          ? "Invalid PAN Card format. Format: ABCDE1234F"
          : "Invalid Aadhaar Card format. Format: 12-digit numeric"
      );
      return;
    }

    setError("");
    console.log("Form submitted: ", formData);
    alert("Form submitted successfully.");
  };
  return (
    <div>
      <div className="max-w-md w-full mx-auto p-4 md:p-8 bg-white rounded-lg shadow-lg">
        <h2 className="font-bold text-xl text-neutral-800">Vendor Details</h2>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="shopName">
              Shop Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="shopName"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              placeholder="Shop Name"
              type="text"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="shopLicense">
              Shop License <span className="text-red-500">*</span>
            </Label>
            <Input
              id="shopLicense"
              name="shopLicense"
              value={formData.shopLicense}
              onChange={handleChange}
              placeholder="MH-XXX-YYYY"
              type="text"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="dcoumentType">Dcoument Type</Label>
            <select
              id="documentType"
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              className="flex h-10 w-full border-none bg-gray-50 text-black shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400  
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 
           disabled:cursor-not-allowed disabled:opacity-50
           group-hover/input:shadow-none transition duration-400"
            >
              <option value="PAN Card">PAN Card</option>
              <option value="Aadhaar Card">Aadhaar Card</option>
            </select>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="documentNumber">
              Document Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="documentNumber"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleChange}
              placeholder={
                formData.documentType === "PAN Card"
                  ? "ABCDE1234F"
                  : "12 digit aadhaar number"
              }
              className={error ? "border-red-500" : ""}
              type={formData.documentType === "PAN Card" ? "text" : "number"}
              required
            />
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="address">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Shop Address"
              type="text"
              required
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-[#f1d47b] to-[#f7e19a] block w-full text-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] (--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Submit &rarr;
            <BottomGradient />
          </button>

          {/* <div className="bg-gradient-to-r from-transparent via-neutral-300  to-transparent my-8 h-[1px] w-full" /> */}
        </form>
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
