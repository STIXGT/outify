"use client";
import React from "react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";

export default function Sidebar() {
  return (
    <ClerkProvider>
      <div className="fixed left-12 top-0 h-screen w-20 p-4 z-50 ">
        <div className="flex flex-col h-full">
          {/* Settings Icon */}
          <div className="flex justify-center items-center flex-1">
            <div className="w-12 h-12 bg-[#2A2930] rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer border border-[#382B50] hover:border-purple-500/50">
              <PlusIcon className="text-white" />
            </div>
          </div>

          <div className="flex justify-center items-center pb-4">
            <SignedOut>
              <SignInButton mode="modal"></SignInButton>
              <SignUpButton mode="modal"></SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </ClerkProvider>
  );
}
