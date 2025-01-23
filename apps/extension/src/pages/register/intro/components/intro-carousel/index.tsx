import React from "react";

import { Body2 } from "../../../../../components/typography";

import { Box } from "../../../../../components/box";
import { CarouselDots } from "../../../../../components/carousel/dots";
import { Carousel, CarouselSlide } from "../../../../../components/carousel";
import { Stack } from "../../../../../components/stack";
import { H4 } from "../../../../../components/typography";

export const IntroCarousel = () => {
  return (
    <Box
      position="relative"
      borderRadius="1rem"
      borderColor="#9C9C9C1A"
      borderWidth="1px"
      backgroundColor="#9898981A"
    >
      <Carousel
        options={{}}
        autoplay
        autoplayInterval={2500}
        renderDots={({ selectedIndex, slideCount, onDotClick }) => (
          <Box
            position="absolute"
            style={{
              bottom: "1rem",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CarouselDots
              selectedIndex={selectedIndex}
              slideCount={slideCount}
              onDotClick={onDotClick}
            />
          </Box>
        )}
      >
        <CarouselSlide>
          <Box paddingY="1rem" height="8rem" paddingX="1.875rem">
            <Stack alignX="center" gutter="0.5rem">
              <H4>Effortless Asset Management</H4>
              <Body2
                style={{
                  color: "#FFFFFF99",
                  textAlign: "center",
                }}
              >
                Gateway to Titan, swap tokens and DeFi
              </Body2>
            </Stack>
          </Box>
        </CarouselSlide>
        <CarouselSlide>
          <Box paddingY="1rem" height="8rem" paddingX="1.875rem">
            <Stack alignX="center" gutter="0.5rem">
              <H4>Pre-sign check for security</H4>
              <Body2
                style={{
                  color: "#FFFFFF99",
                  textAlign: "center",
                }}
              >
                You see exactly what you sign
              </Body2>
            </Stack>
          </Box>
        </CarouselSlide>
        <CarouselSlide>
          <Box paddingY="1rem" height="8rem" paddingX="1.875rem">
            <Stack alignX="center" gutter="0.5rem">
              <H4>Seamless Integration</H4>
              <Body2
                style={{
                  color: "#FFFFFF99",
                  textAlign: "center",
                }}
              >
                Bridging, staking and on-off ramp can be done all through the
                wallet
              </Body2>
            </Stack>
          </Box>
        </CarouselSlide>
      </Carousel>
    </Box>
  );
};
