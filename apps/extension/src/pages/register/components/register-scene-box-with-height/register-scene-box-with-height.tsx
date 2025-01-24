import React, { FunctionComponent, PropsWithChildren } from "react";
import { Box } from "../../../../components/box";
import { RegisterSimpleHeaderWithSeparator } from "../simple-header-with-separator";

export const RegisterSceneBoxWithHeight: FunctionComponent<
  PropsWithChildren<{
    title: string;
  }>
> = ({ children, title }) => {
  return (
    <Box minHeight="35rem">
      <RegisterSimpleHeaderWithSeparator title={title} />
      {children}
    </Box>
  );
};
