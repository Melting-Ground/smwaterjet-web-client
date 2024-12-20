import axiosInstance from "@/_config/axiosInstance";
import { useEffect, useState, useRef } from "react";

export const useTurnstile = (
  turnstileRef: React.RefObject<HTMLDivElement>
  //   handleSubmit: () => void
) => {
  const turnstileInstanceRef = useRef<any>(null);
  const [isValidate, setIsValidate] = useState<boolean>(false);

  // Turnstile 검증 및 서버로 토큰 전송
  const handleVerify = async (token: string) => {
    try {
      const response = await axiosInstance.post("/turnstile", {
        "cf-turnstile-response": token,
      });

      console.log("Turnstile response:", response);

      if (response.data.validationResult === false) {
        alert("자동 등록 방지 검증에 실패했습니다. 다시 시도해주세요.");
        setIsValidate(false);
        resetTurnstile();
      } else {
        // validationResult === true
        setIsValidate(true);
        console.log("Turnstile verification 성공");
      }
    } catch (error) {
      console.error("Turnstile error:", error);
      alert("검증 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsValidate(false);
      resetTurnstile();
    }
  };

  const resetTurnstile = () => {
    if (
      typeof window !== "undefined" &&
      window.turnstile &&
      turnstileInstanceRef.current
    ) {
      window.turnstile.reset(turnstileInstanceRef.current);
      console.log("Turnstile 리셋됨");
    }
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.turnstile &&
      turnstileRef.current
    ) {
      // Turnstile 렌더링
      window.turnstile.render(turnstileRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
        callback: (token) => {
          console.log("Turnstile token:", token);
          handleVerify(token); // 서버로 토큰 전송
        },
      });

      // 렌더링된 Turnstile 객체를 ref에 저장
      turnstileInstanceRef.current = turnstileRef.current;
    }
  }, [turnstileRef]);

  return { isValidate };
};
