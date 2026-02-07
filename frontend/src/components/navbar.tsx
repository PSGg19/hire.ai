"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Briefcase, Home, Info, LogOut, Menu, User, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { useAppData } from "@/context/AppContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth, user, loading, logoutUser } = useAppData();

  const toggleMenu = () => setIsOpen(!isOpen);
  const logoutHandler = () => logoutUser();

  return (
    <nav className="z-50 sticky top-0 bg-background/80 border-b border-border backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-foreground flex items-center justify-center">
              <span className="text-background text-sm font-black">h</span>
            </div>
            <span className="text-lg font-bold tracking-tight">
              hire<span className="text-[#3b82f6]">.ai</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "/", icon: Home, label: "Home" },
              { href: "/jobs", icon: Briefcase, label: "Jobs" },
              { href: "/about", icon: Info, label: "About" },
            ].map((item) => (
              <Link key={item.label} href={item.href}>
                <Button variant="ghost" className="gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <item.icon size={15} /> {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && (
              isAuth ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="hover:opacity-80 transition-opacity">
                      <Avatar className="h-8 w-8 ring-1 ring-border cursor-pointer">
                        <AvatarImage src={user ? (user.profile_pic as string) : ""} alt={user?.name || ""} />
                        <AvatarFallback className="bg-secondary text-foreground text-xs">
                          {user?.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2" align="end">
                    <div className="px-3 py-2 mb-2 border-b border-border">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <Link href="/account">
                      <Button className="w-full justify-start gap-2" variant="ghost">
                        <User size={15} /> My Profile
                      </Button>
                    </Link>
                    <Button className="w-full justify-start gap-2 mt-1" variant="ghost" onClick={logoutHandler}>
                      <LogOut size={15} /> Logout
                    </Button>
                  </PopoverContent>
                </Popover>
              ) : (
                <Link href="/login">
                  <Button className="h-9 px-4 text-sm rounded-lg">Sign In</Button>
                </Link>
              )
            )}
            <ModeToggle />
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <ModeToggle />
            <button onClick={toggleMenu} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden border-t border-border overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-3 py-3 space-y-1 bg-background">
          {[
            { href: "/", icon: Home, label: "Home" },
            { href: "/jobs", icon: Briefcase, label: "Jobs" },
            { href: "/about", icon: Info, label: "About" },
          ].map((item) => (
            <Link key={item.label} href={item.href} onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start gap-3 h-11">
                <item.icon size={16} /> {item.label}
              </Button>
            </Link>
          ))}
          {isAuth ? (
            <>
              <Link href="/account" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start gap-3 h-11">
                  <User size={16} /> My Profile
                </Button>
              </Link>
              <Button variant="destructive" className="w-full justify-start gap-3 h-11" onClick={() => { logoutHandler(); toggleMenu(); }}>
                <LogOut size={16} /> Logout
              </Button>
            </>
          ) : (
            <Link href="/login" onClick={toggleMenu}>
              <Button className="w-full justify-start gap-3 h-11 mt-2">
                <User size={16} /> Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
