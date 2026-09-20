import axiosInstance from "@/_config/axiosInstance";
import { useCallback, useEffect, useRef, useState } from "react";

type TurnstileWidget = string | number | HTMLElement;

export const useTurnstile = (
  turnstileRef: React.RefObject<HTMLDivElement>
) => {
  const turnstileInstanceRef = useRef<TurnstileWidget | null>(null);
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const verificationVersion = useRef(0);

  const invalidate = useCallback(() => {
    verificationVersion.current += 1;
    setIsValidate(false);
  }, []);

  const resetTurnstile = useCallback(() => {
    invalidate();
    if (typeof window === "undefined") return;
    const turnstile = window.turnstile;
    if (turnstile && turnstileInstanceRef.current !== null) {
      turnstile.reset(turnstileInstanceRef.current);
    }
  }, [invalidate]);

  const handleVerify = useCallback(
    async (token: string) => {
      const version = ++verificationVersion.current;
      setIsValidate(false);
      setError(null);
      try {
        const response = await axiosInstance.post("/turnstile", {
          "cf-turnstile-response": token,
        });

        if (version !== verificationVersion.current) return;
        if (response.data.validationResult !== true) {
          setError("자동등록방지 확인에 실패했습니다. 다시 시도해 주세요.");
          resetTurnstile();
        } else {
          setIsValidate(true);
        }
      } catch (error) {
        if (version !== verificationVersion.current) return;
        setError("자동등록방지를 확인하지 못했습니다. 다시 시도해 주세요.");
        resetTurnstile();
      }
    },
    [resetTurnstile]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !turnstileRef.current) return;
    const initialize = () => {
      if (!window.turnstile || !turnstileRef.current || turnstileInstanceRef.current !== null) return;
      try {
        turnstileInstanceRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
          callback: handleVerify,
          "expired-callback": invalidate,
          "error-callback": () => {
            invalidate();
            setError("자동등록방지를 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.");
          },
        });
      } catch {
        setError("자동등록방지를 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.");
      }
    };
    initialize();
    const interval = window.setInterval(initialize, 300);
    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
      if (turnstileInstanceRef.current === null) {
        setError("자동등록방지를 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.");
      }
    }, 15000);
    return () => {
      verificationVersion.current += 1;
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      if (turnstileInstanceRef.current !== null) {
        window.turnstile?.remove(turnstileInstanceRef.current);
        turnstileInstanceRef.current = null;
      }
    };
  }, [turnstileRef, handleVerify, invalidate]);

  return { isValidate, error, resetTurnstile };
};
