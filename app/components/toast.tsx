"use client";
import { useState, useEffect } from "react";
import { CheckIcon, XIcon } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type,
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-right duration-300">
      <div
        className={`
        p-4 rounded-xl shadow-2xl border backdrop-blur-sm min-w-[300px] max-w-sm
        ${
          type === "success"
            ? "bg-green-500/10 border-green-500/30 text-green-300"
            : "bg-red-500/10 border-red-500/30 text-red-300"
        }
      `}
      >
        <div className="flex items-center gap-3">
          <div
            className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${type === "success" ? "bg-green-500/20" : "bg-red-500/20"}
          `}
          >
            {type === "success" ? (
              <CheckIcon className="w-4 h-4" />
            ) : (
              <XIcon className="w-4 h-4" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{message}</p>
          </div>
          <button
            onClick={onClose}
            className={`
              w-6 h-6 rounded-full flex items-center justify-center transition-colors
              ${
                type === "success"
                  ? "hover:bg-green-500/20 text-green-400"
                  : "hover:bg-red-500/20 text-red-400"
              }
            `}
          >
            <XIcon className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
