import axiosInstance from "@/_config/axiosInstance";
import { useEffect, useState } from "react";

export const useTurnstile = (turnstileRef: React.RefObject<HTMLDivElement>) => {
  //   const [token] = useState<string | null>(null);

  const handleVerify = async (token: string) => {
    try {
      const response = await axiosInstance.post("/turnstile", {
        "cf-turnstile-response": token,
      });
      console.log("Turnstile response", response);
    } catch (error) {
      console.error("Turnstile error", error);
    }
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.turnstile &&
      turnstileRef.current
    ) {
      window.turnstile.render(turnstileRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
        callback: (token) => {
          console.log("Turnstile token:", token);
          //   setToken(token);
          handleVerify(token);
        },
      });
    }
  }, [turnstileRef]);

  //   return { token };
};
