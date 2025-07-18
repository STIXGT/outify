
"use client";
import React, { useState, useEffect } from "react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    // Inicia la animación después de que el logo termine de animarse
    const timer = setTimeout(() => {
      setShowElements(true);
    }, 1200); // Tiempo después del logo

    return () => clearTimeout(timer);
  }, []);

  // Variantes de animación para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  // Variantes para cada elemento del sidebar
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };


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