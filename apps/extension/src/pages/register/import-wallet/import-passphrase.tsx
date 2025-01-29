import React, { FunctionComponent } from "react";
import { RegisterSceneBoxBody } from "../components/register-scene-box-with-height";
import { Button } from "../../../components/button";
import { RegisterSceneBoxFooter } from "../components/register-scene-box-with-height";
import { RegisterSceneBoxWithHeight } from "../components/register-scene-box-with-height";
import { Column, Columns } from "../../../components/column";
import { H4 } from "../../../components/typography";
import { Gutter } from "../../../components/gutter";
import { Box } from "../../../components/box";

import styled from "styled-components";

export const Styles = {
  WordsGridContainer: styled.div<{
    columns: number;
  }>`
    display: grid;
    grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
    gap: 0.75rem 0.75rem;
  `,
};

export const RegisterImportPassphraseScene: FunctionComponent = () => {
  return (
    <RegisterSceneBoxWithHeight title="Import from passphrase">
      <RegisterSceneBoxBody>
        <Box alignX="center" paddingX="3rem">
          <H4>Enter your 12 - word recovery phrase</H4>
        </Box>
        <Gutter size="1.25rem" />
        <Styles.WordsGridContainer columns={2}>
          {Array.from({ length: 12 }, (_, index) => (
            <Box
              key={index}
              minHeight="2.625rem"
              backgroundColor="#9898981A"
              borderRadius="0.5rem"
              borderWidth="1px"
              borderColor="#9C9C9C1A"
            />
          ))}
        </Styles.WordsGridContainer>
      </RegisterSceneBoxBody>
      <RegisterSceneBoxFooter>
        <Columns sum={2} gutter="0.75rem">
          <Column weight={1}>
            <Button mode="outline" text="Back" />
          </Column>
          <Column weight={1}>
            <Button text="Next" disabled />
          </Column>
        </Columns>
      </RegisterSceneBoxFooter>
    </RegisterSceneBoxWithHeight>
  );
};
