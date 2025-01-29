import { FunctionComponent } from "react";
import React from "react";
import { Button } from "../../../../../components/button";
import { Styles } from "./styles";

export interface MoreOptionsButtonProps {
  text: string;
  onClick: () => void;
}

export const MoreOptionsButton: FunctionComponent<MoreOptionsButtonProps> = ({
  text,
  onClick,
}) => {
  return (
    <Styles.Container>
      <Button
        color="secondary"
        text={text}
        onClick={onClick}
        size="large"
        style={{
          borderRadius: "1rem",
          border: "0",
          backgroundColor: "#CBCBCB1A",
          backdropFilter: "blur(1rem)",
          height: "3rem",
        }}
      />
    </Styles.Container>
  );
};
