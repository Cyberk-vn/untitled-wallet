import React, { FunctionComponent } from "react";
import { GuideBoxProps } from "../guide-box";
import { Box } from "../box";
import { IconProps } from "../icon/types";
import { Columns } from "../column";
import { Body2 } from "../typography";
import { ColorPalette } from "../../styles";
import { Gutter } from "../gutter";
import { useTheme } from "styled-components";

export const WarningBox: FunctionComponent<Omit<GuideBoxProps, "color">> = ({
  title,
  paragraph,
}) => {
  const theme = useTheme();
  return (
    <Box>
      <Columns sum={1} alignY="top" gutter="0.5rem">
        <WarningIcon
          width="0.875rem"
          height="0.875rem"
          color={
            theme.mode === "light"
              ? ColorPalette["orange-500"]
              : ColorPalette["yellow-400"]
          }
        />
        <Body2
          color={
            theme.mode === "light"
              ? ColorPalette["orange-500"]
              : ColorPalette["yellow-500"]
          }
        >
          {title}
        </Body2>
      </Columns>

      <Gutter size="0.375rem" />

      <Body2
        color={
          theme.mode === "light"
            ? ColorPalette["gray-100"]
            : ColorPalette["gray-100"]
        }
      >
        {paragraph}
      </Body2>
    </Box>
  );
};

const WarningIcon: FunctionComponent<IconProps> = ({
  width = "0.875rem",
  height = "0.875rem",
  color,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 5.25V8.16667"
        stroke={color || "currentColor"}
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 12.4892H3.465C1.44083 12.4892 0.595001 11.0425 1.575 9.27504L3.395 5.9967L5.11 2.9167C6.14834 1.0442 7.85167 1.0442 8.89 2.9167L10.605 6.00254L12.425 9.28087C13.405 11.0484 12.5533 12.495 10.535 12.495H7V12.4892Z"
        stroke={color || "currentColor"}
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.99707 9.91663H7.00231"
        stroke={color || "currentColor"}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
