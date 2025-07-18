"use client"
import React from "react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export default function Sidebar() {
  return (
    <ClerkProvider>
      <div className="flex flex-col justify-between h-[calc(100vh-10rem)]">
        <div className="flex flex-col gap-4 z-50 justify-center content-center">
          {/* Home Icon */}
        <div className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer">
          <span className="text-gray-800 font-bold text-lg">H</span>
        </div>

        {/* Profile Icon */}
        <div className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer">
          <span className="text-gray-800 font-bold text-lg">P</span>
        </div>

        {/* Settings Icon */}
        <div className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer">
          <span className="text-gray-800 font-bold text-lg">S</span>
        </div>

        {/* Messages Icon */}
        <div className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer">
          <span className="text-gray-800 font-bold text-lg">M</span>
        </div>
      </div>

      <div>
        <SignedOut>
          <SignInButton mode="modal">
          </SignInButton>
          <SignUpButton mode="modal">
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
    </ClerkProvider>
  );
}
