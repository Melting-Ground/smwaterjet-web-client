import axiosInstance from "@/_config/axiosInstance";
import { useCallback, useEffect, useRef, useState } from "react";

type TurnstileWidget = string | number | HTMLElement;

export const useTurnstile = (
  turnstileRef: React.RefObject<HTMLDivElement>
) => {
  const turnstileInstanceRef = useRef<TurnstileWidget | null>(null);
  const [isValidate, setIsValidate] = useState<boolean>(false);

  const resetTurnstile = useCallback(() => {
    if (typeof window === "undefined") return;
    const turnstile = window.turnstile;
    if (turnstile && turnstileInstanceRef.current) {
      turnstile.reset(turnstileInstanceRef.current);
      console.log("Turnstile reset");
    }
  }, []);

  const handleVerify = useCallback(
    async (token: string) => {
      try {
        const response = await axiosInstance.post("/turnstile", {
          "cf-turnstile-response": token,
        });

        console.log("Turnstile response:", response);

        if (response.data.validationResult === false) {
          alert(
            "자동 등록 방지 검증에 실패했습니다. 다시 시도해 주세요."
          );
          setIsValidate(false);
          resetTurnstile();
        } else {
          setIsValidate(true);
          console.log("Turnstile verification success");
        }
      } catch (error) {
        console.error("Turnstile error:", error);
        alert("검증 중 오류가 발생했습니다. 다시 시도해 주세요.");
        setIsValidate(false);
        resetTurnstile();
      }
    },
    [resetTurnstile]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !turnstileRef.current) return;
    const turnstile = window.turnstile;
    if (!turnstile) return;

    const widget = turnstile.render(turnstileRef.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
      callback: (token) => {
        console.log("Turnstile token:", token);
        handleVerify(token);
      },
    });

    turnstileInstanceRef.current = widget;
  }, [turnstileRef, handleVerify]);

  return { isValidate };
};
