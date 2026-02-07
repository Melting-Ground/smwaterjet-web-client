// global.d.ts
type TurnstileWidget = string | number | HTMLElement;

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; callback: (token: string) => void }
      ) => TurnstileWidget;
      execute?: (container: HTMLElement) => void;
      reset: (widget: TurnstileWidget) => void;
    };
  }
}

export {};
