import { EmblaOptionsType } from "embla-carousel";

export interface CarouselDotsProps {
  selectedIndex: number;
  slideCount: number;
  onDotClick: (index: number) => void;
  className?: string;
}

export interface CarouselProps {
  options?: EmblaOptionsType;
  children: React.ReactNode;
  autoplay?: boolean;
  autoplayInterval?: number;
  autoplayDirection?: "forward" | "backward";
  renderDots?: (props: {
    selectedIndex: number;
    slideCount: number;
    onDotClick: (index: number) => void;
  }) => React.ReactNode;
}
