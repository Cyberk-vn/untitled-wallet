import React, { FunctionComponent, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Box } from "../box";
import { observer } from "mobx-react-lite";
import { Styles } from "./styles";
import { CarouselProps } from "./types";

export const Carousel: FunctionComponent<CarouselProps> = observer(
  ({
    options,
    children,
    autoplay = false,
    autoplayInterval = 4000,
    autoplayDirection = "forward",
    renderDots,
  }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
      loop: true,
      ...options,
    });

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const autoplayTimerRef = React.useRef<NodeJS.Timeout | null>(null);

    const scrollTo = useCallback(
      (index: number) => {
        if (emblaApi) {
          emblaApi.scrollTo(index);
          if (autoplay) {
            stopAutoplay();
            startAutoplay();
          }
        }
      },
      [emblaApi]
    );

    const scrollNext = useCallback(() => {
      if (emblaApi) {
        autoplayDirection === "forward"
          ? emblaApi.scrollNext()
          : emblaApi.scrollPrev();
      }
    }, [emblaApi, autoplayDirection]);

    const startAutoplay = useCallback(() => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = setInterval(scrollNext, autoplayInterval);
    }, [autoplayInterval, scrollNext]);

    const stopAutoplay = useCallback(() => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    }, []);

    // Initialize autoplay as soon as emblaApi is ready
    useEffect(() => {
      if (!emblaApi || !autoplay) return;

      // Start autoplay immediately
      startAutoplay();

      // Add listeners for user interaction
      emblaApi.on("pointerDown", stopAutoplay);
      emblaApi.on("pointerUp", startAutoplay);

      return () => {
        stopAutoplay();
        emblaApi.off("pointerDown", stopAutoplay);
        emblaApi.off("pointerUp", startAutoplay);
      };
    }, [emblaApi, autoplay, startAutoplay, stopAutoplay, scrollNext]);

    const onSelect = useCallback(() => {
      if (!emblaApi) return;
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
      if (!emblaApi) return;
      onSelect();
      emblaApi.on("select", onSelect);
      return () => {
        emblaApi.off("select", onSelect);
      };
    }, [emblaApi, onSelect]);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        if (autoplayTimerRef.current) {
          clearInterval(autoplayTimerRef.current);
        }
      };
    }, []);

    return (
      <Box>
        <Styles.Viewport ref={emblaRef}>
          <Styles.Container>{children}</Styles.Container>
        </Styles.Viewport>

        {renderDots &&
          emblaApi &&
          renderDots({
            selectedIndex,
            slideCount: emblaApi.scrollSnapList().length,
            onDotClick: scrollTo,
          })}
      </Box>
    );
  }
);
