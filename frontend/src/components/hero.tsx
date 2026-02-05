"use client";

import { ArrowRight, Briefcase, Search, Sparkles, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center glow-top">
      {/* Grid check pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40 dark:opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-7 animate-fade-up">
            {/* Badge */}
            <div className="badge">
              <span className="h-2 w-2 rounded-full bg-[#3b82f6] animate-pulse-soft" />
              AI-Powered Hiring Platform
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              Find the right
              <br />
              talent. <span className="text-[#3b82f6]">Faster.</span>
            </h1>

            {/* Sub */}
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              hire.ai connects top talent with the best companies using
              intelligent matching. Whether you're hiring or looking —
              we make it effortless.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/jobs">
                <Button size="lg" className="h-12 px-7 text-sm gap-2 group rounded-lg">
                  <Search size={16} />
                  Browse Jobs
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="h-12 px-7 text-sm gap-2 rounded-lg">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Free to use
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" /> Verified employers
              </span>
            </div>
          </div>

          {/* Right — Stats Card */}
          <div className="flex-1 w-full max-w-md animate-fade-up delay-300">
            <div className="space-y-4">
              {/* Main stat card */}
              <div className="premium-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-muted-foreground font-medium">Platform Stats</span>
                  <span className="badge text-xs px-2.5 py-1">Live</span>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { value: "10k+", label: "Jobs", icon: Briefcase },
                    { value: "5k+", label: "Companies", icon: Users },
                    { value: "50k+", label: "Seekers", icon: TrendingUp },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="icon-box mx-auto mb-3">
                        <s.icon size={16} className="text-[#3b82f6]" />
                      </div>
                      <p className="text-2xl font-bold">{s.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="premium-card p-5 animate-float" style={{ animationDelay: "0s" }}>
                  <Sparkles size={20} className="text-[#3b82f6] mb-3" />
                  <p className="text-sm font-semibold mb-1">AI Matching</p>
                  <p className="text-xs text-muted-foreground">98% accuracy rate</p>
                </div>
                <div className="premium-card p-5 animate-float" style={{ animationDelay: "1.5s" }}>
                  <TrendingUp size={20} className="text-emerald-500 mb-3" />
                  <p className="text-sm font-semibold mb-1">Trending</p>
                  <p className="text-xs text-muted-foreground">+340% this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 divider" />
    </section>
  );
};

export default Hero;
