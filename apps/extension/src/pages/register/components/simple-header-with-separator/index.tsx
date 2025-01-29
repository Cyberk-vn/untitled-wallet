import React, { FunctionComponent } from "react";
import { Subtitle2 } from "../../../../components/typography";
import { Box } from "../../../../components/box";
import { Separator } from "../../../../components/separator";

interface RegisterSimpleHeaderWithSeparatorProps {
  title: string;
}

export const RegisterSimpleHeaderWithSeparator: FunctionComponent<
  RegisterSimpleHeaderWithSeparatorProps
> = ({ title }) => {
  return (
    <React.Fragment>
      <Box alignX="center" paddingY="1rem">
        <Subtitle2>{title}</Subtitle2>
      </Box>
      <Separator />
    </React.Fragment>
  );
};
