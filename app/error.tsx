"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="h-full items-center flex flex-col justify-center  space-y-4">
      <Image
        src="/error.png"
        alt="light"
        height={300}
        width={300}
        className=" dark:hidden block"
      />
      <Image
        src="/error-dark.png"
        alt="light"
        height={300}
        width={300}
        className="hidden dark:block"
      />
      <h2 className="text-xl font-medium">
        Something Went Wrong!
      </h2>
      <Button asChild> 
        <Link href="/documents">
            Go back
        </Link>
      </Button>
    </div>
  );
};

export default Error;
