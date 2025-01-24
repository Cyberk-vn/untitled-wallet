import React, { FunctionComponent } from "react";
import { Box } from "../../../components/box";
import { RegisterSimpleHeaderWithSeparator } from "../components/simple-header-with-separator";

export const RegisterImportPassphraseScene: FunctionComponent = () => {
  return (
    <Box>
      <RegisterSimpleHeaderWithSeparator title="Import from passphrase" />
    </Box>
  );
};
