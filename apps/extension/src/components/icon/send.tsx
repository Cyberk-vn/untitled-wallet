import React, { FunctionComponent } from "react";
import { IconProps } from "./types";

export const SendIcon: FunctionComponent<IconProps> = ({
  width = "1.5rem",
  height = "1.5rem",
  color,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M27.5789 13.663L12.6047 6.18048C9.94143 4.84965 7.07576 7.58637 8.28509 10.3057L10.4669 15.2118C10.8316 16.032 10.8316 16.9681 10.4669 17.7883L8.28509 22.6944C7.07576 25.4137 9.94142 28.1504 12.6047 26.8196L27.5789 19.337C29.9181 18.1681 29.9181 14.8319 27.5789 13.663Z"
        fill={color || "currentColor"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3337 16.5C10.3337 15.9478 10.7814 15.5 11.3337 15.5H16.0003C16.5526 15.5 17.0003 15.9478 17.0003 16.5C17.0003 17.0523 16.5526 17.5 16.0003 17.5H11.3337C10.7814 17.5 10.3337 17.0523 10.3337 16.5Z"
        fill={color || "currentColor"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.66699 13.8334C1.66699 13.2811 2.11471 12.8334 2.66699 12.8334H5.33366C5.88594 12.8334 6.33366 13.2811 6.33366 13.8334C6.33366 14.3857 5.88594 14.8334 5.33366 14.8334H2.66699C2.11471 14.8334 1.66699 14.3857 1.66699 13.8334Z"
        fill={color || "currentColor"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.66699 19.1667C1.66699 18.6144 2.11471 18.1667 2.66699 18.1667H5.33366C5.88594 18.1667 6.33366 18.6144 6.33366 19.1667C6.33366 19.719 5.88594 20.1667 5.33366 20.1667H2.66699C2.11471 20.1667 1.66699 19.719 1.66699 19.1667Z"
        fill={color || "currentColor"}
      />
    </svg>
  );
};
