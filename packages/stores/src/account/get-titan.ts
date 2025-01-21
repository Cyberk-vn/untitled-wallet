import { Titan } from "@titan-wallet/types";

export const getTitanFromWindow: () => Promise<
  Titan | undefined
> = async () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  if (window.titan) {
    return window.titan;
  }

  if (document.readyState === "complete") {
    return window.titan;
  }

  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === "complete"
      ) {
        resolve(window.titan);
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
};
