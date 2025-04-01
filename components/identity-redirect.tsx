"use client";

import { useEffect } from "react";

export function IdentityRedirect() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;

      if (hash.includes("confirmation_token")) {
        const token = hash.split("=")[1];
        window.location.href = `/admin#confirmation_token=${token}`;
      }
    }
  }, []);

  return null; // This component doesn't render anything
}
