"use client";

import { useConvexAuth } from "convex/react";

import { redirect } from "next/navigation";

import { Navigation } from "./_components/navigation";

import { Spinner } from "@/components/ui/spinner";
import { SearchCommand } from "@/components/search-command";
import { Published } from "./_components/published";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center w-full">
        <Spinner size="lg" />
      </div>
    );
  }
  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-full flex dark:bg-[#1f1f1f]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand />
        <Published />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
