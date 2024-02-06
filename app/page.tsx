"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if the current path is the homepage
    if (pathname === "/") {
      // Redirect to the /2024 landing page
      router.replace("/2024");
    }
  }, [router, pathname]);

  return <></>;
}
