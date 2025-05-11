"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, CreditCard, Lock, Store } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { cn } from "@/libs/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className="bg-[#f5f5f5] p-2 ">
      <Tabs
        defaultValue="shop-details"
        className="flex flex-col md:flex-row gap-6 w-full"
      >
        {/* Sidebar Tabs */}
        <TabsList className="flex flex-row md:flex-col items-stretch bg-muted p-2 rounded-lg h-fit bg-white">
          <TabsTrigger
            value="shop-details"
            className="flex gap-2 py-2 justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
          >
            <Store className="w-6 h-6" /> Shop Details
          </TabsTrigger>
          <TabsTrigger
            value="payment-preferences"
            className="flex gap-2 py-2 justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
          >
            <CreditCard className="w-6 h-6" /> Payment Preferences
          </TabsTrigger>
          <TabsTrigger
            value="password-security"
            className="flex gap-2 py-2 justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
          >
            <Lock className="w-6 h-6" /> Password & Security
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <div className="flex-1">
          <TabsContent value="shop-details">
            <div className="flex flex-col gap-4 p-6 border rounded-md bg-white">
              <h2 className="text-xl font-semibold mb-2">Shop Details</h2>

              <div className="flex gap-4 mb-4">
                <Image
                  src={"/"}
                  alt="Image"
                  width={50}
                  height={50}
                  className="rounded"
                />
                <span className="flex flex-col gap-2">
                  <Input type="file" placeholder="Upload Logo" />
                  <p className="text-xs text-gray-500">
                    Recommended: 400x400px PNG or JPG
                  </p>
                </span>
              </div>

              <LabelInputContainer>
                <Label>Shop Name</Label>
                <Input placeholder="Enter your shop name" />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label>Shop Address</Label>
                <Input placeholder="Enter your shop address" />
              </LabelInputContainer>

              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <LabelInputContainer>
                  <Label>Contact Phone</Label>
                  <Input placeholder="Enter phone number" />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label>Contact Email</Label>
                  <Input placeholder="Enter email address" />
                </LabelInputContainer>
              </div>

              <Button className="w-fit text-white bg-blue-500 hover:text-white hover:bg-blue-600">
                Save Changes
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="payment-preferences">
            <div className="flex flex-col gap-4 p-6 border rounded-md bg-white">
              <h2 className="text-xl font-semibold mb-2">
                Payment Preferences
              </h2>

              <h3 className="text-base   font-semibold">Bank Details</h3>

              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <LabelInputContainer>
                  <Label>Account Holder Name</Label>
                  <Input placeholder="Enter account holder name" />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label>Account Number</Label>
                  <Input placeholder="Enter account number" />
                </LabelInputContainer>
              </div>

              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <LabelInputContainer>
                  <Label>IFSC Code</Label>
                  <Input placeholder="Enter IFSC Code" />
                </LabelInputContainer>

                <LabelInputContainer>
                  <Label>Bank Name</Label>
                  <Input placeholder="Enter Bank Name" />
                </LabelInputContainer>
              </div>

              <Button
                className="w-fit text-blue-600 bg-white hover:text-blue-700 text-xs"
                variant="ghost"
              >
                <Check className=" bg-blue-600 text-white rounded-full p-0.5" />
                Verify Account
              </Button>

              <LabelInputContainer>
                <Label htmlFor="upi-id">UPI Details</Label>
                <div className="flex flex-row">
                  <Input
                    id="upi-id"
                    name="upi-id"
                    type="text"
                    placeholder="Enter your UPI ID"
                  />
                  <Button variant="secondary" className="w-fit text-blue-600">
                    Verify UPI
                  </Button>
                </div>
              </LabelInputContainer>

              <div className="flex flex-col gap-4">
                <Label htmlFor="method">Select Withdrawal Method</Label>
                <span className="flex items-center gap-4">
                  <RadioGroup
                    className="w-full"
                    value={selectedOption}
                    onValueChange={(value) => setSelectedOption(value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="bank-transfer"
                        id="bank-transfer"
                      />
                      <Label htmlFor="bank-transfer">Bank Transfer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi">UPI Transfer</Label>
                    </div>
                  </RadioGroup>
                </span>
              </div>

              <Button className="w-fit text-white bg-blue-500 hover:text-white hover:bg-blue-600">
                Save Payment Preferences
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="password-security">
            <div className="flex flex-col gap-4 p-6 border rounded-md bg-white">
              <h2 className="text-xl font-semibold mb-2">
                Password & Security
              </h2>

              <LabelInputContainer>
                <Label>Current Password</Label>
                <Input
                  type="password"
                  placeholder="Enter account holder name"
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter New Password" />
                <Label className="text-xs text-gray-500">
                  Password must be at least 8 characters and include a number
                  and special character
                </Label>
              </LabelInputContainer>

              <LabelInputContainer>
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  placeholder="Enter Confirm New Password"
                />
              </LabelInputContainer>

              <Button className="w-fit text-white bg-blue-500 hover:text-white hover:bg-blue-600">
                Update Password
              </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Page;

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
