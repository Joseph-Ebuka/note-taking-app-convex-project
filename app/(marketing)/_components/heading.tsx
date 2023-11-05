"use client";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";
import { useState } from "react";
export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [clicked, setClicked] = useState(false);
  const onClick = () => {
    setClicked(true);

    
  };
  return (
    <div className="max-w-3xl space-y-4 dark:bg-[#1f1f1f]">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your ideas, Documents, & plans. unified. Welcome to
        <span className="underline">Jotion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connect workspace where <br />
        better faster works happen
      </h3>
      {isLoading && (
        <div className="flex items-center justify-center w-full">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents" onClick={onClick} className="flex gap-x-2">
            {clicked && <Spinner size="lg" />} Enter jotion
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Jotion free <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
