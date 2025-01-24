import React, { FunctionComponent, PropsWithChildren } from "react";
import { Box } from "../../../../components/box";

export const RegisterSceneBoxFooter: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <Box padding="1.5rem">{children}</Box>;
};
