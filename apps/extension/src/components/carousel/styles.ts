import styled from "styled-components";
import { ColorPalette } from "../../styles";

export const Styles = {
  Viewport: styled.div`
    overflow: hidden;
    width: 100%;
  `,
  Container: styled.div`
    display: flex;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -webkit-tap-highlight-color: transparent;
  `,
  Dots: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  `,
  Dot: styled.button<{ active?: boolean }>`
    height: 0.25rem;
    width: ${(props) => (props.active ? "0.75rem" : "0.25rem")};
    border-radius: 999px;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    background-color: ${(props) =>
      props.active
        ? props.theme.mode === "light"
          ? ColorPalette["gray-300"]
          : ColorPalette["gray-100"]
        : props.theme.mode === "light"
        ? ColorPalette["gray-100"]
        : ColorPalette["gray-400"]};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) =>
        props.theme.mode === "light"
          ? ColorPalette["gray-300"]
          : ColorPalette["gray-100"]};
      width: ${(props) => (props.active ? "1.5rem" : "0.75rem")};
    }
  `,
  CarouselSlide: styled.div`
    flex: 0 0 100%;
    min-width: 0;
    position: relative;
  `,
};
