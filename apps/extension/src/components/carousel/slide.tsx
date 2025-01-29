import React, { FunctionComponent, PropsWithChildren } from "react";
import { Styles } from "./styles";

export const CarouselSlide: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <Styles.CarouselSlide>{children}</Styles.CarouselSlide>;
};
