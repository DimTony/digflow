"use client";

import React from "react";

export default function ContentLoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4">Loading...</p>
      </div>
    </div>
  );
}