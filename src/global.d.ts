// global.d.ts
declare global {
  interface Window {
    turnstile: {
      render: (
        container: HTMLDivElement | null,
        options: { sitekey: string; callback: (token: string) => void }
      ) => void;
      execute: (container: HTMLDivElement | null) => void;
    };
  }
}

export {}; // 모듈로 간주되도록 빈 export 추가
