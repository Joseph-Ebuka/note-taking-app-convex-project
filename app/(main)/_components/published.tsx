"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useQuery } from "convex/react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { useOrigin } from "@/hooks/use-origin";
import { usePublishedStore } from "@/hooks/use-published";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export const Published = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, toggle } = usePublishedStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const documents = useQuery(api.documents.getPublished);
  const origin = useOrigin();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "o" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const documentId = (id: string) => {
    const url = `${origin}/preview/${id}`;

    return url;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <CommandDialog open={isOpen} onOpenChange={onClose}>
        <CommandInput placeholder="Search for resources and articles" />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup heading="Articles">
            <div className="flex flex-col">
              {documents?.map((document) => (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <CommandItem
                          key={document._id}
                          value={`${document._id}- ${document.title}`}
                        >
                          <Link href={documentId(document._id)}>
                            <span>{document.title}</span>
                          </Link>
                        </CommandItem>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{`Read about ${document.title}`}</p>
                      </TooltipContent>
                      <Separator />
                    </Tooltip>
                  </TooltipProvider>
                </>
              ))}
            </div>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};
