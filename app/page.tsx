"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

// Color palette reference
// White: #FFFFFF
// Black: #000000
// Olive Green: #8E9C78
// Sand Beige: #C7B697
// Light Mint: #DFECC6
// Deep Olive: #485C11
// Gray: #929292

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#000000] mb-8">Welcome to GlobeTrotter</h1>
        <Link href="/dashboard">
          <Button className="px-8 py-6 text-lg rounded-full shadow-lg bg-[#485C11] hover:bg-[#8E9C78] text-[#FFFFFF] transition-transform hover:scale-105">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </main>
  );
}
