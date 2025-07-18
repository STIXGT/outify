"use client";
import React, { useState, useEffect } from "react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
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
      <div className="flex flex-col justify-between h-[calc(100vh-10rem)] relative">
        
        {/* Logo de la empresa */}
        <motion.div
          className="flex justify-center mb-8"
          variants={
            {
              initial: { 
                scale: 0.5,
                y: "50vh", // Empieza desde el centro de la pantalla
                opacity: 0
              },
              animate: { 
                scale: 1,
                y: 0, // Se mueve hacia arriba (posición final)
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  duration: 1
                }
              }
            }
          }
          initial="initial"
          animate="animate"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#6c47ff] to-[#9333ea] rounded-2xl shadow-2xl flex items-center justify-center">
            {/* Reemplaza esto con tu logo real */}
            <motion.div
              className="text-white font-bold text-2xl"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              L
            </motion.div>
          </div>
        </motion.div>

        {/* Elementos del sidebar */}
        <AnimatePresence>
          {showElements && (
            <motion.div
              className="flex flex-col gap-4 z-50 justify-center content-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Home Icon */}
              <motion.div
                className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-all cursor-pointer group"
                variants={
                  {
                    hidden: { opacity: 0, x: -50, scale: 0.8 },
                    visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
                  }
                }
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-gray-800 font-bold text-lg group-hover:text-[#6c47ff] transition-colors">
                  🏠
                </span>
              </motion.div>

              {/* Profile Icon */}
              <motion.div
                className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-all cursor-pointer group"
                variants={
                  {
                    hidden: { opacity: 0, x: -50, scale: 0.8 },
                    visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
                  }
                }
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-gray-800 font-bold text-lg group-hover:text-[#6c47ff] transition-colors">
                  👤
                </span>
              </motion.div>

              {/* Settings Icon */}
              <motion.div
                className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-all cursor-pointer group"
                variants={
                  {
                    hidden: { opacity: 0, x: -50, scale: 0.8 },
                    visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
                  }
                }
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-gray-800 font-bold text-lg group-hover:text-[#6c47ff] transition-colors">
                  ⚙️
                </span>
              </motion.div>

              {/* Messages Icon */}
              <motion.div
                className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-all cursor-pointer group"
                variants={
                  {
                    hidden: { opacity: 0, x: -50, scale: 0.8 },
                    visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
                  }
                }
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-gray-800 font-bold text-lg group-hover:text-[#6c47ff] transition-colors">
                  💬
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Elementos de autenticación */}
        <AnimatePresence>
          {showElements && (
            <motion.div
              className="flex flex-col gap-4 z-50 justify-center content-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <SignedOut>
                <SignInButton mode="modal">
                  <motion.div
                    className="w-12 h-12 bg-[#6c47ff] rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "#5a3dd4"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white font-bold text-lg">→</span>
                  </motion.div>
                </SignInButton>
                <SignUpButton mode="modal">
                  <motion.div
                    className="w-12 h-12 bg-green-500 rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "#16a34a"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white font-bold text-lg">+</span>
                  </motion.div>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicador de carga mientras se anima */}
        {!showElements && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.3 }}
          >
            <div className="w-2 h-2 bg-[#6c47ff] rounded-full animate-pulse"></div>
          </motion.div>
        )}
      </div>
    </ClerkProvider>
  );
}