import React from "react";

import { Body2 } from "../../../../../components/typography";

import { Box } from "../../../../../components/box";
import { CarouselDots } from "../../../../../components/carousel/dots";
import { Carousel, CarouselSlide } from "../../../../../components/carousel";
import { Stack } from "../../../../../components/stack";
import { H4 } from "../../../../../components/typography";
import { FormattedMessage } from "react-intl";

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
              <H4>
                <FormattedMessage id="pages.register.intro.effortless-asset-management-title" />
              </H4>
              <Body2
                style={{
                  color: "#FFFFFF99",
                  textAlign: "center",
                }}
              >
                <FormattedMessage id="pages.register.intro.effortless-asset-management-sub" />
              </Body2>
            </Stack>
          </Box>
        </CarouselSlide>
        <CarouselSlide>
          <Box paddingY="1rem" height="8rem" paddingX="1.875rem">
            <Stack alignX="center" gutter="0.5rem">
              <H4>
                <FormattedMessage id="pages.register.intro.pre-sign-check-title" />
              </H4>
              <Body2
                style={{
                  color: "#FFFFFF99",
                  textAlign: "center",
                }}
              >
                <FormattedMessage id="pages.register.intro.pre-sign-check-sub" />
              </Body2>
            </Stack>
          </Box>
        </CarouselSlide>
        <CarouselSlide>
          <Box paddingY="1rem" height="8rem" paddingX="1.875rem">
            <Stack alignX="center" gutter="0.5rem">
              <H4>
                <FormattedMessage id="pages.register.intro.seamless-integration-title" />
              </H4>
              <Body2
                style={{
                  color: "#FFFFFF99",
                  textAlign: "center",
                }}
              >
                <FormattedMessage id="pages.register.intro.seamless-integration-sub" />
              </Body2>
            </Stack>
          </Box>
        </CarouselSlide>
      </Carousel>
    </Box>
  );
};
