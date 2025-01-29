import styled from "styled-components";
import { SeparatorProps } from "./types";

export const Styles = {
  Separator: styled.div<SeparatorProps>`
    background-color: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(0, 0, 0, 0.12)"
        : "rgba(255, 255, 255, 0.12)"};

    ${({ orientation = "horizontal" }) =>
      orientation === "horizontal"
        ? `
          width: 100%;
          height: 1px;
          min-height: 1px;
        `
        : `
          width: 1px;
          min-width: 1px;
          height: 100%;
        `}
  `,
};
