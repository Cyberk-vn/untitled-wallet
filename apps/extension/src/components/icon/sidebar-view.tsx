import React, { FunctionComponent } from "react";
import { IconProps } from "./types";

export const SidebarViewIcon: FunctionComponent<IconProps> = ({
  width = "1.5rem",
  height = "1.5rem",
  color,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_43_7226)">
        <path
          d="M13 4.5H5C4.45 4.5 4 4.95 4 5.5V18.5C4 19.05 4.45 19.5 5 19.5H13C13.55 19.5 14 19.05 14 18.5V5.5C14 4.95 13.55 4.5 13 4.5Z"
          fill={color || "currentColor"}
        />
        <path
          d="M18.9143 4.5C17.5671 4.5 16.4648 5.11364 16.4648 5.86364V18.1364C16.4648 18.8864 17.5671 19.5 18.9143 19.5C20.2615 19.5 21.3637 18.8864 21.3637 18.1364V5.86364C21.3637 5.11364 20.2615 4.5 18.9143 4.5Z"
          fill={color || "currentColor"}
        />
      </g>
      <defs>
        <clipPath id="clip0_43_7226">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
