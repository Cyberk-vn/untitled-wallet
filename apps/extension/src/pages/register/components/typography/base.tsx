import styled from "styled-components";

type BaseTypographyProps = {
  color?: string;
};

export const BaseHafferTypography = styled.div<BaseTypographyProps>`
  font-family: "Haffer", "SF PRO", sans-serif;

  color: ${({ color }) => (color ? color : "inherit")};
`;
