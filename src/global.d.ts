// global.d.ts
declare global {
  interface Window {
    turnstile: {
      render: (
        container: HTMLDivElement | null,
        options: { sitekey: string; callback: (token: string) => void }
      ) => void;
      execute: (container: HTMLDivElement | null) => void;
	  reset: (widgetId: string) => void;
    };
  }
}

export {};
