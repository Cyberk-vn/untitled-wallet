import React, { FunctionComponent } from "react";
import { SeparatorProps } from "./types";
import { Styles } from "./styles";

export const Separator: FunctionComponent<SeparatorProps> = ({
  orientation = "horizontal",
}) => {
  return <Styles.Separator orientation={orientation} />;
};
