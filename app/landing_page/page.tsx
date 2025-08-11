"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

// Color palette reference
// White: #FFFFFF
// Black: #000000
// Olive Green: #8E9C78
// Sand Beige: #C7B697
// Light Mint: #DFECC6
// Deep Olive: #485C11
// Gray: #929292

type TripData = {
  title: string;
  country: string;
  imageSrc: string;
  imageAlt: string;
};

const TripCard = ({ title, country, imageSrc, imageAlt }: TripData) => {
  return (
    <Card className="w-full border-[#C7B697]/60 shadow-sm">
      <CardHeader>
        <CardTitle className="text-[#000000]">Upcoming Trips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl overflow-hidden mb-4 w-full h-40">
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover"/>
        </div>
        <div className="font-semibold text-[#000000]">{title}</div>
        <div className="text-xs text-[#929292] mb-2">{country}</div>
      </CardContent>
    </Card>
  );
};

export default function DashboardPage() {
  const trips: TripData[] = [
    {
      title: "Delhi",
      country: "India",
      imageSrc: "/delhi.jpg",
      imageAlt: "Delhi"
    },
    {
      title: "Paris",
      country: "France",
      imageSrc: "/paris.avif",
      imageAlt: "Paris"
    },
    {
      title: "Italy",
      country: "Europe",
      imageSrc: "/italy.jpeg",
      imageAlt: "Italy"
    }
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 w-full max-w-6xl mt-8">
        {/* Background world map */}
        <div className="absolute inset-0 z-0 opacity-50">
          <img
            src="/map.png"
            alt="World Map Background"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        <div className="z-10">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-[#000000]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Plan Your Perfect Journey
          </h1>
          <p className="text-lg mb-8 max-w-2xl text-[#929292]">
            Your central hub for upcoming trips, top destinations, and inspiration.
          </p>
          <Button className="px-8 py-6 text-base rounded-full shadow-lg bg-[#485C11] hover:bg-[#8E9C78] text-[#FFFFFF] transition-transform hover:scale-105">
            Plan New Trip
          </Button>
        </div>
      </section>

      {/* Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl justify-center pb-20">
        {trips.map((trip, index) => (
          <TripCard
            key={index}
            title={trip.title}
            country={trip.country}
            imageSrc={trip.imageSrc}
            imageAlt={trip.imageAlt}
          />
        ))}
      </section>
    </main>
  );
}