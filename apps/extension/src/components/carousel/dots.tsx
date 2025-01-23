import React, { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { Box } from "../box";
import { CarouselDotsProps } from "./types";
import { Styles } from "./styles";

export const CarouselDots: FunctionComponent<CarouselDotsProps> = observer(
  ({ selectedIndex, slideCount, onDotClick, className }) => {
    return (
      <Box className={className}>
        <Styles.Dots>
          {Array.from(Array(slideCount).keys()).map((index) => (
            <Styles.Dot
              key={index}
              active={index === selectedIndex}
              onClick={() => onDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </Styles.Dots>
      </Box>
    );
  }
);
