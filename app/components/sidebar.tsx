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

interface SidebarProps {
  onCreateOutingClick?: () => void;
}

export default function Sidebar({ onCreateOutingClick }: SidebarProps) {
  return (
    <ClerkProvider>
      <div className="fixed left-12 top-0 h-screen w-20 p-4 z-50 ">
        <div className="flex flex-col h-full">
          {/* Create Outing Button */}
          <div className="flex justify-center items-center flex-1">
            <button
              onClick={onCreateOutingClick}
              className="w-12 h-12 bg-[#2A2930] rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#382B50] hover:border-purple-500/50 hover:bg-[#382B50] group"
            >
              <PlusIcon className="text-white group-hover:text-purple-200 transition-colors" />
            </button>
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
