import { useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "./languages";
import { useLayoutEffectOnce } from "./hooks/use-effect-once";

const languageToFontFaces: {
  [lang: string]: FontFace[] | undefined;
} = {
  en: [
    new FontFace(
      "SF PRO",
      `url(${require("./public/assets/font/SFPRODISPLAYREGULAR.OTF")})`,
      {
        weight: "400",
      }
    ),
    new FontFace(
      "SF PRO",
      `url(${require("./public/assets/font/SFPRODISPLAYMEDIUM.OTF")})`,
      {
        weight: "500",
      }
    ),
    new FontFace(
      "SF PRO",
      `url(${require("./public/assets/font/SFPRODISPLAYSEMIBOLDITALIC.OTF")})`,
      {
        weight: "600",
        style: "italic",
      }
    ),
    new FontFace(
      "SF PRO",
      `url(${require("./public/assets/font/SFPRODISPLAYBOLD.OTF")})`,
      {
        weight: "700",
      }
    ),
    new FontFace(
      "SF PRO",
      `url(${require("./public/assets/font/SFPRODISPLAYHEAVYITALIC.OTF")})`,
      {
        weight: "800",
        style: "italic",
      }
    ),
    new FontFace(
      "SF PRO",
      `url(${require("./public/assets/font/SFPRODISPLAYBLACKITALIC.OTF")})`,
      {
        weight: "900",
        style: "italic",
      }
    ),
  ],
  ko: [
    new FontFace(
      "NotoSansKR",
      `url(${require("./public/assets/font/NotoSansKR-Regular.woff2")})`,
      {
        weight: "400",
      }
    ),
    new FontFace(
      "NotoSansKR",
      `url(${require("./public/assets/font/NotoSansKR-Medium.woff2")})`,
      {
        weight: "500",
      }
    ),
    new FontFace(
      "NotoSansKR",
      `url(${require("./public/assets/font/NotoSansKR-Medium.woff2")})`,
      {
        weight: "600",
      }
    ),
    new FontFace(
      "NotoSansKR",
      `url(${require("./public/assets/font/NotoSansKR-Bold.woff2")})`,
      {
        weight: "700",
      }
    ),
  ],
};

export const useLoadFonts = () => {
  const loadedFonts = useRef(new Map<string, boolean>());
  const [isLoaded, setIsLoaded] = useState(false);

  const language = useLanguage();

  useLayoutEffectOnce(() => {
    // Load fonts for initial language

    loadedFonts.current.set(language.language, true);

    const fonts: FontFace[] | undefined =
      languageToFontFaces[language.language];

    if (!fonts) {
      setIsLoaded(true);
      return;
    }

    const len = fonts.length;

    let numLoaded = 0;
    for (const font of fonts) {
      font.load().then(() => {
        document.fonts.add(font);

        numLoaded++;
        if (numLoaded === len) {
          setIsLoaded(true);
        }
      });
    }
  });

  useLayoutEffect(() => {
    // Load fonts when user changes language
    // This is performed only after initialization completes.
    // So, there is no need to wait loading.
    if (!loadedFonts.current.get(language.language)) {
      loadedFonts.current.set(language.language, true);

      const fonts: FontFace[] | undefined =
        languageToFontFaces[language.language];

      if (fonts) {
        for (const font of fonts) {
          font.load();
        }
      }
    }
  }, [language.language]);

  return {
    isLoaded,
  };
};
