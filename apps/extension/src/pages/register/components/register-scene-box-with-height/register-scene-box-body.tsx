import React, { FunctionComponent, PropsWithChildren } from "react";
import { Box } from "../../../../components/box";

export const RegisterSceneBoxBody: FunctionComponent<
  PropsWithChildren<{
    style?: React.CSSProperties;
    textAlign?: React.CSSProperties["textAlign"];
  }>
> = ({ children, style, textAlign = "center" }) => {
  return (
    <Box
      padding="1.5rem"
      style={{
        flex: 1,
        alignItems: "stretch",
        textAlign,
        ...style,
      }}
    >
      {children}
    </Box>
  );
};
